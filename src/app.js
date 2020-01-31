const express = require('express');
const forecast = require('./utils/forecast.js');
const geocode = require('./utils/geocode.js');
const hbs = require('hbs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// define paths for express config
const pathDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(pathDirectory));

// this renders the handlebars view
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Freddy'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Freddy'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpMessage: 'This is a help message',
        title: 'Help',
        name: 'Freddy'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        });
    }

    geocode(req.query.address, (error, {
        latitude,
        longitude,
        location
    } = {}) => {
        if (error) {
            return res.send({
                error
            });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                });
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }

    res.send({
        products: []
    });
});

// this allows you to find routes for subdirectories
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Freddy',
        errorMessage: 'Help article not found!'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Freddy',
        errorMessage: 'Page not found!'
    });
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});