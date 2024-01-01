const router = require('express').Router()
const { getUser,updateUser,deleteUser,followUser,unfollowUser,blockUser,unBlockUser } = require('../controllers/userController')


//update user
//delete user
//get user
//follow user
//unfollow user

//get user 
router.get('/:id', getUser)

//update user
router.put('/:id',updateUser)
//delete user
router.delete('/:id',deleteUser)

//follow user

router.put('/follow/:id',followUser)

//unfollow user
router.put('/unfollow/:id',unfollowUser)


router.put ('/block/:id',blockUser)


router.put ('/unblock/:id',unBlockUser)


module.exports = router