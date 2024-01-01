const Save = require('../models/saveModel')

//add post into save post
const addSavePost = async (req, res) => {
    const userid = req.params.id
    console.log('000000000000000', req.body)
    const { postid } = req.body
    try {
        console.log('aaaaaaaaaaaaaaaaaaaaaaa')
        const isExist = await Save.findOne({ postid,userid })
        console.log('1111111111111111111111', isExist)
        if (isExist) {
            return res.json({ success: 0, message: 'post already exists' })
        }
        console.log('2222222222222222')
        const newSavePost = new Save({ userid, ...req.body })
        console.log('3333333333333333333')
        const result = await newSavePost.save()
        console.log('444444444444444444444', result)
        if (!result) {
            return res.json({ success: 0, message: 'error saving post' })
        }
        return res.json({ success: 1, message: ' saving post successfully' })
    } catch (error) {
        res.status(500).json({ success: 0, message: 'Internal server error' });
    }

}

//get all saved posts
const getSavePost =async (req, res) => {
    try {
        const userid =req.params.id
        const savedPosts = await Save.find({ userid: userid})
        if (!savedPosts) {
            return res.json({ success: 0, message: 'no saved posts' })
        }
        return res.json({data:savedPosts, success: 1,message:'retrive data successfully'  })

    } catch (error) {
        
        res.status(500).json({ success: 0, message: 'Internal server error' })
    }
}

// remove post from saved post
const removeSavePost = async (req, res) => {


    try {
        const postid = req.params.id
        const result = await Save.findByIdAndDelete(postid)
        if (!result) {
            return res.json({ success: 0, message: 'error deleting savePost' })
        }
        return res.json({ success: 1, message: 'savePost deleted successfully' })
    } catch (error) {
        res.status(500).json({ success: 0, message: 'Internal server error' })
    }
}


module.exports = { addSavePost, removeSavePost,getSavePost}