const express = require('express');
const path = require('path');
const GamesList = require('./data/jeux');

let app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Server launched on port ${port}`);
});

app.get('/api/jeux', (req, res) => {
    res.send(GamesList);
});