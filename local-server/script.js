const algorithm_menu = document.getElementById("algorithm");
const entries = document.getElementById("entries");
const infos = document.getElementById("algo-info");
const results = document.getElementById("results");

const preferredAmenities = document.getElementById("amenities-list");
const maxPrice = document.getElementById("max");
const idealPrice = document.getElementById("ideal");
const accPrice = document.getElementById("acc");
const ratingImp = document.getElementById("rating");

function createElement(type, className, inner){
    const element = document.createElement(type);
    element.setAttribute("class", className);
    element.innerHTML = inner;
    return element;
}

async function getSortedHotels() { 

    const limit = entries.value || "100";
    const maxP = maxPrice.value || "300";
    const idealP = idealPrice.value || "100";
    const accP = accPrice.value || "150";
    const ratingImportance = ratingImp.value || "1";

    let amenityQuery = "";

    for (let option of preferredAmenities.options) {
        if (option.selected){
            amenityQuery += "pref="+option.text.replaceAll(" ", "%20")+"&";
        }
    }

    const data = await fetch(
        `./search/${algorithm_menu.value}?limit=${limit}&&maxPrice=${maxP}&&idealPrice=${idealP}&&accPrice=${accP}&&ratingImp=${ratingImportance}&&${amenityQuery}`
        );
    
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

        let list = document.createElement("div");
        list.setAttribute("class", "amenity-list");

        const amenityList = JSON.parse(hotel.amenities.replaceAll("'", '"'));

        for (let amenity of amenityList){

            const listEl = createElement("p", "amenity", amenity);
            list.appendChild(listEl);

        }

        amenities.appendChild(list);

        newDiv.appendChild(amenities);

        results.appendChild(newDiv);

    }

}