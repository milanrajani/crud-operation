const mongoose = require('mongoose');
const moment = require('moment');

var employeeSchema = new mongoose.Schema({
    // fullName: {
    //     type: String,
    //     required: 'This field is required.'
    // },
    // email: {
    //     type: String
    // },
    // mobile: {
    //     type: String
    // },
    // city: {
    //     type: String
    // },
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
    updated_at: {
        type: Date
    }



    // time : { type: String, default: moment(((Math.round((new Date()))))).format('YYYY-MM-DD') } ,
    // time:{ lastActiveAt: moment.utc('2002-12-09')}
    // time:{ type: String, default:new Date}
    // time : { ((Math.round((new Date()).getTime() / 1000))-300)} 

});
// time.lastActiveAt
// employeeSchema.lastActiveAt instanceof Date

// Custom validation for email
// employeeSchema.path('email').validate((val) => {
//     emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return emailRegex.test(val);
// }, 'Invalid e-mail.');

employeeSchema.pre('save', function (next) {
    now = new Date();
    this.updated_at = now;
    if (!this.created_at) {
        this.created_at = now;
    }
    next()
})




const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee