/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/css/style.css":
/*!***************************!*\
  !*** ./src/css/style.css ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/classes/opertation.class.js":
/*!*****************************************!*\
  !*** ./src/classes/opertation.class.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Operation": () => (/* binding */ Operation)
/* harmony export */ });


class Operation {

    constructor() {
        this.history = [];
        this.result = 0;
    }

    //Methods

    add(values) {
        let result = 0;
        for (const value of values) {
            result += value;
        }
        this.result=result;

    }

    substrack(values) {
        let result = 0;
        if (values.length == 2) {
            result = values[0] - values[1];
        } else {
            result=values[0];
            for(let i=1; i<values.length; i++){
                result-=values[i];
            }

        }
        this.result = result;

    }

    multiply(values) {
        let result = 1;
        for (const value of values) {
            result *= value;
        }
        this.result = result;

    }

    divide(values) {
        let result = values[0];
        for(let i=1; i<values.length; i++){
            result=result/values[i];
            // console.log(result, values[i]);
        }

        this.result = result;

    }

}

/***/ }),

/***/ "./src/classes/result-hisotry.class.js":
/*!*********************************************!*\
  !*** ./src/classes/result-hisotry.class.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "history": () => (/* binding */ history)
/* harmony export */ });
const divHistory = document.querySelector('#History');


const history = (operation, result) => {
    const resultInformation = document.createElement('div');
    resultInformation.innerHTML = `
    <div class="result_box">
        <small>${operation}</small>
        <h3>${result}</h3>
    </div>
    `;
    divHistory.append(resultInformation);
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "operation": () => (/* binding */ operation)
/* harmony export */ });
/* harmony import */ var _js_import_classes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/import-classes */ "./src/js/import-classes.js");
/* harmony import */ var _js_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/app */ "./src/js/app.js");
/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./css/style.css */ "./src/css/style.css");




let operation = new _js_import_classes__WEBPACK_IMPORTED_MODULE_0__.Operation();

/***/ }),

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index */ "./src/index.js");
/* harmony import */ var _import_classes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./import-classes */ "./src/js/import-classes.js");



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
    (0,_import_classes__WEBPACK_IMPORTED_MODULE_1__.history)(operationHistory, _index__WEBPACK_IMPORTED_MODULE_0__.operation.result);
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
                _index__WEBPACK_IMPORTED_MODULE_0__.operation.add(operationValues);
                break;
            case '-':
                _index__WEBPACK_IMPORTED_MODULE_0__.operation.substrack(operationValues);
                break;
            case 'x':
                _index__WEBPACK_IMPORTED_MODULE_0__.operation.multiply(operationValues);
                break;
            case '/':
                _index__WEBPACK_IMPORTED_MODULE_0__.operation.divide(operationValues);
                break;
        }
        operationHistory = `${smallScreenSection.innerHTML} ${screenSection.innerHTML} =`;
        screenSection.innerHTML = _index__WEBPACK_IMPORTED_MODULE_0__.operation.result;
        operationValues.splice(0, 2, _index__WEBPACK_IMPORTED_MODULE_0__.operation.result);

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



/***/ }),

/***/ "./src/js/import-classes.js":
/*!**********************************!*\
  !*** ./src/js/import-classes.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Operation": () => (/* reexport safe */ _classes_opertation_class__WEBPACK_IMPORTED_MODULE_0__.Operation),
