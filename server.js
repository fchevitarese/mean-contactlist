var express = require('express');
var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactlist');

var Contact = require('./public/models/contact');

var _db = mongoose.connection;
_db.on('error', console.error.bind(console, 'connection error:'));


var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));


app.get('/contactlist/:id', function(req, res){
    var id = req.params.id;
    Contact.findOne({_id: id}, function(err, docs) {
        console.log(docs);
        res.json(docs);
    });
});


app.get('/contactlist', function(req, res) {
    console.log("Get contactlist");
    Contact.find(function(err, docs){
        res.json(docs);
    })
});


app.post('/contactlist', function(req, res) {
    console.log("Receive the post request");
    var contact = new Contact(req.body);

    contact.save(function (err, doc){
        if (err) return console.error(err);
        res.json(doc);
    });
});


app.delete('/contactlist/:id', function(req, res) {
    var id = req.params.id;
    Contact.remove({_id: id}, function(err, doc) {
        res.json(doc);
    });
});

app.put('/contactlist/:id', function(req, res){
    var id = req.params.id;

    Contact.findOne({_id: id}, function(err, doc) {
        doc.name = req.body.name;
        doc.email = req.body.email;
        doc.phone = req.body.phone;
        doc.save(function(err) {
            if (err) throw err;
            console.log("Contact updated");
        });
        res.json(doc);
    });
});


app.listen(3000);
console.log("Server is running on port 3000");
