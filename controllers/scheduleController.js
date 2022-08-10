const express = require('express');
var router = express.Router();
const schedule = require('../models/schedule.model')
router.get('/',(req,res)=>{
    res.render('employee/add',{
        viewTitle:"Schedule Task"
    })
}) 
 
 
router.post('/',(req,res)=>{
    if(req.body._id == '')
    insertRecord(req, res);
    else
    updateRecord(req,res)
}) 



function insertRecord(req, res) {
    
    var e = new schedule();
    e.task = req.body.task;
    e.title = req.body.title;
    e.date = req.body.date;
    e.created_at = req.body.created_at;
    e.save((err, doc) => {
        if (!err)
            res.redirect('employee/liste');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/add", {
                    viewTitle: "schedule Task",
                    schedule: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
                
        }
    });
}


function updateRecord(req, res) {
    schedule.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        
        if (!err) { res.redirect('employee/liste');
      }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/add", {
                    viewTitle: 'Update Task',
                    schedule: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}





router.get('/liste', (req, res) => {
    schedule.find((err, docs) => {
        if (!err) {
            res.render("employee/liste", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving employee list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}


router.get('/:id', (req, res) => {
    schedule.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("employee/add", {
                viewTitle: "Update Scheduled Task",
                schedule: doc
            });
        }
    });
});


router.get('/delete/:id', (req, res) => {
    schedule.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/employee/liste');
            console.log('milan');
        }
        else { console.log('Error in employee delete :' + err); }
    });
});



module.exports = router