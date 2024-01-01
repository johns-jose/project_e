const router = require("express").Router();
const { AccessChat, allChat } = require("../controllers/chatController");

router.post("/:id", AccessChat);
router.get("/", allChat);

module.exports = router;
