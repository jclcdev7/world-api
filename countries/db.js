const NodeCouchDb = require('node-couchdb');

// node-couchdb instance with default options
const couch = new NodeCouchDb();

const dbName = "world";
//var mangoQuery = { selector: { "GEC": "AF" } };
const parameters = {};

var getWorld = (ctry, callback) => {
   var mangoQuery = { selector: { "GEC": ctry } };
   couch.mango(dbName, mangoQuery, parameters).then(({data, headers, status}) => {
       // data is json response
       // headers is an object with all response headers
       // status is statusCode number
       callback (data.docs[0]);
   }, err => {
       console.log("error");
   });
}
exports.getWorld = getWorld;

var getList = (ctry, callback) => {
   var mangoQuery = { selector: { "GEC": ctry } };
   couch.mango(dbName, mangoQuery, parameters).then(({data, headers, status}) => {
       // data is json response
       // headers is an object with all response headers
       // status is statusCode number
       callback (data.docs[0].countries);
   }, err => {
       console.log("error");
   });
}
exports.getList = getList;
