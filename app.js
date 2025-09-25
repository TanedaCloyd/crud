var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var employees = require('./routes/employees'); 

const bodyParser = require('body-parser')
const dbName = "node_crud_db"; 

var app = express();
var mongoose = require('mongoose');



require('./models/Employee'); 


const uri = "mongodb://127.0.0.1:27017/" + dbName;
const PORT = 8000;


// Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/employees', employees);


// 404's
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
async function connectAndStartServer() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });

  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
}

connectAndStartServer();