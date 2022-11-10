let user = JSON.parse(localStorage.getItem("user"))
let greeting = document.querySelector("h1")
greeting.innerText = `Welcome back ${user.firstName}`