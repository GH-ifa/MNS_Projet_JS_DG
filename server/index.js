const express = require('express');
const path = require('path');
let gamesList = require('./data/jeux');

let app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Server launched on port ${port}`);
});

// route renvoyant la liste des jeux au format JSON
app.get('/api/jeux', (req, res) => {
    res.send(gamesList);
});

// route renvoyant le jeu correspondant à l'id :id au format JSON
app.get('/api/jeu/:id', (req, res) => {
    let gameId = req.params.id;
    const game = gamesList.find((game) => game.id == gameId);
    res.send(game);
});

// route supprimant le jeu correspondant à l'id :id et renvoyant la liste des jeux au format JSON
app.delete('/api/jeu/:id', (req, res) => {
    let gameId = req.params.id;
    const gameIndex = GamesList.findIndex((game) => game.id == gameId);
    GamesList.splice(gameIndex, 1);
    res.send(GamesList);
});