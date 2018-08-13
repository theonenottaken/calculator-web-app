const express = require('express')
const bodyParser = require('body-parser')
const calculate = require('./calculator')

const app = express();

let counter = 0

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get('/counter', function(req,res){
    console.log(req.method)
    res.json({value: counter})
})

app.post('/calculate', function(req, res){
    const body = req.body
    var calcState = body.calculatorState
    var input = body.input
    console.dir(calcState)
    console.dir(input)
    var toSend = calculate(calcState, input) 
    //console.dir(body)
    //res.send(JSON.stringify(toSend))
    res.json(toSend)
})

//listen to port
app.listen(5000, () => console.log('listening...'))
