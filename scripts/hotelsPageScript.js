let hotels = []
let filteredAndSortedHotels = []
let cart = JSON.parse(localStorage.getItem("cart")) || []

loadHotels() 

let filterInputElements = document.querySelectorAll("#filters input")

for(let i=0; i<filterInputElements.length; i++) {
    filterInputElements[i].addEventListener("change", filterAndSortHotels)
}
document.querySelector("#sort").addEventListener("change", filterAndSortHotels)
document.querySelector("#searchDiv>button").addEventListener("click", filterAndSortHotels)

function filterAndSortHotels() {

    // filtering
    filteredAndSortedHotels = hotels.filter((hotel) => {
        // return true if passes through filter
        let isPassedFilter = false
        for(let i=0; i<filterInputElements.length; i++) {
            let inputType = filterInputElements[i].type
            if(inputType==="checkbox" && filterInputElements[i].checked===false)
            // if the option is not checked or it is not the price input, continue to the next option
                continue

            let category = filterInputElements[i].getAttribute("class")
            let value = filterInputElements[i].getAttribute("value")
            
            if(category==="covidSafe") {
                if(hotel.covidSafe===true) {
                    isPassedFilter = true
                    continue
                }
            } else if(category==="deals") {
                let isCheckedDealPresentInHotelDeals = false
                for(let i=0; i<hotel.deals.length; i++) {
                    if(hotel.deals[i]===value) {
                        isCheckedDealPresentInHotelDeals = true
                    }
                }
                if(isCheckedDealPresentInHotelDeals===true) {
                    isPassedFilter = true
                    continue
                }
            } else if(category==="price") {
                let _value = filterInputElements[i].value
                document.querySelector("div[name=priceFilter]>p").innerText= `Rs. ${+_value}`
                if(hotel.price<=+_value) {
                    isPassedFilter = true
                    continue
                }
            } else if(category==="propertyType") {
                if(hotel.propertyType===value) {
                    isPassedFilter = true
                    continue
                }
            }
            if(category==="amenities") {
                let isCheckedAmenityPresentInHotelAmenities = false
                for(let i=0; i<hotel.amenities.length; i++) {
                    if(hotel.amenities[i]===value) {
                        isCheckedAmenityPresentInHotelAmenities = true
                    }
                }
                if(isCheckedAmenityPresentInHotelAmenities===true) {
                    isPassedFilter = true
                    continue
                }
            }
            if(category==="hotelClass") {
                if(hotel.hotelClass===+value) {
                    isPassedFilter = true
                    continue
                }
            }
            if(category==="brand") {
                if(hotel.brand===value) {
                    isPassedFilter = true
                    continue
                }
            }   
        }
        // filter for city entered in search bar
        let city = document.querySelector("#search").value
        // if the search bar is empty, it should not affect the isPassedFilter
        if(city!=="") {
            isPassedFilter = hotel.city===city
        }
        return isPassedFilter
    })

    // sorting
    let sortOrder = document.querySelector("#sort").value
    if(sortOrder==="Rating HTL") 
        filteredAndSortedHotels.sort((hotelA, hotelB) => {return hotelB.rating-hotelA.rating})
    if(sortOrder==="Rating LTH") 
        filteredAndSortedHotels.sort((hotelA, hotelB) => {return hotelA.rating-hotelB.rating})
    if(sortOrder==="Price HTL") 
        filteredAndSortedHotels.sort((hotelA, hotelB) => {return hotelB.price-hotelA.price})
    if(sortOrder==="Price LTH") 
        filteredAndSortedHotels.sort((hotelA, hotelB) => {return hotelA.price-hotelB.price} ) 
    
    updateHotels(filteredAndSortedHotels)

}

async function loadHotels() {
    try{
        let hotelsEndpoint = "https://636b38dd7f47ef51e12a98e4.mockapi.io/hotels"
        hotels = await (await fetch(hotelsEndpoint)).json()
        hotels.forEach(hotel => modifyHotel(hotel))
        updateHotels(hotels)
        updateFAQ()
    } catch(error) {
        alert("Turn on the internet")
    }
        
}

