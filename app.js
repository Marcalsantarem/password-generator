const inputEl = document.querySelector("#password");
const upperCaseCheckEl = document.querySelector("#uppercase-check");
const numberCheckEl = document.querySelector("#number-check");
const symbolCheckEl = document.querySelector("#symbol-check");
const securityIndicatorBarEl = document.querySelector("#security-indicator-bar");

let passwordLength = 16;

function generatePassword() {

    let chars = "abcdefghjklmnpqrstuvxwyz";
            
    const upperCaseChars = "ABCDEFGHJKLMNPQRSTUVXWYZ";
    const numberChars = "123456789";
    const symbolChars = "?!@&*()[]";

    if (upperCaseCheckEl.checked) {
        chars += upperCaseChars;
    }

    if (numberCheckEl.checked) {
        chars += numberChars;
    }

    if (symbolCheckEl.checked) {
        chars += symbolChars;
    }

    let password = "";

    for (let i = 0; i < passwordLength; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
    }
            
    inputEl.value = password;
    calculateSecurity();
    calculateFontSize();
}

function calculateSecurity() {
    const percent = Math.round((passwordLength / 64) * 25 +
             (upperCaseCheckEl.checked ? 15 : 0) +
             (numberCheckEl.checked ? 25 : 0) +
             (symbolCheckEl.checked ? 35 : 0));

    securityIndicatorBarEl.style.width = `${percent}%`;

    if (percent > 69) {
        securityIndicatorBarEl.classList.remove("critical");
        securityIndicatorBarEl.classList.remove("warning");
        securityIndicatorBarEl.classList.add("safe");
    } else if (percent > 45) {
        securityIndicatorBarEl.classList.remove("critical");
        securityIndicatorBarEl.classList.add("warning");
        securityIndicatorBarEl.classList.remove("safe");
    } else {
        securityIndicatorBarEl.classList.add("critical");
        securityIndicatorBarEl.classList.remove("warning");
        securityIndicatorBarEl.classList.remove("safe");
    }

    if (percent >= 100) {
        securityIndicatorBarEl.classList.add("completed");
    } else {
        securityIndicatorBarEl.classList.remove("completed");
    }
}

function calculateFontSize() {
    if (passwordLength > 45) {
        inputEl.classList.remove("font-sm");
        inputEl.classList.remove("font-xs");
        inputEl.classList.add("font-xxs");
    } else if (passwordLength > 32) {                
        inputEl.classList.remove("font-sm");
        inputEl.classList.add("font-xs");
        inputEl.classList.remove("font-xxs");
    } else if (passwordLength > 22) {
        inputEl.classList.add("font-sm");
        inputEl.classList.remove("font-xs");
        inputEl.classList.remove("font-xxs");
    } else {
        inputEl.classList.remove("font-sm");
        inputEl.classList.remove("font-xs");
        inputEl.classList.remove("font-xxs");
    }
}

function copyPassword() {
    navigator.clipboard.writeText(inputEl.value);
}

const copyButtonEl = document.querySelector("#copy-1");
copyButtonEl.addEventListener("click", copyPassword);

const copyButton2El = document.querySelector("#copy-2");
copyButton2El.addEventListener("click", copyPassword);

const renewButtonEl = document.querySelector("#renew");
renewButtonEl.addEventListener("click", generatePassword);

const passwordLengthEl = document.querySelector("#password-length");
passwordLengthEl.addEventListener("input", () => {
    passwordLength = passwordLengthEl.value;
    document.querySelector("#password-length-text").innerText = passwordLength;
    generatePassword();
});

upperCaseCheckEl.addEventListener('click', generatePassword);
numberCheckEl.addEventListener('click', generatePassword);
symbolCheckEl.addEventListener('click', generatePassword);

generatePassword();