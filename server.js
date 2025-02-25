//fs //os //path //http

// //HTTP
// //Post /login http1.1
// //request => object => {
//     req.url =>
//     req.method => get/post/delete
//     req.body => {
//    email : 'ritesh@gmail.com'
//    password : '342l34j'
//     }
// }

//server => 24*7

const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.url === '/product') {
    res.writeHead(200, { 'Contet-type': 'text/plain' });
    res.end('products');
  } else if (req.url === '/home') {
    const data = fs.readFileSync('./index.html', 'utf-8');
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });
    res.end(data);
  } else {
    res.writeHead(404, {
      'Content-Type': 'text/html',
    });
    res.end('hello from the server');
  }
});
// req,res
//localhost:3000/products
server.listen(3000, () => {
  console.log('server is running');
});

//products
//about
//service

// methods => put / delete / get / post

const server2 = http.createServer((req, res) => {
  if (req.url === '/register' && req.method === 'POST') {
    res.end('post method hit');
  }
});

server2.listen(5000, () => {
  console.log('server2 is running');
});

//listener
//as a logger
server2.on('request', (req) => {
  console.log(`req hit on ${req.url} method : ${req.method}`);
});

//connection . close

// app.post('/register',(req,res)=>{

// })

//event emitter pattern nodejs
