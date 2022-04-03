const express = require('express');
const path = require('path');
const GamesList = require('./data/jeux');

let app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Server launched on port ${port}`);
});

// route renvoyant la liste des jeux au format JSON
app.get('/api/jeux', (req, res) => {
    res.send(GamesList);
});

// route renvoyant le jeu correspondant à l'id :id au format JSON
app.get('/api/jeu/:id', (req, res) => {
    let gameId = req.params.id;
    const game = GamesList.find((game) => game.id == gameId);
    res.send(game);
});