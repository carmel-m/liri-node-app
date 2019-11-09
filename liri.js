require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");


// capture the command the user puts in

var userCommand = process.argv[2];
var userRequest = process.argv[3]; // everything index[3] and later
// console.log(userCommand);

// store all arguments in array
    // var nodeArgs = process.argv;
    // var movieName = "";

    // // loop through all node args and create movie name strings
    // for (var i = 2; i < nodeArgs.length; i++) {
    //     if (i > 2 && i < nodeArgs.length) {
    //         movieName += "+" + nodeArgs[i];
    //     }
    // }



// SWITCH STATEMENT

switch (userCommand) {
    case "movie-this":
        movie();
        break;

    case "spotify-this-song":
        song();
        break;

    case "concert-this":
        concert();
        break;

    case "do-what-it-says":
        doWhat();
        break;
}


// USER COMMAND FUNCTIONS

function movie() {
    // store all arguments in array
    var nodeArgs = process.argv;
    var movieName = "";

    // loop through all node args and create movie name strings
    for (var i = 2; i < nodeArgs.length; i++) {
        if (i > 2 && i < nodeArgs.length) {
            movieName += "+" + nodeArgs[i];
        }
    }

    // axios call
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    console.log(queryUrl);

    axios.get(queryUrl).then(
        function (response) {
            //   console.log("Release Year: " + response.data.Year);
        })
}



function song() {

}

function concert() {

}

function movie() {
    // store all arguments in array
    var nodeArgs = process.argv;
    var movieName = "";

    // loop through all node args and create movie name strings
    for (var i = 2; i < nodeArgs.length; i++) {
        if (i > 2 && i < nodeArgs.length) {
            movieName += "+" + nodeArgs[i];
        }
    }

    // axios call
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    console.log(queryUrl);

    axios.get(queryUrl).then(
        function (response) {
            //   console.log("Release Year: " + response.data.Year);
        })
}




function doWhat() {

    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }


    }



// SWITCH STATEMENT

    // check if userCommand is "concert-this"
        // run API call using axios to bands-in-town API
        // inject user's search term in the queryURL

        // display name of venue, venue location, date of event
        // format date using moment.js to be MM/DD/YYYY


    // check if userCommand is "spotify-this-song"
        // using spotify Node package info, make a call to the spotify API
        // display to user - artist(s), song's name, preview link of song from spotify, album song is from, provide default search term if user doesn't provide an argument


    // check if userCommand is "movie-this"  (use omdb activities 17 and 18)
        // 


    // check if userCommand is "do-what-it-says"
        // uses fs to read 'random.txt' file 


    // otherwise, display message to user to try again