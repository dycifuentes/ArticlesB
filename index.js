const express = require('express');
require('dotenv').config()
const {PAGE_NOT_EXIST} = require ('./constans.js');
const app = express ();



app.get('/', (req, res) => {
    res.sendFile('./views/index.html', { root: __dirname});
});

app.get('/about', (req, res) => {
    res.sendFile('./views/about.html', { root: __dirname});
});

app.get('/newarticle', (req, res) => {
    res.sendFile('./views/newarticle.html', { root: __dirname});
});



app.get('*', (req, res) =>{
    res.status(404).send(PAGE_NOT_EXIST)
});

const PORT = process.env.PORT || 3000

app.listen( PORT, ()=>{
    console.log(`server is running in port ${PORT}`)
});