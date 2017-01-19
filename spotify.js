//https://developer.spotify.com/web-api/console/artists/

const request = require('request');
const Task = require('data.task');
const Either = require('data.either');

const httpGet = url =>
  new Task((rej, res) =>
    request(url, (error, response, body) =>
      error ? rej(error) : res(body)
    )
  );

const first = xs =>
  Either.fromNullable(xs[0]);

const eitherToTask = either =>
  either.fold(Task.rejected, Task.of);

const parse = Either.try(JSON.parse);

const getJSON = url =>
  httpGet(url)
  .map(parse) //Task(Either(artists))
  .chain(eitherToTask); //Task(artists)

const findArtist = name =>
  getJSON(`https://api.spotify.com/v1/search?q=${name}&type=artist`)
  .map(result => result.artists.items)
  .map(first) //Task(Either(artists))
  .chain(eitherToTask); //Task(artist)

const relatedArtists = id =>
  getJSON(`https://api.spotify.com/v1/artists/${id}/related-artists`)
  //.map(x => {console.log(x); return x;})
  .map(result => result.artists);

module.exports = { findArtist, relatedArtists };
