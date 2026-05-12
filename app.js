const express = require('express');
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config(); 
connectDB();    

const app = express(); 

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// Define routes
app.get('/', (req, res) => {
    res.send('Welcome to the Smart Event System!'); 
});

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); 
});