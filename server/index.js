const express = require('express');
const path = require('path');
const GamesList = require('./data/games');

let app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Server launched on port ${port}`);
});

// définition des répertoires des pages et assets
const distDir = '../src/';
app.use('/pages', express.static(path.join(__dirname, distDir, '/pages')));
app.use('/assets', express.static(path.join(__dirname, distDir, '/assets')));
app.use(express.json());

// route de la racine du site
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, distDir, 'index.html'));
});

// route renvoyant la liste des jeux au format JSON
app.get('/api/games', (req, res) => {
    res.send(GamesList);
});

// route renvoyant le jeu correspondant à l'id :id au format JSON
app.get('/api/game/:id', (req, res) => {
    let gameId = parseInt(req.params.id);
    const game = GamesList.find((game) => game.id === gameId);
    res.send(game);
});

// route supprimant le jeu correspondant à l'id :id et renvoyant la liste des jeux au format JSON
app.delete('/api/game/:id', (req, res) => {
    let gameId = parseInt(req.params.id);
    const gameIndex = GamesList.findIndex((game) => game.id === gameId);
    // si le jeu correspondant à l'id donné existe je le supprime
    if(gameIndex >= 0) {
        GamesList.splice(gameIndex, 1);
    }
    res.send(GamesList);
});

// route ajoutant un jeu et renvoyant la liste des jeux au format JSON
app.post('/api/games', (req, res) => {
    // nouvel ID correspondant au plus grand id existant + 1 pour être sûr d'éviter les doublons
    let newId = GamesList.length > 0 ? Math.max(...(GamesList.map(game => {return game.id}))) + 1 : 0;
    req.body.id = newId;

    GamesList.push(req.body);

    res.send(GamesList);
});

// route modifiant un jeu correspondant à l'id :id ou l'ajoutant s'il n'existe pas, et renvoyant la liste des jeux au format JSON
app.put('/api/game/:id', (req, res) => {
    let gameId = parseInt(req.params.id);
    const gameIndex = GamesList.findIndex((game) => game.id === gameId);
    // si le jeu correspondant à l'id donné existe je le remplace
    if (gameIndex !== -1) {
        GamesList.splice(gameIndex, 1, req.body);
    }
    // sinon je l'ajoute
    else {
        GamesList.push(req.body);
    }
    res.send(GamesList);
});