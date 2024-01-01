const router = require("express").Router();
const multer = require("../helper/multer");

// const upload = multer({ dest: "uploads" });

const {
  addPost,
  deletePost,
  updatePost,
  timelinePosts,
  updateLike,
  reportPost,
  getUserProfile,
} = require("../controllers/postController");

router.post("/:id", multer.array("files"), addPost);
router.delete("/:id", deletePost);
router.put("/:id", updatePost);
router.put("/updatelike/:id", updateLike);
router.get("/timeline/:id", timelinePosts);
router.get("/profile/:id", getUserProfile);
router.put("/report/:id", reportPost);

module.exports = router;
