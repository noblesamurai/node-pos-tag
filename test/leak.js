const pos = require('..');
const memwatch = require('memwatch-next');

const thing = 'Hi there my fine friend, I hope you are well, and eating your delicioius cranberries.';

memwatch.on('leak', (info) => {
  console.error('Memory leak detected:\n', info);
  process.exit(1);
});

// report to console postgc heap size
memwatch.on('stats', function (d) {
  console.log('postgc:', d.current_base);
});

for (var i = 0; i < 60; i++) {
  for (var j = 0; j < 600; j++) {
    pos(thing);
  }
  memwatch.gc();
}
