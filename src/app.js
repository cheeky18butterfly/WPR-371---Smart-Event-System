require('dotenv').config();

const path = require('path');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(expressLayouts);
app.set('layout', 'layouts/main');

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

app.get('/events', (req, res) => {
  const events = [
    {
      title: 'Music Festival',
      venue: 'Johannesburg',
      date: 'June 2026'
    },
    {
      title: 'Tech Conference',
      venue: 'Cape Town',
      date: 'July 2026'
    }
  ];

  res.render('events/index', {
    title: 'Events',
    events
  });
});

module.exports = app;