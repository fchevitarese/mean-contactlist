var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contactSchema = new Schema({
    name: String,
    email: String,
    phone: String
});

var Contact = mongoose.model('Contacts', contactSchema);

module.exports = Contact;
