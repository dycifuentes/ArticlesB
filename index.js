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
app.use(express.urlencoded({ extended: true }));

// app.get('/add-article', (req, res) =>{
// const newarticle = new Article ({
//     title: 'The title 2',
//     fragment: 'the fragment',
//     body: 'the body'
// });
// newarticle.save()
// .then((result)=> {
//     res.send(result)
// })
// .catch((err) => {
//     console.log(err);
// });
// })

// app.get('/all-articles', (req,res) => {
//     Article.find()
//     .then((result)=> {
//         res.send(result)
//     })
//     .catch((err) => {
//         console.log(err);
//     });
// })

app.get('/', (req, res) => {
    Article.find().sort({ createdAt: -1})
        .then((result)=> {
            res.render('index', {title: 'Home', articles: result});
        })
        .catch((err) => {
            console.log(err);
        });    
});

app.post('/', (req,res) =>{
  const article =new Article(req.body);

  article.save()
  .then((result)=> {
      res.redirect('/');
   })
   .catch((err) => {
    console.log(err);
   });    
});
 

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
});


app.get('/newarticle', (req, res) => {
    res.render('newarticle', {title: 'New Article'});
});


app.get('/articles/:id', (req, res) =>{
     const id = mongoose.Types.ObjectId(req.params.id.trim());
    //const id = req.params.id;
    Article.findById(id)
    .then(result => {
        res.render('article', {title: 'Article Details', article: result});
    })
    .catch((err) => {
        console.log(err);
       });    
});

app.delete('/articles/:id', (req,res) =>{
    const id = mongoose.Types.ObjectId(req.params.id.trim());
    Article.findByIdAndDelete(id)
    .then(result =>{
        res.json({ redirect: '/'});
    }) 
    .catch(err=>{
        console.log(err);
    })
})

app.get('*', (req, res) =>{
    res.status(404).send(PAGE_NOT_EXIST)
});

const PORT = process.env.PORT || 3000

app.listen( PORT, ()=>{
    console.log(`server is running in port ${PORT}`)
});