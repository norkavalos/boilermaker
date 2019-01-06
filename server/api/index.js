const router = require('express').Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

import User from '../db/models/user';
// // matches GET requests to /api/puppies/
// router.get('/', function(req, res, next) {
//   /* etc */
// });
// // matches POST requests to /api/puppies/
// router.post('/', function(req, res, next) {
//   /* etc */
// });
// // matches PUT requests to /api/puppies/:puppyId
// router.put('/:puppyId', function(req, res, next) {
//   /* etc */
// });
// // matches DELETE requests to /api/puppies/:puppyId
// router.delete('/:puppyId', function(req, res, next) {
//   /* etc */
// });

router.get('/me', (req, res, next) => {
  res.json(req.user);
});


router.post('/signup', (req, res, next) => {
  User.create(req.body)
    .then(user => {
      req.login(user, err => {
        if (err) next(err);
        else res.json(user);
      });
    })
    .catch(next);
});

//google sign in  requests
// collect our google configuration into an object
const googleConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
};

// configure the strategy with our config object, and write the function that passport will invoke after google sends
// us the user's profile and access token
const strategy = new GoogleStrategy(googleConfig, function (token, refreshToken, profile, done) {
  const googleId = profile.id;
  const name = profile.displayName;
  const email = profile.emails[0].value;

  User.findOne({where: { googleId: googleId  }})
    .then(function (user) {
      if (!user) {
        return User.create({ name, email, googleId })
          .then(function (user2) {
            done(null, user2);
          });
      } else {
        done(null, user);
      }
    })
    .catch(done);
});

// register our strategy with passport
passport.use(strategy);
router.get('/auth/google', passport.authenticate('google', { scope: 'email' }));

router.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/login'
}));


router.put('/login', (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) res.status(401).send('User not found');
      else if (!user.hasMatchingPassword(req.body.password)) res.status(401).send('Incorrect password');
      else {
        req.login(user, err => {
          if (err) next(err);
          else res.json(user);
        });
      }
    })
    .catch(next);
});

router.delete('/logout', (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.sendStatus(204);
});

router.use(function(req, res, next) {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

module.exports = router;
