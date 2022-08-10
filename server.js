require('./models/db');

const employeeController = require('./controllers/employeeController')
const scheduleController = require('./controllers/scheduleController')
const path = require('path')
const exphbs = require('express-handlebars')
const bodyparser = require('body-parser')
const Handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')


const express = require('express');

var app = express();

app.use(bodyparser.urlencoded({
    extended:true
}))
app.use(bodyparser.json())

app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs.engine({ extname: 'hbs', defaultLayout: 'mainLayout', handlebars: allowInsecurePrototypeAccess(Handlebars), layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');

 
 

app.listen(8000, () => {
    console.log('App is running');
});

app.use('/employee',employeeController) 
app.use('/schedule',scheduleController) 