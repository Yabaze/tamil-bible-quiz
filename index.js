let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let indexRouter = require('./routes/basic');

let app = express();
let mongoose = require("mongoose");

require("dotenv")
    .config();

//Connect to database
try {
    mongoose.connect(process.env.MONGO_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    console.log("connected to db");
} catch (error) {
    handleError(error);
}
process.on('unhandledRejection', error => {
    console.log('unhandledRejection', error.message);
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use(express.urlencoded({
    extended: true
}));

// setup server to listen on port 8080
app.listen(process.env.PORT || 8080, () => {
    console.log("Server is live on port 8080");
})

module.exports = app;