function updateHotels(hotels) {
    let hotelsDiv = document.querySelector("#hotels")
    hotelsDiv.innerHTML = null;
    for(let i=0; i<hotels.length; i++) {
        hotelsDiv.append(objectToHTML(hotels[i], i))
    }
    // update total number of hotels in the city entered in the search bar
    let city = document.querySelector("#search").value
    let resultH3 = document.querySelector("#resultAndSort>h3")
    if(city==="") {
        resultH3.innerText = `Total ${hotels.length} hotels found`
    } else {
        resultH3.innerText = `Total ${hotels.length} hotels found in ${city}`
    }
}

function objectToHTML(hotelObject, index) {
    
    // order: first children then parent, from root to leaf in the hierarchy

    // 0
    let hotelImg = document.createElement("img")
    hotelImg.src = hotelObject.image
    hotelImg.alt = "hotel"

    // 1
    let hotelImageDiv = document.createElement("div")
    hotelImageDiv.setAttribute("class", "hotelImage")
    hotelImageDiv.append(hotelImg)

    // 2
    let hotelNameH2 = document.createElement("h2")
    hotelNameH2.innerText = `${index+1}. ${hotelObject.name}`
    
    // 3
    let img = document.createElement("img")
    img.src = "../resources/bookingLogo.png"
    img.alt = "img"

    // 4
    let priceP = document.createElement("p")
    priceP.innerText = "Rs. " + hotelObject.price

    // 5
    let bookButton = document.createElement("button") 
    bookButton.innerText = "Book"
    bookButton.addEventListener("click", (event) => addHotelToCart(event.target, hotelObject))
    updateBookButtonState(bookButton, hotelObject)

    // 5.5
    let dealsDiv = document.createElement("div")
    dealsDiv.setAttribute("class", "deals")
    for(let i=0; i<hotelObject.deals.length; i++) {
        // 5.25
        let dealP = document.createElement("p")
        dealP.innerText = hotelObject.deals[i]
        dealsDiv.append(dealP)
    }

    // 6
    let leftSectionDiv = document.createElement("div")
    leftSectionDiv.setAttribute("class", "leftSection")
    leftSectionDiv.append(img, priceP, bookButton, dealsDiv)

    // 7
    let middleSectionDiv = document.createElement("div")
    middleSectionDiv.setAttribute("class", "middleSection")
    middleSectionDiv.innerHTML = `
                <div><p>Trip.com</p><p>₹13,987</p></div>
                <div><p>MakeMyTrip</p><p>₹10,153</p></div>
                <div><p>Hotels.com</p><p>₹13,924</p></div>
                <div><p>View all 10 deals from </p><p>₹10,153</p></div>`

    // 8
    let ratingP = document.createElement("p")
    ratingP.innerText = stars(hotelObject.rating)

    // 10
    let amenitiesList = document.createElement("ul")
    amenitiesList.setAttribute("class", "amenities")
    for(let i=0; i<hotelObject.amenities.length; i++) {
        // 9
        let amenityLi = document.createElement("li")
        amenityLi.innerText = hotelObject.amenities[i]
        amenitiesList.append(amenityLi)
    }

    // 11
    let rightSectionDiv = document.createElement("div")
    rightSectionDiv.setAttribute("class", "rightSection")
    rightSectionDiv.append(ratingP, amenitiesList)

    // 12
    let infoSectionsDiv = document.createElement("div")
    infoSectionsDiv.setAttribute("class", "infoSections")
    infoSectionsDiv.append(leftSectionDiv ,middleSectionDiv, rightSectionDiv)

    // 13
    let hotelInfoDiv = document.createElement("div")
    hotelInfoDiv.setAttribute("class", "hotelInfo")
    hotelInfoDiv.append(hotelNameH2, infoSectionsDiv)
    
    // 14
    let hotelDiv = document.createElement("div")
    hotelDiv.setAttribute("class", "hotel")
    hotelDiv.append(hotelImageDiv, hotelInfoDiv)

    // <div class="hotel"> 14 
    //     <div class="hotelImage"> 1
    //         <img src="hotelImage.jpg" alt="hotel"> 0
    //     </div>
    //     <div class="hotelInfo"> 13
    //         <h2>Hotel name</h2> 2
    //         <div class="infoSections"> 12
    //             <div class="leftSection"> 6
    //                 <img src="" alt=""> 3
    //                 <p>Price</p> 4
    //                 <button>Book</button> 5
    //                 <div class="deals"> 5.5
    //                      <p></p> 5.25
    //                 </div>
    //             </div>
    //             <div class="middleSection"> 7
    //                 <div><p>Trip.com</p><p>₹13,987</p></div>
    //                 <div><p>MakeMyTrip</p><p>₹10,153</p></div>
    //                 <div><p>Hotels.com</p><p>₹13,924</p></div>
    //                 <div><p>View all 10 deals from </p><p>₹10,153</p></div>
    //             </div>
    //             <div class="rightSection"> 11
    //                 <p>Rating</p> 8
    //                 <ul class="amenities"> 10
    //                     <li></li> 9
    //                 </ul>
    //             </div>
    //         </div>  
    //     </div>
    // </div>

    return hotelDiv
    
}

