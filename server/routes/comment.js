const router  = require('express').Router()
const { addComment, getAllComments, updateComment, deleteComment } = require('../controllers/commentController')


router.post('/addComment/:id',addComment)
router.get('/getComments/:id',getAllComments)
router.put('/updateComment/:id',updateComment)
router.delete('/deleteComment/:id',deleteComment)

module.exports = router