const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const session = require('express-session');
const connectDB = require('./config/db');
const req = require('express/lib/request');
const passport = require('passport');



// config
dotenv.config({ path: './config/config.env' });

connectDB();

const app = express();

// import passport from config
require('./config/passport')(passport);

// body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// handlebars
app.engine('.hbs', exphbs.engine({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

// sessions
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  }));

// passport
app.use(passport.initialize());
app.use(passport.session());

// static folder 
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))
app.use('/', require('./routes/assignments'))

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));