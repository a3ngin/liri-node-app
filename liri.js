require("dotenv").config();
var keys = require("./keys.js");
var Spotify =  require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios =  require("axios");
var moment = require("moment");
var fs = require("fs");

var input = process.argv;
var request =  input[2];
var info = input[3];

for(i=4; i <input.length; i++) {
    info += "+" + input[i];
}

function start() {

    switch(request){
        case "concert-this":
        concert();
        break;

        case "spotify-this-song":
        music();
        break;

        case "movie-this":
        movie();
        break;

        case "do-what-it-says":
        filefun();
        break;


        default:
        console.log("Invalid");
    }
    
}
start();

function concert() {
    axios.get("https://rest.bandsintown.com/artists/" + info + "/events?app_id=codingbootcamp").then(function(response){
        for(i=0; i <response.data.length; i++){
        console.log("Name of Venue: " + response.data[i].venue.name);
        console.log("Location of Venue: " + response.data[i].venue.city + ", " + response.data[0].venue.region);
        console.log("Event Date: " + moment(response.data[i].datetime).format("L"));
        }
    })
}
function music(){
    if (info === undefined) {
        info = "The+sign+Ace+of+base";
    }
    spotify.search({ type: 'track', query: info, limit: 1 }).then(function(response) {
        console.log("Artist(s): " + response.tracks.items[0].album.artists[0].name);
        console.log("The song's name: " + response.tracks.items[0].name);
        console.log("A preview link of the song from Spotify: " + response.tracks.items[0].preview_url);
        console.log("The album that the song is from: " + response.tracks.items[0].album.name);
      });
}



function movie(){
    if (info === undefined) {
        info = "Mr.+Nobody";
    }
    axios.get("https://www.omdbapi.com/?t=" + info + "&y=&plot=short&apikey=1533d06a").then(function(response){
    console.log("Title of the movie: " + response.data.Title);
    console.log("Year: " + response.data.Year);
    console.log("IMDB Rating: " + response.data.Rated);
    console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
    console.log("Country: " + response.data.Country);
    console.log("Language: " + response.data.Language);
    console.log("Plot: " + response.data.Plot);
    console.log("Actors: " + response.data.Actors);

    });
}
function filefun(){

}