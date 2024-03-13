const algorithm_menu = document.getElementById("algorithm");
const entries = document.getElementById("entries");
const results = document.getElementById("results");

async function getSortedHotels() { 
    
    const data = await fetch(`./search/${algorithm_menu.value}?limit=${entries.value}`); //192.168.60.32
    
    const json_ = await data.json();

    const hotelList = json_.result

    for(let i = 0; i<hotelList.length; i++){

        const hotel = hotelList[i];
        let newDiv = document.createElement("div");
        newDiv.setAttribute("class", "box")

        let name = document.createElement("p");
        name.setAttribute("class", "name");
        name.style.margin = "4px 0px";
        name.innerHTML = `${hotel.hotel_name}<br>`;
        newDiv.appendChild(name);

        let address = document.createElement("p");
        address.setAttribute("class", "data");
        address.style.margin = "4px 0px";
        address.innerHTML = `Address: ${hotel.address}<br>`;
        newDiv.appendChild(address);

        let price = document.createElement("p");
        price.setAttribute("class", "data");
        price.style.margin = "4px 0px";
        price.innerHTML = `Price: $${hotel.price}<br>`;
        newDiv.appendChild(price);

        let rating = document.createElement("p");
        rating.setAttribute("class", "data");
        rating.style.margin = "4px 0px";
        rating.innerHTML = `Rating: ${hotel.hotel_rating} ${hotel.hotel_experience}`;
        newDiv.appendChild(rating);

        let amenities = document.createElement("p");
        amenities.setAttribute("class", "data");
        amenities.style.margin = "4px 0px";
        amenities.innerHTML = `Amenities:<br>`;

        let list = document.createElement("ul");
        list.style.margin = "0px 0px";

        const amenityList = JSON.parse(hotel.amenities.replaceAll("'", '"'));

        for (let amenity of amenityList){

            let newElement = document.createElement("li");
            newElement.innerHTML += `${amenity}`;
            list.appendChild(newElement);

        }

        amenities.appendChild(list);

        newDiv.appendChild(amenities);

        newDiv.style.padding = "8px 12px";
        results.appendChild(newDiv);

    }

}