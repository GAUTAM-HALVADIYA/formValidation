let first = document.getElementById("first");
let last = document.getElementById("last");
let password = document.getElementById("password");
let email = document.getElementById("email");
document.getElementById("button").addEventListener("click", validation);
document.getElementById("button").addEventListener("keyup", validation);



let regex = /^[a-zA-Z]+([._-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
let regPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%&!])[A-Za-z\d@#$%&!]{8,}$/;

function validation(){

   let input = document.querySelectorAll(".form-control");

    input.forEach(element => {
        if (element.value === "") {
            showInValid(element, "Field is mandatory");
        }
    });
    // if(regex.test(email.value))
    //     showValid(email, "valid Email")
    // else
    //     showInValid(email, "invalid main")

    // if(!regPass.test(password.value))
    // {
    //     alert("please enter valid password")
    // }

    // console.log(password.value);
    
}


function showInValid(element, msg){

    let next = element.nextElementSibling;
    if (next && (next.classList.contains("valid-feedback") || next.classList.contains("invalid-feedback"))) {
        next.remove();
    }

    let newMsg = document.createElement("span");
    newMsg.classList.add("invalid-feedback");
    newMsg.textContent = msg;

    element.after(newMsg);
}

function showValid(element, msg){
    let newMsg = document.createElement("span");
    newMsg.classList.add("valid-feedback");
    newMsg.textContent = msg;

    element.after(newMsg);
}


