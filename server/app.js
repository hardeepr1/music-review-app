const express = require('express');
const bodyParser = require('body-parser');
// const passport = require('passport');
// const authMiddleWare = require('./authmiddleware');
const cookieParser = require('cookie-parser');
// const session = require('express-session');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

const cors = require('cors');

const User = require('./models/User');

const url = 'mongodb://localhost:27017/musicReviewApp';
mongoose.connect(url);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extensed: false }));
app.use(cookieParser());
// app.use(session({ secret: 'library' }));

require('./config/passport.js')(app);

const songRouter = require('./routes/songRouter')();
const authRouter = require('./routes/authRoutes')(User);
const reviewRouter = require('./routes/reviewRouter')();
const playListRouter = require('./routes/playlistRouter')();

// for time being may be
// const adminRouter = require('./routes/adminRoutes')();

// all the methods with secure should be
// app.use('/api/secure', authMiddleWare.checkAuthentication);

app.use('/api', [songRouter, reviewRouter, playListRouter]);
app.use('/api/auth', authRouter);

// for time being may be
// app.use('/api/admin', adminRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my API');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
