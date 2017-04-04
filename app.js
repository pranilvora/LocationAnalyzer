const express = require('express');
const routes = require('./routes');
const app = express();
var admin = require("firebase");


app.engine('html', require('ejs').renderFile);
app.use('/', routes);
