
var mongoose = require( 'mongoose' );
var Task    = mongoose.model( 'Task' );

Date.prototype.toDateInputValue = (function() {
    var datenow = new Date(this);

    // reformate to get local date :)
    datenow.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return datenow.toJSON().slice(0,10);
});

module.exports = {

   create: function(req,res,next){

    var deadline = new Date(req.body.deadline);


    new Task({
        title      : req.body.title,
        content    : req.body.content,
        year       : req.body.year,
        month      : req.body.month,
        day        : req.body.day,
        hour       : req.body.hour,
        minute     : req.body.minute,
        user_id    : req.session.userid,
        state      : req.body.state,
        updated_at : new Date().toDateInputValue()
    }).save( function( err, task, count ){
        res.redirect( '/todolist' );
    });
   },

   modify: function(req,res,next) {
    
    Task.findById( req.params.id, function ( err, task ){
        var datenow = new Date().toDateInputValue();

        res.render( 'edit', {
            task     : task,
            datenow  : datenow,
            selected : task.state,
            states : ['Pending', 'Started', 'Finished']
        });
    });
   },

   delete: function(req, res, next) {

    Task.findById( req.params.id, function ( err, task ){
        task.remove( function ( err, task ){
            res.redirect( '/todolist' );
        });
    });
   },

   update: function(req, res, next) {
    Task.findById( req.params.id, function ( err, task ){
        task.content    = req.body.content;
        task.title      = req.body.title;
        task.state      = req.body.state;
        task.year       = req.body.year;
        task.month      = req.body.month;
        task.day        = req.body.day;
        task.hour       = req.body.hour;
        task.minute     = req.body.minute;

        task.updated_at = Date.now();

        task.save( function ( err, task, count ){
            res.redirect( '/todolist' );
        });
    });
   },

   display: function(req,res,next) {
        Task.find( function ( err, tasks){
            var datenow = new Date().toDateInputValue();
            res.render( 'todolist', {
                title   : 'Add New !',
                tasks   : tasks,
                user_id : req.session.userid,
                datenow : datenow
            });
        });
   }
}