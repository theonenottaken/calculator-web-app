/*Calculate the calculator's next state.
* jsonState - the state up 'til now.
* input - digit or operator.
* returns next state.
*/
function calculateNextState(jsonState, input) {
    var inpStr = "";
    var stack = [];
    var newState;
    inpStr = parseInt(inpStr.concat(input.toString()));
    //inpStr now has value of int or NaN
    if (jsonState === null || typeof jsonState === "undefined") {
        jsonState = {"display": "0", "leftNum": null, "operator": null, 
            "rightNum": null, "afterEquals": false, "leftPeriod": false, 
            "rightPeriod": false};
    }
    //if input is number
    if (!isNaN(inpStr) || input === ".") {
        //if yet to have gotton operator or after equals
        //if afterEquals is true, then make false,
        //and clear right num and operator.
        if (jsonState.operator === null || jsonState.afterEquals === true) {
            if (input === "." && jsonState.leftPeriod === true) {
                //do nothing
                return jsonState;
            } else {
                if (input === ".") {
                    jsonState.leftPeriod = true;
                }
                //reset default values.
                if (jsonState.afterEquals === true) {
                    jsonState.afterEquals = false;
                    jsonState.leftNum = null;
                    jsonState.rightNum = null;
                    jsonState.operator = null;
                    jsonState.rightPeriod = false;
                }
                //then getting left num.
                newState = jsonState.leftNum;
                if (newState !== null) {
                    newState = jsonState.leftNum.toString();

                } else {
                    newState = "";
                }
                newState = newState.concat(input);
                jsonState.leftNum = newState;
            }
        }
        else {
            if (input === "." && jsonState.rightPeriod === true) {
                //do nothing
                return jsonState;
            } else {
                if (input === ".") {
                    jsonState.rightPeriod = true;
                }
                //reset leftPeriod
                jsonState.leftPeriod = false;
                //then getting right num.
                newState = jsonState.rightNum;
                if (newState !== null) {
                    newState = jsonState.rightNum.toString();
                } else {
                    newState = "";
                }
                newState = newState.concat(input);
                jsonState.rightNum = newState;
                if (input === ".") {
                    jsonState.rightPeriod = true;
                }
            }
        }
        //in both cases(numbers) display the num.
        jsonState.display = newState;
    } else {
        //if have gotton operator already
        if (!(jsonState.operator === null)) {
            if (input === "=" || jsonState.rightNum !== null) {
                //calculate prev 2 numbers with prev operator.
                //save result into leftNum
                var opt = jsonState.operator;
                //push right num, left num
                stack.push(jsonState.leftNum);
                if (jsonState.rightNum === null) {
                    stack.push(jsonState.display);
                    var val = calculate(stack, opt)
                    jsonState.display = val
                    jsonState.afterEquals = true;
                    return jsonState;
                } else {
                    jsonState.rightPeriod = false;
                    jsonState.leftPeriod = false;
                    stack.push(jsonState.rightNum);
                }
                //save the calculation into left num                
                var leftN = calculate(stack, opt);
                newState = leftN;
                jsonState.leftNum = newState;
            }
            //save current operator if isn't Equals.
            if (input !== "=") {
                //save operator and reset right number
                jsonState.operator = input;
                jsonState.rightNum = null;
                jsonState.rightPeriod = false;
                if (jsonState.afterEquals === true) {
                    //got operator after calculating result for equals.
                    //operator was saved in previous if statement.
                    //clear right num and save result into right num.
                    jsonState.leftNum = jsonState.display;
                    jsonState.afterEquals = false;
                }
            } else {
                //got equals.
                jsonState.afterEquals = true;
            }

            //      then save operator and clear right num.
            //  else if number save as left and clear operator and right num.
        } else {  // if operator is null
            //first operator
            if (jsonState.leftNum === null) {
                jsonState.display = "0";
                jsonState.leftNum = jsonState.display;
                if (input === "=") {
                    jsonState.leftNum = null;
                    jsonState.operator = null;
                    return jsonState;
                }
            }
            if (input !== "=") {
                jsonState.operator = input;
            }
        }
        //show result to screen.
        jsonState.display = jsonState.leftNum;
    }
    return jsonState;
}


//returns result of calculation as a number.
function calculate(stack, current) {
    if (typeof current === 'string') {
        var right = parseFloat(stack.pop());
        var left = parseFloat(stack.pop());
        switch (current) {
            case '+':
                stack.push(left + right);

                break
            case '-':
                stack.push(left - right);
                break
            case '*':
                stack.push(left * right);
                break
            case '/':
                stack.push(left / right);
                break
        }
    } else {
        stack.push(current);
    }
    return stack.pop();
}
module.exports = calculateNextState;
