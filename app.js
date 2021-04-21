const express = require('express');
const { projects }  = require('./data.json'); // this must not be an object bc projects in an array
const app = express();

app.set('view engine', 'pug');
// serve static files from public folder
app.use('/static', express.static('public'));

/**
 * Routes
*/
// index route to render Home page
app.get('/', (req, res)=>{
    res.render('index', { projects });
});
// render About page
app.get('/about', (req, res, next)=>{
    res.render('about');
    // const err = new Error();
    // err.status = 500;
    // err.message = "Unexpected server error!";
    // next(err);
});
// render dynamic Project routes
app.get('/projects/:id', (req, res, next)=>{
    const id = req.params.id; // adding data as an object that contains data to be passed to Pug template
    const project = projects[id];
    if (project) {
        // console.log('project page loaded');
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
    console.log('500: Unexpected server error.');

    if (err.status === 404 ){
        res.status(404);
        res.render('page-not-found', { err });
    } else {
        // set status and message if they do not exist
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