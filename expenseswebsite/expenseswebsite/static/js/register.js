
const usernameField = document.querySelector("#usernameField");
const usernameErrorFiled = document.querySelector("#usernameErrorField");
const usernameCheckingFiled = document.querySelector("#usernameCheckingField");
const emailErrorFiled = document.querySelector("#emailErrorField");
const emailCheckingFiled = document.querySelector("#emailCheckingField");
const emailField = document.querySelector("#emailField");
const passwordField = document.querySelector("#passwordField");
const passwordVisibilityToggle = document.querySelector("#passwordVisibilityToggle");



usernameField.addEventListener("keyup", (ev) => {
    const usernameVal = ev.target.value;
    console.log(usernameVal)
    usernameField.classList.remove("is-invalid");
    usernameErrorFiled.style.display = 'none';
    if(usernameVal.length > 0) {
        usernameCheckingFiled.style.display = 'block';
        fetch('/authentication/validate-username', {
            body: JSON.stringify({username: usernameVal}),
            method: "POST"
        })
            .then((res)=> res.json())
            .then((data)=>{
                usernameCheckingFiled.style.display = 'none';
                if(data.username_error){
                    usernameErrorFiled.innerHTML = data.username_error;
                    usernameField.classList.add("is-invalid");
                    usernameErrorFiled.style.display = 'block';
                }
            })
    }
})

emailField.addEventListener("keyup", (ev) => {
    const emailVal = ev.target.value;
    emailField.classList.remove("is-invalid");
    emailErrorFiled.style.display = 'none';
    if(emailVal.length > 0) {
        emailCheckingFiled.style.display = 'block';
        fetch('/authentication/validate-email', {
            body: JSON.stringify({email: emailVal}),
            method: "POST"
        })
            .then((res)=> res.json())
            .then((data)=>{
                emailCheckingFiled.style.display = 'none';
                if(data.email_error){
                    emailErrorFiled.innerHTML = data.email_error;
                    emailField.classList.add("is-invalid");
                    emailErrorFiled.style.display = 'block';
                }
            })
    }
})

passwordVisibilityToggle.addEventListener("click", (e)=>{
    if(passwordVisibilityToggle.textContent==="SHOW"){
        passwordVisibilityToggle.textContent = "HIDE";
        passwordField.type = "text";
    }else if(passwordVisibilityToggle.textContent==="HIDE"){
        passwordVisibilityToggle.textContent = "SHOW";
        passwordField.type = "password";
    }
})