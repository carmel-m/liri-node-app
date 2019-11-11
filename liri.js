require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require('moment');
var fs = require("fs");


// capture the command the user puts in
var userCommand = process.argv[2];


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

    default:
        console.log("I don't understand that command.  Please try again.");
}


// USER COMMAND FUNCTIONS

function movie() {
    // store all arguments in array
    var nodeArgs = process.argv;
    var movieName = "";

    // loop through all node args and create movie name strings
    for (var i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
            movieName = movieName + "+" + nodeArgs[i];
        } else {
            movieName += nodeArgs[i];
        }
    }

    // axios call
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    // console.log(queryUrl);

    axios.get(queryUrl).then(
        function (response) {
            console.log("Title: " + response.data.Title);
            console.log("Release year: " + response.data.Year);
            console.log("IMDb Rating: " + response.data.Ratings[0].Value);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country of origin: " + response.data.Country);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        })
}

function song() {
    // store all arguments in array
    var nodeArgs = process.argv;
    var songName = "";

    // loop through node args and create movie name strings
    for (var i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
            songName = songName + "+" + nodeArgs[i];
        } else {
            songName += nodeArgs[i];
        }
    }

    spotify
        .search({ type: 'track', query: songName })
        .then(function (response) {
            // console.log(response.tracks.items[0]);

            console.log("HERE ARE 5 SONGS WITH THAT NAME:")

            for (var i = 0; i < 5; i++) {
                console.log("============================")
                console.log("Artist: " + response.tracks.items[i].artists[0].name);
                console.log("Song name: " + response.tracks.items[i].name);
                console.log("Album: " + response.tracks.items[i].album.name);
                console.log("Song preview: " + response.tracks.items[i].preview_url);
            }
            console.log("============================")
        })
        .catch(function (err) {
            console.log(err);
        });
}

function concert() {
    var nodeArgs = process.argv;
    var artistName = "";

    // loop through all node args and create movie name strings
    for (var i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
            artistName = artistName + "+" + nodeArgs[i];
        } else {
            artistName += nodeArgs[i];
        }
    }

    // axios call
    var queryUrl = "http://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp";

    // console.log(queryUrl);

    axios.get(queryUrl).then(
        function (response) {
            // console.log(response);

            console.log("HERE ARE THE NEXT 5 SHOWS:")

            for (var i = 0; i < 5; i++) {

                // get event date then convert to MM/DD/YYYY

                var date = response.data[i].datetime;
                // console.log(date);

                dateFormat = moment(date).format('DD/MM/YYYY');
                // console.log(dateFormat);
                console.log("============================")
                console.log("Venue name: " + response.data[i].venue.name);
                console.log("Venue location: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
                console.log("Event date: " + dateFormat);
            }
            console.log("============================");
        })
}


function doWhat() {

    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        // console.log(data);

        var arg = data.split(",");

        var command = arg[0];
        var input = arg[1];

        console.log(command);
        console.log(input);

        // add plus signs between words in 'input'
        // then pass into appropriate function:

        switch (command) {
            case "movie-this":
                input = movieName;
                movie();
                break;

            case "spotify-this-song":
                song();
                break;

            case "concert-this":
                concert();
                break;
        }
    })
}



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