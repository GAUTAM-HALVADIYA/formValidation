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

let editId;
let isEdit;

printCard()

document.getElementById("photo").addEventListener("change", function logPhoto(event) {
    const file = event.target.files[0]; 
    
    let img = document.getElementById("img");
    
    if (file) {
        const reader = new FileReader();

        
        reader.onload = function(e) {
            const base64String = e.target.result;
            console.log("Photo Data (Base64):", base64String);
            localImage = base64String;
           
            img.style.width = "200px"
            img.style.height = "200px"
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


let submitBtn = document.getElementById("sb-button")
submitBtn.addEventListener("click", function(){
    if(validation())
    {
        addToLocal()
    }

});


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
    
    console.log(console.log({localName, localAddress, localEmail, localCountry, localTerms, localBod, localPass, localGender, localHobbies, localAge}))

    if(localName && localAddress && localEmail && localCountry &&localTerms && localBod && localPass && localGender && localHobbies && localAge){
        console.log("all fine");
        return true
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

    let img = document.getElementById("img")
    img.setAttribute("src", "")
    img.style.width = ""
    img.style.height = ""
}

function addToLocal(){

    if(isEdit)
    {
        let id = localData.findIndex(element => element.id == editId)
        localData[id] = {
            id: editId,
            name: localName,
            email: localEmail,
            password: localPass,
            bod: localBod,
            age: localAge,
            gender: localGender,
            hobbies: localHobbies,
            country: localCountry,
            address: localAddress,
            image: localImage
        };

        isEdit = false;
    }
    else{
        localData.push(
        {
            id: Date.now(),
            name: localName,
            email: localEmail,
            password: localPass,
            bod: localBod,
            age: localAge,
            gender: localGender,
            hobbies: localHobbies,
            country: localCountry,
            address: localAddress,
            image: localImage
        }
    )
    }
    console.log(localData);
    storage.setItem("data", JSON.stringify(localData))
   
    document.getElementById("rs-button").click()
    hideForm()
    printCard()
    submitBtn.textContent = "Submit";
}

function printCard(given = localData){

    let tblData = document.getElementById("tblData")
    tblData.textContent = ""


    given.forEach(element => {
        createCard(element)
    })

}

function createCard(element)
{

    let tblData = document.getElementById("tblData")

    let col = document.createElement("div")
    col.classList = "col"
        
    let tr = document.createElement("tr")
    tr.classList = ".rw"

    let wrapper = document.createElement("div")
    wrapper.classList = "wrapper"

    let img = document.createElement("img")
    img.classList = "card-img"

    for (const key in element) {
       
        let value = element[key];
        
        if(key == "image"){
            img.setAttribute("src", value)
            continue

        }
        if(key == "id")
            tr.id = value
 
        if(Array.isArray(value))
        {
            value = value.join(", ")
        }

        let td = document.createElement("td")
        td.textContent = value

        tr.append(td)

    }

    let btnWrap = document.createElement("div")
    btnWrap.classList = "d-flex gap-2"

    let edit = document.createElement("button");
    edit.id = "edit"
    edit.classList = "btn btn-primary";
    edit.textContent = "Edit";

    let del = document.createElement("button")
    del.id = "delete"
    del.classList = "btn btn-danger"
    del.textContent = "Delete"

    btnWrap.append(edit)
    btnWrap.append(del)

  
    wrapper.append(img);
    
    let tdPhoto = document.createElement("td")
    tdPhoto.append(wrapper)

    tr.prepend(tdPhoto)
    
    let td = document.createElement("td")
    td.append(btnWrap)
    
    tr.append(td)
 
    tblData.append(tr)
  
}

let form = document.getElementById("form");
let box = document.createElement("div");

document.getElementById("shw-btn").addEventListener("click", showForm)

box.addEventListener("click", hideForm)

function hideForm(){
    document.getElementById("rs-button").click()
    form.style.display = "none"
    box.remove()

    isEdit = false;
    editId = null; 
    submitBtn.textContent = "Submit"; 

}
function showForm(){
   
    box.classList.add("box-shadow");

    if (form.style.display === "none" || form.style.display === "") {
        form.style.display = "flex";
        form.after(box)
    } 
  
}


document.getElementById("search").addEventListener("input", searchList)

function searchList(){
    
    let type = document.getElementById("search").value.toLowerCase();

  let searched = localData.filter(obj =>
    Object.values(obj).some(val =>
      String(val).toLowerCase().includes(type)
    )
  );

    printCard(searched)
}

document.getElementById("tblData").addEventListener("click", function(e) {
    
    let row = e.target.closest("tr");
    
    if (!row) return;

    let id = row.id;

    if (e.target.id === "edit") {
        showData(id);
    }

    if (e.target.id === "delete") {
        deleteCard(id);
    }

});

function showData(id){
    
    editId = id;
    isEdit = true
    let givenData = localData.filter(element => element.id == id)

    let name = document.getElementById("full")
    let email = document.getElementById("email")
    let password = document.getElementById("password")  
    let date = document.getElementById("date")
    let age = document.getElementById("age")
    let image = document.getElementById("img")
    let country = document.getElementById("country")
    let address = document.getElementById("address")

    for (const key in givenData[0]) {
    
        const element = givenData[0][key];
        console.log(key, element)
        if(key == "name")
            name.value = element
        else if(key == "email")
            email.value = element
        else if(key == "password")
            password.value = element
        else if(key == "bod")
            date.value = element
        else if(key == "age"){
            age.value = element
            localAge = element
        }
        else if(key == "country")
            country.value = element
        else if(key == "image")
            image.setAttribute("src", element)
        else if(key == "address")
            address.value = element
        else if(key == "gender")
        {
            let gender = document.querySelectorAll('input[name="RadioOptions"]')
            gender.forEach(radio => {
                if(radio.value == element)
                    radio.checked = (radio.value == element);
            })
        }
        else if(key == "hobbies")
        {
            let hobbies = document.querySelectorAll('input[name="hobbies"]')
            hobbies.forEach(check => {
                if(element.includes(check.value))
                    check.checked = true;
            })
        }
        
    }

    showForm()
    submitBtn.textContent = "Update"; 

}

function deleteCard(id){
    if(confirm("Are you sure?")){
        localData = localData.filter(el => el.id != id);
        storage.setItem("data", JSON.stringify(localData));
        printCard();
    }
}



