const express = require('express');
const path = require('path');

const app = express();


// TEMP DUMMY DATA
let events = [
    //{name: "Music Festival",location: "Johannesburg",date: "June 2026",slug: "music-festival"},
    //{name: "Tech Conference",location: "Cape Town",date: "July 2026",slug: "tech-conference"}
];


// ENABLE STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

// FORM DATA MIDDLEWARE
app.use(express.urlencoded({ extended: true }));


// SET EJS AS VIEW ENGINE
app.set('view engine', 'ejs');


// HOME PAGE
app.get('/', (req, res) => {
    res.render('pages/index');
});


// EVENTS PAGE
app.get('/events', (req, res) => {
    res.render('pages/events', { events });
});


// EVENT DETAILS PAGE
app.get('/event/:name', (req, res) => {

    const eventName = req.params.name;

    res.render('pages/event-details', {
        eventName
    });

});


// ADMIN DASHBOARD
app.get('/admin', (req, res) => {

    res.render('pages/admin', {
        events,
        eventToEdit: null
    });

});


// ADD EVENT
app.post('/admin/add-event', (req, res) => {

    const { name, location, date } = req.body;

    const newEvent = {
        name,
        location,
        date,
        slug: name.toLowerCase().replace(/\s+/g, '-')
    };

    events.push(newEvent);

    res.redirect('/admin');

});


// DELETE EVENT
app.get('/admin/delete-event/:slug', (req, res) => {

    const slug = req.params.slug;

    events = events.filter(
        event => event.slug !== slug
    );

    res.redirect('/admin');

});


// EDIT EVENT PAGE
app.get('/admin/edit-event/:slug', (req, res) => {

    const slug = req.params.slug;

    const eventToEdit = events.find(
        event => event.slug === slug
    );

    res.render('pages/admin', {
        events,
        eventToEdit
    });

});


// UPDATE EVENT
app.post('/admin/update-event/:slug', (req, res) => {

    const slug = req.params.slug;

    const event = events.find(
        event => event.slug === slug
    );

    if (event) {

        if (req.body.name.trim() !== '') {
            event.name = req.body.name;
        }

        if (req.body.location.trim() !== '') {
            event.location = req.body.location;
        }

        if (req.body.date.trim() !== '') {
            event.date = req.body.date;
        }

        event.slug = event.name
            .toLowerCase()
            .replace(/\s+/g, '-');
    }

    res.redirect('/admin');

});


// START SERVER
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});