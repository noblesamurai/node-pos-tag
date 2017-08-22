const pos = require('..');
const memwatch = require('memwatch-next');

let thing = 'Hi there my fine friend, I hope you are well, and eating your delicioius cranberries. ';

for (i = 0; i < 10; i ++) {
  thing = thing + thing;
}

memwatch.on('leak', (info) => {
  console.error('Memory leak detected:\n', info);
  process.exit(1);
});

// report to console postgc heap size
memwatch.on('stats', function (d) {
  console.log('postgc:', d.current_base);
});

function go () {
  pos(thing);
  setTimeout(go, 0);
}
go();
