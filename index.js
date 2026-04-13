let storage = window.localStorage;
let localData = JSON.parse(storage.getItem("data")) || [];


let localName;
let localEmail;
let localPass;
let localBod;
let localAge;
let localGender;
let localHobbies;
let localImage = "./passport.jpg";
let localCountry;
let localAddress;
let localTerms;

printCard()

document.getElementById("photo").addEventListener("input", function logPhoto(event) {
    const file = event.target.files[0]; 
    
    let img = document.getElementById("img");
    
    if (file) {
        const reader = new FileReader();

        
        reader.onload = function(e) {
            const base64String = e.target.result;
            console.log("Photo Data (Base64):", base64String);
            localImage = base64String;
           
            img.setAttribute("src", base64String)
        };

        reader.readAsDataURL(file);
        

    }
})

let full = document.getElementById("full");
let password = document.getElementById("password");
let email = document.getElementById("email");
let dates = document.getElementById("date")
let country = document.getElementById("country")

document.querySelectorAll(".form-control").forEach(input => {
    input.addEventListener("keyup", function() {
        validateSingleField(this);
    });
});



document.getElementById("sb-button").addEventListener("click", validation);
document.getElementById("rs-button").addEventListener("click", reset);

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
    else if(element.id == "address")
        validateField(element, /^.[a-zA-Z0-9 ,.-]{10,}$/,"Please write valid Address at least min 10 character");
    
}


function validation() {

    localName = validateField(full, regName, "At least 3 letters; no starting space.");
    localEmail = validateField(email, regex, "Enter valid email");
    localPass = validateField(password, regPass, "Password must be strong");
    localAddress = validateField(address, /^.[a-zA-Z0-9 ,.-]{10,}$/,"Please write valid Address");
    validateOther();
    
    if(localName && localAddress && localEmail && localCountry &&localTerms && localBod && localPass && localGender && localHobbies && localAge)
    { 
        console.log("all fine");
        addToLocal(localData.length)
    }   
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
        return element.value;
    }

    return false;
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
    localAge = 0;
    let date = new Date()
    let age = date.getFullYear() - dob[0]
    if(dob[1] >= date.getMonth + 1)
    {
        if(dob[2] > date.getDate())
            age = age - 1;
    }

    ageElem.value = age;
    if(age < 18)
        otherFeedback(ageElem, "Must be 18 or above", false)
    else{
        localAge = age;
        if (ageElem.nextElementSibling ) {
            ageElem.nextElementSibling.remove();
            ageElem.classList.remove("is-invalid");
        }
    }
    
}

function validateOther(){

    let date = document.getElementById("date")
    localBod = otherFeedback(date, "DOB is mendatory", date?.value)

    let gender = document.querySelector('input[name="RadioOptions"]:checked')?.value;
    localGender = otherFeedback(document.getElementById("last-radio"), "Please select gender", gender)

    let checkedBoxes = document.querySelectorAll('input[name="hobbies"]:checked');
    let selectedHobbies = Array.from(checkedBoxes).map(cb => cb.value);
    localHobbies = otherFeedback(document.getElementById("last-checkBox"), "Please select your hobbies", selectedHobbies);

    let country = document.getElementById("country")
    localCountry = otherFeedback(country, "Please select country", country?.value);

    let terms = document.querySelector('input[name="terms"]:checked');
    localTerms = otherFeedback(document.getElementById("terms"), "Please select terms", terms?.value);

    // console.log(gender); 
    // console.log(selectedHobbies); 
    // console.log(country.value)
    // console.log(terms)
    // console.log(date?.value);
    // console.log(localTerms)
  

}

function otherFeedback(element, msg, isValid)
{
    let hasValue = Array.isArray(isValid) ? isValid.length > 0 : isValid;
    let next = element.nextElementSibling;
    if (next && next.classList.contains("invalid-feedback")) {
        next.remove();
        element.classList.remove("is-invalid");
    }

    if(!hasValue){
        showInValid(element, msg);
        return false
    }
    else
    {
        return isValid;
    }

 
}

function reset()
{
    document.querySelectorAll(".invalid-feedback").forEach(input => input.remove())
    document.querySelectorAll(".valid-feedback").forEach(input => input.remove())
    document.querySelectorAll(".is-invalid").forEach(input => input.classList.remove("is-invalid"))
    document.querySelectorAll(".is-valid").forEach(input => input.classList.remove("is-valid"))

    document.getElementById("img").setAttribute("src", "")
}

function addToLocal(length){

    localData.push(
        {
            id: length,
            name: localName,
            email: localEmail,
            age: localAge,
            gender: localGender,
            hobbies: localHobbies,
            country: localCountry,
            address: localAddress,
            image: localImage
        }
    )
    console.log(localData);
    storage.setItem("data", JSON.stringify(localData))
   
    document.getElementById("rs-button").click()

    printCard()

}

function printCard(){
    
    let show = document.getElementById("show")
    show.textContent = ""

    localData.forEach(element => {
        createCard(element)
    })



}

function createCard(element)
{
    let show = document.getElementById("show")

        
    let card = document.createElement("div")
    card.classList = "card"

    let wrapper = document.createElement("div")
    wrapper.classList = "wrapper"

    let img = document.createElement("img")
    img.classList = "card-img"
    

    wrapper.append(img);

    let cardBody = document.createElement("div")
    cardBody.classList = "card-body"

    for (const key in element) {
       
        let value = element[key];
        
        if(key == "image"){
            img.setAttribute("src", value)
            continue

        }
       

        if(Array.isArray(value))
        {
            value = value.join(", ")
        }

        let title  = document.createElement("h6")
        title.textContent = key

        let text  = document.createElement("p")
        text.textContent = value

        cardBody.append(title)
        cardBody.append(text)


    }

    card.append(wrapper)
    card.append(cardBody)

    show.append(card)
}

