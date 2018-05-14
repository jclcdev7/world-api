var ctry = require('./db.js');

ctry.getList('list', function(res) {
   console.log(res);
})
