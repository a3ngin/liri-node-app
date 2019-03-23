require("dotenv").config();
var keys = require("./keys.js");
var Spotify =  require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios =  require("axios");
var moment = require("moment");

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
    spotify.search({ type: 'track', query: info, limit: 1 }).then(function(response) {
        console.log("Artist(s): " + response.tracks.items[0].album.artists[0].name);
        console.log("The song's name: " + response.tracks.items[0].name);
        console.log("A preview link of the song from Spotify: " + response.tracks.items[0].preview_url);
        console.log("The album that the song is from: " + response.tracks.items[0].album.name);
    //   console.log(response); 
      });
}
