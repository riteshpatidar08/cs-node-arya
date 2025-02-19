const fs = require('fs');
const fss = require('fs').promises;
const os = require('os');
const path = require('path');
//common js module
//react es6 module

console.log('hello from the server');

//filesystem

//node file system => synchronous and asynchronous
//1. read file content
//synchronous //asynchronous //promises

//synchronous
console.log('read file started ...');
// const data = fs.readFileSync('./readme.txt', 'utf-8');
// console.log(data);
console.log('read file ended...');

//asynchronous
console.log('read file async started ....');
// fs.readFile('./readme.txt', 'utf-8', (err, data) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(data);
// });

console.log('read file async ended...');

// fss.readFile('./readme.txt', 'utf-8').then((data) => console.log(data));

//Write

//note synchronous
fs.writeFileSync('./writeFile.txt', 'hello from the write file');

//implement asynchronous and promise based for the write file

//appendFile

// fs.appendFileSync('./readme.txt' , 'hello')

// //rename
// fs.renameSync('./readme.txt' , 'index.txt')

//unlink
// fs.unlinkSync('./index.txt');
const resolvedpathFile = path.resolve('/writeFile.txt');
console.log(resolvedpathFile);
// fs.readFileSync()
//OS MODULE

console.log(os.freemem());
console.log(os.cpus());
console.log(os.hostname());
console.log(os.platform());

//server \ /
// relative and absolute

const resolvedPath = path.resolve('/folder/file.txt');
console.log(resolvedPath);

const joinedPath = path.join('desktop', 'users', 'index.txt');

console.log(joinedPath);

// __filename , __dirname

console.log(__filename, __dirname);

console.log(path.join(__dirname, 'writeFile.txt'));

console.log(path.basename('/folder/index.txt'));

console.log(path.extname('/folder/index.js'));

//NOTE create a new file data.txt write some data in it . then read the data of the file and create a file new using writeFile with using same data , use the absolute path to get the path of that file.

//use append file function to write count from 1 - 100000 .