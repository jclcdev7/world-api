'use strict';

var data = require('./countries.json')
var dataMap = {}

data.forEach((item) => {
  dataMap[item.ENTITY] = item
})


exports.data = data;
exports.dataMap = dataMap;
