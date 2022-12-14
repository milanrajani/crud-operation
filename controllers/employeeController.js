const express = require('express');
var router = express.Router();
// const mongoose = require('mongoose');
// const employee = mongoose.model('Employee');
const employee = require('../models/employee.model')
router.get('/',(req,res)=>{
    res.render('employee/addOrEdit',{
        viewTitle:"Insert Task"
    })
}) 

router.post('/schedule',(req,res)=>{
     console.log('heysss');
})


router.post('/',(req,res)=>{
    if(req.body._id == '')
    insertRecord(req, res);
    else
    updateRecord(req,res)
}) 



function insertRecord(req, res) {
    var e = new employee();
    e.time = req.body.time;
    e.task = req.body.task;
    e.title = req.body.title;
    e.date = req.body.date;
    e.created_at = req.body.created_at;
    
    
    e.save((err, doc) => {
        if (!err)
            res.redirect('employee/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: "Add Task",
                    employee: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
                
        }
    });
}


function updateRecord(req, res) {
    employee.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        
        if (!err) { res.redirect('employee/list');
      }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: 'Update Task',
                    employee: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}





router.get('/list', (req, res) => {
    employee.find((err, docs) => {
        if (!err) {
            res.render("employee/list", {
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
    employee.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("employee/addOrEdit", {
                viewTitle: "Update Task",
                employee: doc
            });
        }
    });
});


router.get('/delete/:id', (req, res) => {
    employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/employee/list');
            console.log('milan');
        }
        else { console.log('Error in employee delete :' + err); }
    });
});



module.exports = router