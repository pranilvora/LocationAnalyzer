const express = require('express');
// const routes = require('./routes');
const app = express();

// app.use('/', routes);
// app.engine('html', require('ejs').renderFile);
app.listen(Number(process.env.PORT) || 3000, function () {
  console.log('testing app!')
});
