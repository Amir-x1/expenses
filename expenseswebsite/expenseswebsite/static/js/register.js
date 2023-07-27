
const usernameField = document.querySelector("#usernameField");
const usernameErrorFiled = document.querySelector("#usernameErrorField");
usernameField.addEventListener("keyup", (ev) => {
    const usernameVal = ev.target.value;
    console.log(usernameVal)
    usernameField.classList.remove("is-invalid");
    usernameErrorFiled.style.display = 'none';
    if(usernameVal.length > 0) {
        fetch('/authentication/validate-username', {
            body: JSON.stringify({username: usernameVal}),
            method: "POST"
        })
            .then((res)=> res.json())
            .then((data)=>{
                console.log("data", data)
                if(data.username_error){
                    usernameErrorFiled.innerHTML = data.username_error;
                    console.log('aaa', data.username_error)
                    usernameField.classList.add("is-invalid");
                    usernameErrorFiled.style.display = 'block';
                }
            })
    }
})