const EventEmitter = require('events');
class Emitter extends EventEmitter {};

const emitter = new Emitter();

// let count = 0;

// emitter.on('click', () => {
//   console.log(`User clicked ${++count} times!`);
// })

// setInterval(() => {
//   emitter.emit('click')
// }, 1000)

const stdin = process.openStdin();

stdin.addListener('data', (data) => {
  console.log(`User typed => ${data}`)
})