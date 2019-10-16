require("dotenv").config();
let keys = require("./keys.js");

// Load the inquirer package
const axios = require("axios");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

let moment = require("moment");

let IN_COM = process.argv[2];
let IN_ARG = process.argv.splice(3, process.argv.length);

console.log(typeof IN_ARG);

//`https://rest.bandsintown.com/artists/${IN_ARG}/events?app_id=codingbootcamp`


switch (IN_COM) {
    case `concert-this`:
        console.log(`concert-this`);

        break;
    case `spotify-this-song`:
        console.log(`spotify-this-song`);
        spotify.search({ type: 'track', query: IN_ARG }, function(err, data) {
            if (err) {
                return //console.log('Error occurred: ' + err);
            }

            console.log("Author: " + JSON.stringify(data.tracks.items[0].artists[0].name, null, 2));
            console.log("Song Name: " + JSON.stringify(data.tracks.items[0].name, null, 2));
            //link
            console.log("Link: " + JSON.stringify(data.tracks.items[0].external_urls.spotify, null, 2));
            //album
            console.log("Album: " + JSON.stringify(data.tracks.items[0].album.name, null, 2));

        });

        break;
    case `movie-this`:
        console.log(`movie-this`);

        break;
    case `do-what-it-says`:
        console.log(`do-what-it-says`);

        break;

    default:
        console.log('Command not recognized');

        break;
}