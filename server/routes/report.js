const { createReport,getReport } = require('../controllers/reportController');
const router = require('express').Router();




router.post('/',createReport)

router.get('/',getReport)




module.exports = router