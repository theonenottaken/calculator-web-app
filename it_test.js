'use strict'
//const describe = require('mocha')
//const expect = require('chai')

const calculateState = require('./calculator')

Object.compare = function (obj1, obj2) {
  //Loop through properties in object 1
  for (var p in obj1) {
    //Check property exists on both objects
    if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) return false;
 
    switch (typeof (obj1[p])) {
      //Deep compare objects
      case 'object':
        if (!Object.compare(obj1[p], obj2[p])) return false;
        break;
      //Compare function code
      case 'function':
        if (typeof (obj2[p]) == 'undefined' || (p != 'compare' && obj1[p].toString() != obj2[p].toString())) return false;
        break;
      //Compare values
      default:
        if (obj1[p] != obj2[p]) return false;
    }
  }
 
  //Check object 2 for any extra properties
  for (var p in obj2) {
    if (typeof (obj1[p]) == 'undefined') return false;
  }
  return true;
};


//http://localhost:3000/calculate -X POST -H 'content-type: application/json' -d '{"calculatorState": null, "input": "8"}'
//request.post({url:'http://service.com/upload', form: {key:'value'}}, function(err,httpResponse,body){ /* ... */ })
// request.post({url:'http://service.com/upload', formData: formData}, function optionalCallback(err, httpResponse, body) {
  // if (err) {
    // return console.error('upload failed:', err);
  // }
  // console.log('Upload successful!  Server responded with:', body);
//});


//TODO check if synchronous.
var request = require('request');
//just a number
var j;
request({
  uri: "http://localhost:3000/calculate",
  method: "POST",
  json: {
    calculatorState: null,
    input: "8"
  }
}, function optionalCallback(err, httpResponse, body){
    if (err) {
      console.log("couldn't connect")
    // return console.error('upload failed:', err);
    }
    if (!(Object.compare(body, {"display": "8", "leftNum":"8", "operator":null, "rightNum":null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}))) {
      console.log("error") 
      throw new Error()
    } 
  }
);

// calculatorState: {
      // display: "23", "leftNum":"23", "operator": null, "rightNum": null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false
    // }
// Concatenate digit to first number
request({
  uri: "http://localhost:3000/calculate",
  method: "POST",
  json: {
    calculatorState: {"display": "23", "leftNum":"23", "operator": null, "rightNum": null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false},
    input: "5"
  }
}, function optionalCallback(err, httpResponse, body){
    if (!(Object.compare(body, {"display": "235", "leftNum": "235", "operator": null, "rightNum": null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}))) {
      console.log(j) 
      throw new Error()
    }
  }
);


request({
  uri: "http://localhost:3000/calculate",
  method: "POST",
  json: {
    calculatorState: {"display": "765", "leftNum":"765", "operator": null, "rightNum": null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false},
    input: "+"
  }
}, function optionalCallback(err, httpResponse, body){
  if (!(Object.compare(body, {"display": "765", "leftNum":"765", "operator": "+", "rightNum":null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}))) {
    console.log(j) 
    throw new Error()
} 
}
);
/*
// Digit after operator begins second number
j = calculateState({"display": "30", "leftNum": "30", "operator": "*", "rightNum": null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}, "1")
if (!(Object.compare(j, {"display": "1", "leftNum": "30", "operator": "*", "rightNum": "1", "afterEquals": false, "leftPeriod": false, "rightPeriod": false}))) {
    console.log(j) 
    throw new Error()
} */
request({
  uri: "http://localhost:3000/calculate",
  method: "POST",
  json: {
    calculatorState: {"display": "30", "leftNum": "30", "operator": "*", "rightNum": null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false},
    input: "1"
  }
}, function optionalCallback(err, httpResponse, body){
  if (!(Object.compare(body, {"display": "1", "leftNum": "30", "operator": "*", "rightNum": "1", "afterEquals": false, "leftPeriod": false, "rightPeriod": false}))) {
    console.log(j) 
    throw new Error()
} 
}
);

