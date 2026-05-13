const express = require('express');
const path = require('path');

const app = express();

//Temp Dummy Data
let events = [
    { name: "Music Festival", location: "Johannesburg", date: "June 2026", slug: "music-festival" },
    { name: "Tech Conference", location: "Cape Town", date: "July 2026", slug: "tech-conference" }
];

//Enable static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

//Set EJS as view engine
app.set('view engine', 'ejs');

//Handle form submission
app.post('/admin/add-event', (req, res) => {
    const { name, location, date } = req.body;

    const newEvent = {
        name,
        location,
        date,
        slug: name.toLowerCase().replace(/\s+/g, '-')
    };

    events.push(newEvent);

    res.redirect('/events');
});

//Render EJS page
app.get('/', (req, res) => {
    res.render('pages/index');
});

app.get('/events', (req, res) => {
    res.render('pages/events', { events });
});

app.get('/event/:name', (req, res) => {
    const eventName = req.params.name;

    res.render('pages/event-details', { eventName });
});

app.get('/admin', (req, res) => {
    res.render('pages/admin');
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});