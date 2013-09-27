var express = require('express') 
    , app = express() 
    , http = require('http')
    , server = require('http').createServer(app) 
    , io = require('socket.io').listen(server) 
    , mongoose = require('mongoose')
    ;

var Schema = mongoose.Schema;
var mongoose = require('mongoose');

var userSchema = new Schema({
    username:           { type: String, required: true, unique: true },
    email:              { type: String, required: true },
    password:           { type: String, required: true },
});
var User = mongoose.model('User', userSchema);

var categorySchema = new Schema({
    name:               String,
    slug:               String,
    image:              String,
    bgImage:            String,
    description:        String,
    active:             Boolean,
    position:           Number,
    require_logged_in:  Boolean,
    restricted_access:  Boolean,
    meta: {
        forums:         Number,
        topics:         Number,
        messages:       Number,
        recent_topic:   [{
            topic_id: { type: Schema.ObjectId, },
            topic_title: String,
            topic_last_user_id: { type: Schema.ObjectId, },
            topic_last_username: { type: String, },
            topic_creator_id: { type: Schema.ObjectId, },
            topic_creator_username: { type: String, }
        }]
    }
});
var Category = mongoose.model('Category', categorySchema);

mongoose.connect('mongodb://localhost/brisk');

app.configure(function() { 
    app.use(express.static(__dirname + '/public'));
    app.set('views', __dirname + '/views');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
    app.set('views', __dirname + '/views');
    app.engine('html', require('ejs').renderFile); 
});


app.get('/api/categories', function(request, response) { 
    categories = Category.find(function(err, results) { 
        response.send(results);
    });
});

app.get('/*', function(request, response) { 
    categories = Category.find(function(err, results) { return results; });
    var users = "";
    users = stream = User.find().stream();
    stream.on('data', function (doc) {
      console.log(doc);
      users = doc;
      // do something with the mongoose document
    }).on('error', function (err) {
      // handle the error
    }).on('close', function () {
      // the stream is closed
    });
    // User.find(function(err, results) { console.log(results); response.send(users = results); });
    response.render('index.html', {
      users: users,
      categories: categories,
    });
});

io.sockets.on('connection', function(socket) { 
    /*
    (function loop() {
        val = Math.random();
        val = val*10000;
        setTimeout(function(){
            users = makeid();

            socket.emit('users:updated', {
                "users": users
            });
            loop();
        }, val);
    }());
    */
});

server.listen(9000);

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
