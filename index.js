const inputSlider = document.querySelector("[data-lengthSlider]");
const lenthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");

const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");

const symbols = '!@#$%^&*()_+~+';

let password = "";
let passwordLength = 10;
let checkCount = 0;


handleSlider();
setIndicator("#ccc");

function handleSlider() {
    inputSlider.value = passwordLength;
    lenthDisplay.innerText = passwordLength;
}

//indicator function

function setIndicator(color) {
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomNumber() {
    return getRndInteger(0, 9);
}

function generateLowercase() {
    return String.fromCharCode(getRndInteger(97, 122));
}

function generateUppercase() {
    return String.fromCharCode(getRndInteger(65, 90));
}

function generateSymbol() {
    return symbols.charAt(getRndInteger(0, symbols.length));
}

//input slider logic

inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
})

// calculate strength


function calStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSym = false;

    if (uppercaseCheck.checked) hasUpper = true;

    if (lowercaseCheck.checked) hasLower = true;

    if (numbersCheck.checked) hasNumber = true;

    if (symbolsCheck.checked) hasSym = true;

    //condition
    if (hasUpper && hasLower && (hasNumber || hasSym) && passwordLength >= 8) {
        setIndicator('green');

    }
    else if ((hasLower || hasNumber) && (hasSym || hasUpper) && passwordLength >= 6) {
        setIndicator('#ff0');

    }
    else {
        setIndicator('#f00');
    }
}

async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value)
        copyMsg.innerText = "copied";
    }
    catch (e) {
        copyMsg.innerText = "Failed";
    }

    copyMsg.classList.add("active");
    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000);
}

function handleCheckBoxChange() {
    checkCount = 0;
    allCheckBox.forEach((checkbox) => {

        if (checkbox.checked) {
            checkCount++;
        }
    })


    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
}

allCheckBox.forEach(checkbox => {
    checkbox.addEventListener('change', handleCheckBoxChange)

});

copyBtn.addEventListener('click', () => {
    if (passwordDisplay.value) copyContent();
})




generateBtn.addEventListener('click', () => {
    if(checkCount <=0) return;


    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }


    password ="";



    let funcArr = [];

    if(uppercaseCheck.checked) {
        funcArr.push(generateUppercase);

    }
    if(lowercaseCheck.checked) {
        funcArr.push(generateLowercase);
        
    }
    if(numbersCheck.checked) {
        funcArr.push(generateRandomNumber);
        
    }
    if(symbolsCheck.checked) {
        funcArr.push(generateSymbol);
        
    }
    


    for(let i = 0; i < funcArr.length; i++){
        password += funcArr[i]();
    }
    


    for(let i = 0; i < passwordLength - funcArr.length ; i++){
        let randIndex = getRndInteger(0 , funcArr.length);
        password += funcArr[randIndex]();
    }

    password = shufflePassword(Array.from(password));

    passwordDisplay.value = password;
    calStrength();
})



function shufflePassword(array) {
    for(let i = array.length-1; i >0; i--){
        const j = Math.floor(Math.random()* (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;

}