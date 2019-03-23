require("dotenv").config();
var keys = require("./keys.js");
var Spotify =  require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios =  require("axios");

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

        default:
        console.log("Invalid");
    }
    
}
start();

function concert() {
    axios.get("https://rest.bandsintown.com/artists/" + info + "/events?app_id=codingbootcamp").then

}