/**
 * Require necessary dependencies
*/
const express = require('express');
const { projects }  = require('./data.json'); 
const app = express();

/**
 * Middleware
*/
app.set('view engine', 'pug');
app.use('/static', express.static('public')); // serve static files from public folder


/**
 * Routes
*/
app.get('/', (req, res)=>{
    res.render('index', { projects });
});

app.get('/about', (req, res, next)=>{
    res.render('about');
});

app.get('/projects/:id', (req, res, next)=>{
    const id = req.params.id; 
    const project = projects[id];
    if (project) {
        res.locals.data = projects;
        return res.render('project', { project });
    } else {
        const err = new Error();
        err.status = 404;
        err.message = "This page does not exist, oops!"
        next(err);
    }
});

/**
 * Error Handling 
*/
app.use((req, res, next)=>{
    console.log('404: This page does not exist, oops!');

    const err = new Error();
    err.status = 404;
    err.message = "This page does not exist, oops!";   
    
    res.status(404);
    res.render('page-not-found', { err });
});
app.use((err, req, res, next)=>{
    if (err.status === 404 ){
        console.log('404: This page does not exist, oops!');
        res.status(404);
        res.render('page-not-found', { err });
    } else {
        console.log('500: Unexpected server error.');
        err.message = err.message || 'Unexpected server error.';
        res.status(err.status || 500);
        res.render('error', { err });
    }

});

/**
 * Starting server on port 3000
*/
app.listen(3000, () => {
    console.log('The express site is live! Running on port 3000.');
});