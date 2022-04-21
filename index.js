const express = require('express');
require('dotenv').config()
const mongoose = require('mongoose');
const Article = require('./models/article');

const {PAGE_NOT_EXIST} = require ('./constans.js');
const app = express ();
const MONGODBPW = process.env.MONGODBPW || ""


const mongoURI = `mongodb+srv://newuser-1:${MONGODBPW}@cluster0.wgjer.mongodb.net/blog-project?retryWrites=true&w=majority`
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) =>console.log('Connected to database'))
  .catch((err) => console.log(err))

app.set('view engine', 'ejs');
// app.set('views', './views')

app.use(express.static('assets'));

app.get('/add-article', (req, res) =>{
const newarticle = new Article ({
    title: 'The title',
    fragment: 'the fragment',
    body: 'the body'
});
newarticle.save()
.then((result)=> {
    res.send(result)
})
.catch((error) => {
    console.log(err);
});
})

app.get('/', (req, res) => {
    const articles =[
        {title: 'Article 1', fragment: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Article 2', fragment: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Article 3', fragment: 'Lorem ipsum dolor sit amet consectetur'},
    ];
    res.render('index', {title: 'Home', articles});
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
});

app.get('/newarticle', (req, res) => {
    res.render('newarticle', {title: 'New Article'});
});

app.get('*', (req, res) =>{
    res.status(404).send(PAGE_NOT_EXIST)
});

const PORT = process.env.PORT || 3000

app.listen( PORT, ()=>{
    console.log(`server is running in port ${PORT}`)
});