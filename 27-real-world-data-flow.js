//https://developer.spotify.com/web-api/console/artists/

// /v1/search?q=oasis&type=artist
//

// /v1/artists/2DaxqgrOhkeH0fpeiQq2f4/related-artists
//

const Task = require('data.task');

const argv = Task.of(process.argv);
const names = argv.map(args => args.slice(2))
//.fork(console.error, console.log);

const findArtist = name =>
  Task.of({id: 7});

const relatedArtists = id =>
  Task.of([{id: 100}, {id: 200}]);

const related = name =>
  findArtist(name)
  .map(artist => artist.id)
  .chain(relatedArtists);

const main = ([name1, name2]) =>
  Task.of(relatedArtists1 => relatedArtists2 =>
    [relatedArtists1, relatedArtists2])
  .ap(related(name1))
  .ap(related(name2));

names.chain(main)
.fork(console.error, console.log);
