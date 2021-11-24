const passport=require('passport');
const jWTStrategy=require('passport-jwt').Strategy;
const ExtractJWT=require('passport-jwt').ExtractJwt;

const User=require('../model/user');

let opts={
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey:'vumonicDatalabs'
}

passport.use(new jWTStrategy(opts,function(jwt_payload,done){
    User.findById(jwt_payload._id,function(err,user){
        if(err){
            console.log("Error in finding user from JWT:",err);
        }
        if(doctor){
           return done(null,doctor);
        }else{
            return done(null,false);
        }
    });
}));

module.exports=passport;