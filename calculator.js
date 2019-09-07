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
   if (currentNum="") currentNum = String(this.value);
   else currentNum += String(this.value)
   display.innerHTML+= this.value;
}

function operatorClick(){
    var display = getDisplay();
    numbers.push(parseInt(currentNum));
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
    numbers.push(parseInt(currentNum));

    while(operators.length > 0){
        var answer = operate(numbers[0],numbers[1],operators[0]);
        popReverse(operators);
        popReverse(numbers);
        numbers[0] = answer;
    }

    var answer = numbers[0];
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

function popReverse(stack){
    stack.reverse();
    stack.pop();
    stack.reverse();
}

var currentNum="";
var numbers = [];
var operators = [];
var lastAnswer;
var resetNext = false;
