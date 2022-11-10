let users = null
let userObject = null

loadUsersData()

document.querySelector("form").addEventListener("submit", (event) => {
    if(users===null) {
        alert("Your internet is very slow. Try again")
        return
    }
    let form = event.target
    if(form.name.value==="" || form.password.value==="") {
        event.preventDefault()
        alert("Please fill all the fields")
        return
    }
    userObject = userDetails(form);
    if(userObject===undefined) {
        event.preventDefault()
        alert("Account do not exist. Please go to signup page to create a account")
        return
    } 
    updateUserDetails()
    alert("Login successful")
})

async function loadUsersData() {
    // let usersEndpoint = "https://636b38dd7f47ef51e12a98e4.mockapi.io/users"
    // users = await (await fetch(usersEndpoint)).json()
    users = JSON.parse(localStorage.getItem("users")) || []
}

function userDetails(form) {
    // if user exist, return the userObject
    for(let i=0; i<users.length; i++)
        if(form.password.value===users[i].password)
        if(form.email.value===users[i].email)
            return users[i];
}

function updateUserDetails() {
    localStorage.setItem("user", JSON.stringify(userObject))
}