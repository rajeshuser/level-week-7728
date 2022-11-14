if(userLoginStatus()===false) {
    let greeting = document.querySelector("h1")
    greeting.innerText = `Please login to see your account`
    document.querySelector("#loginButton").hidden = false
    document.querySelector("#logoutButton").hidden = true
} else {
    let user = JSON.parse(localStorage.getItem("user"))
    let greeting = document.querySelector("h1")
    greeting.innerText = `Welcome back ${user.firstName}`
    document.querySelector("#loginButton").hidden = true
    document.querySelector("#logoutButton").hidden = false
}

document.querySelector("#logoutButton").addEventListener("click", function logoutTheUser(event) {
    localStorage.removeItem("user")
})

function userLoginStatus(method="get", status=true) {
    // method = "get"/"set" 
    // status = true/false
    if(method==="set") 
        localStorage.setItem("user", JSON.stringify(status))
    if(method==="get") 
        return JSON.parse(localStorage.getItem("user")) || false
}