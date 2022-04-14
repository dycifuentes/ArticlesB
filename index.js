const express = require('express');

const app = express ();



app.get('/', (req, res) => {
    res.send('OK connection')
});

app.get('*', (req, res) =>{
    res.status(404).send('The page you are looking for does not exist')
});

app.listen(3300, ()=>{
    console.log('server is running in port 3300')
});