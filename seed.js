require('dotenv').config();

const mongoose = require('mongoose');
const connectDB = require('./src/config/db');
const User = require('./src/models/User');
const Event = require('./src/models/Event');
const Booking = require('./src/models/Booking');
const Enquiry = require('./src/models/Enquiry');

const events = [
  {
    title: 'FutureWork Corporate Conference',
    description:
      'A full-day corporate conference covering digital transformation, leadership, automation and workplace strategy.',
    category: 'Conference',
    venue: 'Sandton Convention Centre',
    date: new Date('2026-06-18T09:00:00'),
    price: 850,
    capacity: 180,
    ticketsBooked: 24,
    imageUrl:
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Secure Systems Workshop',
    description:
      'A practical workshop for teams learning authentication, access control, threat awareness and secure deployment habits.',
    category: 'Workshop',
    venue: 'Rosebank Innovation Hub',
    date: new Date('2026-07-05T10:00:00'),
    price: 430,
    capacity: 45,
    ticketsBooked: 12,
    imageUrl:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'City Lights Music Festival',
    description:
      'An outdoor evening festival featuring local artists, food stalls, premium seating and secure digital ticket validation.',
    category: 'Festival',
    venue: 'Johannesburg Botanical Gardens',
    date: new Date('2026-08-22T16:00:00'),
    price: 320,
    capacity: 650,
    ticketsBooked: 281,
    imageUrl:
      'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Executive Networking Breakfast',
    description:
      'A curated networking session for business leaders, founders and operations teams with reserved seating.',
    category: 'Networking',
    venue: 'Melrose Arch Hotel',
    date: new Date('2026-06-03T07:30:00'),
    price: 280,
    capacity: 80,
    ticketsBooked: 63,
    imageUrl:
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Private Gala Dinner',
    description:
      'A formal private event package with invitation-only ticketing, controlled capacity and guest support.',
    category: 'Private Event',
    venue: 'The Maslow Ballroom',
    date: new Date('2026-09-12T18:30:00'),
    price: 1200,
    capacity: 120,
    ticketsBooked: 120,
    imageUrl:
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80'
  }
];

async function seed() {
  await connectDB();

  await Promise.all([
    User.deleteMany({}),
    Event.deleteMany({}),
    Booking.deleteMany({}),
    Enquiry.deleteMany({})
  ]);

  const admin = await User.create({
    name: 'Admin User',
    email: 'admin@advancedevents.local',
    password: 'Admin123!',
    role: 'admin'
  });

  await User.create({
    name: 'Standard User',
    email: 'user@advancedevents.local',
    password: 'User123!',
    role: 'user'
  });

  await Event.insertMany(events.map((event) => ({ ...event, createdBy: admin._id })));

  await Enquiry.create({
    name: 'Lerato Mokoena',
    email: 'lerato@example.com',
    subject: 'Group booking request',
    message: 'Please send information about discounted tickets for teams of 20 people.',
    status: 'open'
  });

  console.log('Seed complete');
  console.log('Admin login: admin@advancedevents.local / Admin123!');
  console.log('User login: user@advancedevents.local / User123!');

  await mongoose.disconnect();
}

seed().catch(async (error) => {
  console.error(error);
  await mongoose.disconnect();
  process.exit(1);
});
