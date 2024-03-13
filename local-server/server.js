const express = require("express");
const {spawn} = require("child_process")

const app = express();

// SENDS THE HTML PAGE TO THE CLIENT
function getPage(req, res) {

    res.sendFile(__dirname + "/index.html");

}

// CALLS THE PYTHON SCRIPT TO GET RESULTS AND SENDS THEM TO CLIENT
function getHotelSorted(req, res) {

    res.set("Access-Control-Allow-Origin", "*");

    // ALLOWED ID PARAMS
    const algos = ["bubblesort", "insertionsort", "selectionsort"];

    // GET LIMIT FROM QUERY STRINGS
    const limit = Number(req.query.limit) || 100;
    
    const algorithm = req.params.id;

    // RETURN ERROR 404 IN CASE WRONG ID 
    if (!algos.includes(algorithm)) {
        res.json({status:"404", msg:"algorithm not found."});
        return;
    }

    // CREATE THE PYTHON SUBPROCESS
    const python = spawn("python", ["./test.py"]);

    // GIVES ALGORITHM KEY TO SYS.STDIN.READ() IN PYTHON SCRIPT
    python.stdin.end(algorithm);
    
    var hotels = [];

    // RETRIEVE ALL OUTPUTS OF SCRIPT INTO HOTELS
    python.stdout.on("data", data => {
        for (let i of data.toString().split("\r\n")) {
            if (i == 0) {continue;}
            hotels.push(JSON.parse(i));
        }
    });

    
    // ONCE PYTHON PROCESS IS CLOSED, SEND DATA TO CLIENT
    python.once("close", () => {
        // LIMIT RESULTS ACC TO QUERY STRING LIMIT
        hotels[0].result = hotels[0].result.slice(0,limit);
        res.send( hotels[0] );
});

}

// EXECUTES WHEN SERVER IS UP
function setServerUp(){

    console.log("Server listening on port 4001");

}

// WHAT FUNCTION TO CALL WHEN RECEIVING GET HTTP METHOD
// AT SPECIFIC ENDPOINTS
app.get("/", getPage);
app.get("/search/:id", getHotelSorted);

// STARTS THE SERVER
app.listen(4001, setServerUp);