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


/*describe('calculateState', function() {
  it('null input, null output', () => {
    expect(calculateState(null, "")).to.equal(null)
  })

  it('just a number', () => {
    expect(calculateState(null, 8)).to.equal({"display": "8", "leftNum":"8", "operator":null, "rightNum":null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false})
  })

  it('concatenating digits to the first number', () => {
    expect(calculateState({"display": "23", "leftNum":"23", "operator": null, "rightNum": null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}, "5")).to.equal(
    	{"display": "235", "leftNum": "235", "operator": null, "rightNum": null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false})
  })

  it('operator after getting first number', () => {
    expect(calculateState({"display": "765", "leftNum":"765", "operator": null, "rightNum": null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}, "+")).to.equal(
    	{"display": "765", "leftNum": "765", "operator": "+", "rightNum": null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false})
  })

  it('starting second number after getting first number and operator', () => {
    expect(calculateState({"display": "30", "leftNum": "30", "operator": "*", "rightNum": null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}, "1")).to.equal(
    	{"display": "1", "leftNum": "30", "operator": "*", "rightNum": "1", "afterEquals": false, "leftPeriod": false, "rightPeriod": false})
  })

  it('concatenating digits to the second number', () => {
    expect(calculateState({"display": "1", "leftNum": "30", "operator": "*", "rightNum": "1", "afterEquals": false, "leftPeriod": false, "rightPeriod": false}, "4")).to.equal(
      {"display": "14", "leftNum": "30", "operator": "*", "rightNum": "14", "afterEquals": false, "leftPeriod": false, "rightPeriod": false})
  })

  it('inputted normally and then equals', () => {
    expect(calculateState({"display": "14", "leftNum": "76", "operator": "-", "rightNum": "14", "afterEquals": false, "leftPeriod": false, "rightPeriod": false}, "=")).to.equal(
      {"display": "62", "leftNum": "62", "operator": "-", "rightNum": "14", "afterEquals":true, "leftPeriod": false, "rightPeriod": false})
  })

  it('another equals after already inputting equals', () => {
    expect(calculateState({"display": "62", "leftNum": "62", "operator": "-", "rightNum": "14", "afterEquals":true, "leftPeriod": false, "rightPeriod": false}, "=")).to.equal(
      {"display": "48", "leftNum": "48", "operator": "-", "rightNum": "14", "afterEquals":true, "leftPeriod": false, "rightPeriod": false})
  })

  it('another operator - should calculate with first operator and update fields', () => {
    expect(calculateState({"display": "12", "leftNum": "48", "operator": "/", "rightNum": "12", "afterEquals": false, "leftPeriod": false, "rightPeriod": false}, "+")).to.equal(
      {"display": "4", "leftNum": "4", "operator": "+", "rightNum": null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false})
  })

  it('operator after an equals', () => {
    expect(calculateState({"display": "48", "leftNum": "48", "operator": "*", "rightNum": "12", "afterEquals":true, "leftPeriod": false, "rightPeriod": false}, "+")).to.equal(
      {"display": "48", "leftNum": "48", "operator": "+", "rightNum": null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false})
  })

  it('number after an equals', () => {
    expect(calculateState({"display": "48", "leftNum": "48", "operator": "*", "rightNum": "12", "afterEquals":true, "leftPeriod": false, "rightPeriod": false}, "6")).to.equal(
      {"display": "6", "leftNum": "6", "operator": null, "rightNum": null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false})
  })

  it('operator after an operator changes the operator', () => {
    expect(calculateState({"display": "30", "leftNum": "30", "operator": "*", "rightNum": null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}, "+")).to.equal(
      {"display": "30", "leftNum": "30", "operator": "+", "rightNum": null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false})
  })

  it('equals with no second number behaves as if first number is also second number', () => {
    expect(calculateState({"display": "12", "leftNum": "12", "operator": "*", "rightNum": null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}, "=")).to.equal(
      {"display": "144", "leftNum": "12", "operator": "*", "rightNum": null, "afterEquals":true, "leftPeriod": false, "rightPeriod": false})
  })

  it('equals again with no second number behaves as if first number is also second number', () => {
    expect(calculateState({"display": "144", "leftNum": "12", "operator": "*", "rightNum": null, "afterEquals":true, "leftPeriod": false, "rightPeriod": false}, "=")).to.equal(
      {"display": "1728", "leftNum": "12", "operator": "*", "rightNum": null, "afterEquals":true, "leftPeriod": false, "rightPeriod": false})
  })

  it('new number after equals', () => {
    expect(calculateState({"display": "144", "leftNum": "12", "operator": "*", "rightNum": null, "afterEquals":true, "leftPeriod": false, "rightPeriod": false}, "2")).to.equal(
      {"display": "2", "leftNum": "2", "operator": null, "rightNum": null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false})
  })

  it('new operator after no-second-number equals', () => {
    expect(calculateState({"display": "144", "leftNum": "12", "operator": "*", "rightNum": null, "afterEquals":true, "leftPeriod": false, "rightPeriod": false}, "+")).to.equal(
      {"display": "144", "leftNum": "144", "operator": "+", "rightNum": null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false})
  })

  it('operator as very first input', () => {
    expect(calculateState(null, "+")).to.equal(null)
  })

  it('operator as very first input', () => {
    expect(calculateState(null, "=")).to.equal(null)
  })

  it('equals without an operator does nothing', () => {
    expect(calculateState({"display": "10", "leftNum": "10", "operator": null, "rightNum": null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}, "=")).to.equal(
      {"display": "10", "leftNum": "10", "operator": null, "rightNum": null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false})
  })

}) */

