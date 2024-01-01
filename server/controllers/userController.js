const User = require('../models/userModel')
const bcrypt = require('bcrypt')
//fetch user information
const getUser = async (req, res) => {
    const userId = req.params.id
    try {
        const user = await User.findById(userId)
        if (!user) {
            res.json({ success: 0, message: 'user not found' })
        } else {
            const userinfo = { ...user._doc, password: undefined }
            res.status(200).json(userinfo)
        }

    } catch (error) {
        res.status(500).json({ success: 0, message: 'Internal server error' });
    }
}

//delete user information

const deleteUser = (req, res) => {
    const userid = req.params.id
    try {
        const deleteResult = User.findByIdAndDelete(userid)
        if (!deleteResult) {
            res.json({ success: 0, message: 'error deleting user' })
        }
        res.json({ success: 1, message: 'user deleted succussfully' })
    } catch (error) {
        res.status(500).json({ success: 0, message: 'Internal server error' });

    }

}

// update user

const updateUser = (req, res) => {
    const userid = req.params.id
    try {
        const password = bcrypt.hash(req.body.password, 10)
        const newData = { ...req.body._doc, password: password }
        const updationResult = User.findByIdAndUpdate(userid, { $set: newData });
        if (!updationResult) {
            res.json({ success: 0, message: 'error updating user' })
        }
        res.json({ success: 1, message: 'user updated succussfully' })
    } catch (error) {
        res.status(500).json({ success: 0, message: 'Internal server error' });

    }

}

//follow user

const followUser = async (req, res) => {
    const currentUserid = req.params.id
    try {

        const user = await User.findById(currentUserid)
        if (!user) {
            res.json({ success: 0, message: 'user not found' })
        }
        if (!user.followings.includes(req.body.userid)) {
            await User.findByIdAndUpdate(currentUserid, { $push: { followings: req.body.userid } })
            await User.findByIdAndUpdate(req.body.userid, { $push: { followers: currentUserid } })
            res.json({ success: 1, message: 'user followed succussfully' })
        }
        res.json({ success: 0, message: 'error following user' })

    } catch (error) {
        res.status(500).json({ success: 0, message: 'Internal server error' });

    }

}

//unfollow user

const unfollowUser = async (req, res) => {
    const currentUserid = req.params.id
    try {

        const user = await User.findById(currentUserid)
        if (!user) {
            res.json({ success: 0, message: 'user not found' })
        }
        if (!user.followings.includes(req.body.userid)) {
            res.json({ success: 0, message: 'user not following' })
        }
        await User.findByIdAndUpdate(currentUserid, { $pull: { followings: req.body.userid } })
        await User.findByIdAndUpdate(req.body.userid, { $pull: { followers: currentUserid } })
        res.json({ success: 1, message: 'user unfollow succussfully' })
    } catch (error) {
        res.status(500).json({ success: 0, message: 'Internal server error' });

    }
}

const blockUser = async(req, res) => {
    const currentUserid = req.params.id
    try {   
       const result =  await User.findByIdAndUpdate(currentUserid,{$set:{block:true}})
       if(!result) {
         return res.json({ success: 0, message: 'error blocking user' })
       }
       return res.json({ success: 1, message: 'user blocked succussfully' })
   
    }catch(err) {
        res.status(500).json({ success: 0, message: 'Internal server error' ,error:err.message});
    }

}


const unBlockUser =async (req, res) => {
    const currentUserid = req.params.id
    try {   
       const result =  await User.findByIdAndUpdate(currentUserid,{$set:{block:false}})
       if(!result) {
         return res.json({ success: 0, message: 'error unblocking user' })
       }
       return res.json({ success: 1, message: 'user unblocked succussfully' })
   
    }catch(err) {
        res.status(500).json({ success: 0, message: 'Internal server error' ,error:err.message});
    }
}




module.exports = { getUser, deleteUser, updateUser, followUser,unfollowUser,blockUser,unBlockUser}