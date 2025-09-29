var express = require('express');
var app = express();

// Debug middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Test route
app.get('/', (req, res) => {
    console.log('Root route hit');
    res.json('Awesome person');
});

app.listen(3000, () => {
    console.log('Test server is running on port 3000');
});