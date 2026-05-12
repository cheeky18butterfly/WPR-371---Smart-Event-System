const express = require('express');
const app = express();
const port = 3000;

// create a homepage route
app.get('/', (req, res) => {
    res.send('Hello, World! Smart Event System Running');
});

// start the server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});