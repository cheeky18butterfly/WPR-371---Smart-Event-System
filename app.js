const express = require('express');
const path = require('path');

const app = express();

//Temp Dummy Data
const events = [
    { name: "Music Festival", location: "Johannesburg", date: "June 2026", slug: "music-festival" },
    { name: "Tech Conference", location: "Cape Town", date: "July 2026", slug: "tech-conference" },
    { name: "Business Expo", location: "Durban", date: "August 2026", slug: "business-expo" }
];

//Enable static files
app.use(express.static(path.join(__dirname, 'public')));

//Set EJS as view engine
app.set('view engine', 'ejs');

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

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});