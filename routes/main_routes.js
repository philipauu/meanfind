var router = require('express').Router();
var EMPLOYEECLASS = require('../mongodb/mongoose_connection');
module.exports = router;

router.get('/', do_homepage);

function do_homepage(req, res) {
    console.log('doing homepage');
    res.render('index');
}

//---------------------API-------------------------
router.get('/api/v7/read', do_read);
router.delete('/api/v7/read/:_id', do_single_read);
router.post('/api/v7/create', do_create);
router.put('/api/v7/update', do_update);
router.delete('/api/v7/delete/:_id', do_delete);
//-------------------------------------------------

function do_read(req, res) {
    console.log('reading data');

    EMPLOYEECLASS.find()
        .then(function (results) {
            console.log(results);
            res.json(results);
        });
}

function do_single_read(req, res) {
    console.log('reading single data');
    console.log(req.params._id);

    EMPLOYEECLASS.find(req.params._id)
        .then(function (results) {
            console.log(results);
            res.json(results);
        });
}

function do_create(req, res) {
    console.log('creating employee');
    console.log(req.body);

    var data = {

        name: req.body.name,
        gender: req.body.gender,
        contact: {
            email: req.body.email,
            cell: req.body.cell,
            home: req.body.home
        }
    }

    var employee = new EMPLOYEECLASS(data);
    user.save().then(function (result) {
        console.log(result);
        res.json({
            message: 'backend created employee'
        });
    });
}

function do_update(req, res) {
    console.log('updating employee');
    console.log(req.body);
    var update = {
        $set: {
            name: req.body.name,
            gender: req.body.gender,
            contact: {
                email: req.body.email,
                cell: req.body.cell,
                home: req.body.home
            }
        }
    };
    EMPLOYEECLASS.findByIdAndUpdate(req.body._id, update)
        .then(function (result) {
            console.log(result);
            res.json({
                message: 'backend updated employee'
            });
        });
}

function do_delete(req, res) {
    console.log('deleting employee');
    console.log(req.params._id);

    EMPLOYEECLASS.findByIdAndRemove(req.params._id)
        .then(function (result) {
            console.log(result);
            res.json({
                message: 'backend deleted employee'
            });
        });
}