//if (calculateState(null, "") !== null) throw new Error()

//if (calculateState(null, 8) != {"display": "8", "leftNum":"8", "operator":null, "rightNum":null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}) throw new Error()

//just a number
j = calculateState(null, 8)
if (!(Object.compare(j, {"display": "8", "leftNum":"8", "operator":null, "rightNum":null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}))) {
    console.log(j) 
    throw new Error()
}

/*j = calculateState(null, "")
if (j !== null) {
    console.log(j) 
    throw new Error()
} */

// Concatenate digit to first number
var j = calculateState({"display": "23", "leftNum":"23", "operator": null, "rightNum": null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}, "5")
console.log(j)
if (!(Object.compare(j, {"display": "235", "leftNum": "235", "operator": null, "rightNum": null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}))) {
    console.log(j) 
    throw new Error()
}

// Operator after getting first number
j = calculateState({"display": "765", "leftNum":"765", "operator": null, "rightNum": null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}, "+")
if (!(Object.compare(j, {"display": "765", "leftNum": "765", "operator": "+", "rightNum": null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}))) {
    console.log(j) 
    throw new Error()
}

// Digit after operator begins second number
j = calculateState({"display": "30", "leftNum": "30", "operator": "*", "rightNum": null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}, "1")
if (!(Object.compare(j, {"display": "1", "leftNum": "30", "operator": "*", "rightNum": "1", "afterEquals": false, "leftPeriod": false, "rightPeriod": false}))) {
    console.log(j) 
    throw new Error()
}

// Concatenating digits to second number
j = calculateState({"display": "1", "leftNum": "30", "operator": "*", "rightNum": "1", "afterEquals": false, "leftPeriod": false, "rightPeriod": false}, "4")
if (!(Object.compare(j, {"display": "14", "leftNum": "30", "operator": "*", "rightNum": "14", "afterEquals": false, "leftPeriod": false, "rightPeriod": false}))) {
    console.log(j) 
    throw new Error()
}

// Equals in a normal circumstance
j = calculateState({"display": "14", "leftNum": "76", "operator": "-", "rightNum": "14", "afterEquals": false, "leftPeriod": false, "rightPeriod": false}, "=")
if (!(Object.compare(j, {"display": "62", "leftNum": "62", "operator": "-", "rightNum": "14", "afterEquals":true, "leftPeriod": false, "rightPeriod": false, "leftPeriod": false, "rightPeriod": false}))) {
    console.log(j) 
    throw new Error()
}

// Equals after equals - repeat the last operation
j = calculateState({"display": "62", "leftNum": "62", "operator": "-", "rightNum": "14", "afterEquals":true, "leftPeriod": false, "rightPeriod": false}, "=")
if (!(Object.compare(j, {"display": "48", "leftNum": "48", "operator": "-", "rightNum": "14", "afterEquals":true, "leftPeriod": false, "rightPeriod": false}))) {
    console.log(j) 
    throw new Error()
}

// New operator after getting operator and two numbers - calculate and update fields
j = calculateState({"display": "12", "leftNum": "48", "operator": "/", "rightNum": "12", "afterEquals": false, "leftPeriod": false, "rightPeriod": false}, "+")
if (!(Object.compare(j, {"display": "4", "leftNum": "4", "operator": "+", "rightNum": null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}))) {
    console.log(j) 
    throw new Error()
}

// Operator after equals
j = calculateState({"display": "48", "leftNum": "48", "operator": "*", "rightNum": "12", "afterEquals":true, "leftPeriod": false, "rightPeriod": false}, "+")
if (!(Object.compare(j, {"display": "48", "leftNum": "48", "operator": "+", "rightNum": null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}))) {
    console.log(j) 
    throw new Error()
}

// New number after equals --- NOT REALLY CORRECT
j = calculateState({"display": "48", "leftNum": "48", "operator": "*", "rightNum": "12", "afterEquals":true, "leftPeriod": false, "rightPeriod": false}, "6")
if (!(Object.compare(j, {"display": "6", "leftNum": "6", "operator": null, "rightNum": null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}))) {
    console.log(j) 
    throw new Error()
}

// Operator after operator changes the operator
j = calculateState({"display": "30", "leftNum": "30", "operator": "*", "rightNum": null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}, "+")
if (!(Object.compare(j, {"display": "30", "leftNum": "30", "operator": "+", "rightNum": null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}))) {
    console.log(j) 
    throw new Error()
}

