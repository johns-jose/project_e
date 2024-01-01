const router = require("express").Router();
const { addMessage, getMessage } = require("../controllers/messageController");

router.post("/:id", addMessage);
router.get("/:id", getMessage);

module.exports = router;
