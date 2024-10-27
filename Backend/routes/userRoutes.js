const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const imageController = require("../controllers/imageController");

router.post("/api/signup", userController.signup);
router.post("/api/login", userController.login);

router.put(
  "/api/completeProfile/:id",
  imageController.uploadImages,
  userController.completeProfile
);

router.get("/api/getUser/:id", userController.getUser);
router.get("/api/getAllUsers", userController.getAllUsers);

router.get(
  "/api/checkProfileComplete/:id",
  userController.checkProfileComplete
);

module.exports = router;
