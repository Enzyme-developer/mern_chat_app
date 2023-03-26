const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware') 
const { fetchAllMessages, sendMessage } = require('../controllers/messageController')

router.route("/:chatId").get(protect, fetchAllMessages);
router.route("/").post(protect, sendMessage);

module.exports = router;