const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const keys = require('../config/keys')

const User = mongoose.model('users')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user)
  })
})

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleclientsecret,
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          done(null, existingUser)
        } else {
          new User({ googleId: profile.id })
            .save()
            .then(user => done(null, user))
        }
      })
    },
  ),
)

/*Lexicomp email - email Jerome
CrashPlan email Jerome for credit card
Backup server in Brixton
Sample data from IMS - which of the data do we need can they provide and if not how

PLDT wishlist*/
