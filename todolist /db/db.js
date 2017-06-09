var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;
 
var Task = new Schema({
    user_id    : String,
    title      : String,
    content    : String,
    
    day        : Number,
    month      : Number,
    year       : Number,
    hour       : Number,
    minute     : Number,
    
    state      : String,
    updated_at : Date
});

var User = new Schema({
    name          : String,
    username      : String,
    password      : String,
    email         : String,
    register_date : Date
});
 
mongoose.model('User', User);
mongoose.model( 'Task', Task );
mongoose.connect( 'mongodb://localhost/todolist' );