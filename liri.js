require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require('moment');
var fs = require("fs");


var userCommand = process.argv[2];
var userInput = process.argv.slice(3).join("+");


// SWITCH STATEMENT

switch (userCommand) {
    case "movie-this":
        movie(userInput);
        break;

    case "spotify-this-song":
        song(userInput);
        break;

    case "concert-this":
        concert(userInput);
        break;

    case "do-what-it-says":
        doWhat(userInput);
        break;

    default:
        console.log("I don't understand that command.  Please try again.");
}


// ============ USER COMMAND FUNCTIONS ============

// MOVIE-THIS FUNCTION

function movie(movieName) {

    if (!movieName) {
        movieName = "Pet Semetary";
    }

    // Axios call to OMDB API
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(
        function (response) {
            console.log("============================")
            console.log("Title: " + response.data.Title);
            console.log("Release year: " + response.data.Year);
            console.log("IMDb Rating: " + response.data.Ratings[0].Value);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country of origin: " + response.data.Country);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
            console.log("============================")
        })
}


// SPOTIFY-THIS-FUNCTION FUNCTION

function song(songName) {

    if (!songName) {
        songName = "Chamber of Reflection";
    }

    spotify
        .search({ type: 'track', query: songName })
        .then(function (response) {
            console.log("HERE ARE 3 SONGS WITH THAT NAME:")

            for (var i = 0; i < 3; i++) {
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


// CONCERT-THIS FUNCTION

function concert(artistName) {

    if (!artistName) {
        artistName = "Lizzo";
    }

    // Axios call to Bands In Town API
    var queryUrl = "http://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp";

    axios.get(queryUrl).then(
        function (response) {

            console.log("HERE ARE THE NEXT 3 SHOWS:")

            for (var i = 0; i < 3; i++) {

                var date = response.data[i].datetime;

                dateFormat = moment(date).format('DD/MM/YYYY');

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

        var arg = data.split(",");

        var command = arg[0];
        var input = arg[1];

        switch (command) {
            case "movie-this":
                movie(input);
                break;

            case "spotify-this-song":
                song(input);
                break;

            case "concert-this":
                concert(input);
                break;
        }
    })
}
