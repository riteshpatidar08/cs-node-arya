const express = require('express');
const app = express();
const port = 5000;
const fs = require('fs');
//middleware to parse the data from the post request and set the data on the req object body property
app.use(express.json());

const verifyToken = (req, res, next) => {
  req.user = {
    name: 'ritesh',
  };
  next();
};

app.get('/verify', verifyToken, (req, res) => {
  console.log(req.user);
  res.send('Hello World!');
});

//read
//utility fn to read file data
function readFileData() {
  return JSON.parse(fs.readFileSync('./posts.json', 'utf-8'));
}

function writeFileData(data) {
  return fs.writeFileSync('./posts.json', JSON.stringify(data));
}

//READ //get

app.get('/posts', (req, res) => {
  const { category, id } = req.query;
  console.log(category);

  const data = readFileData();
  const filteredData = data.filter((d) => {
    return d.category === category;
  });
  if (!data) {
    return res.status(404).json({
      message: 'No posts found',
    });
  }
  //successfull
  res.status(200).json({
    length: data.length,
    message: 'Posts fetched Successfully',
    data: category ? filteredData : data,
  });
});

//single data
app.get('/posts/:id', (req, res) => {
  const { id } = req.params;
  const data = readFileData();
  if (!data) {
    return res.status(404).json({
      message: 'No posts found',
    });
  }
  const filteredData = data.filter((d) => {
    return d.id === parseInt(id);
  });
  res.status(200).json({
    length: filteredData.length,
    message: 'details fetched successfully',
    data: filteredData,
  });
});

//i want to send data from the client to server

app.post('/posts', (req, res) => {
  const newpost = req.body;
  const data = readFileData();
  //get the id of the last post
  const newId = data[data.length - 1].id + 1;
  console.log(newId);

  newpost.id = newId;
  data.push(newpost);
  writeFileData(data);

  res.status(200).json({
    data: newpost,
  });
});

app.put('/posts/:id', (req, res) => {
  const { id } = req.params;
  const newData = req.body;
  const data = readFileData();
  const index = data.findIndex((d) => d.id === parseInt(id));

  const updatedData = { ...data[index], ...newData };

  data[index] = updatedData;
  writeFileData(data);
  res.status(200).json({
    data,
  });
});

//no route found
app.use((req, res) => {
  res.status(404).json({
    message: 'No route found , Try another',
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// data => parse => req.body <= get data from here

// create a new file save some data in it get the data from the file using fs module and get the path using path module and send the data to the api endpoint '/data'

//CRUD => create read update delete

//pagination ui
//tree file folder structure
//modal
//drag and drop
//dark mode
//form validation
