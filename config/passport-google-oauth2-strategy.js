const passport= require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User= require('../models/users');



passport.use(new googleStrategy({


    clientID:"841412851035-o0ogpvrtg143hka63kraquour8n5p03l.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:"http://localhost:8000/users/auth/google/callback"
    },
    function(accessToken,refreshToken,profile,done){
        User.findOne({email: profile.emails[0].value}).exec(function(err,user){
            if(err){console.log('error in google strategy-passport',err); return;}

            console.log(profile);
            if(user){
                return done(null, user);
            }else{
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                },function(err,user){
                    if(err){console.log('error in creating user google strategy-passport', err);return;}
                    return done(null,user);
                });

            }
        });
    }
))