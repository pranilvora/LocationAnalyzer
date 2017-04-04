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
var ref = db.ref("locations");
var locationsRef = ref.child("Latitudes + Longitudes");

var count = 0;

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


router.route('/locations')
  .get(function(req,res) {
    res.json({"array": ["Subway","Panda Express","Tech Rec","Post Office"]});
  });

router.route('/submitLocation')
  .post(function(req,res) {
    var latitude = req.body.lat;
    var longitude = req.body.long;
    count = count +1;;
    locationsRef.child(count).set({
      location: latitude + ', ' + longitude
    });
    res.send(latitude + ', ' + longitude);
  });

app.use('/api', router);
app.listen(port);
console.log('Port ' + port);

module.exports = router;