// Equals without second number behaves like first number is also second number
j = calculateState({"display": "12", "leftNum": "12", "operator": "*", "rightNum": null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}, "=")
if (!(Object.compare(j, {"display": "144", "leftNum": "12", "operator": "*", "rightNum": null, "afterEquals":true, "leftPeriod": false, "rightPeriod": false}))) {
    console.log(j) 
    throw new Error()
}

// Equals again without second number behaves like first number is also second number
j = calculateState({"display": "144", "leftNum": "12", "operator": "*", "rightNum": null, "afterEquals":true, "leftPeriod": false, "rightPeriod": false}, "=")
if (!(Object.compare(j, {"display": "1728", "leftNum": "12", "operator": "*", "rightNum": null, "afterEquals":true, "leftPeriod": false, "rightPeriod": false}))) {
    console.log(j) 
    throw new Error()
}

// New number after equals when there was no second number
j = calculateState({"display": "144", "leftNum": "12", "operator": "*", "rightNum": null, "afterEquals":true, "leftPeriod": false, "rightPeriod": false}, "2")
if (!(Object.compare(j, {"display": "2", "leftNum": "2", "operator": null, "rightNum": null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}))) {
    console.log(j) 
    throw new Error()
}

// New operator after equals when there was no second number
j = calculateState({"display": "144", "leftNum": "12", "operator": "*", "rightNum": null, "afterEquals":true, "leftPeriod": false, "rightPeriod": false}, "+")
if (!(Object.compare(j, {"display": "144", "leftNum": "144", "operator": "+", "rightNum": null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}))) {
    console.log(j) 
    throw new Error()
}

// Operator as first input
j = calculateState(null, "+")
if (!(Object.compare(j, {"display": "0", "leftNum": 0, "operator": "+", "rightNum": null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}))) {
    console.log(j) 
    throw new Error()
}

// Equals as first input
j = calculateState(null, "=")
if (!(Object.compare(j, {"display": "0", "leftNum": null, "operator": null, "rightNum": null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}))) {
    console.log(j) 
    throw new Error()
}

// Equals without an operator does nothing
j = calculateState({"display": "10", "leftNum": "10", "operator": null, "rightNum": null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}, "=")
if (!(Object.compare(j, {"display": "10", "leftNum": "10", "operator": null, "rightNum": null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}))) {
    console.log(j) 
    throw new Error()
}

j = calculateState({"display": "10", "leftNum": "10", "operator": null, "rightNum": null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}, ".")
if (!(Object.compare(j, {"display": "10.", "leftNum": "10.", "operator": null, "rightNum": null, "afterEquals": false, "leftPeriod": true, "rightPeriod": false}))) {
    console.log(j) 
    throw new Error()
}

j = calculateState({"display": "10.", "leftNum": "10.", "operator": null, "rightNum": null, "afterEquals": false, "leftPeriod": true, "rightPeriod": false}, "5")
if (!(Object.compare(j, {"display": "10.5", "leftNum": "10.5", "operator": null, "rightNum": null, "afterEquals": false, "leftPeriod": true, "rightPeriod": false}))) {
    console.log(j) 
    throw new Error()
}

j = calculateState({"display": "5", "leftNum": "10.6", "operator": "+", "rightNum": "5", "afterEquals": false, "leftPeriod": true, "rightPeriod": false}, ".")
if (!(Object.compare(j, {"display": "5.", "leftNum": "10.6", "operator": "+", "rightNum": "5.", "afterEquals": false, "leftPeriod": false, "rightPeriod": true}))) {
    console.log(j) 
    throw new Error()
}

j = calculateState({"display": "10.76", "leftNum": "10.76", "operator": null, "rightNum": null, "afterEquals": false, "leftPeriod": true, "rightPeriod": false}, ".")
if (!(Object.compare(j, {"display": "10.76", "leftNum": "10.76", "operator": null, "rightNum": null, "afterEquals": false, "leftPeriod": true, "rightPeriod": false}))) {
    console.log(j) 
    throw new Error()
}

j = calculateState({"display": "10.76", "leftNum": "10.76", "operator": "+", "rightNum": "5.3", "afterEquals": false, "leftPeriod": false, "rightPeriod": true}, "=")
if (!(Object.compare(j, {"display": "16.06", "leftNum": "16.06", "operator": "+", "rightNum": "5.3", "afterEquals": true, "leftPeriod": false, "rightPeriod": false}))) {
    console.log(j) 
    throw new Error()
}
/*if (calculateState(null, 8) != {"display": "8", "leftNum":"8", "operator":null, "rightNum":null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}) throw new Error()

if (calculateState(null, 8) != {"display": "8", "leftNum":"8", "operator":null, "rightNum":null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}) throw new Error()

if (calculateState(null, 8) != {"display": "8", "leftNum":"8", "operator":null, "rightNum":null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}) throw new Error()

if (calculateState(null, 8) != {"display": "8", "leftNum":"8", "operator":null, "rightNum":null, "afterEquals": false, "leftPeriod": false, "rightPeriod": false}) throw new Error()*/

