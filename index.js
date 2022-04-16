const express = require('express');
const {PAGE_NOT_EXIST} = require ('./constans.js');
const app = express ();



app.get('/', (req, res) => {
    res.send('OK connection')
});

app.get('*', (req, res) =>{
    res.status(404).send(PAGE_NOT_EXIST)
});

app.listen(3300, ()=>{
    console.log('server is running in port 3300')
});