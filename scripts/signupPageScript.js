let users = null
let userObject = null

loadUsersData()

document.querySelector("form").addEventListener("submit", (event) => {
    if(users===null) {
        event.preventDefault()
        alert("Your internet is very slow. Try again")
        return
    }
    let form = event.target
    if(form.firstName.value==="" || form.lastName.value==="" || form.email.value==="" || form.password.value==="") {
        event.preventDefault()
        alert("Please fill all the fields")
        return
    }
    userObject = userDetails(form);
    if(userObject!==undefined) {
        event.preventDefault()
        alert("Account already exist. Please go to login page or create a new account")
        return
    } 
    // here user do not exist
    userObject = {
        id: Math.floor(Math.random() * 100),
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        email: form.email.value,
        password: form.password.value,
        searchHistory: [],
        car: [],
        avatar: "../resources/userAvatarPlaceholder.png"
    }
    addUserDetails()
    alert("Account created successfully")
})

async function loadUsersData() {
    // let usersEndpoint = "https://636b38dd7f47ef51e12a98e4.mockapi.io/users"
    // users = await (await fetch(usersEndpoint)).json()
    users = JSON.parse(localStorage.getItem("users")) || []
}

function userDetails(form) {
    // if user exist, return the userObject
    for(let i=0; i<users.length; i++)
        // the name input field consist of both first and last name separated by space
        if(form.firstName.value===users[i].firstName)
        if(form.lastName.value===users[i].lastName)
        if(form.password.value===users[i].password)
        if(form.email.value===users[i].email)
            return users[i];
}

function addUserDetails() {
    users.push(userObject)
    // post the user on api not in localStorage 
    localStorage.setItem("users", JSON.stringify(users))
    localStorage.setItem("user", JSON.stringify(userObject))
}