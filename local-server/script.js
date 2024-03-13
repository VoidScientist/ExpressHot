const algorithm_menu = document.getElementById("algorithm");
const entries = document.getElementById("entries");
const results = document.getElementById("results");

function createParagraph(display, className){
    const paragraph = document.createElement("p");
    paragraph.setAttribute("class", className);
    paragraph.innerHTML = display;
    return paragraph
}

async function getSortedHotels() { 
    
    //const data = await fetch(`./search/${algorithm_menu.value}?limit=${entries.value}`); //192.168.60.32
    
    //const json_ = await data.json();

    const json_ = {"name":"bubble_sort","duration":"0.13","result":[{"id":"9504","hotel_name":"Summerland Waterfront Resort & Spa","hotel_rating":"4.5","hotel_experience":"excellent","amenities":"['Pool', 'Fitness Centre with Gym / Workout Room', 'Free parking', 'Free High Speed Internet (WiFi)', 'Restaurant', 'Bar/Lounge', 'Spa', 'Babysitting', 'Banquet Room', 'Business Centre with Internet Access', 'Children Activities (Kid / Family Friendly)', 'Conference Facilities', 'Dry Cleaning', 'Heated pool', 'Hot Tub', 'Laundry Service', 'Meeting rooms', 'Non-smoking hotel', 'Outdoor pool', 'Pets Allowed ( Dog / Pet Friendly )', 'Public Wifi', 'Self-Serve Laundry', 'Wheelchair Access', 'Air conditioning', 'Microwave', 'Refrigerator in room', 'Accessible rooms', 'Family Rooms', 'Kitchenette', 'Non-smoking rooms', 'Suites']","address":"13011 Lakeshore Dr S Summerland British Columbia","country":"Canada","locality":"Kimberley British Columbia","location":"(55.001251, -125.002441)","price":"139"},{"id":"9004","hotel_name":"OTL Gouverneur Sherbrooke","hotel_rating":"5.0","hotel_experience":"excellent","amenities":"['Pool', 'Room service', 'Free parking', 'Restaurant', 'Bar/Lounge', 'Spa', 'Free High Speed Internet (WiFi)', 'Breakfast included', 'Fitness Centre with Gym / Workout Room', 'Banquet Room', 'Breakfast Available', 'Business Centre with Internet Access', 'Concierge', 'Conference Facilities', 'Dry Cleaning', 'Hot Tub', 'Indoor pool', 'Laundry Service', 'Meeting rooms', 'Multilingual Staff', 'Non-smoking hotel', 'Pets Allowed ( Dog / Pet Friendly )', 'Public Wifi', 'Self-Serve Laundry', 'Wheelchair Access', 'Air conditioning', 'Refrigerator in room', 'Accessible rooms', 'Family Rooms', 'Non-smoking rooms', 'Suites']","address":" ","country":"Canada","locality":"Kimberley British Columbia","location":"('nil', 'nil')","price":300},{"id":"9704","hotel_name":"Home2 Suites by Hilton Fort St John","hotel_rating":"5.0","hotel_experience":"excellent","amenities":"['Pool', 'Free parking', 'Free High Speed Internet (WiFi)', 'Breakfast included', 'Fitness Centre with Gym / Workout Room', 'Airport transportation', 'Business Centre with Internet Access', 'Children Activities (Kid / Family Friendly)', 'Dry Cleaning', 'Heated pool', 'Hot Tub', 'Indoor pool', 'Laundry Service', 'Meeting rooms', 'Non-smoking hotel', 'Pets Allowed ( Dog / Pet Friendly )', 'Public Wifi', 'Self-Serve Laundry', 'Shuttle Bus Service', 'Wheelchair Access', 'Air conditioning', 'Microwave', 'Refrigerator in room', 'Accessible rooms', 'Family Rooms', 'Kitchenette', 'Non-smoking rooms', 'Suites']","address":" ","country":"Canada","locality":"Kimberley British Columbia","location":"('nil', 'nil')","price":300},{"id":"9725","hotel_name":"Trickle Creek Lodge","hotel_rating":"4.0","hotel_experience":"very good","amenities":"['Pool', 'Restaurant', 'Fitness Centre with Gym / Workout Room', 'Free parking', 'Free High Speed Internet (WiFi)', 'Bar/Lounge', 'Banquet Room', 'Business Centre with Internet Access', 'Children Activities (Kid / Family Friendly)', 'Conference Facilities', 'Golf Course', 'Heated pool', 'Hot Tub', 'Meeting rooms', 'Multilingual Staff', 'Non-smoking hotel', 'Outdoor pool', 'Pets Allowed ( Dog / Pet Friendly )', 'Public Wifi', 'Self-Serve Laundry', 'Ski-In / Ski-Out', 'Wheelchair Access', 'Air conditioning', 'Microwave', 'Refrigerator in room', 'Accessible rooms', 'Family Rooms', 'Kitchenette', 'Non-smoking rooms', 'Suites']","address":"500 Stemwinder Drive Kimberley British Columbia","country":"Canada","locality":"Kimberley British Columbia","location":"(49.6899326, -116.0041925)","price":"94"},{"id":"9703","hotel_name":"Pomeroy Hotel & Conference Centre Fort St John","hotel_rating":"4.5","hotel_experience":"excellent","amenities":"['Pool', 'Free parking', 'Restaurant', 'Free High Speed Internet (WiFi)', 'Fitness Centre with Gym / Workout Room', 'Room service', 'Bar/Lounge', 'Breakfast included', 'Airport transportation', 'Banquet Room', 'Business Centre with Internet Access', 'Casino and Gambling', 'Conference Facilities', 'Dry Cleaning', 'Heated pool', 'Hot Tub', 'Indoor pool', 'Laundry Service', 'Meeting rooms', 'Multilingual Staff', 'Non-smoking hotel', 'Pets Allowed ( Dog / Pet Friendly )', 'Public Wifi', 'Self-Serve Laundry', 'Wheelchair Access', 'Air conditioning', 'Microwave', 'Refrigerator in room', 'Accessible rooms', 'Family Rooms', 'Kitchenette', 'Non-smoking rooms', 'Suites']","address":"11308 Alaska Rd Fort St. John British Columbia","country":"Canada","locality":"Kimberley British Columbia","location":"(55.001251, -125.002441)","price":"154"},{"id":"9416","hotel_name":"Best Western Plus Service Inn & Suites","hotel_rating":"4.5","hotel_experience":"excellent","amenities":"['Free High Speed Internet (WiFi)', 'Pool', 'Free parking', 'Fitness Centre with Gym / Workout Room', 'Breakfast included', 'Airport transportation', 'Banquet Room', 'Business Centre with Internet Access', 'Children Activities (Kid / Family Friendly)', 'Conference Facilities', 'Dry Cleaning', 'Heated pool', 'Hot Tub', 'Indoor pool', 'Laundry Service', 'Meeting rooms', 'Multilingual Staff', 'Non-smoking hotel', 'Pets Allowed ( Dog / Pet Friendly )', 'Public Wifi', 'Self-Serve Laundry', 'Shuttle Bus Service', 'Wheelchair Access', 'Air conditioning', 'Microwave', 'Refrigerator in room', 'Accessible rooms', 'Family Rooms', 'Non-smoking rooms', 'Suites']","address":"209 41 St S Lethbridge Alberta","country":"Canada","locality":"Kimberley British Columbia","location":"(49.6951745, -112.7818651)","price":300},{"id":"9211","hotel_name":"Best Western Plus Sawridge Suites","hotel_rating":"5.0","hotel_experience":"excellent","amenities":"['Room service', 'Free parking', 'Restaurant', 'Bar/Lounge', 'Free High Speed Internet (WiFi)', 'Breakfast included', 'Fitness Centre with Gym / Workout Room', 'Spa', 'Banquet Room', 'Business Centre with Internet Access', 'Conference Facilities', 'Dry Cleaning', 'Hot Tub', 'Laundry Service', 'Meeting rooms', 'Non-smoking hotel', 'Pets Allowed ( Dog / Pet Friendly )', 'Public Wifi', 'Sauna', 'Self-Serve Laundry', 'Wheelchair Access', 'Air conditioning', 'Microwave', 'Refrigerator in room', 'Accessible rooms', 'Family Rooms', 'Kitchenette', 'Non-smoking rooms', 'Suites']","address":"410 Taiganova Cres Fort McMurray Alberta","country":"Canada","locality":"Kimberley British Columbia","location":"(56.7711261, -111.4245687)","price":300},{"id":"9622","hotel_name":"Pomeroy Inn & Suites Dawson Creek","hotel_rating":"4.5","hotel_experience":"excellent","amenities":"['Pool', 'Free parking', 'Free High Speed Internet (WiFi)', 'Fitness Centre with Gym / Workout Room', 'Breakfast included', 'Banquet Room', 'Business Centre with Internet Access', 'Conference Facilities', 'Dry Cleaning', 'Golf Course', 'Heated pool', 'Hot Tub', 'Indoor pool', 'Laundry Service', 'Meeting rooms', 'Multilingual Staff', 'Non-smoking hotel', 'Pets Allowed ( Dog / Pet Friendly )', 'Public Wifi', 'Self-Serve Laundry', 'Tennis Court', 'Wheelchair Access', 'Air conditioning', 'Microwave', 'Refrigerator in room', 'Accessible rooms', 'Family Rooms', 'Kitchenette', 'Non-smoking rooms', 'Suites']","address":"540 Highway 2 Dawson Creek British Columbia","country":"Canada","locality":"Kimberley British Columbia","location":"(55.7376903, -120.1613159)","price":"179"}]}

    const hotelList = json_.result

    const oldData = document.getElementsByClassName("box");

    for(oldElement of oldData){oldElement.remove();};

    results.textContent = `With the ${json_.name} algorithm, we've been able to sort the data in ${json_.duration} ms.`;

    for(let i = 0; i < hotelList.length; i++){

        const hotel = hotelList[i];
        let newDiv = document.createElement("div");
        newDiv.setAttribute("class", "box")

        // TODO: refactor duplicate code into a function
        newDiv.appendChild(createParagraph(`${hotel.hotel_name}`, "name"));

        if (hotel.address != " "){

            newDiv.appendChild(createParagraph(`Address: ${hotel.address}`, "data"));

        }

        newDiv.appendChild(createParagraph(`Price: $${hotel.price}`, "data"));

        newDiv.appendChild(createParagraph(`Rating: ${hotel.hotel_rating} ${hotel.hotel_experience}`, "data"));

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