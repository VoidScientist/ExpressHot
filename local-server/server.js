const express = require("express");
const {spawn} = require("child_process");

const app = express();

// SENDS THE HTML PAGE TO THE CLIENT
function getPage(req, res) {

    const files = ["index.html", "script.js", "style.css"];

    const file = req.params.file;

    if (!files.includes(file)) {
        res.send({msg:"file not found"});
        return;
    }

    res.sendFile(__dirname + "/" + file);

}

// CALLS THE PYTHON SCRIPT TO GET RESULTS AND SENDS THEM TO CLIENT
function getHotelSorted(req, res) {

    console.log(req.connection.remoteAddress + " has sent a request.")

    // ALLOWED ID PARAMS
    const algos = ["bubblesort", "insertionsort", "selectionsort"];

    // GET QUERY STRINGS
    const limit = Number(req.query.limit) || 100;
    const accPrice = Number(req.query.accPrice) || 150
    const idealPrice = Number(req.query.idealPrice) || 100
    const maxPrice = Number(req.query.maxPrice) || 300
    const ratingImp = Number(req.query.ratingImp) || 1
    const pref = req.query.pref || []

    const algorithm = req.params.id;

    // RETURN ERROR 404 IN CASE WRONG ID 
    if (!algos.includes(algorithm)) {

        res.json({status:"404", msg:"algorithm not found."});
        return;
        
    }

    // CREATE THE PYTHON SUBPROCESS
    const python = spawn("python", ["./algorithm.py"]);


    config = {
        algorithm: algorithm,
        accPrice: accPrice,
        idealPrice: idealPrice,
        maxPrice: maxPrice,
        ratingImp: ratingImp,
        pref: pref
    }

    // GIVES ALGORITHM KEY TO SYS.STDIN.READ() IN PYTHON SCRIPT
    python.stdin.end(JSON.stringify(config));
    
    var hotels = [];

    python.stderr.on("data", err => console.error(err.toString()))

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
        res.send(hotels[0]);
});

}

// EXECUTES WHEN SERVER IS UP
function setServerUp(){

    console.log("Server listening on port 4001");

}

// WHAT FUNCTION TO CALL WHEN RECEIVING GET HTTP METHOD
// AT SPECIFIC ENDPOINTS
app.get("/:file", getPage);
app.get("/search/:id", getHotelSorted);

// STARTS THE SERVER
app.listen(4001, setServerUp);