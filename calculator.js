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
    var classname = document.getElementsByClassName("number2");
    for (var i = 0; i < classname.length; i++) {
        classname[i].addEventListener('click', numberClick);
    }
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
}

function operatorClick(){
    var display = getDisplay();
    numbers.push(parseFloat(currentNum));
    currentNum="";
    operators.push(this.value);
    display.innerHTML+= " " + this.value + " ";
 }

function clear(){
    getDisplay().innerHTML="";
    getOutput().innerHTML = "";
    resetValues(); 
}
function calculate(){
    var display = getDisplay();
    display.innerHTML+= " " +  "=";
    numbers.push(parseFloat(currentNum));

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

    var answer = numbers[0];
    if (answer == "Infinity"){
        answer = "Don't divide by zero!" ;
    }
    outputValue(answer);
    lastAnswer = answer;
    resetValues();
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
function resetValues(){
    numbers=[];
    operators =[];
    currentNum = "";
}

function onLoad(){
    addButtonListeners();
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

var currentNum="";
var numbers = [];
var operators = [];
var lastAnswer;
var resetNext = false;
