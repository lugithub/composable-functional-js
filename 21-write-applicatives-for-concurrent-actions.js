//https://github.com/folktale/data.task/
//not https://github.com/origamitower/folktale

const Task = require('data.task');

const Db = ({
  find: id =>
    new Task((rej, res) => {
        console.log('1');  //runs synchronously with Task ctor.
        setTimeout(() =>
          res({id, title: `project ${id}`}), 100)
      })
});

Db.find(20).fork(e => console.log(e), r => console.log(r)); // f and g async

const reportHeader = p1 => p2 => `report: ${p1.title} compared to ${p2.title}`;

const res = Task.of(reportHeader)
  .ap(Db.find(20))
  .ap(Db.find(8))
  .fork(e => console.log(e), r => console.log(r));;

//console.log(res);

const liftA2 = (f, fx, fy) =>
  fx.map(f).ap(fy);

liftA2(reportHeader, Db.find(20), Db.find(8))
  .fork(e => console.log(e), r => console.log(r));
