const express = require('express');
require('dotenv').config()
const {PAGE_NOT_EXIST} = require ('./constans.js');
const app = express ();

app.set('view engine', 'ejs');
// app.set('views', './views')


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