var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var admin = require("firebase-admin");

var serviceAccount = require("location-analyzer-6ee10-firebase-adminsdk-eidcu-0c54dba12b");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://location-analyzer-6ee10.firebaseio.com"
});

var db = admin.database();
var locationsRef = db.ref("locations");
var emergencyRef = db.ref("emergencyFlag");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 8080;

var router = express.Router();

router.use(function(req, res, next) {
    // do logging
    console.log('API Call In Progress.');
    next(); // make sure we go to the next routes and don't stop here
});

router.get('/', (req, res) => res.json({ message: 'Location Analyzer API' }));

router.route('/isEmergency')
  .get(function(req,res) {
    emergencyRef.once("value", function(snapshot) {
      var flag = Object.keys(snapshot.val()).map(function(key) {
        return snapshot.val()[key];
      });
    res.json(flag);
    })
  })

router.route('/locations')
  .get(function(req,res) {
    locationsRef.once("value", function(snapshot) {
      var locs = Object.keys(snapshot.val()).map(function(key) {
        return snapshot.val()[key];
      });
      res.json(locs);
    }, function (errorObject) {
      console.log("Read Failed: " + errorObject.code);
    });
  });

router.route('/submitLocation')
  .post(function(req,res) {
    var id = req.body.id;
    var latitude = req.body.lat;
    var longitude = req.body.long;
    // locationsRef.push({
    //   location: latitude + ', ' + longitude
    // });
    locationsRef.child(id).set({
      location: latitude + ', ' + longitude
    });
    res.send("id " + id + "= " + latitude + ', ' + longitude);
  });

router.route('/engageEmergency')
  .post(function(req,res) {
    emergencyRef.set({emergencyFlag: true});
    res.send("activated!");
  });

  router.route('/disengageEmergency')
    .post(function(req,res) {
      emergencyRef.set({emergencyFlag: false});
      res.send("deactivated!");
    });

app.use('/api', router);
app.listen(port);
console.log('Port ' + port);

module.exports = router;
