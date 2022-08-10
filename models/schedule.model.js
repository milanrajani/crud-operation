const mongoose = require('mongoose');
const moment = require('moment');

var scheduleSchema = new mongoose.Schema({
    
    task: {
        type: String
    },
    title: {
        type: String
    },
    date: {
        type: String
    },
    created_at: {
        type: Date
    },
    



    
});
// time.lastActiveAt
 

scheduleSchema.pre('save', function (next) {
    now = new Date();
    this.updated_at = now;
    if (!this.created_at) {
        this.created_at = now;
    }
    next()
})




const Schedule = mongoose.model('Schedule', scheduleSchema);
module.exports = Schedule