/* harmony export */   "history": () => (/* reexport safe */ _classes_result_hisotry_class__WEBPACK_IMPORTED_MODULE_1__.history)
/* harmony export */ });
/* harmony import */ var _classes_opertation_class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../classes/opertation.class */ "./src/classes/opertation.class.js");
/* harmony import */ var _classes_result_hisotry_class__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../classes/result-hisotry.class */ "./src/classes/result-hisotry.class.js");
    
    


    

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vLi9zcmMvY3NzL3N0eWxlLmNzcz82YjdiIiwid2VicGFjazovL3dlYnBhY2stZGVtby8uL3NyYy9jbGFzc2VzL29wZXJ0YXRpb24uY2xhc3MuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vc3JjL2NsYXNzZXMvcmVzdWx0LWhpc290cnkuY2xhc3MuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3dlYnBhY2stZGVtby8uL3NyYy9qcy9hcHAuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vc3JjL2pzL2ltcG9ydC1jbGFzc2VzLmpzIiwid2VicGFjazovL3dlYnBhY2stZGVtby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYnBhY2stZGVtby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYnBhY2stZGVtby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYnBhY2stZGVtby93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNFTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSx3QkFBd0IsaUJBQWlCO0FBQ3pDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLG9CQUFvQixpQkFBaUI7QUFDckM7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLEM7Ozs7Ozs7Ozs7Ozs7O0FDdkRBOzs7QUFHTztBQUNQO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixVQUFVO0FBQzNCLGNBQWMsT0FBTztBQUNyQjtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ1pzRDtBQUNwQztBQUNPOztBQUVsQixvQkFBb0IseURBQVMsRzs7Ozs7Ozs7Ozs7Ozs7QUNIQztBQUNLO0FBQzFDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBLHVFQUF1RTtBQUN2RSw2RUFBNkU7O0FBRTdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSx3REFBTyxtQkFBbUIsb0RBQWdCO0FBQzlDOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7OztBQUdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGlEQUFhO0FBQzdCO0FBQ0E7QUFDQSxnQkFBZ0IsdURBQW1CO0FBQ25DO0FBQ0E7QUFDQSxnQkFBZ0Isc0RBQWtCO0FBQ2xDO0FBQ0E7QUFDQSxnQkFBZ0Isb0RBQWdCO0FBQ2hDO0FBQ0E7QUFDQSw4QkFBOEIsNkJBQTZCLEdBQUcsd0JBQXdCO0FBQ3RGLGtDQUFrQyxvREFBZ0I7QUFDbEQscUNBQXFDLG9EQUFnQjs7QUFFckQ7QUFDQTs7QUFFQTs7QUFFQTs7O0FBR0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQSw4Q0FBOEMsMEJBQTBCLEdBQUcsMENBQTBDO0FBQ3JILFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSyx5Q0FBeUM7QUFDOUMsMkNBQTJDLDBCQUEwQixHQUFHLDBDQUEwQztBQUNsSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QztBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMLGtDQUFrQztBQUNsQztBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4SkQsSUFBNEQ7QUFDNUQsSUFBOEQ7OztBQUc5RCxJOzs7Ozs7VUNKQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7O1VDTkE7VUFDQTtVQUNBO1VBQ0EiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJcclxuXHJcbmV4cG9ydCBjbGFzcyBPcGVyYXRpb24ge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuaGlzdG9yeSA9IFtdO1xyXG4gICAgICAgIHRoaXMucmVzdWx0ID0gMDtcclxuICAgIH1cclxuXHJcbiAgICAvL01ldGhvZHNcclxuXHJcbiAgICBhZGQodmFsdWVzKSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IDA7XHJcbiAgICAgICAgZm9yIChjb25zdCB2YWx1ZSBvZiB2YWx1ZXMpIHtcclxuICAgICAgICAgICAgcmVzdWx0ICs9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlc3VsdD1yZXN1bHQ7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHN1YnN0cmFjayh2YWx1ZXMpIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gMDtcclxuICAgICAgICBpZiAodmFsdWVzLmxlbmd0aCA9PSAyKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHZhbHVlc1swXSAtIHZhbHVlc1sxXTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXN1bHQ9dmFsdWVzWzBdO1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MTsgaTx2YWx1ZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LT12YWx1ZXNbaV07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVzdWx0ID0gcmVzdWx0O1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBtdWx0aXBseSh2YWx1ZXMpIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gMTtcclxuICAgICAgICBmb3IgKGNvbnN0IHZhbHVlIG9mIHZhbHVlcykge1xyXG4gICAgICAgICAgICByZXN1bHQgKj0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVzdWx0ID0gcmVzdWx0O1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBkaXZpZGUodmFsdWVzKSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IHZhbHVlc1swXTtcclxuICAgICAgICBmb3IobGV0IGk9MTsgaTx2YWx1ZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICByZXN1bHQ9cmVzdWx0L3ZhbHVlc1tpXTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzdWx0LCB2YWx1ZXNbaV0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5yZXN1bHQgPSByZXN1bHQ7XHJcblxyXG4gICAgfVxyXG5cclxufSIsImNvbnN0IGRpdkhpc3RvcnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjSGlzdG9yeScpO1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBoaXN0b3J5ID0gKG9wZXJhdGlvbiwgcmVzdWx0KSA9PiB7XHJcbiAgICBjb25zdCByZXN1bHRJbmZvcm1hdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgcmVzdWx0SW5mb3JtYXRpb24uaW5uZXJIVE1MID0gYFxyXG4gICAgPGRpdiBjbGFzcz1cInJlc3VsdF9ib3hcIj5cclxuICAgICAgICA8c21hbGw+JHtvcGVyYXRpb259PC9zbWFsbD5cclxuICAgICAgICA8aDM+JHtyZXN1bHR9PC9oMz5cclxuICAgIDwvZGl2PlxyXG4gICAgYDtcclxuICAgIGRpdkhpc3RvcnkuYXBwZW5kKHJlc3VsdEluZm9ybWF0aW9uKTtcclxufSIsImltcG9ydCB7T3BlcmF0aW9uLCBoaXN0b3J5fSBmcm9tICcuL2pzL2ltcG9ydC1jbGFzc2VzJ1xyXG5pbXBvcnQgJy4vanMvYXBwJztcclxuaW1wb3J0ICcuL2Nzcy9zdHlsZS5jc3MnO1xyXG5cclxuZXhwb3J0IGxldCBvcGVyYXRpb24gPSBuZXcgT3BlcmF0aW9uKCk7IiwiXHJcbmltcG9ydCB7IG9wZXJhdGlvbiB9IGZyb20gXCIuLi9pbmRleFwiO1xyXG5pbXBvcnQgeyBoaXN0b3J5IH0gZnJvbSBcIi4vaW1wb3J0LWNsYXNzZXNcIlxyXG4vLyBHbG9iYWwgVmFyaWFibGVzXHJcbmxldCBvcGVyYXRpb25WYWx1ZXMgPSBuZXcgQXJyYXkoKSwgb3BlcmF0aW9uU2lnbnMgPSBbXSwgaXNGaXJzdE9wZXJhdGlvbiA9IHRydWUsXHJcbiAgICBvcGVyYXRpb25IaXN0b3J5ID0gXCJcIiwgaXNOZXdOdW1iZXIgPSBmYWxzZTtcclxuXHJcbi8vQ2FsbGluZyBodG1sIHJlZmVyZW5jZXNcclxuY29uc3QgcmVzdWx0U2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNSZXN1bHRzJyksXHJcbiAgICBkaXZPcGVyYXRpb25CdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI09wZXJhdGlvbnMnKSxcclxuICAgIG51bWJlcnNLZXlQYWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbnVtYmVycycpLFxyXG4gICAgZXF1YWxTaWduID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI0VxdWFsJyksXHJcbiAgICBjYXRjaFZhbHVlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcclxuXHJcblxyXG5jb25zdCBzY3JlZW5TZWN0aW9uID0gcmVzdWx0U2VjdGlvbi5maXJzdEVsZW1lbnRDaGlsZC5sYXN0RWxlbWVudENoaWxkOyAvL0JpZyBzZWN0aW9uIGZvciB0aGUgc2NyZWVuXHJcbmNvbnN0IHNtYWxsU2NyZWVuU2VjdGlvbiA9IHJlc3VsdFNlY3Rpb24uZmlyc3RFbGVtZW50Q2hpbGQuZmlyc3RFbGVtZW50Q2hpbGQ7IC8vU21hbGwgc2VjdGlvbiBmb3IgdGhlIHNjcmVlbiBcclxuXHJcbmNvbnN0IGNsZWFuVmFyaWFibGVzID0gKCkgPT4ge1xyXG4gICAgb3BlcmF0aW9uU2lnbnMgPSBbXTtcclxuICAgIG9wZXJhdGlvblZhbHVlcyA9IFtdO1xyXG4gICAgc21hbGxTY3JlZW5TZWN0aW9uLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICBzY3JlZW5TZWN0aW9uLnBsYWNlaG9sZGVyID0gXCIwXCI7XHJcbiAgICBpc0ZpcnN0T3BlcmF0aW9uID0gdHJ1ZTtcclxufVxyXG5cclxuY29uc3QgYWRkT3BlcmF0aW9uU2luZ3MgPSAoZWxlbWVudCwgd2FzVHlwZWQpID0+IHtcclxuICAgICghd2FzVHlwZWQpID8gb3BlcmF0aW9uU2lnbnMucHVzaChlbGVtZW50LmlubmVySFRNTClcclxuICAgICAgICAgICAgICAgIDogb3BlcmF0aW9uU2lnbnMucHVzaChlbGVtZW50KVxyXG4gICAgaWYgKGlzRmlyc3RPcGVyYXRpb24pIHtcclxuICAgICAgICBvcGVyYXRpb25WYWx1ZXMucHVzaChwYXJzZUZsb2F0KHNjcmVlblNlY3Rpb24uaW5uZXJIVE1MLCAxMCkpO1xyXG4gICAgfVxyXG4gICAgY2hhbmdpbmdTbWFsbFNjcmVlblZhbHVlKCdvcGVyYXRpb25TaWducycpO1xyXG4gICAgY2FsbGluZ09wZXJhdGlvbk1ldGhvZHMoKTtcclxufVxyXG5cclxuY29uc3QgcHJlc3NFcXVhbCA9ICgpPT57XHJcbiAgICBvcGVyYXRpb25WYWx1ZXMucHVzaChwYXJzZUZsb2F0KHNjcmVlblNlY3Rpb24uaW5uZXJIVE1MKSk7XHJcbiAgICBjYWxsaW5nT3BlcmF0aW9uTWV0aG9kcygpO1xyXG4gICAgaXNGaXJzdE9wZXJhdGlvbiA9IGZhbHNlO1xyXG4gICAgY2hhbmdpbmdTbWFsbFNjcmVlblZhbHVlKCdlcXVhbFNpZ24nKTtcclxuICAgIGhpc3Rvcnkob3BlcmF0aW9uSGlzdG9yeSwgb3BlcmF0aW9uLnJlc3VsdCk7XHJcbn1cclxuXHJcblxyXG5cclxubnVtYmVyc0tleVBhZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xyXG4gICAgY29uc3QgZWxlbWVudCA9IGV2ZW50LnRhcmdldDtcclxuICAgIGNoYW5naW5CaWdTY3JlZW5WYWx1ZShlbGVtZW50LCBmYWxzZSk7XHJcbn0pXHJcblxyXG5kaXZPcGVyYXRpb25CdXR0b25zLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICBjb25zdCBlbGVtZW50ID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgYWRkT3BlcmF0aW9uU2luZ3MoZWxlbWVudCwgZmFsc2UpO1xyXG4gICAgY29uc29sZS5sb2cob3BlcmF0aW9uVmFsdWVzKTtcclxufSlcclxuXHJcblxyXG5jb25zdCBjYWxsaW5nT3BlcmF0aW9uTWV0aG9kcyA9ICgpID0+IHtcclxuICAgIGlmIChvcGVyYXRpb25WYWx1ZXMubGVuZ3RoID49IDIpIHtcclxuICAgICAgICBzd2l0Y2ggKG9wZXJhdGlvblNpZ25zWzBdKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJysnOlxyXG4gICAgICAgICAgICAgICAgb3BlcmF0aW9uLmFkZChvcGVyYXRpb25WYWx1ZXMpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJy0nOlxyXG4gICAgICAgICAgICAgICAgb3BlcmF0aW9uLnN1YnN0cmFjayhvcGVyYXRpb25WYWx1ZXMpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3gnOlxyXG4gICAgICAgICAgICAgICAgb3BlcmF0aW9uLm11bHRpcGx5KG9wZXJhdGlvblZhbHVlcyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnLyc6XHJcbiAgICAgICAgICAgICAgICBvcGVyYXRpb24uZGl2aWRlKG9wZXJhdGlvblZhbHVlcyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgb3BlcmF0aW9uSGlzdG9yeSA9IGAke3NtYWxsU2NyZWVuU2VjdGlvbi5pbm5lckhUTUx9ICR7c2NyZWVuU2VjdGlvbi5pbm5lckhUTUx9ID1gO1xyXG4gICAgICAgIHNjcmVlblNlY3Rpb24uaW5uZXJIVE1MID0gb3BlcmF0aW9uLnJlc3VsdDtcclxuICAgICAgICBvcGVyYXRpb25WYWx1ZXMuc3BsaWNlKDAsIDIsIG9wZXJhdGlvbi5yZXN1bHQpO1xyXG5cclxuICAgIH1cclxuICAgIGlmIChvcGVyYXRpb25TaWducy5sZW5ndGggPT0gMikgb3BlcmF0aW9uU2lnbnMuc2hpZnQoKTtcclxuXHJcbiAgICBpc05ld051bWJlciA9IHRydWU7XHJcblxyXG59XHJcblxyXG5cclxuY29uc3QgY2hhbmdpbmdTbWFsbFNjcmVlblZhbHVlID0gKGVsZW1lbnQpID0+IHtcclxuICAgIGlmIChpc05ld051bWJlcikgeyAvL0tlZXAgdGhlIGxhc3QgdmFsdWUgYmVmb3JlIHRvIGV4ZWN1dGUgdGhlIG9wZXJhdGlvbiBtZXRob2QgXHJcbiAgICAgICAgaWYgKGVsZW1lbnQgPT09ICdvcGVyYXRpb25TaWducycpIHtcclxuICAgICAgICAgICAgc21hbGxTY3JlZW5TZWN0aW9uLmlubmVySFRNTCA9IGAke3NjcmVlblNlY3Rpb24udGV4dENvbnRlbnR9ICR7b3BlcmF0aW9uU2lnbnNbb3BlcmF0aW9uU2lnbnMubGVuZ3RoIC0gMV19YDtcclxuICAgICAgICB9IGVsc2UgaWYgKGVsZW1lbnQgPT09ICdlcXVhbFNpZ24nKSB7XHJcbiAgICAgICAgICAgIHNtYWxsU2NyZWVuU2VjdGlvbi5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoZWxlbWVudCA9PT0gJ29wZXJhdGlvblNpZ25zJykgeyAvL0dldCB0aGUgdmFsdWUganVzdCBhZnRlciBjbGlja2luZyBvbiBvcGVyYXRpb24gc2lnbnNcclxuICAgICAgICBzbWFsbFNjcmVlblNlY3Rpb24uaW5uZXJIVE1MICs9IGAke3NjcmVlblNlY3Rpb24udGV4dENvbnRlbnR9ICR7b3BlcmF0aW9uU2lnbnNbb3BlcmF0aW9uU2lnbnMubGVuZ3RoIC0gMV19YDtcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgY2hhbmdpbkJpZ1NjcmVlblZhbHVlID0gKGVsZW1lbnQsIHdhc1R5cGVkKSA9PiB7XHJcbiAgICBpZiAoaXNOZXdOdW1iZXIpIHtcclxuICAgICAgICBzY3JlZW5TZWN0aW9uLnRleHRDb250ZW50ID0gXCJcIjtcclxuICAgICAgICBpc05ld051bWJlciA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKCF3YXNUeXBlZCkge1xyXG4gICAgICAgIGlmIChlbGVtZW50LmlubmVySFRNTCA9PSAnQycpIHsgLy9DbGVhbiB2YXJpYWJibGVzXHJcbiAgICAgICAgICAgIGNsZWFuVmFyaWFibGVzKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2NyZWVuU2VjdGlvbi50ZXh0Q29udGVudCArPSBlbGVtZW50LmlubmVySFRNTDtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHdhc1R5cGVkKSB7XHJcbiAgICAgICAgaWYgKGVsZW1lbnQgPT0gJ0VzY2FwZScpIHsgLy9DbGVhbiB2YXJpYWJibGVzXHJcbiAgICAgICAgICAgIGNsZWFuVmFyaWFibGVzKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2NyZWVuU2VjdGlvbi50ZXh0Q29udGVudCArPSBlbGVtZW50O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmVxdWFsU2lnbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIHByZXNzRXF1YWwoKTtcclxufSlcclxuXHJcbmNhdGNoVmFsdWVzLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZXZlbnQpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKGV2ZW50LmtleSk7XHJcbiAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xyXG4gICAgICAgIGNhc2UgJzAnOlxyXG4gICAgICAgIGNhc2UgJzEnOlxyXG4gICAgICAgIGNhc2UgJzInOlxyXG4gICAgICAgIGNhc2UgJzMnOlxyXG4gICAgICAgIGNhc2UgJzQnOlxyXG4gICAgICAgIGNhc2UgJzUnOlxyXG4gICAgICAgIGNhc2UgJzYnOlxyXG4gICAgICAgIGNhc2UgJzcnOlxyXG4gICAgICAgIGNhc2UgJzgnOlxyXG4gICAgICAgIGNhc2UgJzknOlxyXG4gICAgICAgICAgICBjaGFuZ2luQmlnU2NyZWVuVmFsdWUoZXZlbnQua2V5LCB0cnVlKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnLyc6XHJcbiAgICAgICAgY2FzZSAnKic6XHJcbiAgICAgICAgY2FzZSAnKyc6XHJcbiAgICAgICAgY2FzZSAnLSc6XHJcbiAgICAgICAgICAgIGFkZE9wZXJhdGlvblNpbmdzKGV2ZW50LmtleSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ0VudGVyJzpcclxuICAgICAgICAgICAgcHJlc3NFcXVhbCgpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdFc2NhcGUnOlxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnSGkgQmFieScpO1xyXG4gICAgICAgICAgICBjbGVhblZhcmlhYmxlcygpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgIH1cclxufSlcclxuXHJcbiIsIiAgICBpbXBvcnQgeyBPcGVyYXRpb24gfSBmcm9tIFwiLi4vY2xhc3Nlcy9vcGVydGF0aW9uLmNsYXNzXCI7XHJcbiAgICBpbXBvcnQgeyBoaXN0b3J5IH0gZnJvbSBcIi4uL2NsYXNzZXMvcmVzdWx0LWhpc290cnkuY2xhc3NcIjtcclxuXHJcblxyXG4gICAgZXhwb3J0e09wZXJhdGlvbiwgaGlzdG9yeX07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC5qc1wiKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=