let full = document.getElementById("full");
let password = document.getElementById("password");
let email = document.getElementById("email");
let dates = document.getElementById("date")
let photo = document.getElementById("photo")

document.querySelectorAll(".form-control").forEach(input => {
    input.addEventListener("keyup", function() {
        validateSingleField(this);
    });
});

document.getElementById("sb-button").addEventListener("click", validation);

let regex = /^[a-zA-Z]+([._-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
let regPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%&!])[A-Za-z\d@#$%&!]{8,}$/;
let regName = /^\S[a-zA-Z, .'-]{2,}$/;

function validateSingleField(element) {

    if(element.id == "full")
        validateField(element, regName, "At least 3 letters; no starting space.");
    else if(element.id == "email")
        validateField(element, regex, "Enter valid email");
    else if(element.id == "password")
        validateField(element, regPass, "Password must be strong");
    else if(element.id == "date")
        validateField(element, /^/,"DOB is mandatory");
    else if(element.id == "photo")
        validateField(element, /^/,"Please attach photo");
    else if(element.id == "address")
        validateField(element, /^.[a-zA-Z0-9,.-]{10,}$/,"Please write valid Address");
    
}


function validation() {

    validateField(full, regName, "At least 3 letters; no starting space.");
    validateField(email, regex, "Enter valid email");
    validateField(password, regPass, "Password must be strong");
    validateField(dates, /^/,"DOB is mandatory");
    validateField(photo, /^/,"Please attach photo");
    validateField(address, /^.[a-zA-Z0-9,.-]{10,}$/,"Please write valid Address");

}

function validateField(element, regex, errorMsg) {

    removeFeedback(element);

    if (element.value === "") {
        showInValid(element, "Field is mandatory");
    }
    else if (!regex.test(element.value)) {
        showInValid(element, errorMsg);
    }
    else {
        showValid(element, "Looks good!");
    }
}

function removeFeedback(element) {
    let next = element.nextElementSibling;
    if (next && (next.classList.contains("valid-feedback") || next.classList.contains("invalid-feedback"))) {
        next.remove();
    }

    element.classList.remove("is-valid", "is-invalid");
}

function showInValid(element, msg) {

    element.classList.add("is-invalid");

    let newMsg = document.createElement("div");
    newMsg.classList.add("invalid-feedback");
    newMsg.textContent = msg;

    element.after(newMsg);
}

function showValid(element, msg) {

    element.classList.add("is-valid");

    let newMsg = document.createElement("div");
    newMsg.classList.add("valid-feedback");
    newMsg.textContent = msg;

    element.after(newMsg);
}


document.getElementById("date").addEventListener("input", age)

function age(e){

    let ageElem = document.getElementById("age");
    let dob = e.target.value.split("-");
    
    let date = new Date()
    let age = date.getFullYear() - dob[0]
    if(dob[1] >= date.getMonth + 1)
    {
        if(dob[2] <= date.getDate())
            ageElem.value = age;
        else
            ageElem.value = age - 1;
    }
    else
        ageElem.value = age;
}