const express = require('express');
const routes = require('./routes');
const app = express();

app.engine('html', require('ejs').renderFile);
app.use('/', routes);
