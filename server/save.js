const router = require('express').Router();
const {addSavePost} = require('./controllers/saveController')



router.post('/',addSavePost)


module.exports = router