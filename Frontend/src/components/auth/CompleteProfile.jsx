import HorizontalLine from "../common/HorizontalLine";
import ImageSection from "../common/ImageSection";
import FormFieldTitle from "../UI/FormFieldTitle";
import ProfileTextField from "../UI/ProfileTextField";
import Button from "../UI/ButtonUi";
import { useEffect, useState } from "react";

import { completeProfileSchema } from "../../validation/completeProfileScheme";
import ErrorMessage from "../UI/ErrorMessage";
import { useAuthToken } from "../../hooks/useAuthToken";
import {
  completeYourProfile,
  getUserProfile,
} from "../../services/userProfile";

function CompleteProfile({ onProfileComplete }) {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getMonthNumber = (monthName) => {
    const monthIndex = months.indexOf(monthName);
    return monthIndex !== -1 ? String(monthIndex + 1).padStart(2, "0") : "00";
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  const sexualOrientationOptions = [
    "Straight",
    "Heterosexual",
    "Homosexual",
    "Bisexual",
    "Pansexual",
    "Asexual",
    "Queer",
    "Lesbian",
    "Gay",
    "Transgender",
    "Non-binary",
    "Genderqueer",
    "Two-spirit",
    "Questioning",
    "Other",
  ];

  const relationshipStatuses = [
    "Single",
    "In a Relationship",
    "Married",
    "Engaged",
    "It’s Complicated",
    "Divorced",
    "Separated",
    "Widowed",
    "Open Relationship",
    "Polyamorous",
    "Prefer Not to Say",
  ];

  const interestedInOptions = [
    "Men",
    "Women",
    "Non-binary",
    "Everyone",
    "Prefer Not to Say",
  ];

  const interests = [
    "Traveling",
    "Cooking",
    "Fitness ",
    "Music",
    "Reading",
    " Photography",
    "Hiking",
    "Gaming",
    "Movies",
    "Sports",
    " Gadgets",
    "Dancing",
    "Volunteering",
    "Fashion ",
    "Pets ",
  ];

  const dislikes = [
    "Smoking",
    "Partying",
    "Hygiene",
    "Negativity",
    "Dishonesty",
    "Ambition",
    "Diet",
    "Laziness",
    "Disrespect",
    "Screens",
    "Communication",
    "Jealousy",
    "Inconsideration",
    "Clinginess",
    "Recklessness",
  ];

  const [selectedGender, setSelectedGender] = useState("");
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedDislikes, setSelectedDislikes] = useState([]);
  const [imageData, setImageData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const userId = useAuthToken();
  const token = localStorage.getItem("token");

  const handleImageUpload = (file) => {
    setImageData((prevImages) => [...prevImages, file]);
  };
  const handleGenderClick = (gender) => {
    setSelectedGender(gender);
    setFormData((prevData) => ({
      ...prevData,
      gender: gender,
    }));
  };

  const handleToggleInterest = (choice) => {
    setSelectedInterests((prev) => {
      const newInterests = prev.includes(choice)
        ? prev.filter((i) => i !== choice)
        : [...prev, choice];

      setFormData((prev) => ({
        ...prev,
        interests: newInterests,
      }));

      return newInterests;
    });
  };

  const handleToggleDislike = (choice) => {
    setSelectedDislikes((prev) => {
      const newDislikes = prev.includes(choice)
        ? prev.filter((i) => i !== choice)
        : [...prev, choice];

      setFormData((prev) => ({
        ...prev,

        dislikes: newDislikes,
      }));

      return newDislikes;
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    day: "",
    month: "",
    year: "",
    gender: "",
    sexualOrientation: "",
    relationshipStatus: "",
    interestedIn: "",
    interests: [],
    dislikes: [],
    images: [],
  });

  const validateForm = async () => {
    console.log(formData);
    try {
      await completeProfileSchema.validate(formData, {
        abortEarly: false,
      });
      setErrors({});
      return true;
    } catch (validationErrors) {
      const errorMessages = {};
      validationErrors.inner.forEach((error) => {
        errorMessages[error.path] = error.message;
      });
      setErrors(errorMessages);
      return false;
    }
  };

  useEffect(() => {
    async function fetchUserData() {
      try {
        const userProfile = await getUserProfile(userId);

        if (userProfile && userProfile.user) {
          // console.log("User email:", userProfile.user.email);
          // console.log("Username:", userProfile.user.username);

          setFormData((prevData) => ({
            ...prevData,
            email: userProfile.user.email || "",
            userName: userProfile.user.username || "",
          }));
        } else {
          console.error("User data is missing or not properly structured.");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error.message);
      }
    }

    if (userId) fetchUserData();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const isValid = await validateForm();
    if (isValid) {
      const submittedData = new FormData();

      const year = String(formData.year);
      const month = getMonthNumber(formData.month);
      const day = String(formData.day).padStart(2, "0");

      const dob = `${year}-${month}-${day}`;

      submittedData.append("dob", dob);

      submittedData.append("firstName", formData.firstName);
      submittedData.append("lastName", formData.lastName);
      submittedData.append("email", formData.email);

      submittedData.append("gender", selectedGender);
      submittedData.append("sexualOrientation", formData.sexualOrientation);
      submittedData.append("relationshipStatus", formData.relationshipStatus);
      submittedData.append("interestedIn", formData.interestedIn);

      selectedInterests.forEach((interest) => {
        submittedData.append("interests[]", interest);
      });
      selectedDislikes.forEach((dislike) => {
        submittedData.append("dislikes[]", dislike);
      });
      imageData.forEach((file) => {
        submittedData.append("images", file);
      });

      for (const [key, value] of submittedData.entries()) {
        console.log(key, value);
      }

      try {
        const response = await completeYourProfile(
          userId,
          submittedData,
          token
        );
        console.log("Profile submitted:");
        onProfileComplete(true);
      } catch (error) {
        console.error("Error submitting profile:", error.message);
      }
    } else {
      console.log("Form is invalid. Errors:", errors);
    }
  };

  return (
    <div className="px-20">
      <div className="bg-custom-grey">
        <p className="pt-12 font-normal text-5xl text-center text-custom-indigo">
          Complete Your Profile
        </p>

        <form className="grid grid-cols-2 py-10 pl-20" onSubmit={handleSubmit}>
          <div>
            <div className="gap-6 grid grid-cols-2">
              <div>
                <FormFieldTitle title="First Name" />
                <ProfileTextField
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  isRequired={"required"}
                />
                {errors.firstName && (
                  <ErrorMessage message={errors.firstName} />
                )}
              </div>
              <div>
                <FormFieldTitle title="Last Name" />
                <ProfileTextField
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  isRequired={"required"}
                />
                {errors.lastName && <ErrorMessage message={errors.lastName} />}
              </div>
            </div>
            <FormFieldTitle title="Email" />
            <ProfileTextField
              type="email"
              isRequired={"required"}
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              readOnly
            />
            {errors.email && <ErrorMessage message={errors.email} />}

            <FormFieldTitle title="Date of birth" />
            <div className="gap-6 grid grid-cols-3">
              <div>
                <FormFieldTitle title="Day" />
                <ProfileTextField
                  name="day"
                  type="select"
                  options={days}
                  value={formData.day}
                  onChange={handleInputChange}
                  isRequired
                />
              </div>
              <div>
                <FormFieldTitle title="Month" />
                <ProfileTextField
                  name="month"
                  type="select"
                  options={months}
                  value={formData.month}
                  onChange={handleInputChange}
                  isRequired
                />
              </div>
              <div>
                <FormFieldTitle title="Year" />
                <ProfileTextField
                  name="year"
                  type="select"
                  options={years}
                  value={formData.year}
                  onChange={handleInputChange}
                  isRequired
                />
              </div>
            </div>

            <FormFieldTitle title="Gender" />
            <ProfileTextField
              type="gender"
              name="gender"
              selectedGender={selectedGender}
              value={formData.gender}
              onGenderSelect={handleGenderClick}
              isRequired
            />
            {errors.gender && <ErrorMessage message={errors.gender} />}
            <FormFieldTitle title="Sexual Orientation" />
            <ProfileTextField
              name="sexualOrientation"
              type="select"
              options={sexualOrientationOptions}
              value={formData.sexualOrientation}
              onChange={handleInputChange}
              isRequired
            />
            {errors.sexualOrientation && (
              <ErrorMessage message={errors.sexualOrientation} />
            )}
            <FormFieldTitle title="Relationship Status" />
            <ProfileTextField
              name="relationshipStatus"
              type="select"
              options={relationshipStatuses}
              value={formData.relationshipStatus}
              onChange={handleInputChange}
              isRequired
            />
            {errors.relationshipStatus && (
              <ErrorMessage message={errors.relationshipStatus} />
            )}
            <FormFieldTitle title="Interested In" />
            <ProfileTextField
              name="interestedIn"
              type="select"
              options={interestedInOptions}
              value={formData.interestedIn}
              onChange={handleInputChange}
              isRequired
            />
            {errors.interestedIn && (
              <ErrorMessage message={errors.interestedIn} />
            )}

            <div className="ml-10">
              <HorizontalLine />
            </div>

            <FormFieldTitle title="Interests" />
            <ProfileTextField
              type="choices"
              name="interests"
              placeholder="Choose your interests"
              choices={interests}
              selectedChoices={selectedInterests}
              onToggleChoice={handleToggleInterest}
              isRequired="required"
            />
            {errors.interests && <ErrorMessage message={errors.interests} />}

            <FormFieldTitle title="Dislikes" />
            <ProfileTextField
              type="choices"
              name="dislikes"
              placeholder="Choose your dislikes"
              choices={dislikes}
              selectedChoices={selectedDislikes}
              onToggleChoice={handleToggleDislike}
              isRequired="required"
            />
            {errors.dislikes && <ErrorMessage message={errors.dislikes} />}
          </div>

          <div className="flex flex-col mx-auto max-w-full">
            <FormFieldTitle title="Choose Picture" />
            <div className="gap-4 grid grid-cols-2 pt-2 pb-2">
              {[...Array(6)].map((_, index) => (
                <ImageSection key={index} onImageUpload={handleImageUpload} />
              ))}
            </div>
            {errors.images && <ErrorMessage message={errors.images} />}
          </div>

          <div className="flex justify-center pt-3 pb-2">
            <Button type="submit">
              <p className="px-24 py-2">Submit</p>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CompleteProfile;
