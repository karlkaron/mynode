var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CORAL' });
});
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('user');
    collection.find({},{},function(e,docs){
        res.render('userlist', {title: 'SLO system - User list',
            "userlist" : docs
        });
    });
});
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});
router.get('/edituser', function(req, res) {
    res.render('edituser', { title: 'Edit Profile User'});
});
/* POST to Add User Service */
router.post('/adduser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.user;
    var userEmail = req.body.email;
    var userFName = req.body.fname;
    var userLName = req.body.lname;

    // Set our collection
    var collection = db.get('user');

    // Submit to the DB
    collection.insert({
        "user" : userName,
        "email" : userEmail,
        "fname" : userFName,
        "lname" : userLName
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("userlist");
        }
    });
});
/* POST to Edit User Service */
router.post('/update', function(req, res) {

    // Set our internal DB variable
    var db = req.db;
    var userID = req.body.userID;
    var userName = req.body.user;
    var userEmail = req.body.email;
    var userFName = req.body.fname;
    var userLName = req.body.lname;

    console.log("user editat este "  + userID);
    res.redirect("edituser");

});
/* POST to Remove User Service */
router.post('/remuser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userID = req.body.userID;


    // Set our collection
    var collection = db.get('user');
    console.log("user ID este "  + userID);

    // Submit to the DB
    collection.remove({
        "_id" : userID
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("userlist");
        }
    });
});
module.exports = router;
