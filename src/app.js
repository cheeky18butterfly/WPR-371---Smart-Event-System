require('dotenv').config();

const path = require('path');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');

const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const adminEventRoutes = require('./routes/adminEventRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const contactRoutes = require('./routes/contactRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const { attachUser } = require('./middleware/authMiddleware');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layouts/main');

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.use(
  session({
    name: 'advanced_events_sid',
    secret: process.env.SESSION_SECRET || 'development-secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/smart_event_ticketing',
      collectionName: 'sessions'
    }),
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 3
    }
  })
);

app.use(attachUser);

app.use('/', eventRoutes);
app.use('/auth', authRoutes);
app.use('/admin/events', adminEventRoutes);
app.use('/bookings', bookingRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/contact', contactRoutes);

app.use((req, res) => {
  res.status(404).render('errors/404', {
    title: 'Page not found'
  });
});

app.use(errorHandler);

module.exports = app;
