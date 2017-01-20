const Task = require('data.task');
const { findArtist, relatedArtists } = require('./spotify');
const { List } = require('immutable-ext');
const { Pair, Sum } = require('./monoids');

const argv = Task.of(process.argv);
const names = argv.map(args => args.slice(2))
//.fork(console.error, console.log);

const related = name =>
  findArtist(name)
  .map(artist => artist.id)
  .chain(relatedArtists)
  .map(artists => artists.map(artist => artist.name));

const Intersection = xs =>({
  xs,
  concat: ({xs:  ys}) =>
    Intersection(xs.filter(x => ys.some(y => x === y)))
});

const artistIntersection = relatedArtistss =>
  relatedArtistss.foldMap(x => Pair(Intersection(x), Sum(x.length)))
  .bimap(x => x.xs, y => y.x)
  .toList();

const main = names =>
  List(names)
  .traverse(Task.of, related)
  .map(artistIntersection);

names.chain(main).fork(console.error, console.log);

//to run
//node 29-retrive-and-use-data-from-an-api.js oasis blur radiohead
