const Task = require('data.task');

Task.of('hi')
.map(x => x + ' !')
.chain(x => Task.of(x + ' !'))
.fork(e => console.log('error', e), x => console.log(x));

Task.rejected('ih')
.map(x => x + ' !').fork(e => console.log('error', e), x => console.log(x));

const launchMissiles = () =>
  new Task((rej, res) => {
    console.log('launch missiles!');
    res('launched missiles');
  });

launchMissiles()
.map(x => x + ' !')
.fork(e => console.log('error', e),
  x => console.log(x));
