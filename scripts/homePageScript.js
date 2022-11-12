let spots = hotels = reviews = users = null

getData()

async function getData() {
    try {
        let spotsEndpoint = "https://636b38dd7f47ef51e12a98e4.mockapi.io/spots"
        let hotelsEndpoint = "https://636b38dd7f47ef51e12a98e4.mockapi.io/hotels"
        let reviewsEndpoint = "https://636b38dd7f47ef51e12a98e4.mockapi.io/reviews"
        let usersEndpoint = "https://636b38dd7f47ef51e12a98e4.mockapi.io/users"
        spots = await (await fetch(spotsEndpoint)).json()
        hotels = await (await fetch(hotelsEndpoint)).json()
        reviews = await (await fetch(reviewsEndpoint)).json()
        users = await (await fetch(usersEndpoint)).json()
        updateSearchHistory()
        updateSpotDivs()
        updateExploreDiv()
    } catch(error) {
        alert("Turn on the internet")
    }
}

function updateSearchHistory() {
    if(false) {
        // this should run when the login page is ready
        if(userLoginStatus()===false) 
            return
    }
    let searchHistoryDiv = document.querySelector("#searchHistory")
    let searchHistory = random("hotels", 4)
    searchHistory.forEach((hotelObject) => {
        searchHistoryDiv.append(objectToHTML(hotelObject))
    })
}

function updateSpotDivs() {
    let spotDivs = document.querySelectorAll(".spots")
    console.log(spotDivs)
    spotDivs.forEach((spotDiv) => {
        let spots = random("spots", 4)
        spots.forEach((spotObject) => {
            spotDiv.append(objectToHTML(spotObject))
        })
    })
}

function objectToHTML(object) {
    let image = document.createElement("img")
    image.src = object.image
    let nameH3 = document.createElement("h3")
    // nameH3.innerText = object.name
    nameH3.innerText = function random(fakeSpotNames=["Varanasi", "Agra", "Rishikesh", "Coorg", "Munnar"]) {
        let i = Math.floor(Math.random()*(--fakeSpotNames.length))
        return fakeSpotNames[i]
    }()
    let priceP = document.createElement("p")
    priceP.innerText = "Rs. " + object.price
    let ratingP = document.createElement("p")
    ratingP.innerText = "Rating - " + (object.rating % 4 + 1) + "star"
    let viewDealButton = document.createElement("button")
    viewDealButton.innerText = "View deal"
    let div = document.createElement("div")
    if(priceP.innerText==="Rs. undefined") {
        // for spots, they do not have price key
        div.append(image, nameH3, ratingP, viewDealButton)
    } else {
        div.append(image, nameH3, priceP, ratingP, viewDealButton)
    }
    return div
}

function updateExploreDiv() {
    let exploreDiv = document.querySelector("#explore")
    let exploreSpots = random("spots", 3)
    exploreSpots.forEach((spotObject) => {
        exploreDiv.append(objectToHTMLForExplore(spotObject))
    })
}

function objectToHTMLForExplore(object) {
    let image = document.createElement("img")
    image.src = object.image
    let h3 = document.createElement("h3")
    h3.innerText = "From Chillout"
    let h2 = document.createElement("h2")
    h2.innerText = "5 beautiful hill stations in South India"
    let div = document.createElement("div")
    div.append(image, h3, h2)
    return div
}

function random(items, numberOfItems=4) {
    let randomItems = []
    for(let count=1; count<=numberOfItems; count++) {
        if(items==="spots") {
            let randomIndex = Math.floor(spots.length * Math.random())
            randomItems.push(spots[randomIndex])
        }
        if(items==="hotels") {
            let randomIndex = Math.floor(hotels.length * Math.random())
            randomItems.push(hotels[randomIndex])
        }
    }
    return randomItems
}

function userLoginStatus(method="get", status=true) {
    // method = "get"/"set" 
    // status = true/false
    if(method==="set") 
        localStorage.setItem("userLoginStatus", JSON.stringify(status))
    if(method==="get") 
        return JSON.parse(localStorage.getItem("userLoginStatus")) || false
}











