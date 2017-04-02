var express = require('express');
var app = express();
var bodyParser = require('body-parser');

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

app.use('/api', router);
app.listen(port);
console.log('Port ' + port);

module.exports = router;
