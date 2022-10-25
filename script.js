
// create an array that will take the inputs
// initialize the input
// get the display from ur html
let inputs = [];
let input = 0;
let display = document.getElementById("display");
//calculate the total of the entered inputs when = is pressed
function calculateTotal(value) {
    //if current input not 0 convert it to float and add it to ur inputs array
    if (input !== 0) {
        input = parseFloat(input);
        addToInputs(input);
    }
    //initialize the answer to be the first inputed number
    let answer = value[0];
    //a flag to check if number is divided by zero
    let dividedByZero = 0;
    // a forloop that calculates the whole string value 
    for (let i = 2; i < value.length; i = i + 2) {
        //start form the second input and make the operation based on the operand 
        switch (inputs[i - 1]) {
            case '+':
                answer = add(answer, value, i);
                break;
            case '-':
                answer = subtract(answer, value, i);
                break;
            //check if the number is divided by zero
            case '/': if (value[i] === 0) dividedByZero = 1;
            else answer = divide(answer, value, i);
                break;
            case '*': answer = multiply(answer, value, i);
                break;
        }
    }
    //format the number 
    answer = answer.toFixed(6);
    answer = parseFloat(answer);
    //display err if it is divided by zero and clear the display
    if (dividedByZero === 1) {
        clearDisplay();
        display.innerHTML = "ERR";
    }
    else {
        display.innerHTML = answer;
        input = answer;
        inputs = [];
    }
}

// a function to add the inputed value to the input queue
function addToInputs(input) {
    inputs.push(input);
}

//function to clear the display (reset to zero)
function clearDisplay() {
    inputs = [];
    input = 0;
    display.innerHTML = "0";
}

//function to add the pressed number to the display 
function numbers(arg) {
    if (display.innerHTML === "ERR" || (display.innerHTML == "0" && arg != ".")) { display.innerHTML = ""; }
    //checking the repeated decimal and display the presses numbers
    if (!(arg === ".") || !input.match(/[.]/)) {
        input += arg;
        display.innerHTML += arg;
    }
}
//function to add pressed operator 
function operators(arg) {
    //if last value is not a zero and is not minus convert to float
    //ad the last inputed value to the array and add the operator to the array then display it and make the input 0 again.
    if (input !== 0 && input !== "-") {
        input = parseFloat(input);
        addToInputs(input);
        addToInputs(arg);
        display.innerHTML += arg;
        input = 0;
    }
    //check if first element is a number and pressed button is the minus and the last inputed value is not minus
    //this is to avoid double minus signs 
    if (arg == "-" && isNaN(inputs[0]) && input !== "-") {
        input = "-";
        display.innerHTML = "-";
    }
}

function multiply(answer, value, i) {
    return answer * value[i];
}
function add(answer, value, i) {
    return answer + value[i];
}
function subtract(answer, value, i) {
    return answer - value[i];
}
function divide(answer, value, i) {
    return answer / value[i];
}

window.addEventListener('keydown', function (e) {
    const key = document.querySelector(`input[data-key='${e.keyCode}']`);
    key.click();
});





