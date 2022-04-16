const express = require('express');
require('dotenv').config()
const {PAGE_NOT_EXIST} = require ('./constans.js');
const app = express ();

app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/newarticle', (req, res) => {
    res.render('newarticle');
});

app.get('*', (req, res) =>{
    res.status(404).send(PAGE_NOT_EXIST)
});

const PORT = process.env.PORT || 3000

app.listen( PORT, ()=>{
    console.log(`server is running in port ${PORT}`)
});