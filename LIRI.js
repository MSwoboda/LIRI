require("dotenv").config();

let fs = require("fs");

let keys = require("./keys.js");

const axios = require("axios");
let Spotify = require('node-spotify-api');
let spotify = new Spotify(keys.spotify);

let moment = require("moment");

let IN_COM = process.argv[2];
let IN_ARG = process.argv.splice(3, process.argv.length).toString();

function commandSwitch(params) {
    logThis("cmd"+","+IN_COM.toString() +","+ IN_COM.toString()+", @" + moment().format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS)+"\n")

    switch (IN_COM) {
        case `concert-this`:
            concertThis()
            break;
        case `spotify-this-song`:        //Test: node LIRI.js spotify-this-song Sign
            spotifyThis()
            break;
        case `movie-this`:
            movieThis();
            break;
        case `do-what-it-says`:
            //console.log(`do-what-it-says`);
            fs.readFile("random.txt", "utf8", function (error, data) {
                if (error) { return console.log(error) }
                var dataArr = data.split(",");
                // We will then re-display the content as an array for later use.
                //console.log(dataArr);
                IN_COM = dataArr[0];
                IN_ARG = dataArr[1];

                if (IN_ARG[0] === `do-what-it-says`) {
                    throw 'Circular dependency detected.'
                } else {
                    commandSwitch(params)
                }
            });
            break;

        default:
            console.log('Command not recognized');

            break;
    }
}

function movieThis(params) {

    if (IN_ARG.length < 1) { IN_ARG = 'Mr. Nobody' }
    axios.get(`http://www.omdbapi.com/?t=${IN_ARG}&apikey=trilogy`).then(
        function (response) {

            console.log("Title: " + response.data.imdbRating);
            console.log("Year: " + response.data.Released);
            console.log("Rating (IMDB): " + response.data.imdbRating);
            console.log("Rating (Rotten Tomatoes): " + response.data.Metascore);
            console.log("Country Produced: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);

        })
        .catch(function (error) {
            if (error.response) {

                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}

function spotifyThis(params) {

    if (IN_ARG.length < 1) { IN_ARG = 'The Sign' }

    spotify.search({ type: 'track', query: IN_ARG }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        let song = data.tracks;

        console.log("Author: " + song.items[0].artists[0].name);
        console.log("Song Name: " + song.items[0].name);
        console.log("Link: " + song.items[0].external_urls.spotify);
        console.log("Album: " + song.items[0].album.name);

    });

}

function concertThis(params) {
    if (IN_ARG.length < 1) { IN_ARG = 'Celion Dion' }

    axios.get(`https://rest.bandsintown.com/artists/${IN_ARG}/events?app_id=codingbootcamp`).then(
        function (response) {
            for (let index = 0; index < 5; index++) {
                console.log("-------------------");

                console.log("Venue: " + response.data[index].venue.name);
                console.log("Location: " + response.data[index].venue.country + ", " + response.data[index].venue.city);
                console.log("Date of Event: " + moment(response.data[index].venue.datetime).format("MM/DD/YYYY"));
            }
        })
        .catch(function (error) {
            console.log(error.config);
        });
}

function logThis(wombat) {
  
fs.appendFile("log.txt", wombat, function(err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log("Content Added!");
    }
   });
}

commandSwitch();