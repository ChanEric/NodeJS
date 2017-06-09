
var mongoose = require( 'mongoose' );
var User     = mongoose.model( 'User' );
var bcrypt = require('bcryptjs');

module.exports = {

    register: function(req,res,next){  

        User.findOne({ username: req.body.username }, function (err, user){
            if(!user){
                var salt = bcrypt.genSaltSync(10);
                var hPassword = bcrypt.hashSync(req.body.password, salt);

                new User({
                name        : req.body.name,
                username    : req.body.username,
                password    : hPassword,
                email       : req.body.email,
                register_date : Date.now()
                }).save( function(){
                    res.redirect( '/' );
                });
            }
            else{
                res.render( 'register', {
                        error : 'ERROR : This username allready exist !',
                });
            }

            
        });
    },

    connect: function(req,res,next){
        var mUsername = req.body.username;
        var mPassword = req.body.password;

        User.findOne({ username: mUsername }, function (err, user){
            if(err){
                res.render( 'login', {
                        error : 'ERROR : ' + err,
                    });
            }
            else if(user){
                if(bcrypt.compareSync(mPassword, user.password))
                {
                    req.session.userid = user._id;
                    req.session.username = user.username;
                    req.session.useremail = user.email;
                    res.redirect( '/todolist' );
                }
                else{
                    res.render( 'login', {
                        error : 'ERROR : Wrong password !',
                    });
                }

            }else{
                res.render( 'login', {
                        error : 'ERROR : Wrong username !',
                });
            }
        }); 
        
    },

    logout: function(req,res,next){
        req.session.destroy(function(err){
            res.redirect('/');
        });
          
    },

}