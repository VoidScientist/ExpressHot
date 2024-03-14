const algorithm_menu = document.getElementById("algorithm");
const entries = document.getElementById("entries");
const infos = document.getElementById("algo-info");
const results = document.getElementById("results");

function createElement(type, className, inner){
    const element = document.createElement(type);
    element.setAttribute("class", className);
    element.innerHTML = inner;
    return element;
}

async function getSortedHotels() { 
    
    const data = await fetch(`./search/${algorithm_menu.value}?limit=${entries.value}`); //192.168.60.32
    
    const json_ = await data.json();

    const hotelList = json_.result;

    while (results.firstElementChild) {results.removeChild(results.lastElementChild);}

    infos.textContent = `With the '${json_.name.replaceAll("_"," ")}' algorithm, we've been able to sort the data in ${json_.duration} ms.`;

    for(let i = 0; i < hotelList.length; i++){

        const hotel = hotelList[i];
        let newDiv = document.createElement("div");
        newDiv.setAttribute("class", "box")

        const name = createElement("p", "name", hotel.hotel_name);
        newDiv.appendChild(name);

        const price = createElement("p", "data", "Price: " + hotel.price + "$")
        newDiv.appendChild(price);

        const rating = createElement("p", "data", "Rating: " + hotel.hotel_rating);
        newDiv.appendChild(rating);

        const amenities = createElement("p", "data", "Amenities:");

        let list = document.createElement("ul");
        list.setAttribute("class", "amenity-list");

        const amenityList = JSON.parse(hotel.amenities.replaceAll("'", '"'));

        for (let amenity of amenityList){

            const listEl = createElement("li", "amenity", amenity);
            list.appendChild(listEl);

        }

        amenities.appendChild(list);

        newDiv.appendChild(amenities);

        results.appendChild(newDiv);

    }

}