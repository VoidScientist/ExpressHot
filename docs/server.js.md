# Express Server

To make the app, we used the Express JS framework to make a local web server, that is able to create a child process: the python algorithm. It communicates with it using standard input and standard output.

## Getting Files:

```javascript
function getPage(req, res) {

    const files = ["index.html", "script.js", "style.css"];

    const file = req.params.file;

    if (!files.includes(file)) {
        res.setStatus(404).send({msg:"file not found"});
        return;
    }

    res.sendFile(__dirname + "/" + file);

}

// AT THE END OF THE FILE

app.get("/:file", getPage);
```

This function holds as arguments the requests and the response
- <u>The request</u> element holds a request parameter `file` which tells the server what element needs to be sent to the client (useful in scripts and link tags of html)
- <u>The response</u> it either sends a JSON containing an error 404 (if the file not included in allowed `files`) else it sends the file to the client.

There is a need to sanitize the file input, as in a real world scenario, not doing it would allow hackers to perform a file traversal attack. *(and since our code isn't obfuscated, all vulnerabilities will be shown as clear as day)*

## Getting Result 

```javascript
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
// AT THE END OF THE FILE

app.get("/search/:id", getHotelSorted);
```

Basically, this function takes in lot of query strings *(that have default values both in server and frontend because it was a harsh ride making it)* and puts them into a config object that will be sent through stdin to our python script.

Also, it might've been WAY better with a POST method. Alas we started that way, so might as well die on that hill.

# Conclusion

All in all, the server provides a very basic API to the frontend, and is quite honestly not optimised at all. Since it's goal is to be nothing more than a local app (that is shared accross a same WIFI) its load won't ever be big enough to care.

Its security, as a school project, is neither needed, nor in our skillset.

Although we aim to be able to get better on these subjects.

<style>

    u {
        color:white;
    }

</style>