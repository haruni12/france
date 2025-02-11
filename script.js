// Function to append values to the display
function appendToDisplay(value) {
    document.getElementById('display').value += value;
}

// Function to clear the display
function clearDisplay() {
    document.getElementById('display').value = '';
}

// Function to calculate the result
function calculate() {
    let displayValue = document.getElementById('display').value;

    // Handling square root, logarithms, and trigonometric functions using regular expressions
    displayValue = displayValue.replace(/sqrt/g, 'Math.sqrt');
    displayValue = displayValue.replace(/log/g, 'Math.log10');
    displayValue = displayValue.replace(/sin/g, 'Math.sin');
    displayValue = displayValue.replace(/cos/g, 'Math.cos');
    displayValue = displayValue.replace(/tan/g, 'Math.tan');
    
    displayValue = displayValue.replace(/\^/g, '**'); // For exponentiation (e.g., 2^3 = 2**3)

    try {
        // Evaluate the expression after safely converting functions to valid JavaScript functions
        const result = eval(displayValue);
        
        // Display the result
        document.getElementById('display').value = result;

        // Enable the "Continue" button once calculation is done
        document.getElementById('continue').style.display = 'inline-block';
        document.getElementById('delete').style.display = 'inline-block';
    } catch (error) {
        // In case of error (e.g., invalid expression), display an error message
        document.getElementById('display').value = 'Error';
    }
}

// Function to delete the result (clear the display)
function deleteAnswer() {
    document.getElementById('display').value = '';
    
    // Hide the "Continue" and "Delete" buttons after deletion
    document.getElementById('continue').style.display = 'none';
    document.getElementById('delete').style.display = 'none';
}

// Function to continue calculation with the result
function continueCalculation() {
    // Append the result to the current display
    let currentDisplay = document.getElementById('display').value;
    document.getElementById('display').value = currentDisplay + '';

    // Hide the "Continue" and "Delete" buttons after continuing
    document.getElementById('continue').style.display = 'none';
    document.getElementById('delete').style.display = 'none';
}

// Prevent invalid input (no consecutive operators)
document.getElementById('display').addEventListener('input', function(e) {
    let value = e.target.value;
    
    // Check if the last character is an operator and prevent multiple operators in a row
    if (/[\+\-\*\/\^\(\)]/.test(value.charAt(value.length - 1)) && /[\+\-\*\/\^\(\)]/.test(value.charAt(value.length - 2))) {
        e.target.value = value.slice(0, -1);
    }
});