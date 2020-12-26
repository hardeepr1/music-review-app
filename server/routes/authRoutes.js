const express = require('express');
const passport = require('passport');

const debug = require('debug')('app:authRoutes');

const authRouter = express.Router();
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

      res.status(200).send({ auth: true, token });
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
            token,
            isAdmin: user.isAdmin,
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
