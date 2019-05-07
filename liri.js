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
// npm moment
let moment = require('moment');

// You should then be able to access your keys information like so
// console.log('#####liri.js#######')
// console.log(keys)
// slice full name out of process, join take array and converts to a string
var title = process.argv.slice(3).join(" ")
var action = process.argv[2]

// 9. Make it so liri.js can take in one of the following commands:
switch (action) {
  //    * `spotify-this-song`
  case ('spotify-this-song'):
    if (title) {
      spotifyThis(title);
    } else if (!title) {
      spotifyThis("The Sign Ace of Base");
    }
    break;
  //   movieThis(title)
  case ('movie-this'):
    if (title) {
      movieThis(title);
    } else {
      movieThis("Mr. Nobody");
    }
    break;
  //    * `do-what-it-says` 
  case ('do-what-it-says'):
    // run function
    doThis();
    break;
  //    * `concert-this`
  case ('concert-this'):
    if (title) {
      concertThis(title);
    }
    break;
}

//   ### What Each Command Should Do

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 1. `node liri.js concert-this <artist/band name here>`
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function concertThis(artist) {
  axios.get('https://rest.bandsintown.com/artists/' + artist + '/events?app_id=codingbootcamp&date=upcoming')
    .then(function (response) {
      console.log('////////////////AXIOS NO ERROR////////////')
      /*Console logging, console.log(response.data.venue.name) won't work because
the API is returning a ‘list’ of “Offers”. It's using a paradigm called REST
Each Offer is made up of a list of ticket vendors, the venue, the date, the line up which is a list of artists, and some id’s and a url.
Whenever your API is returning a list that means there are multiple options and that means the data is sent back in an array.
These instructions `render the following information about each event to the terminal` are telling you that you have to loop through the array of Offers and display the venue name, city, region and country and the offer datetime. 
Response.data is an array so you need to use bracket notation. */
      for (let i of response.data) {
        // * Name of the venue
        let theVenue = [
          `Name : ${i.venue.name}`,
          // * Venue location (city, country)
          `Location : ${i.venue.city}, ${i.venue.country}`,
          // * Date of the Event (use moment to format this as "MM/DD/YYYY")
          // Per documentation <moment().format();>
          `Date : ${moment(i.datetime).format("MM-DD-YYYY")}`
        ];
        // log data
        console.log(theVenue);

        /* append to log.txt
        works in the terminal but doesn't add to log.txt */ 
        fs.appendFile('./log.txt', theVenue, function (err) {
          // If an error was experienced we will log it.
          if (err) {
            console.log(err)
          } else { // If no error is experienced, we'll log the phrase "Content Added" to our node console.
            console.log('Content Added!')
          }
        })
      }
    })
    // log error
    .catch(function (error) {
      console.log('//////////ERROR!!!/////////////')
      console.log(error);
    });
}

//    * This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 // 2. `node liri.js spotify-this-song '<song name here>'`
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function spotifyThis(track) {
  var spotify = new Spotify(keys.spotify);
  // Easiest way to find artist, album, or track
  spotify.search({ type: 'track', query: track || "The Sign Ace of Base" }, function (err, response) {
    if (err) {
      console.log('//////////ERROR!!!/////////////')
      return console.log('Error occurred: ' + err);
    }
    // console.log('//////////NO ERROR!!///////////////')
    ///////////////////////////USE THE TERMINAL TO TRY TO UNDERSTAND PATHS/////////////////////////////////////////
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

       /* append to log.txt
        works in the terminal but doesn't add to log.txt */ 
      fs.appendFile('./log.txt', songData, function (err) {
        // If an error was experienced we will log it.
        if (err) {
          console.log(err)
        } else { // If no error is experienced, we'll log the phrase "Content Added" to our node console.
          console.log('Content Added!')
        }
      })
    }
  });
}

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
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//    * This will output the following information to your terminal/bash window:
function movieThis(show) {
  // when called, show will be replaced with var = title.
  axios.get('http://www.omdbapi.com/?t=' + show + '&plot=short&apikey=trilogy')
    .then(function (response) {
      // console.log('////////////////AXIOS NO ERROR////////////')
      // console.log(response)
      //        * Title of the movie.
      console.log(`Movie: ${response.data.Title}`)
      //        * IMDB Rating of the movie.
      console.log(`IMDB Rating is: ${response.data.imdbRating}`)
      //        * Year the movie came out.
      console.log(`Year Released : ${response.data.Released}`)
      //        * Rotten Tomatoes Rating of the movie.
      console.log(`Rotten Tomatoes Rating : ${response.data.Ratings[1].Value}`)
      //        * Country where the movie was produced.
      console.log(`Country : ${response.data.Country}`)
      //        * Language of the movie.
      console.log(`Language : ${response.data.Language}`)
      //        * Plot of the movie.
      console.log(`Plot : ${response.data.Plot}`)
      //        * Actors in the movie.
      console.log(`Actors in movie : ${response.data.Actors}`)
    })
    // log error
    .catch(function (error) {
      console.log('//////////ERROR!!!/////////////')
      console.log(error);
    });
}
//    * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

//      * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>

//      * It's on Netflix!

//    * You'll use the `axios` package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use `trilogy`.

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 4. `node liri.js do-what-it-says`
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function doThis() {
  // This block of code will read from the "random.txt" file.
  // It's important to include the "utf8" parameter or the code will provide stream data (garbage)
  // The code will store the contents of the reading inside the variable "data"
  fs.readFile("./random.txt", "utf8", function (error, data) {
    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }
    // We will then print the contents of data
    console.log(data);
    // Then split it by commas (to make it more readable)
    var dataArr = data.split(",");
    // We will then re-display the content as an array for later use.
    // console.log(dataArr);
    spotifyThis(dataArr[1]);
    // movieThis(dataArr[1]);
  });
}
// Pseudo-code for do-what-it-says
// use fs.read to read random.txt,
// .txt will be in string format, 
//  split string by using an array, then grab action and title 
// call function
// concert this is similar to movie this

//    * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

//      * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

//      * Edit the text in random.txt to test out the feature for movie-this and concert-this.


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ### BONUS
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * In addition to logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`.

// * Make sure you append each command you run to the `log.txt` file.

// * Do not overwrite your file each time you run a command.
