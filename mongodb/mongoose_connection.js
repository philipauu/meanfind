var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27500/people', {
    useMongoClient: true
});

var contact = {
    email: String,
    cell: String,
    city: String
}

var contact_schema = new mongoose.Schema(contact);

var employee = {
    name: String,
    gender: String,
    contact: contact
}

var employee_schema = new mongoose.Schema(employee);

var EMPLOYEECLASS = mongoose.model('employees', employee_schema);

module.exports = EMPLOYEECLASS;