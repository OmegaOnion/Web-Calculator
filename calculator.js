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
   if (currentNum="") currentNum = String(this.value);
   else currentNum += String(this.value)
   display.innerHTML+= this.value;
}

function operatorClick(){
    var display = getDisplay();
    a = parseInt(currentNum);
    currentNum="";
    currentOperator = this.value;
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
    b = parseInt(currentNum);
    var answer = operate(a,b,currentOperator);
    outputValue(answer);
    resetValues();
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
    currentNum = "";
    a = 0;
    b = 0;
    currentOperator = "";
}

function onLoad(){
    addButtonListeners();
}

var currentNum="";
var a;
var b;
var currentOperator;
