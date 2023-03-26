const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.route("/").get(protect, getAllUsers);

export{}
module.exports = router;
