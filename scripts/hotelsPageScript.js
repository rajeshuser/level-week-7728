let hotels = null

loadHotels() 

async function loadHotels() {
    let hotelsEndpoint = "https://636b38dd7f47ef51e12a98e4.mockapi.io/hotels"
    hotels = await (await fetch(hotelsEndpoint)).json()
    hotels.forEach(hotel => modifyHotel(hotel))
    updateHotels(hotels)
}

function updateHotels(hotels) {
    let hotelsDiv = document.querySelector("#hotels")
    hotels.forEach((hotel) => {
        hotelsDiv.append(objectToHTML(hotel))
    })
}

function objectToHTML(hotelObject) {
    
    // order: creating the innermost and heirarchial topmost element first

    // 1
    let hotelImg = document.createElement("img")
    hotelImg.src = hotelObject.image
    hotelImg.alt = "hotel"
    hotelImg.class = "hotelImage"

    // 2
    let hotelNameH2 = document.createElement("h2")
    hotelNameH2.innerText = hotelObject.name
    
    // 3
    let img = document.createElement("img")
    img.src = "../resources/bookingLogo.png"
    img.alt = "img"

    // 4
    let priceP = document.createElement("p")
    priceP.innerText = hotelObject.price

    // 5
    let bookButton = document.createElement("button") 
    bookButton.innerText = "Book"

    // 6
    let leftSectionDiv = document.createElement("div")
    leftSectionDiv.class = "leftSection"
    leftSectionDiv.append(img, priceP, bookButton)

    // 7
    let middleSectionDiv = document.createElement("div")
    middleSectionDiv.class = "middleSection"
    middleSectionDiv.innerHTML = `
                <div><p>Trip.com</p><p>₹13,987</p></div>
                <div><p>MakeMyTrip</p><p>₹10,153</p></div>
                <div><p>Hotels.com</p><p>₹13,924</p></div>
                <div><p>View all 10 deals from </p><p>₹10,153</p></div>`

    // 8
    let ratingP = document.createElement("p")
    ratingP.innerText = hotelObject.stars

    // 10
    let amenitiesList = document.createElement("ul")
    amenitiesList.class = "amenities"
    for(let i=0; i<hotelObject.amenities.length; i++) {
        // 9
        let amenityLi = document.createElement("li")
        amenityLi.innerText = hotelObject.amenities[i]
        amenitiesList.append(amenityLi)
    }

    // 11
    let rightSectionDiv = document.createElement("div")
    rightSectionDiv.class = "rightSection"
    rightSectionDiv.append(ratingP, amenitiesList)

    // 12
    let infoSectionsDiv = document.createElement("div")
    infoSectionsDiv.class = "infoSections"
    infoSectionsDiv.append(leftSectionDiv ,middleSectionDiv, rightSectionDiv)

    // 13
    let hotelInfoDiv = document.createElement("div")
    hotelInfoDiv.class = "hotelInfo"
    hotelInfoDiv.append(hotelNameH2, infoSectionsDiv)
    
    // 14
    let hotelDiv = document.createElement("div")
    hotelDiv.append(hotelImg, hotelInfoDiv)

    // <div class="hotel"> 14
    //     <img class="hotelImage" src="hotelImage.jpg" alt="hotel"> 1
    //     <div class="hotelInfo"> 13
    //         <h2>Hotel name</h2> 2
    //         <div class="infoSections"> 12
    //             <div class="leftSection"> 6
    //                 <img src="" alt=""> 3
    //                 <p>Price</p> 4
    //                 <button>Book</button> 5
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
    let deals = [
        "Free cancellation",
        "Reserve now, pay at stay",
        "Properties with speacial offer"
    ]
    let amenities = [
        "Free wifi",
        "Breakfast included",
        "Pool",
        "Free parking"
    ]
    hotel.name = random(names)
    hotel.deals = [random(deals), random(deals)]
    hotel.amenities = [random(amenities), random(amenities), random(amenities)]
    hotel.stars = stars(hotel.rating)
    hotel.price = hotel.price * 100
}

function stars(rating) {
    let stars = ""
    for(let i=1; i<=(1+rating%4); i++) {
        stars += "*"
    }
    return stars
}
function random(array) {
    return array[Math.floor(Math.random() * (array.length-1))]
}