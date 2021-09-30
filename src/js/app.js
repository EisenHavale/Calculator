
import { operation } from "../index";
import { history } from "./import-classes"
// Global Variables
let operationValues = new Array(), operationSigns = [], isFirstOperation = true,
    operationHistory = "", isNewNumber = false;

//Calling html references
const resultSection = document.querySelector('#Results'),
    divOperationButtons = document.querySelector('#Operations'),
    numbersKeyPad = document.querySelector('#numbers'),
    equalSign = document.querySelector('#Equal'),
    catchValues = document.querySelector('body');


const screenSection = resultSection.firstElementChild.lastElementChild; //Big section for the screen
const smallScreenSection = resultSection.firstElementChild.firstElementChild; //Small section for the screen 

const cleanVariables = () => {
    operationSigns = [];
    operationValues = [];
    smallScreenSection.innerHTML = "";
    screenSection.placeholder = "0";
    isFirstOperation = true;
}

const addOperationSings = (element, wasTyped) => {
    (!wasTyped) ? operationSigns.push(element.innerHTML)
                : operationSigns.push(element)
    if (isFirstOperation) {
        operationValues.push(parseFloat(screenSection.innerHTML, 10));
    }
    changingSmallScreenValue('operationSigns');
    callingOperationMethods();
}

const pressEqual = ()=>{
    operationValues.push(parseFloat(screenSection.innerHTML));
    callingOperationMethods();
    isFirstOperation = false;
    changingSmallScreenValue('equalSign');
    history(operationHistory, operation.result);
}



numbersKeyPad.addEventListener('click', (event) => {
    const element = event.target;
    changinBigScreenValue(element, false);
})

divOperationButtons.addEventListener('click', (event) => {
    const element = event.target;
    addOperationSings(element, false);
    console.log(operationValues);
})


const callingOperationMethods = () => {
    if (operationValues.length >= 2) {
        switch (operationSigns[0]) {
            case '+':
                operation.add(operationValues);
                break;
            case '-':
                operation.substrack(operationValues);
                break;
            case 'x':
                operation.multiply(operationValues);
                break;
            case '/':
                operation.divide(operationValues);
                break;
        }
        operationHistory = `${smallScreenSection.innerHTML} ${screenSection.innerHTML} =`;
        screenSection.innerHTML = operation.result;
        operationValues.splice(0, 2, operation.result);

    }
    if (operationSigns.length == 2) operationSigns.shift();

    isNewNumber = true;

}


const changingSmallScreenValue = (element) => {
    if (isNewNumber) { //Keep the last value before to execute the operation method 
        if (element === 'operationSigns') {
            smallScreenSection.innerHTML = `${screenSection.textContent} ${operationSigns[operationSigns.length - 1]}`;
        } else if (element === 'equalSign') {
            smallScreenSection.innerHTML = "";
        }
    } else if (element === 'operationSigns') { //Get the value just after clicking on operation signs
        smallScreenSection.innerHTML += `${screenSection.textContent} ${operationSigns[operationSigns.length - 1]}`;
    }
}

const changinBigScreenValue = (element, wasTyped) => {
    if (isNewNumber) {
        screenSection.textContent = "";
        isNewNumber = false;
    }
    if (!wasTyped) {
        if (element.innerHTML == 'C') { //Clean variabbles
            cleanVariables();
        } else {
            screenSection.textContent += element.innerHTML;
        }
    } else if (wasTyped) {
        if (element == 'Escape') { //Clean variabbles
            cleanVariables();
        } else {
            screenSection.textContent += element;
        }
    }

}

equalSign.addEventListener('click', () => {
    pressEqual();
})

catchValues.addEventListener('keydown', (event) => {
    console.log(event.key);
    switch (event.key) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            changinBigScreenValue(event.key, true);
            break;
        case '/':
        case '*':
        case '+':
        case '-':
            addOperationSings(event.key, true);
            break;
        case 'Enter':
            pressEqual();
            break;
        case 'Escape':
            console.log('Hi Baby');
            cleanVariables();
            break;
    }
})

