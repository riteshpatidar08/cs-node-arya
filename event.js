//NOTE observer pattern and events module
const eventEmitter = require('events');
const http = require('http');
const myEvent = new eventEmitter();

myEvent.on('newBooking', (name) => {
  console.log(`new ticket booked by ${name}`);
});

myEvent.emit('newBooking', 'ritesh');

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/login') {
    let body = '';
    req.on('data', (chunk) => {
      console.log(chunk);
      body += chunk.toString();
    });

    req.on('end', () => {
      console.log(body);
    });
  } else {
    res.writeHead(405);
    res.end('no data');
  }
});

server.listen(3000, () => {
  console.log('server is running');
});
