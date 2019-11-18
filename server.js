const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static('public'));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/votes', {
  useNewUrlParser: true
});

// Configure multer so that it will upload to '/public/images'


// Create a scheme for items in the museum: a title and a path to an image.
const candidateSchema = new mongoose.Schema({
  name: String,
  votes: {type: Number, default: 0},
  bio: String,
});

// Create a model for items in the museum.
const Candidate = mongoose.model('candidate', candidateSchema);


//ROUTES


// Create a new item in the museum: takes a title and a path to an image.
app.post('/api/candidates', async (req, res) => {
  const candidate = new Candidate({
    name: req.body.name,
    bio: req.body.bio,
    //don't need anything for the votes 
  });
  try {
    console.log("POST CANDIDATE");
    console.log(candidate);
    await candidate.save();
    res.send(candidate);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


// Get a list of all of the items in the museum.
app.get('/api/candidates', async (req, res) => {
  try {
    let candidates = await Candidate.find();
    res.send(candidates);
    
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// //USER PAGE ROUTES
// // Get a list of all of the items in the museum.
app.delete('/api/candidates/:id', async (req, res) => {
  try {
    console.log("Delete " + req.params.id);
    console.log(req.params);
    let candidates = await Candidate.deleteOne({_id:req.params.id});
    res.send(candidates);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
 
});


// //USER PAGE ROUTES
// // Get a list of all of the items in the museum.
app.put('/api/candidates/:id', async (req, res, next) => {
  try {
    console.log(req.params);
    let candidate = await Candidate.findOne({_id:req.params.id});
    console.log("CANDIDATE PROPERTIES: " + candidate);
    // candidate["name"] = req.body.name;
    // candidate["bio"] = req.body.bio;
    // candidate["votes"] = req.body.rating;
    candidate.votes += 1;
    candidate.save();
    res.send(candidate);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
 
});

app.listen(3001, () => console.log('Server listening on port 3001!'));