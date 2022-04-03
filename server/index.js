const express = require('express');
const path = require('path');
const GamesList = require('./data/jeux');

let app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Server launched on port ${port}`);
});

app.use(express.json());

// route renvoyant la liste des jeux au format JSON
app.get('/api/jeux', (req, res) => {
    res.send(GamesList);
});

// route renvoyant le jeu correspondant à l'id :id au format JSON
app.get('/api/jeu/:id', (req, res) => {
    let gameId = parseInt(req.params.id);
    const game = GamesList.find((game) => game.id === gameId);
    res.send(game);
});

// route supprimant le jeu correspondant à l'id :id et renvoyant la liste des jeux au format JSON
app.delete('/api/jeu/:id', (req, res) => {
    let gameId = parseInt(req.params.id);
    const gameIndex = GamesList.findIndex((game) => game.id === gameId);
    GamesList.splice(gameIndex, 1);
    res.send(GamesList);
});

// route ajoutant un jeu et renvoyant la liste des jeux au format JSON
app.post('/api/jeux', (req, res) => {
    GamesList.push(req.body);
    res.send(GamesList);
});

// route modifiant un jeu correspondant à l'id :id ou l'ajoute s'il n'existe pas, et renvoyant la liste des jeux au format JSON
app.put('/api/jeu/:id', (req, res) => {
    let gameId = parseInt(req.params.id);
    const gameIndex = GamesList.findIndex((game) => game.id === gameId);
    if (gameIndex !== -1) {
        GamesList.splice(gameIndex, 1, req.body);
    }
    else {
        GamesList.push(req.body);
    }
    res.send(GamesList);
});