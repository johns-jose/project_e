
const Post = require('../models/postModel')
const User = require('../models/userModel')
const Comment = require('../models/commentModel')




// add comment
const addComment = async (req, res) => {
    const userid = req.params.id;
    try {
        console.log('333333333333333', userid);
        const newComment = new Comment({ userid, ...req.body })
        const result = await newComment.save();
        if (!result) {
            return res.json({ success: 0, message: 'error adding comment' })
        }
        return res.json({ success: 1, message: 'comment added succussfully ' })

    } catch (error) {
        console.log('error:', error)
    }
}

// // get all comments
const getAllComments = async (req, res) => {
    try {
        const postid = req.params.id;

        const PrimaryComments = await Comment.find({ postid: postid, parentid: '' });
        const CommentsResult = await Promise.all(PrimaryComments.map(async (comment) => {
            try {
                const replycomments = await Comment.find({ parentid: comment._id });
                const formattedComment = {
                    ...comment._doc,
                    replycomments: replycomments || []
                };

                return formattedComment;
            } catch (error) {
                console.error('Error in processing comment:', error);
                throw error;
            }
        }));

        return res.json({ success: 1, data: CommentsResult, message: 'comments retrieved successfully' });
    } catch (error) {
        console.log('error:', error);
        res.status(500).json({ success: 0, message: 'Internal server error' });
    }
};




// update comment

const updateComment = async (req, res) => {

    try {
        const commentid = req.params.id;
        const isExist = await Comment.findOne({ id: commentid })
        console.log("log of comment is exist:", isExist);
        if (!isExist) {
            console.log('testtttt1111111111');
           return res.json({ success: 0, message: 'comment not found' })
          
        }
        console.log('testtttt22222222222222222222');
        const updateResult = await Comment.findByIdAndUpdate(commentid, { $set: req.body })

        if (!updateResult) {
            res.json({ success: 0, message: 'error updating comment' })
        }
        return res.json({ success: 1, message: 'comment updated succussfully ' })

    } catch (error) {
        console.log('error:', error)
    }
}

// delete comment
const deleteComment = async (req, res) => {
    try {
        const commentid = req.params.id;
        console.log('deleting commentid',commentid);
        const isExist = await Comment.findById( commentid)
        console.log('deleting comment',isExist);
        if (!isExist) {
            return res.json({ success: 0, message: 'comment not found' })
        }
        const deleteResult = await Comment.findByIdAndDelete(commentid)
        console.log('deleting result------',deleteResult);
        if (!deleteResult) {
            return res.json({ success: 0, message: 'error deleting comment' })
        }
        res.json({ success: 1, message: 'comment deleted succussfully' })
    } catch (e) {
        return console.log('error:', e)
    }
}


// //add post
// const addPost = async (req, res) => {

//     const { description, images, } = req.body
//     const userid = req.params.id
//     console.log('userid-----------', userid)
//     console.log('images-----------', images)

//     try {

//         console.log('newpost-------------111111')
//         const newPost = new Post({ userid, ...req.body })
//         console.log('newpost-------------222222',)
//         await newPost.save()

//         res.json({ success: 1, message: 'post added succussfully ' })

//     } catch (error) {
//         res.json(error)

//     }
// }

// //delete post

// const deletePost = async (req, res) => {
//     try {
//         await Post.findByIdAndDelete(req.params.id)
//         res.json({ success: 1, message: 'post deleted successfully' })
//     } catch (error) {
//         res.json(error)
//     }
// }

// //update post

// const updatePost = async (req, res) => {
//     console.log('req-params-id', req.params.id)
//     console.log('req.body', req.body)
//     try {
//         await Post.findByIdAndUpdate(req.params.id, { $set: req.body })
//         res.status(200).json({ success: 1, message: 'updation complete successfully' })
//     } catch (error) {
//         res.status(500).json(error)

//     }

// }
// // updatelike
// const updateLike = async (req, res) => {
//     console.log('req-params-id', req.params.id);
//     console.log('req.body', req.body);

//     try {
//         const post = await Post.findById(req.params.id);
//         console.log('ppppppp-----------', post);

//         if (post.likes.includes(req.body.userid)) {
//             // If like is present, remove it
//             await post.updateOne({ $pull: { likes: req.body.userid } });
//         } else {
//             // If like is not present, add it
//             await post.updateOne({ $push: { likes: req.body.userid } });
//         }

//         // Fetch the updated post after the modification
//         const updatedPost = await Post.findById(req.params.id);
//         res.json(updatedPost);
//     } catch (error) {
//         res.json(error);
//     }
// };


// //get timeline posts

// const timelinePosts = async (req, res) => {
//     try {
//         // console.log(req.params.id)
//         const user = await User.findById(req.params.id)
//         // console.log('user-------------',user._id)
//         const userposts = await Post.find({ userid: user._id })
//         // console.log('user-------------',userposts)
//         res.status(200).json(userposts)
//     } catch (error) {
//         res.status(500).json(error)
//     }

// }




module.exports = { addComment, updateComment, deleteComment, getAllComments }