// Concatenating digits to second number
/*j = calculateState({"display": "1", "leftNum": "30", "operator": "*", "rightNum": "1", "afterEquals": false, "leftPeriod": false, "rightPeriod": false}, "4")
if (!(Object.compare(j, {"display": "14", "leftNum": "30", "operator": "*", "rightNum": "14", "afterEquals": false, "leftPeriod": false, "rightPeriod": false}))) {
    console.log(j) 
    throw new Error()
} */
request({
  uri: "http://localhost:3000/calculate",
  method: "POST",
  json: {
    calculatorState: {"display": "1", "leftNum": "30", "operator": "*", "rightNum": "1", "afterEquals": false, "leftPeriod": false, "rightPeriod": false},
    input: "4"
  }
}, function optionalCallback(err, httpResponse, body){
  if (!(Object.compare(body, {"display": "14", "leftNum": "30", "operator": "*", "rightNum": "14", "afterEquals": false, "leftPeriod": false, "rightPeriod": false}))) {
    console.log(j) 
    throw new Error()
} 
}
);
/*request({
  uri: "http://localhost:3000/calculate",
  method: "POST",
  json: {
    calculatorState: null,
    input: "8"
  }
}, function optionalCallback(err, httpResponse, body){
  var j = JSON.parse(JSON.stringify(body))
  if (!(Object.compare(j, {"display": "8", "leftNum":"8", "operator":null, "rightNum":null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}))) {
    console.log(j) 
    throw new Error()
} 
}
);

// Equals in a normal circumstance
/*j = calculateState({"display": "14", "leftNum": "76", "operator": "-", "rightNum": "14", "afterEquals": false, "leftPeriod": false, "rightPeriod": false}, "=")
if (!(Object.compare(j, {"display": "62", "leftNum": "62", "operator": "-", "rightNum": "14", "afterEquals":true, "leftPeriod": false, "rightPeriod": false, "leftPeriod": false, "rightPeriod": false}))) {
    console.log(j) 
    throw new Error()
} */
/*request({
  uri: "http://localhost:3000/calculate",
  method: "POST",
  json: {
    calculatorState: null,
    input: "8"
  }
}, function optionalCallback(err, httpResponse, body){
  var j = JSON.parse(JSON.stringify(body))
  if (!(Object.compare(j, {"display": "8", "leftNum":"8", "operator":null, "rightNum":null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}))) {
    console.log(j) 
    throw new Error()
} 
}
);

// Equals after equals - repeat the last operation
/*j = calculateState({"display": "62", "leftNum": "62", "operator": "-", "rightNum": "14", "afterEquals":true, "leftPeriod": false, "rightPeriod": false}, "=")
if (!(Object.compare(j, {"display": "48", "leftNum": "48", "operator": "-", "rightNum": "14", "afterEquals":true, "leftPeriod": false, "rightPeriod": false}))) {
    console.log(j) 
    throw new Error()
} */
/*request({
  uri: "http://localhost:3000/calculate",
  method: "POST",
  json: {
    calculatorState: null,
    input: "8"
  }
}, function optionalCallback(err, httpResponse, body){
  var j = JSON.parse(JSON.stringify(body))
  if (!(Object.compare(j, {"display": "8", "leftNum":"8", "operator":null, "rightNum":null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}))) {
    console.log(j) 
    throw new Error()
} 
}
);

// New operator after getting operator and two numbers - calculate and update fields
/*j = calculateState({"display": "12", "leftNum": "48", "operator": "/", "rightNum": "12", "afterEquals": false, "leftPeriod": false, "rightPeriod": false}, "+")
if (!(Object.compare(j, {"display": "4", "leftNum": "4", "operator": "+", "rightNum": null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}))) {
    console.log(j) 
    throw new Error()
} */
/*request({
  uri: "http://localhost:3000/calculate",
  method: "POST",
  json: {
    calculatorState: null,
    input: "8"
  }
}, function optionalCallback(err, httpResponse, body){
  var j = JSON.parse(JSON.stringify(body))
  if (!(Object.compare(j, {"display": "8", "leftNum":"8", "operator":null, "rightNum":null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}))) {
    console.log(j) 
    throw new Error()
} 
}
);

// Operator after equals
/*j = calculateState({"display": "48", "leftNum": "48", "operator": "*", "rightNum": "12", "afterEquals":true, "leftPeriod": false, "rightPeriod": false}, "+")
if (!(Object.compare(j, {"display": "48", "leftNum": "48", "operator": "+", "rightNum": null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}))) {
    console.log(j) 
    throw new Error()
} */
/*request({
  uri: "http://localhost:3000/calculate",
  method: "POST",
  json: {
    calculatorState: null,
    input: "8"
  }
}, function optionalCallback(err, httpResponse, body){
  var j = JSON.parse(JSON.stringify(body))
  if (!(Object.compare(j, {"display": "8", "leftNum":"8", "operator":null, "rightNum":null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}))) {
    console.log(j) 
    throw new Error()
} 
}
);

// New number after equals --- NOT REALLY CORRECT
/*j = calculateState({"display": "48", "leftNum": "48", "operator": "*", "rightNum": "12", "afterEquals":true, "leftPeriod": false, "rightPeriod": false}, "6")
if (!(Object.compare(j, {"display": "6", "leftNum": "6", "operator": null, "rightNum": null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}))) {
    console.log(j) 
    throw new Error()
} */
/*request({
  uri: "http://localhost:3000/calculate",
  method: "POST",
  json: {
    calculatorState: null,
    input: "8"
  }
}, function optionalCallback(err, httpResponse, body){
  var j = JSON.parse(JSON.stringify(body))
  if (!(Object.compare(j, {"display": "8", "leftNum":"8", "operator":null, "rightNum":null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}))) {
    console.log(j) 
    throw new Error()
} 
}
);

// Operator after operator changes the operator
/*j = calculateState({"display": "30", "leftNum": "30", "operator": "*", "rightNum": null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}, "+")
if (!(Object.compare(j, {"display": "30", "leftNum": "30", "operator": "+", "rightNum": null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}))) {
    console.log(j) 
    throw new Error()
} */
/*request({
  uri: "http://localhost:3000/calculate",
  method: "POST",
  json: {
    calculatorState: null,
    input: "8"
  }
}, function optionalCallback(err, httpResponse, body){
  var j = JSON.parse(JSON.stringify(body))
  if (!(Object.compare(j, {"display": "8", "leftNum":"8", "operator":null, "rightNum":null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}))) {
    console.log(j) 
    throw new Error()
} 
}
);

// Equals without second number behaves like first number is also second number
/*j = calculateState({"display": "12", "leftNum": "12", "operator": "*", "rightNum": null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}, "=")
if (!(Object.compare(j, {"display": "144", "leftNum": "12", "operator": "*", "rightNum": null, "afterEquals":true, "leftPeriod": false, "rightPeriod": false}))) {
    console.log(j) 
    throw new Error()
} */
/*request({
  uri: "http://localhost:3000/calculate",
  method: "POST",
  json: {
    calculatorState: null,
    input: "8"
  }
}, function optionalCallback(err, httpResponse, body){
  var j = JSON.parse(JSON.stringify(body))
  if (!(Object.compare(j, {"display": "8", "leftNum":"8", "operator":null, "rightNum":null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}))) {
    console.log(j) 
    throw new Error()
} 
}
);

// Equals again without second number behaves like first number is also second number
/*j = calculateState({"display": "144", "leftNum": "12", "operator": "*", "rightNum": null, "afterEquals":true, "leftPeriod": false, "rightPeriod": false}, "=")
if (!(Object.compare(j, {"display": "1728", "leftNum": "12", "operator": "*", "rightNum": null, "afterEquals":true, "leftPeriod": false, "rightPeriod": false}))) {
    console.log(j) 
    throw new Error()
} */
/*request({
  uri: "http://localhost:3000/calculate",
  method: "POST",
  json: {
    calculatorState: null,
    input: "8"
  }
}, function optionalCallback(err, httpResponse, body){
  var j = JSON.parse(JSON.stringify(body))
  if (!(Object.compare(j, {"display": "8", "leftNum":"8", "operator":null, "rightNum":null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}))) {
    console.log(j) 
    throw new Error()
} 
}
);

// New number after equals when there was no second number
/*j = calculateState({"display": "144", "leftNum": "12", "operator": "*", "rightNum": null, "afterEquals":true, "leftPeriod": false, "rightPeriod": false}, "2")
if (!(Object.compare(j, {"display": "2", "leftNum": "2", "operator": null, "rightNum": null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}))) {
    console.log(j) 
    throw new Error()
} */
/*request({
  uri: "http://localhost:3000/calculate",
  method: "POST",
  json: {
    calculatorState: null,
    input: "8"
  }
}, function optionalCallback(err, httpResponse, body){
  var j = JSON.parse(JSON.stringify(body))
  if (!(Object.compare(j, {"display": "8", "leftNum":"8", "operator":null, "rightNum":null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}))) {
    console.log(j) 
    throw new Error()
} 
}
);

// New operator after equals when there was no second number
/*j = calculateState({"display": "144", "leftNum": "12", "operator": "*", "rightNum": null, "afterEquals":true, "leftPeriod": false, "rightPeriod": false}, "+")
if (!(Object.compare(j, {"display": "144", "leftNum": "144", "operator": "+", "rightNum": null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}))) {
    console.log(j) 
    throw new Error()
} */
/*request({
  uri: "http://localhost:3000/calculate",
  method: "POST",
  json: {
    calculatorState: null,
    input: "8"
  }
}, function optionalCallback(err, httpResponse, body){
  var j = JSON.parse(JSON.stringify(body))
  if (!(Object.compare(j, {"display": "8", "leftNum":"8", "operator":null, "rightNum":null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}))) {
    console.log(j) 
    throw new Error()
} 
}
);

// Operator as first input
/*j = calculateState(null, "+")
if (!(Object.compare(j, {"display": "0", "leftNum": 0, "operator": "+", "rightNum": null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}))) {
    console.log(j) 
    throw new Error()
} */
/*request({
  uri: "http://localhost:3000/calculate",
  method: "POST",
  json: {
    calculatorState: null,
    input: "8"
  }
}, function optionalCallback(err, httpResponse, body){
  var j = JSON.parse(JSON.stringify(body))
  if (!(Object.compare(j, {"display": "8", "leftNum":"8", "operator":null, "rightNum":null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}))) {
    console.log(j) 
    throw new Error()
} 
}
);

// Equals as first input
/*j = calculateState(null, "=")
if (!(Object.compare(j, {"display": "0", "leftNum": null, "operator": null, "rightNum": null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}))) {
    console.log(j) 
    throw new Error()
} */
/*request({
  uri: "http://localhost:3000/calculate",
  method: "POST",
  json: {
    calculatorState: null,
    input: "8"
  }
}, function optionalCallback(err, httpResponse, body){
  var j = JSON.parse(JSON.stringify(body))
  if (!(Object.compare(j, {"display": "8", "leftNum":"8", "operator":null, "rightNum":null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}))) {
    console.log(j) 
    throw new Error()
} 
}
);

// Equals without an operator does nothing
/*j = calculateState({"display": "10", "leftNum": "10", "operator": null, "rightNum": null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}, "=")
if (!(Object.compare(j, {"display": "10", "leftNum": "10", "operator": null, "rightNum": null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}))) {
    console.log(j) 
    throw new Error()
} */
/*request({
  uri: "http://localhost:3000/calculate",
  method: "POST",
  json: {
    calculatorState: null,
    input: "8"
  }
}, function optionalCallback(err, httpResponse, body){
  var j = JSON.parse(JSON.stringify(body))
  if (!(Object.compare(j, {"display": "8", "leftNum":"8", "operator":null, "rightNum":null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}))) {
    console.log(j) 
    throw new Error()
} 
}
);

/*j = calculateState({"display": "10", "leftNum": "10", "operator": null, "rightNum": null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}, ".")
if (!(Object.compare(j, {"display": "10.", "leftNum": "10.", "operator": null, "rightNum": null, "afterEquals": false, "leftPeriod": true, "rightPeriod": false}))) {
    console.log(j) 
    throw new Error()
} */
/*request({
  uri: "http://localhost:3000/calculate",
  method: "POST",
  json: {
    calculatorState: null,
    input: "8"
  }
}, function optionalCallback(err, httpResponse, body){
  var j = JSON.parse(JSON.stringify(body))
  if (!(Object.compare(j, {"display": "8", "leftNum":"8", "operator":null, "rightNum":null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}))) {
    console.log(j) 
    throw new Error()
} 
}
);

/*j = calculateState({"display": "10.", "leftNum": "10.", "operator": null, "rightNum": null, "afterEquals": false, "leftPeriod": true, "rightPeriod": false}, "5")
if (!(Object.compare(j, {"display": "10.5", "leftNum": "10.5", "operator": null, "rightNum": null, "afterEquals": false, "leftPeriod": true, "rightPeriod": false}))) {
    console.log(j) 
    throw new Error()
} */
/*request({
  uri: "http://localhost:3000/calculate",
  method: "POST",
  json: {
    calculatorState: null,
    input: "8"
  }
}, function optionalCallback(err, httpResponse, body){
  var j = JSON.parse(JSON.stringify(body))
  if (!(Object.compare(j, {"display": "8", "leftNum":"8", "operator":null, "rightNum":null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}))) {
    console.log(j) 
    throw new Error()
} 
}
);

/*j = calculateState({"display": "5", "leftNum": "10.6", "operator": "+", "rightNum": "5", "afterEquals": false, "leftPeriod": true, "rightPeriod": false}, ".")
if (!(Object.compare(j, {"display": "5.", "leftNum": "10.6", "operator": "+", "rightNum": "5.", "afterEquals": false, "leftPeriod": false, "rightPeriod": true}))) {
    console.log(j) 
    throw new Error()
} */
/*request({
  uri: "http://localhost:3000/calculate",
  method: "POST",
  json: {
    calculatorState: null,
    input: "8"
  }
}, function optionalCallback(err, httpResponse, body){
  var j = JSON.parse(JSON.stringify(body))
  if (!(Object.compare(j, {"display": "8", "leftNum":"8", "operator":null, "rightNum":null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}))) {
    console.log(j) 
    throw new Error()
} 
}
);

/*j = calculateState({"display": "10.76", "leftNum": "10.76", "operator": null, "rightNum": null, "afterEquals": false, "leftPeriod": true, "rightPeriod": false}, ".")
if (!(Object.compare(j, {"display": "10.76", "leftNum": "10.76", "operator": null, "rightNum": null, "afterEquals": false, "leftPeriod": true, "rightPeriod": false}))) {
    console.log(j) 
    throw new Error()
} */
/*request({
  uri: "http://localhost:3000/calculate",
  method: "POST",
  json: {
    calculatorState: null,
    input: "8"
  }
}, function optionalCallback(err, httpResponse, body){
  var j = JSON.parse(JSON.stringify(body))
  if (!(Object.compare(j, {"display": "8", "leftNum":"8", "operator":null, "rightNum":null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}))) {
    console.log(j) 
    throw new Error()
} 
}
);

/*j = calculateState({"display": "10.76", "leftNum": "10.76", "operator": "+", "rightNum": "5.3", "afterEquals": false, "leftPeriod": false, "rightPeriod": true}, "=")
if (!(Object.compare(j, {"display": "16.06", "leftNum": "16.06", "operator": "+", "rightNum": "5.3", "afterEquals": true, "leftPeriod": false, "rightPeriod": false}))) {
    console.log(j) 
    throw new Error()
} */
/*request({
  uri: "http://localhost:3000/calculate",
  method: "POST",
  json: {
    calculatorState: null,
    input: "8"
  }
}, function optionalCallback(err, httpResponse, body){
  var j = JSON.parse(JSON.stringify(body))
  if (!(Object.compare(j, {"display": "8", "leftNum":"8", "operator":null, "rightNum":null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}))) {
    console.log(j) 
    throw new Error()
} 
}
);



/*if (calculateState(null, 8) != {"display": "8", "leftNum":"8", "operator":null, "rightNum":null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}) throw new Error()

if (calculateState(null, 8) != {"display": "8", "leftNum":"8", "operator":null, "rightNum":null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}) throw new Error()

if (calculateState(null, 8) != {"display": "8", "leftNum":"8", "operator":null, "rightNum":null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}) throw new Error()

if (calculateState(null, 8) != {"display": "8", "leftNum":"8", "operator":null, "rightNum":null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}) throw new Error()*/

