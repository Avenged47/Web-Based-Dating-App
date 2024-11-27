const math = require("mathjs");
const User = require("../models/UserSchema");
const Match = require("../models/MatchSchema");

function calculateCosineSimilarity(vector1, vector2) {
  if (
    !Array.isArray(vector1) ||
    !Array.isArray(vector2) ||
    vector1.length !== vector2.length
  ) {
    return 0;
  }

  const matrix1 = math.matrix(vector1.map((val) => Number(val) || 0));
  const matrix2 = math.matrix(vector2.map((val) => Number(val) || 0));

  const similarity =
    math.dot(matrix1, matrix2) / (math.norm(matrix1) * math.norm(matrix2));

  return isNaN(similarity) ? 0 : similarity;
}

async function createUserFeatureVector(user, attributes, currentUser) {
  const featureVector = [];

  if (!user) return featureVector;

  for (const attribute of attributes) {
    if (attribute === "dob") {
      const dob = new Date(user.dob);
      const age = new Date().getFullYear() - dob.getFullYear();
      featureVector.push(age);
    } else if (
      ["sexualOrientation", "relationshipStatus", "interestedIn"].includes(
        attribute
      )
    ) {
      featureVector.push(user[attribute] || "");
    } else if (["interests", "dislikes"].includes(attribute)) {
      const userValues = user[attribute] || [];
      const currentUserValues = currentUser[attribute] || [];

      const commonValues = userValues.filter((value) =>
        currentUserValues.includes(value)
      );
      const matchPercentage =
        commonValues.length /
        Math.max(userValues.length, currentUserValues.length);
      featureVector.push(matchPercentage);
    } else if (attribute === "gender") {
      featureVector.push(user.gender || "");
    }
  }

  return featureVector;
}

function filterMatchingAttributes(currentUser, user, attributes) {
  const threshold = 0.4;
  let matchingAttributesCount = 0;

  attributes.forEach((attribute) => {
    if (attribute === "dob") {
      matchingAttributesCount++;
      return;
    }

    const currentValue = currentUser[attribute];
    const userValue = user[attribute];

    if (currentValue && userValue) {
      if (
        attribute === "sexualOrientation" ||
        attribute === "relationshipStatus"
      ) {
        if (currentValue === userValue) {
          matchingAttributesCount++;
        }
      } else if (attribute === "interestedIn") {
        if (currentValue === userValue) {
          matchingAttributesCount++;
        }
      } else if (Array.isArray(currentValue) && Array.isArray(userValue)) {
        const commonValues = currentValue.filter((val) =>
          userValue.includes(val)
        );
        const matchPercentage =
          commonValues.length / Math.max(currentValue.length, userValue.length);
        if (matchPercentage >= threshold) matchingAttributesCount++;
      } else if (currentValue === userValue) {
        matchingAttributesCount++;
      }
    }
  });

  return matchingAttributesCount;
}

function isGenderMismatch(currentUser, user) {
  const genderMap = {
    male: "male",
    female: "female",
    other: "other", // Handle "other" as a valid gender
  };

  const interestedInMap = {
    men: "male",
    women: "female",
    "non-binary": "other", // Map "non-binary" to the "other" gender
    everyone: "everyone",
  };

  const normalize = (value) => value?.toLowerCase().trim();

  const currentUserInterestedIn =
    interestedInMap[normalize(currentUser.interestedIn)] || null;
  const currentUserGender = genderMap[normalize(currentUser.gender)] || null;
  const userInterestedIn =
    interestedInMap[normalize(user.interestedIn)] || null;
  const userGender = genderMap[normalize(user.gender)] || null;

  // If any critical value is missing or invalid, consider it a mismatch
  if (
    !currentUserInterestedIn ||
    !currentUserGender ||
    !userInterestedIn ||
    !userGender
  ) {
    console.warn("Invalid data encountered:", { currentUser, user });
    return true; // Default to mismatch if data is invalid
  }

  // Case 1: If either user is interested in "everyone," there's no gender mismatch
  if (
    currentUserInterestedIn === "everyone" ||
    userInterestedIn === "everyone"
  ) {
    return false;
  }

  // Case 2: If either user's gender is "other", ensure compatibility
  if (
    (currentUserGender === "other" && userInterestedIn === "other") ||
    (userGender === "other" && currentUserInterestedIn === "other")
  ) {
    return false; // No mismatch for non-binary users
  }

  // Case 3: Check for direct gender-interest compatibility
  if (
    currentUserInterestedIn === userGender &&
    userInterestedIn === currentUserGender
  ) {
    return false; // Both users' interests and genders match
  }

  // Case 4: Handle mixed scenarios involving "other"
  if (
    (currentUserInterestedIn === "other" && userGender === "other") ||
    (userInterestedIn === "other" && currentUserGender === "other")
  ) {
    return false;
  }

  // In all other cases, there is a gender mismatch
  return true;
}