function addHotelToCart(bookButton, hotelObject) {
    // if the user login, then only allow to book the hotel
    if(isUserLogin()===false) {
        alert("Please login to your account to book an hotel")
        return
    }
    if(isHotelAlreadyInCart(hotelObject)===false) {
        cart.push(hotelObject)
        localStorage.setItem("cart", JSON.stringify(cart))
    }
    updateBookButtonState(bookButton, hotelObject)
}

function isUserLogin() {
    return JSON.parse(localStorage.getItem("user"))!==null
}

function updateBookButtonState(bookButton, hotelObject) {
    if(isHotelAlreadyInCart(hotelObject)===true && isUserLogin()===true) {
        bookButton.disabled = true
        bookButton.innerText = "Booked"
    } else {
        bookButton.disabled = false
        bookButton.innerText = "Book"
    }
}

function isHotelAlreadyInCart(hotelObject) {
    for(let i=0; i<cart.length; i++) {
        if(cart[i].id===hotelObject.id) {
            return true
        }
    }
    return false
}

function updateFAQ() {
    let question = `<h3>What are the best hotels near Qutub Minar?</h3>
    <p>Clarion Collection, FabHotel Sage, and Hotel Pluto's are some of the most popular hotels for travellers looking to stay near Qutub Minar. See the full list: Hotels near Qutub Minar.</p>`
    for(let i=1; i<=10; i++) {
        document.querySelector("#FAQ").innerHTML += question
    }
}

function modifyHotel(hotel) {
    let names = [
        "The Lalit",
        "Radisson Blu Plaza",
        "Hotel Novotel",
        "The Muse Sarovar Portico",
        "Taj Palace, New Delhi",
        "The Leela Ambience Convention Hotel",
        "Vivanta",
        "Lemon Tree Premier",
        "Opulent Hotel by Ferns N Petals",
        "Taurus Sarovar Portico"
    ]
    let deals = ["Free cancellation", "Reserve now, pay at stay", "Properties with speacial offer"]
    let amenities = ["Free wifi", "Breakfast included", "Pool", "Free parking"]
    let brands = ["OYO", "FabHotels", "Treebo", "Radisson"]
    let propertyTypes = ["Guest houses", "Speacial logings", "Lodges"]
    let cities = ["Delhi", "Hyderabad", "Pune", "Bangalore", "Goa", "Chennai", "Manali", "Mumbai", "Ladakh", "Kolkata", "Noida", "Indore"]
    hotel.name = random(names)
    hotel.deals = [random(deals), random(deals)]
    hotel.amenities = [random(amenities), random(amenities), random(amenities)]
    hotel.price = hotel.price * 100
    hotel.hotelClass = random([2,3,4,5])
    hotel.rating = random([1,2,3,4,5])
    hotel.propertyType = random(propertyTypes)
    hotel.covidSafe = random([true, false])
    hotel.city = random(cities)
}

function stars(rating) {
    let stars = "Rating "
    for(let i=1; i<=rating; i++) {
        stars += "*"
    }
    return stars
}

function random(array) {
    // "Math.random()" do not return "1". to include the last item, array is replaced by two copies of itself 
    array = [...array, ...array]
    return array[Math.floor(Math.random() * (array.length-1))]
}