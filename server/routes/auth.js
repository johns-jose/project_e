const router = require('express').Router()


const {addUser,postLogin} = require('../controllers/authController')

router.get('/',(req,res)=>{
    res.send(' it is a auth route')

})

router.post('/register',addUser)
router.post('/login',postLogin)


module.exports = router