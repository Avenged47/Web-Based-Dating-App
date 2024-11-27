const cron = require("node-cron");
const User = require("../models/UserSchema");
const Match = require("../models/MatchSchema");
const Message = require("../models/MessageSchema");

const deleteInactiveUsers = async () => {
  const tenDaysAgo = new Date();
  tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

  try {
    // Find inactive users who haven't logged in for 10 days
    const inactiveUsers = await User.find({
      lastLogin: { $lt: tenDaysAgo },
    });
    console.log("Inactive users:", inactiveUsers);

    const result = await User.deleteMany({ lastLogin: { $lt: tenDaysAgo } });
    console.log(`Cron Job: Deleted ${result.deletedCount} inactive users.`);

    const deletedUserIds = inactiveUsers.map((user) => user._id);

    const matchResult = await Match.deleteMany({
      user1: { $in: deletedUserIds },
    });
    console.log(
      `Deleted ${matchResult.deletedCount} matches related to inactive users.`
    );

    const messageResult = await Message.deleteMany({
      $or: [
        { sender: { $in: deletedUserIds } },
        { receiver: { $in: deletedUserIds } },
      ],
    });
    console.log(
      `Deleted ${messageResult.deletedCount} messages related to inactive users.`
    );
  } catch (error) {
    console.error(
      "Cron Job Error: Failed to delete inactive users and related data.",
      error
    );
  }
};

const scheduleInactiveUserDeletion = () => {
  cron.schedule("0 0 * * *", () => {
    console.log(
      "Running cron job to delete users who haven't logged in for 10 days and their related data..."
    );
    deleteInactiveUsers();
  });
};

module.exports = scheduleInactiveUserDeletion;
