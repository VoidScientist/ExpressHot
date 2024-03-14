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

## Getting Result 

```javascript
function getHotelSorted(req, res) {

    console.log(req.connection.remoteAddress + " has sent a request.")

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
    const python = spawn("python", ["./algorithm.py"]);

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
        res.send(hotels[0]);
});

// AT THE END OF THE FILE

app.get("/search/:id", getHotelSorted);
```

This function uses two values, one necessary and the other optional:
- <u>id:</u> the name of the algorithm that will be communicated to python.
- <u>limit:</u> optional query parameter that is defaulted to 100. It represents how many values are to be sent to the client.

# Conclusion

All in all, the server provides a very basic API to the frontend, and is quite honestly not optimised at all. Since it's goal is to be nothing more than a local app (that is shared accross a same WIFI) its load won't ever be big enough to care.

Its security, as a school project, is neither needed, nor in our skillset.

Although we aim to be able to get better on these subjects.

<style>

    u {
        color:white;
    }

</style>