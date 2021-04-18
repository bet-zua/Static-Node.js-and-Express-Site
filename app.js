const express = require('express');
const projects = require('./data.json');
const app = express();

app.set('view engine', 'pug');
app.use('/static', express.static('public'));

//index route to render Home page
router.get('/', (req, res)=>{
    res.locals = data.projects;
    res.render('index');
});
//render About page
router.get('/about', (req, res)=>{
    res.render('about');
});
//render dynamic Project routes