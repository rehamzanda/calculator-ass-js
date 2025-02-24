// Object values
const calculator = {
 displayValue: '0',
 firstOperand: null,
 WaitingForSecondOperand: false,
 operator:null
};

const updateDisplay = () => {
    const display= document.querySelector('.screen')
    display.value = calculator.displayValue;
}

updateDisplay();


// handle key press
const keys = document.querySelector('.keys');
    keys.addEventListener('click', (event) => {
        const clickedButton = event.target; 
         // the button that was clicked , explain this line {target} = event?
         if(!clickedButton.matches('button')){
            return;
         } 
    // handleOperator(): responsible for handling arithmetic operations.
         if (clickedButton.classList.contains('operator')) {
            handleOperator(clickedButton.value); 
            updateDisplay();
            return;
         }

         if (clickedButton.classList.contains('decimal')) {
            inputDecimal(clickedButton.value);
            updateDisplay();
            return;
         }
         if (clickedButton.classList.contains('all-clear')) {
            resetCalculator();
            updateDisplay();
            return
         }

         inputDigit(clickedButton.value);
        updateDisplay();
    })

    const inputDigit= (digit) => {
        const{displayValue, WaitingForSecondOperand} = calculator;
        if (WaitingForSecondOperand === true) {
            calculator.displayValue = digit;
            calculator.WaitingForSecondOperand = false;
            }else{
                calculator.displayValue =
                displayValue === "0" ? digit : displayValue + digit; 
            }
    };
    const inputDecimal = (dot) => {
        if(calculator.WaitingForSecondOperand === true){
            calculator.displayValue = "0.";
            calculator.WaitingForSecondOperand = false;
            return;
        }
        if(!calculator.displayValue.includes(dot)) {
            calculator.displayValue += dot;
        }  
    };


         
    // handle operators
    const handleOperator = (nextOperator) => {
        const{firstOperand, displayValue, operator} = calculator;
        const inputValue= parseFloat(displayValue);
        if (operator && calculator.WaitingForSecondOperand)
        {
            calculator.operator= nextOperator;
            return
        }
       if(firstOperand == null && isNaN(inputValue)){
        calculator.firstOperand = inputValue;
        
       }else if (operator){
        const result = calculate(firstOperand, inputValue, operator)
        calculator.displayValue = `${parseFloat (result.toFixed(7))}`;
        calculator.firstOperand= result;
       }
       calculator.WaitingForSecondOperand= true;
       calculator.operator = nextOperator;
    };
    
    
// calculator logic 
const calculate = (firstOperand, secondOperand, operator) => {
    if (operator === '+') {
        return firstOperand + secondOperand;
    }
    else if (operator === '-') {
        return firstOperand - secondOperand;
    }
    else if (operator === '*') {
        return firstOperand * secondOperand;
    }
    else if (operator === '/') {
        return firstOperand / secondOperand;
    }
return secondOperand;
};

// reset calculator
const resetCalculator = () => {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.WaitingForSecondOperand = false;
    calculator.operator =null;
}