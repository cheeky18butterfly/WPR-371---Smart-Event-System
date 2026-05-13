const express = require('express');
const path = require('path');

const app = express();


// TEMP DUMMY DATA replace with data from database in future
let events = [
    //{name: "Music Festival",location: "Johannesburg",date: "June 2026",slug: "music-festival"},
    //{name: "Tech Conference",location: "Cape Town",date: "July 2026",slug: "tech-conference"}
];

let enquiries = [];


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

// CONTACT PAGE
app.get('/contact', (req, res) => {
    res.render('pages/contact');
});

// EVENTS PAGE
app.get('/events', (req, res) => {
    res.render('pages/events', { events });
});

//DASHBOARD PAGE
app.get('/dashboard', (req, res) => {
    res.render('pages/dashboard', { events });
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

//Admin enquiries view
app.get('/admin/enquiries', (req, res) => {
    res.render('pages/enquiries', { enquiries });
});

//Delete enquiry
app.get('/admin/delete-enquiry/:index', (req, res) => {

    const index = req.params.index;

    enquiries.splice(index, 1);

    res.redirect('/admin/enquiries');

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

//Add enquiry
app.post('/contact', (req, res) => {

    const { name, email, message } = req.body;

    const newEnquiry = {
        name,
        email,
        message,
        date: new Date().toLocaleString()
    };

    enquiries.push(newEnquiry);

    res.redirect('/contact');

});

// START SERVER
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});