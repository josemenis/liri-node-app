// 7. At the top of the `liri.js` file, add code to read and set any environment variables with the dotenv package:
require("dotenv").config()
// 8. Add the code required to import the `keys.js` file and store it in a variable.
let keys = require("./keys")
// npm spotify
let Spotify = require('node-spotify-api')
// npm axios
let axios = require('axios')
// standard require
const fs = require('fs')

// You should then be able to access your keys information like so
// console.log('#####liri.js#######')
// console.log(keys)
// slice full name out of process, join take array and converts to a string
var title = process.argv.slice(3).join(" ")

// 9. Make it so liri.js can take in one of the following commands:
var action = process.argv[2]
//    * `spotify-this-song`
if (action === 'spotify-this-song') {
  spotifyThis(title)
} else {}
//    * `movie-this`
if (action === `movie-this`) {
  movieThis(title)
}
//    * `do-what-it-says` 

// Pseudo-code for do-what-it-says 
// use fs.read to read random.txt,
// .txt will be in string format, 
//  split string by using an array, then grab action and title 
// call function
// concert this is similar to movie this

//    * `concert-this`

//   ### What Each Command Should Do

// 1. `node liri.js concert-this <artist/band name here>`

//    * This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:

//      * Name of the venue

//      * Venue location

//      * Date of the Event (use moment to format this as "MM/DD/YYYY")
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 2. 
function spotifyThis(track) {
  var spotify = new Spotify(keys.spotify);
  // Easiest way to find artist, album, or track
  spotify.search({ type: 'track', query: track || "The Sign Ace of Base" }, function (err, response) {
    if (err) {
      console.log('//////////ERROR!!!/////////////')
      return console.log('Error occurred: ' + err);
    }
    console.log('//////////NO ERROR!!///////////////')

    // use terminal response to understand the path. 
    // console.log(response.tracks.items[0]);
    // loop to get data from path
    for (let data of response.tracks.items) {
      let songData = [
        //      * Artist(s)
        `Artist : ${data.artists[0].name}`,
        //      * The song's name
        `Track : ${data.name}`,
        //      * A preview link of the song from Spotify
        // `URL : ${data.preview_url}`,
        `URL : ${data.external_urls.spotify}`,
        //      * The album that the song is from
        `Album : ${data.album.name}`,
        // add 2 retruns just like the class activity week11-day3 #14.
      ].join('\n\n')
      // display data in console
      console.log(songData)
    }
  });
}
// `node liri.js spotify-this-song '<song name here>'`

//    * This will show the following information about the song in your terminal/bash window

//    * If no song is provided then your program will default to "The Sign" by Ace of Base.

//    * You will utilize the [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) package in order to retrieve song information from the Spotify API.

//    * The Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a **client id** and **client secret**:

//    * Step One: Visit <https://developer.spotify.com/my-applications/#!/>

//    * Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.

//    * Step Three: Once logged in, navigate to <https://developer.spotify.com/my-applications/#!/applications/create> to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.

//    * Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the [node-spotify-api package](https://www.npmjs.com/package/node-spotify-api).

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 3. `node liri.js movie-this '<movie name here>'`

//    * This will output the following information to your terminal/bash window:
function movieThis (show) {
axios.get('http://www.omdbapi.com/?t='+show+'&plot=short&apikey=trilogy')
  .then(function (response) {
    console.log('////////////////AXIOS////////////')
    //        * Title of the movie.
    console.log(`Movie: ${response.data.Title}`)
    //        * IMDB Rating of the movie.
    console.log(`Rating is: ${response.data.imdbRating}`)
  })
  // log error
  .catch(function (error) {
    console.log(error);
  });
}
//      ```
//        * Year the movie came out.
//        * Rotten Tomatoes Rating of the movie.
//        * Country where the movie was produced.
//        * Language of the movie.
//        * Plot of the movie.
//        * Actors in the movie.
//      ```

//    * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

//      * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>

//      * It's on Netflix!

//    * You'll use the `axios` package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use `trilogy`.

// 4. `node liri.js do-what-it-says`

//    * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

//      * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

//      * Edit the text in random.txt to test out the feature for movie-this and concert-this.

// ### BONUS

// * In addition to logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`.

// * Make sure you append each command you run to the `log.txt` file.

// * Do not overwrite your file each time you run a command.
