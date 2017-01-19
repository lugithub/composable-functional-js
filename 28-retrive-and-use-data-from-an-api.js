const Task = require('data.task');
const { findArtist, relatedArtists } = require('./spotify');

const argv = Task.of(process.argv);
const names = argv.map(args => args.slice(2))
//.fork(console.error, console.log);

const related = name =>
  findArtist(name)
  .map(artist => artist.id)
  .chain(relatedArtists)
  .map(artists => artists.map(artist => artist.name));

const main = ([name1, name2]) =>
  Task.of(relatedArtists1 => relatedArtists2 =>
    [relatedArtists1, relatedArtists2])
  .ap(related(name1))
  .ap(related(name2));

names.chain(main)
.fork(console.error, console.log);

//to run
//node 28-retrive-and-use-data-from-an-api.js oasis blur
