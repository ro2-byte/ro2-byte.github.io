const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('light-theme');
    themeToggle.textContent = document.body.classList.contains('dark-theme') 
        ? 'Switch to Light Theme' : 'Switch to Dark Theme';
});

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const sendBtn = document.getElementById("sendBtn");
const togglePass = document.getElementById("togglePass");
const strengthFill = document.getElementById("strengthFill");

togglePass.addEventListener("click", () => {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePass.textContent = "Hide";
    } else {
        passwordInput.type = "password";
        togglePass.textContent = "Show";
    }
});

nameInput.addEventListener("input", () => {
    const errorDiv = document.getElementById("nameError");
    errorDiv.textContent = nameInput.value.trim() === "" ? "Name is required" : "";
});

emailInput.addEventListener("input", () => {
    const val = emailInput.value;
    const errorDiv = document.getElementById("emailError");
    if (val === "") errorDiv.textContent = "Email is required";
    else errorDiv.textContent = (val.includes("@") && val.includes(".")) ? "" : "Invalid email format";
});

passwordInput.addEventListener("input", () => {
    const pass = passwordInput.value;
    const errorDiv = document.getElementById("passwordError");
    const hasUpper = /[A-Z]/.test(pass);
    const hasNumber = /[0-9]/.test(pass);
    let strength = 0;

    if (pass.length >= 6) strength += 30;
    if (hasUpper) strength += 35;
    if (hasNumber) strength += 35;

    strengthFill.style.width = strength + "%";
    if (strength < 50) strengthFill.style.background = "red";
    else if (strength < 80) strengthFill.style.background = "orange";
    else strengthFill.style.background = "green";

    if (pass === "") errorDiv.textContent = "Password is required";
    else if (!hasUpper && !hasNumber) errorDiv.textContent = "Include uppercase letter & number";
    else if (!hasUpper) errorDiv.textContent = "Include at least one uppercase letter";
    else if (!hasNumber) errorDiv.textContent = "Include at least one number";
    else errorDiv.textContent = "";
});

document.getElementById('formArea').addEventListener('keydown', function(e){
    if (e.key === 'Enter'){
        e.preventDefault();
        sendBtn.click();
    }
});

sendBtn.addEventListener("click", () => {
    document.getElementById("nameError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("passwordError").textContent = "";

    let allGood = true;

    if (nameInput.value.trim() === "") {
        document.getElementById("nameError").textContent = "Name is required";
        allGood = false;
    }

    const emailVal = emailInput.value.trim();
    if (emailVal === "") {
        document.getElementById("emailError").textContent = "Email is required";
        allGood = false;
    } else if (!emailVal.includes("@") || !emailVal.includes(".")) {
        document.getElementById("emailError").textContent = "Invalid email";
        allGood = false;
    }

    const pass = passwordInput.value.trim();
    const hasUpper = /[A-Z]/.test(pass);
    const hasNumber = /[0-9]/.test(pass);
    if (pass === "") {
        document.getElementById("passwordError").textContent = "Password is required";
        allGood = false;
    } else if (!hasUpper || !hasNumber) {
        document.getElementById("passwordError").textContent = "Password must include uppercase & number";
        allGood = false;
    }

    if (allGood){
        document.getElementById("formArea").style.display = "none";
        document.getElementById("done").style.display = "block";
    }
});
