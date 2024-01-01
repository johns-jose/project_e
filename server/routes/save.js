const router = require('express').Router();
const {addSavePost,removeSavePost,getSavePost} = require('../controllers/saveController')



router.get('/:id', getSavePost);
router.post('/:id',addSavePost)
router.delete('/:id',removeSavePost)

module.exports = router