function isSexualOrientationMismatch(currentUser, user) {
  const normalize = (value) => value?.toLowerCase().trim();

  const orientationMap = {
    straight: "straight",
    homosexual: "homosexual",
    bisexual: "bisexual",
    pansexual: "pansexual",
    asexual: "asexual",
    queer: "queer",
    lesbian: "homosexual",
    gay: "homosexual",
  };

  const currentUserOrientation =
    orientationMap[normalize(currentUser.sexualOrientation)];
  const userOrientation = orientationMap[normalize(user.sexualOrientation)];

  if (!currentUserOrientation || !userOrientation) {
    console.warn("Invalid orientation data:", { currentUser, user });
    return true;
  }

  return currentUserOrientation !== userOrientation;
}

function isRelationshipStatusMismatch(currentUser, user) {
  const normalize = (value) => value?.toLowerCase().trim();

  const validStatuses = [
    "single",
    "in a relationship",
    "married",
    "complicated",
    "divorced",
    "widowed",
  ];

  const currentUserStatus = normalize(currentUser.relationshipStatus);
  const userStatus = normalize(user.relationshipStatus);

  if (
    !validStatuses.includes(currentUserStatus) ||
    !validStatuses.includes(userStatus)
  ) {
    console.warn("Invalid relationship status data:", { currentUser, user });
    return true;
  }

  return currentUserStatus !== userStatus;
}

async function getRecommendedMatches(req, res) {
  const userId = req.params.id;
  const attributes = [
    "dob",
    "sexualOrientation",
    "relationshipStatus",
    "interestedIn",
    "interests",
    "dislikes",
    "gender",
  ];

  try {
    console.log("Fetching current user...");
    const currentUser = await User.findById(userId).lean();
    if (!currentUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const allUsers = await User.find({ _id: { $ne: userId } }).lean();

    const requiredMatches = 0.6;
    const maxAgeDifference = 15;

    const currentUserVector = await createUserFeatureVector(
      currentUser,
      attributes,
      currentUser
    );

    const matches = [];
    const recommendedUsers = [];

    for (const user of allUsers) {
      const isAlreadyMatched = await checkIfUserIsMatched(
        currentUser._id,
        user._id
      );

      if (isAlreadyMatched) {
        continue;
      }

      const userVector = await createUserFeatureVector(
        user,
        attributes,
        currentUser
      );

      const ageDiff = Math.abs(currentUserVector[0] - userVector[0]);

      if (ageDiff > maxAgeDifference) {
        continue;
      }

      const matchedAttributes = filterMatchingAttributes(
        currentUser,
        user,
        attributes
      );

      if (isGenderMismatch(currentUser, user)) {
        continue;
      }

      if (isSexualOrientationMismatch(currentUser, user)) {
        continue;
      }

      if (isRelationshipStatusMismatch(currentUser, user)) {
        continue;
      }

      const similarity = calculateCosineSimilarity(
        currentUserVector,
        userVector
      );

      if (
        similarity &&
        matchedAttributes >= attributes.length * requiredMatches
      ) {
        matches.push({ user, similarity });
        recommendedUsers.push(user._id);
      }
    }

    matches.sort((a, b) => b.similarity - a.similarity);

    const similarityThreshold =
      matches.length > 10 ? matches[9].similarity : -1;

    const picturesByUser = await getUserPictures(recommendedUsers);

    const extendedMatches = matches.filter(
      (match) => match.similarity >= similarityThreshold
    );

    const recommendedMatches = extendedMatches.slice(0, 10).map((match) => {
      const userId = match.user._id;
      const pictures = picturesByUser.get(userId.toString()) || [];

      return {
        userId: userId,
        name: `${match.user.firstName} ${match.user.lastName}`,
        age: calculateAge(match.user.dob),
        pictures: pictures,
        similarity: match.similarity,
      };
    });

    res.json({ recommendedMatches });
  } catch (error) {
    console.error("Error during matching:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function checkIfUserIsMatched(currentUserId, matchUserId) {
  return await Match.findOne({
    $or: [
      { userId: currentUserId, matchId: matchUserId, status: "pending" },
      { userId: matchUserId, matchId: currentUserId, status: "pending" },
      { userId: currentUserId, matchId: matchUserId, status: "accepted" },
      { userId: matchUserId, matchId: currentUserId, status: "accepted" },
      { userId: currentUserId, matchId: matchUserId, status: "rejected" },
      { userId: matchUserId, matchId: currentUserId, status: "rejected" },
    ],
  });
}

async function getUserPictures(userIds) {
  const userPictures = await User.find(
    { _id: { $in: userIds } },
    { _id: 1, images: 1 }
  ).lean();

  const picturesByUser = new Map();
  userPictures.forEach((user) => {
    picturesByUser.set(user._id.toString(), user.images || []);
  });

  return picturesByUser;
}

function calculateAge(dob) {
  const birthDate = new Date(dob);
  const ageDifMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

module.exports = { getRecommendedMatches };
