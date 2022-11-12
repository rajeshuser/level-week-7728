// cart can be acccessed only when the user logged in
// show the hotels present in cart

let hotels = JSON.parse(localStorage.getItem("cart")) || []

if(isUserLogin()===true) {
    updateHotels(hotels)
}

function isUserLogin() {
    return JSON.parse(localStorage.getItem("user"))!==null
}

function updateHotels(hotels) {
    let hotelsDiv = document.querySelector("#hotels")
    hotelsDiv.innerHTML = null;
    for(let i=0; i<hotels.length; i++) {
        hotelsDiv.append(objectToHTML(hotels[i], i))
    }
    // update total count of hotels booked
    document.querySelector("#countOfHotelsBooked").innerText = `You have booked total ${hotels.length} hotels`
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
    updateBookButtonState(bookButton)

    // 5.5
    let dealsDiv = document.createElement("div")
    dealsDiv.setAttribute("class", "deals")
    console.log(hotelObject)
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
    //                 <button>Booked</button> 5
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

function stars(rating) {
    let stars = "Rating "
    for(let i=1; i<=rating; i++) {
        stars += "*"
    }
    return stars
}

function updateBookButtonState(bookButton) {
    if(isUserLogin()===true) {
        bookButton.disabled = true
        bookButton.innerText = "Booked"
    } else {
        bookButton.disabled = false
        bookButton.innerText = "Book"
    }
}
