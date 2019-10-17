# liri-node-app

LIRI is a Language Interpretation and Recognition Interface. Search for music, movies, and hot bands in your area with this CLI Node.js application.

## Quick Install

To install the dependecy package.json dependencies use:

`npm install`

### Package Reference

`npm install axios`
`npm install node-spotify-api`
`npm install moment`
`npm install dotenv`


## Command Set

 `concert-this <artist|band>` - Displays the five upcoming concerts by the specificed artits or band and the corresponding location, venue, and date.

 `spotify-this-song <song>` - Queries Spotify API for the most popular song with <song> title and displays the corresponding album, artist, and external Spotify link. 

 `movie-this <movie title>` - Queries OMDB API for <movie title> and parses the API object. 
 
 `do-what-it-says` - Loads a predefined command from textfile and executes it.
