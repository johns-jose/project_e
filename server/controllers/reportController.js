const Report = require('../models/reportModel')


const createReport = async (req, res) => {

    try {
        const newReport = new Report(req.body)
       const result = await newReport.save()
       if(!result){
        return res.json({success:0, message:'error saving report'})
       }
       return res.json({ success: 1, message:'report created succussfully' })
    } catch (error) {
        res.status(500).json({ success: 0, message: 'Internal server error' });
    }
}

const getReport =async (req, res) => {
    try {

        const report = await Report.find({}).limit(5)
        if(!report){
            return res.json({success:0, message:'report not found'})
        }
        return res.json({ success: 1, message:'report found succussfully', report})

        
    } catch (error) {
        res.status(500).json({ success: 0, message: 'Internal server error' });
        
    }

}


module.exports = {createReport,getReport}