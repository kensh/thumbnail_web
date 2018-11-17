// express
const express = require("express");
const app = express();

// file upload
const multer = require('multer');
const path = require('path');
const upDir = path.join(__dirname, 'upload'); 
const uploadDir = multer({dest: upDir}); 

// queue
const queue = require('./rabbit.js');

const form = 
    '<form method="POST" action="/image" enctype="multipart/form-data">' +
      '<input type="file" name="upFile" /><br />' +
      '<input type="submit" value="upload" />' +
    '</form>';


const server = app.listen(3000, () => {
    console.log("Node.js is listening to PORT:" + server.address().port);
});


app.get('/', (req, res) => { 
  res.send(form);
});


app.post("/image", uploadDir.single('upFile'), (req, res) => {
  if(!req.file){
    res.status(400);
  } else {
    console.log('original file name:' + req.file.originalname);
    console.log('saved file path:' + req.file.path);
    console.log('saved file name:' + req.file.filename);

    queue.enqueue(req.file.filename);
  }
  res.send(form);
});


app.get("/image/:imageId/thumbnail", (req, res) => {
  console.log(req.params.imageId);
  res.json({});
});


