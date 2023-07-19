
// Create web server
var express = require('express');
var app = express();

// Create web socket server
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io')(server);

// Connect to MongoDB
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/comment');

// Define model
var Comment = mongoose.model('Comment', {
  name: String,
  comment: String
});

// Routing
app.use(express.static('public'));

// Get comments from MongoDB
app.get('/api/comments', function(req, res) {
  Comment.find(function(err, comments) {
    if (err) return res.status(500).send({ error: 'database failure' });
    res.json(comments);
  });
});

// Create comment to MongoDB
app.post('/api/comments', function(req, res) {
  var comment = new Comment();
  comment.name = req.body.name;
  comment.comment = req.body.comment;

  comment.save(function(err) {
    if (err) {
      console.error(err);
      res.json({ result: 0 });
      return;
    }
    res.json({ result: 1 });
  });
});

// Start web server
server.listen(8080, function() {
  console.log('Server running at http://


