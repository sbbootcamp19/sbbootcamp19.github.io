const input = document.querySelector(".inputControl");
const buttons = document.querySelectorAll(".button");

let shouldReset = false;

function clearAll() {
    input.value = "";
    shouldReset = false;
}

function endsInOperator(value) {
    // check to make sure the end does not contain an operator
    return ["+", "-", "/", "x"].includes(value[value.length - 1]);
}

function performOperator(op) {
    if (input.value === "" || endsInOperator(input.value)) return;
    input.value = `${input.value}${op}`;
    shouldReset = false;
}

for(let button of buttons) {
    button.addEventListener("click", function(evt) {
        const value = button.innerText;
        switch (value) {
            case "+":
                performOperator("+");
                break;
            case "-":
                performOperator("-");
                break;
            case "/":
                performOperator("/");
                break;
            case "x":
                performOperator("*");
                break;
            case "C":
                clearAll();
                break;
            case "=":
                if (input.value === "") return;
                if (endsInOperator(input.value)) {
                    input.value = input.value.substring(0, input.value.length - 1);
                }
                console.log(input.value);
                input.value = eval(input.value);
                shouldReset = true;
                break;
            default:
                input.value = shouldReset || (input.value === "") ? button.innerText : `${input.value}${button.innerText}`;
                shouldReset = false;
        }
    });
}



function hasLetter(value) {
    const alphabet = ["abcdefghijlkmnopqrstuvwxyz"];
    for (let letter of alphabet) {
        if (value.indexOf(letter) > -1) return true;
    }
    return false;
}

input.addEventListener("keyup", function(evt) {
    const value = evt.target.value;
    if (hasLetter(value)) {
        input.value = value.substring(0, value.length - 1);
    }
});

