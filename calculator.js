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
    document.getElementById("dot").addEventListener('click', dotClick);// decimal point
    document.getElementById("ans").addEventListener('click', ansClick);//answer button
    // operator buttons
    var classname = document.getElementsByClassName("operator");
    for (var i = 0; i < classname.length; i++) {
        classname[i].addEventListener('click', operatorClick);
    }
    //function buttons
    document.getElementById("equals").addEventListener('click', calculate);//equals
    document.getElementById("clear").addEventListener('click', clear);//clear
    document.getElementById("back").addEventListener('click', backspace);//backspace

}
function numberClick(){
   var display = getDisplay();
   if (resetNext) display.innerHTML = ""; resetNext = false;
   if (currentNum=="") currentNum = String(this.value);
   else currentNum += String(this.value);
   display.innerHTML+= this.value;
   setFunctionButtonsDisabled(false);
   setOperatorButtonsDisabled(false);
   setAnsButtonDisabled(true);
   if (hasDot) setDotDisabled(true);
}
function dotClick(){
    var display = getDisplay();
    if (resetNext) display.innerHTML = ""; resetNext = false;
    if (currentNum=="") currentNum = String(this.value);
    else currentNum += String(this.value);
    display.innerHTML+= this.value;
    setFunctionButtonsDisabled(true);
    setOperatorButtonsDisabled(true);
    setAnsButtonDisabled(false);
    hasDot = true;
 }

function ansClick(){
    var display = getDisplay();
    if (resetNext) display.innerHTML = ""; resetNext = false;
    if (currentNum=="") currentNum = "ans";
    setNumberButtonsDisabled(true);
    display.innerHTML+= this.value;
    setFunctionButtonsDisabled(false);
    setOperatorButtonsDisabled(false);
    setDotDisabled(true);
    setAnsButtonDisabled(true);
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
    setAnsButtonDisabled(false);
    if (hasDot) hadDot = true;
    else hadDot = false;
    hasDot = false;
 }

function clear(){
    getDisplay().innerHTML="";
    getOutput().innerHTML = "";
    resetValues(true); 
    setOperatorButtonsDisabled(true);
    setFunctionButtonsDisabled(false);
    setNumberButtonsDisabled(false);
    setAnsButtonDisabled(false);
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

    }

    setNumberButtonsDisabled(false);
    setOperatorButtonsDisabled(true);
    setAnsButtonDisabled(false);

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
    hasDot = false;
    hadDot = false;
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

function isOperator(c){
    return isDivide(c) || isMultiply(c) || c == '+' || c == '-';
}

function backspace(){
    var display = getDisplay();
    var currentText = display.innerHTML;
    if (currentText == "") return // if nothing
    if (currentText.charAt(currentText.length-1) == " "){
        currentText = currentText.slice(0,currentText.length-1);
    }
    if (isOperator(currentText.charAt(currentText.length-1))){
        // remove operator
        operators.pop();
        // remove space
        currentText = currentText.slice(0,currentText.length-2); //removes operator and space
        // remove last number added
        // set currentNum
        currentNum = String(numbers.pop());
        // disable buttons
        setOperatorButtonsDisabled(false);
        setFunctionButtonsDisabled(false);
        setNumberButtonsDisabled(false);
        if (hadDot) setDotDisabled(true);
    } else if (isNumeric(currentText.charAt(currentText.length-1))){
        console.log("hi");
        // remove character of number from display
        if (currentText.length == 1) currentText = "";
        else currentText = currentText.slice(0,currentText.length-1);
        // remove character from currentNum
        if (currentNum.length == 1) currentNum = ""
        else currentNum = currentNum.slice(0,currentNum.length-1);     
    } else if (currentText.charAt(currentText.length-1) == '.'){
        // remove decimal point from dispaly
        currentText = currentText.slice(0,currentText.length-1);
        // remove decimal point from currentNum
        currentNum = currentNum.slice(0,currentNum.length-1);
        hasDot = false;
        setOperatorButtonsDisabled(false);
    }

    display.innerHTML = currentText;
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
    setDotDisabled(boolean);
}
function setDotDisabled(boolean){
    document.getElementById("dot").disabled = boolean;
}
function setAnsButtonDisabled(boolean){
    document.getElementById("ans").disabled = boolean;
}

function isNumeric(c){
    return /\d/.test(c);
}
var currentNum="";
var numbers = [];
var operators = [];
var lastAnswer = 0;
var resetNext = false;
var hasDot = false;
var hadDot = false;
