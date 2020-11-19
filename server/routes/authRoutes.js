const express = require('express');
const passport = require('passport');

const debug = require('debug')('app:authRoutes');

const authRouter = express.Router();
// todo: //for time being on authentication we are just returning token
function router(User) {
  authRouter.route('/signUp').post(async (req, res) => {
    let user = await User.findOne({ userName: req.body.userName });

    if (user) {
      return res
        .status(400)
        .json({ message: 'This username is already taken' });
    }

    user = new User(req.body);

    user.save((err) => {
      if (err) {
        debug(err);
      }
      const token = user.generateJWTToken();

      // for time being we are just sending the token only after registering the user
      // we can send other some other as required things also question is why some other things are required will have to do some study
      // what other things and why.
      res.status(200).send({ auth: true, token: token });
    });
  });

  authRouter
    .route('/profile')
    .all((req, res, next) => {
      if (req.user) {
        next();
      } else {
        res.redirect('/');
      }
    })
    .get((req, res) => {
      res.json(req.user);
    });
  authRouter.route('/signUp').get((req, res) => {
    res.send('here in signup');
  });

  authRouter.route('/signin').get((req, res) => {
    const { user } = req.body;
  });

  authRouter.route('/signin').post((req, res, next) => {
    passport.authenticate(
      'local',
      { session: false },
      (err, passportUser, info) => {
        if (err) {
          return next(err);
        }

        if (passportUser) {
          const user = new User(passportUser);

          const token = user.generateJWTToken();

          const responseObject = {
            userName: user.userName,
            token: token,
          };
          return res.json(responseObject);
        }
        return res.status(400).send(info);
      }
    )(req, res, next);
  });
  return authRouter;
}

module.exports = router;
