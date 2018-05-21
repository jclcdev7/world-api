var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var countries = require('./countries.js');
var ctry = require('./countries/db.js');

var app = express();

app.set('port', (process.env.PORT || 5001));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.get('/worldCode', function(req,res) {
   //res.status(200).send(countries.data);
   var data = '';
   ctry.getList('list', function(retour) {
      data = retour;
      //result = eval('retour.'+det);
      console.log(data)
      res.status(200).send(data);
   });
})

app.get('/worldMap', function(req,res) {
   res.status(200).send(countries.dataMap);
})

app.get('/world/detail', function(req, res) {
   var pays = req.query.ctry;
   var det = req.query.det;
   var data = '';
   var result = '';
   if (pays && det) {
      ctry.getWorld(pays, function(retour) {
         data = retour;
         result = eval('retour.'+det);
         if (det=='update')
            res.status(200).send({"update":result});
         else //console.log(result)
            res.status(200).send(result);
      });
   }
   else {
      res.status(200).send({});
   }
})

app.use('/', function(req, res) {
  res.json('Here you Are!');
});

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

module.exports = app;
