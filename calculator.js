function add(a,b){
    return a+b;
}
function subtract(a,b){
    return a-b;
}
function multiply(a,b){
    return a*b;
}
function divide(a,b){
    return a/b;
}
function operate(a,b,operator){
    return operator=='+'? add(a,b) :
    operator == '-' ? subtract(a,b) : 
    operator == '*' ? multiply(a,b) :
    divide(a,b)
}
function addButtonListeners(){
    // number buttons
    var classname = document.getElementsByClassName("number");
    for (var i = 0; i < classname.length; i++) {
        classname[i].addEventListener('click', numberClick);
    }
    document.getElementById("dot").addEventListener('click', numberClick);// decimal point
    document.getElementById("ans").addEventListener('click', ansClick);//answer button
    // operator buttons
    var classname = document.getElementsByClassName("operator");
    for (var i = 0; i < classname.length; i++) {
        classname[i].addEventListener('click', operatorClick);
    }
    //function buttons
    document.getElementById("equals").addEventListener('click', calculate);//equals
    document.getElementById("clear").addEventListener('click', clear);//clear

}
function numberClick(){
   var display = getDisplay();
   if (resetNext) display.innerHTML = ""; resetNext = false;
   if (currentNum=="") currentNum = String(this.value);
   else currentNum += String(this.value);
   display.innerHTML+= this.value;
   setFunctionButtonsDisabled(false);
   setOperatorButtonsDisabled(false);
}
function ansClick(){
    var display = getDisplay();
    if (resetNext) display.innerHTML = ""; resetNext = false;
    if (currentNum=="") currentNum = "ans";
    setNumberButtonsDisabled(true);
    display.innerHTML+= this.value;
}

function operatorClick(){
    var display = getDisplay();
    if (currentNum == "ans") numbers.push(lastAnswer);
    else numbers.push(parseFloat(currentNum));
    currentNum="";
    operators.push(this.value);
    setNumberButtonsDisabled(false);
    display.innerHTML+= " " + this.value + " ";
    setFunctionButtonsDisabled(true);
    setOperatorButtonsDisabled(true);
 }

function clear(){
    getDisplay().innerHTML="";
    getOutput().innerHTML = "";
    resetValues(true); 
    setOperatorButtonsDisabled(true);
    setFunctionButtonsDisabled(false);
}
function calculate(){
    var display = getDisplay();
    display.innerHTML+= " " +  "=";
    if (currentNum=="ans") numbers.push(lastAnswer);
    else numbers.push(parseFloat(currentNum));
    setFunctionButtonsDisabled(true);
    console.log(operators);
    console.log(numbers);
    // while there are still un calculated operators
    while(operators.length > 0){ 

        // find index of next higher prio operator
        if(operators.findIndex(isMultiply) != -1){
            var operatorPointer = operators.findIndex(isMultiply);
            // operate at this point
            var answer = operate(numbers[operatorPointer],
                numbers[operatorPointer+1],operators[operatorPointer]);
            // now fix arrays 
            // remove the operator at the operator pointer and correct array
            operators = removeFromArray(operators,operatorPointer);
            // remove the number at value operator pointer+1
            numbers = removeFromArray(numbers,operatorPointer+1);
            // set number value at operator pointer = answer
            numbers[operatorPointer] = answer;
        } else if(operators.findIndex(isDivide) != -1){
            var operatorPointer = operators.findIndex(isDivide);
            // operate at this point
            var answer = operate(numbers[operatorPointer],
                numbers[operatorPointer+1],operators[operatorPointer]);
            // now fix arrays 
            // remove the operator at the operator pointer and correct array
            operators = removeFromArray(operators,operatorPointer);
            // remove the number at value operator pointer+1
            numbers = removeFromArray(numbers,operatorPointer+1);
            // set number value at operator pointer = answer
            numbers[operatorPointer] = answer;
        } else{
            // for adding or subtracting this is fine
            var answer = operate(numbers[0],numbers[1],operators[0]);
            popReverse(operators);
            popReverse(numbers);
            numbers[0] = answer;
        }
        setNumberButtonsDisabled(false);
        setOperatorButtonsDisabled(true);
    }

    var answer = numbers[0];
    var NUMBER_OF_DECIMAL_PLACES = 4;
    answer = Math.round(answer * 10 ** NUMBER_OF_DECIMAL_PLACES) / 10 ** NUMBER_OF_DECIMAL_PLACES;
    if (answer == "Infinity"){
        answer = "Don't divide by zero!" ;
    }
    outputValue(answer);
    lastAnswer = answer;
    resetValues(false);
    resetNext = true;
}

function outputValue(text){
   getOutput().innerHTML=text;
}

function getDisplay(){
    return document.getElementById("inputDisplay");
}
function getOutput(){
    return document.getElementById("outputDisplay")
}
function resetValues(resetLast){
    numbers=[];
    operators =[];
    currentNum = "";
    if (resetLast) lastAnswer = 0;
}

function onLoad(){
    addButtonListeners();
    setOperatorButtonsDisabled(true);
}

/**
 * its like pop but the opposite -  pops the bottom of the stack
 * @param {*} stack 
 */
function popReverse(stack){
    stack.reverse();
    stack.pop();
    stack.reverse();
}

function removeFromArray(array,index){
    var newArray = [];
    for(i=0;i<array.length;i++){
        if(i != index) newArray.push(array[i]);
    }
    return newArray;    
}

function isMultiply(text){
    return text == '*';
}
function isDivide(text){
    return text == '/';
}

/**
 * true for disabled false for enables
 */
function setNumberButtonsDisabled(boolean){
    var classname = document.getElementsByClassName("number");
    for (var i = 0; i < classname.length; i++) {
        classname[i].disabled = boolean;
    }
}
/**
 * true for disabled false for enables
 */
function setFunctionButtonsDisabled(boolean){
    document.getElementById("equals").disabled = boolean;
}
function setOperatorButtonsDisabled(boolean){
    var classname = document.getElementsByClassName("operator");
    for (var i = 0; i < classname.length; i++) {
        classname[i].disabled = boolean;
    }
}
var currentNum="";
var numbers = [];
var operators = [];
var lastAnswer = 0;
var resetNext = false;
