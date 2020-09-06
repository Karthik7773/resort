//jshint esversion:6
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const favicon = require('express-favicon');

const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "images")));

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(favicon(__dirname +'favicon.ico'));//__dirname +

mongoose.connect("mongodb://localhost:27017/recordDB", ({useNewUrlParser: true}, { useUnifiedTopology: true },{ useNewUrlParser: true }));


const userSchema = new mongoose.Schema({
  username : {type : String},
  useremail : { type : String},
  password : {type : String}
});

const User = new mongoose.model("User",userSchema);

app.get("/", function(req, res){  //home
  res.render("register");
});

app.get("/register", function(req, res){  //home
  res.render("register");
});

app.post('/register', (req, res) => {
  const userdetials = new User(req.body);

  userdetials.save()
 .then(item => {
  res.render("home");
 })
 .catch(err => {
 res.status(400).send("unable to save to database");
 });
});

app.get("/login", function(req, res){  //home
  res.render("login");
});

app.post('/login', (req, res) => {

  if( User.findOne({ useremail : req.body.useremail }) ){
    res.render("home");
  }
  else { alert("error");}

});

app.get("/logout", function(req, res){
  res.redirect("/login");
});


const bookSchema = new mongoose.Schema ({
  name : {type:String},
  address : { type : String},
  date : {type: Date, default: Date.now}
});

const Book = new mongoose.model("Book", bookSchema);

const Bookwed = new mongoose.model("Bookwed", bookSchema);


// app.get("/", function(req, res){  //home
//   res.render("home");
// });

app.get('/about', (req, res) => {
  res.render("about"); 	
});  

app.get('/party', (req, res) => {
  res.render("party"); 	
}); 

app.post('/party', (req, res) => {
  const bookdetails = new Book(req.body);

  bookdetails.save()
 .then(item => {
  res.render("booked");
 })
 .catch(err => {
 res.status(400).send("unable to save to database");
 });

});

app.get('/wed', (req, res) => {
  res.render("party"); 	
});  

app.post('/wed', (req, res) => {
  const bookdetail = new Bookwed(req.body);

  bookdetail.save()
 .then(item => {
  res.render("booked");
 })
 .catch(err => {
 res.status(400).send("unable to save to database");
 });
});

const resertSchema = new mongoose.Schema ({
  name : {type:String},
  date : {type: Date, default: Date.now}
});

const Resert = new mongoose.model("Resert", resertSchema );

app.get('/resert', (req, res) => {
  res.render("reservation");
});

app.post('/resert', (req, res) => {
  const reserts = new Resert(req.body);

  reserts.save()
  .then(item => {
    res.render("booked");
   })
   .catch(err => {
   res.status(400).send("unable to save to database");
   });
});


app.listen(3000, function() {
    console.log("Server started on port 3000.");
});