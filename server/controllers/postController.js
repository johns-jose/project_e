const Post = require("../models/postModel");
const User = require("../models/userModel");
const deleteFile = require("../helper/deleteFile");
// add post
// update post
// delete post
// get timeline posts
//get user posts

//add post
const addPost = async (req, res) => {
  console.log("22222222222req.file", req.files);
  console.log("22222222222  req.body.description", req.body.description);
  const { description } = req.body;
  const userid = req.params.id;
  const resultImages = req.files.map((file) => file.filename);
  console.log("qqqqqqqqqqqqqqq resultImages", resultImages);

  try {
    const newPost = new Post({
      userid,
      ...req.body,
      images: resultImages,
    });
    const result = await newPost.save();
    if (!result) {
      res.json({ success: 0, message: "error adding post" });
    }
    res.json({ success: 1, message: "post added succussfully " });
  } catch (error) {
    res.status(500).json({ success: 0, message: "Internal server error" });
  }
};

//delete post

const deletePost = async (req, res) => {
  const postid = req.params.id;
  try {
    await Post.findById(postid).then((post) => {
      // console.log("delete post", post.images);
      deleteFile(post.images);
    });
    const result = await Post.findByIdAndDelete(postid);
    if (!result) {
      return res.json({ success: 0, message: "error deleting post" });
    }
    return res.json({ success: 1, message: "post deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: 0, message: "Internal server error" });
  }
};

//update post

const updatePost = async (req, res) => {
  const postid = req.params.id;
  const { description } = req.body;
  try {
    const result = await Post.findByIdAndUpdate(postid, {
      $set: { description: description },
    });
    if (!result) {
      return res.json({ success: 0, message: "error updating post" });
    }
    return res
      .status(200)
      .json({ success: 1, message: "updation complete successfully" });
  } catch (error) {
    res.status(500).json({ success: 0, message: "Internal server error" });
  }
};
// updatelike
const updateLike = async (req, res) => {
  // console.log('req-params-id', req.params.id);
  // console.log('req.body', req.body);

  try {
    const postid = req.params.id;
    const { userid } = req.body;
    const post = await Post.findById(postid);
    if (!post) {
      res.json({ success: 0, message: "post not found" });
    }
    if (post.likes.includes(userid)) {
      // If like is present, remove it
      const result = await post.updateOne({ $pull: { likes: userid } });
      if (!result) {
        return res.json({ success: 0, message: "error removing like" });
      }
      return res.json({ success: 1, message: "like removed succussfully" });
    } else {
      // If like is not present, add it
      const result = await post.updateOne({ $push: { likes: userid } });
      if (!result) {
        return res.json({ success: 0, message: "error adding like" });
      }
      return res.json({ success: 1, message: "like added succussfully" });
    }
  } catch (error) {
    res.status(500).json({ success: 0, message: "Internal server error" });
  }
};

//get timeline posts

const timelinePosts = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    // console.log("user", user);

    if (!user) {
      return res.json({ success: 0, message: "User not found" });
    }

    const currentUserid = user._id;
    const userposts = await Post.find({
      userid: currentUserid.toString(),
    }).populate("userid");
    // console.log('userposts',userposts);

    const friendsPosts = await Post.find({
      userid: { $in: user.followings },
    }).populate("userid");
    const formattedFriendsPost = friendsPosts.filter((post) => {
      if (post.report.length > 0) {
        post.report.some((report) => report.userid == currentUserid);
      } else {
        return post;
      }
    });
    // console.log('friends post', friendsPosts)
    // console.log('formatted post', formattedFriendsPost);

    const postResult = userposts.concat(formattedFriendsPost);
    const sortedResults = postResult.sort((a, b) => b.createdAt - a.createdAt);
    // console.log('post result', postResult);

    // const postResult = userposts.concat(friendsPosts);
    // if (!postResult.length) {
    //     return res.json({ success: 0, message: 'No posts found' });
    // }

    // const blockedPosts = await Promise.all(postResult.map(async(post) => {
    //     if (post.report.length >0) {
    //         const isBlocked = post.report.some((item) => item.userid === currentUserid.toString());
    //         post.reportStatus = isBlocked;
    //     } else {
    //         post.reportStatus = false;
    //     }
    //     return post;
    // }));
    // console.log('blocked posts', blockedPosts);

    // Filter out posts with blockStatus false
    // const filteredPosts = blockedPosts.filter(post => !post.reportStatus);

    // if (!filteredPosts.length) {
    //     return res.json({ success: 0, message: 'No posts found' });
    // }
    // return res.status(200).json({
    //     data: filteredPosts,
    //     success: 1,
    //     message: 'Fetching posts successfully',
    // });
    if (!sortedResults) {
      return res.json({ success: 0, message: "No posts found" });
    }

    return res.status(200).json({
      data: sortedResults,
      success: 1,
      message: "Fetching posts successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: 0,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//report post

const reportPost = async (req, res) => {
  const { userid, reportid } = req.body;
  try {
    const postid = req.params.id;
    console.log("userid:", userid);
    console.log("postid:", postid);
    const post = await Post.findById(postid);
    if (!post) {
      return res.json({ success: 0, message: "post not found" });
    }
    if (!post.report.includes(userid)) {
      const reportResult = await Post.findByIdAndUpdate(postid, {
        $push: { report: req.body },
      });
      if (!reportResult) {
        return res.json({ success: 0, message: "error report post" });
      }
      return res.json({ success: 1, message: "post report succussfully" });
    }
    return res.json({ success: 0, message: "post already report" });
  } catch (error) {
    res.status(500).json({ success: 0, message: "Internal server error" });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log("getUserProfile", userId);
    const user = await User.findById(userId);
    console.log("getUserProfile", user);

    if (!user) {
      return res.json({ success: 0, message: "User not found" });
    }

    // const currentUserid = user._id;
    const userposts = await Post.find({ userid: user._id }).populate("userid");
    const sortedResults = userposts.sort((a, b) => b.createdAt - a.createdAt);

    const friendsPosts = await Post.find({ userid: { $in: user.followings } });

    // const postResult = userposts.concat(friendsPosts);

    const blockedPosts = await Promise.all(
      friendsPosts.map(async (post) => {
        if (post.report.length > 0) {
          const isBlocked = post.report.some(
            (block) => block.userid === currentUserid.toString()
          );
          post.reportStatus = isBlocked;
        } else {
          post.reportStatus = false;
        }
        return post;
      })
    );

    // if (!postResult) {
    //     return res.json({ success: 0, message: 'No posts found' });
    // }

    // Filter out posts with blockStatus false
    const filteredPosts = blockedPosts.filter((post) => post.reportStatus);

    if (!sortedResults.length) {
      return res.json({ success: 0, message: "No posts found" });
    }

    return res.status(200).json({
      data: userposts,
      success: 1,
      message: "Fetching posts successfully",
      reportdata: filteredPosts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: 0, message: "Internal server error" });
  }
};

module.exports = {
  addPost,
  deletePost,
  updatePost,
  updateLike,
  timelinePosts,
  reportPost,
  getUserProfile,
};
