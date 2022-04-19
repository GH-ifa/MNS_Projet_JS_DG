import { Game } from "./game.class.js";

// container de la liste des jeux
let containerList = document.querySelector('#jeux');

if (containerList) {
    let myHeaders = new Headers();
    let url = '/api/games';
    let options = {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'
    };
    // fetch de la liste des jeux
    fetch(url, options)
    .then((res) => {
        if(res.ok) {
            return res.json()
        }
        return Promise.reject(res);
    })
    .then((response) => {
        response.forEach(jeuJson => {
            let game = new Game(jeuJson);

            // création du DOM de la liste des jeux
            let section = document.createElement('section');
            let beatenImg = document.createElement('img');
            beatenImg.classList.add('trophy');
            beatenImg.src = game.beaten ? '/assets/img/beaten.png' : '/assets/img/notbeaten.png';
            beatenImg.alt = game.beaten ? 'Jeu terminé !' : 'Jeu pas encore fini !';
            beatenImg.title = game.beaten ? 'Jeu terminé !' : 'Jeu pas encore fini !';
            let titleElt = document.createElement('h2');
            let linkElt = document.createElement('a');
            titleElt.appendChild(linkElt);
            linkElt.innerText = game.title
            linkElt.href = `/pages/game.html#${game.id}`;
            
            let releaseYearElt = document.createElement('div');
            releaseYearElt.innerText = game.releaseYear;
            let genreElt = document.createElement('div');
            genreElt.innerText = `Genre : ${game.genre}`;

            let editLink = document.createElement('a');
            editLink.href = `/pages/edit.html#${game.id}`;
            editLink.innerText = 'Modifier';
            editLink.classList.add('edit_link');

            let deleteButton = document.createElement('button');
            deleteButton.innerText = "Supprimer";
            deleteButton.classList.add('delete_button');
            deleteButton.addEventListener("click", (event) => {
                event.preventDefault();
                if (window.confirm(`Suppression du jeu ${game.title} ?`)) {
                    let myHeaders = new Headers();
                    let url = `/api/game/${game.id}`;
                    let options = {
                        method: 'DELETE',
                        headers: myHeaders,
                        mode: 'cors',
                        cache: 'default'
                    };
                    // fetch de la suppression du jeu
                    fetch(url, options)
                    .then((res) => {
                        if(res.ok) {
                            return res.json()
                        }
                        return Promise.reject(res);
                    })
                    .then((response) => {
                        window.location.href = '/pages/games.html';
                    })
                    .catch((err) => {
                        console.log('Erreur fetch delete ', err);
                    });
                }
            });

            containerList.appendChild(section);
            section.appendChild(beatenImg);
            section.appendChild(titleElt);
            section.appendChild(releaseYearElt);
            section.appendChild(genreElt);
            section.appendChild(editLink);
            section.appendChild(deleteButton);
        });
    })
    .catch((err) => {
        console.log('Erreur fetch list ', err);
    });
}

// Formulaire d'ajout d'un jeu
let addForm = document.querySelector("form#add");

if (addForm) {
    addForm.addEventListener("submit", (event) => {
        event.preventDefault();

        let game = new Game();
        game.title = addForm.elements.input_title.value;
        game.releaseYear = parseInt(addForm.elements.input_release_year.value);
        game.genre = addForm.elements.select_genre.value;
        game.beaten = addForm.elements.checkbox_beaten.checked;

        let url = '/api/games';
        let options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify(game)
        };
        // fetch de l'ajout d'un jeu
        fetch(url, options)
        .then((res) => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(res);
        })
        .then((response) => {
            window.location.href = '/pages/games.html';
        })
        .catch((err) => {
            console.log('Error fetch post', err);
        })
    });
}

// container de l'affichage d'un seul jeu
let containerGame = document.querySelector('#jeu');
// formulaire d'édition d'un jeu
let editForm = document.querySelector("form#modification");

// récupération de l'id passé en URL
let gameId = window.location.hash.split('#')[1];

// si on est sur la page de détail ou d'édition d'un jeu
if (containerGame || editForm) {

    let myHeaders = new Headers();
    let url = `/api/game/${gameId}`;
    let options = {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'
    };
    // fetch des informations d'un jeu pour remplir les détails ou le formulaire d'édition
    fetch(url, options)
    .then((res) => {
        if(res.ok) {
            return res.json()
        }
        return Promise.reject(res);
    })
    .then((response) => {

        let game = new Game(response);

        if (containerGame) {
            document.title = `Détails du jeu ${game.title}`;

            let section = document.createElement('section');

            let beatenImg = document.createElement('img');
            beatenImg.classList.add('trophy');
            beatenImg.src = game.beaten ? '/assets/img/beaten.png' : '/assets/img/notbeaten.png';
            beatenImg.alt = game.beaten ? 'Jeu terminé !' : 'Jeu pas encore fini !';
            beatenImg.title = game.beaten ? 'Jeu terminé !' : 'Jeu pas encore fini !';

            let titleElt = document.createElement('h2');
            titleElt.innerText = game.title;
            
            let releaseYearElt = document.createElement('div');
            releaseYearElt.innerText = game.releaseYear;
            let genreElt = document.createElement('div');
            genreElt.innerText = `Genre : ${game.genre}`;

            containerGame.appendChild(section);
            section.appendChild(beatenImg);
            section.appendChild(titleElt);
            section.appendChild(releaseYearElt);
            section.appendChild(genreElt);

            let editLink = document.createElement('a');
            editLink.href = `/pages/edit.html#${gameId}`;
            editLink.innerText = 'Modifier';
            editLink.classList.add('edit_link');
            section.appendChild(editLink);
        }
        
        if (editForm) {
        
            document.title = `Edition du jeu ${game.title}`;

            editForm.elements.input_title.value = game.title;
            editForm.elements.input_release_year.value = game.releaseYear;
            editForm.elements.select_genre.value = game.genre;
            editForm.elements.checkbox_beaten.checked = game.beaten;

            editForm.addEventListener("submit", (event) => {
                event.preventDefault();
            
                let updatedGame = new Game();
                updatedGame.id = game.id;
                updatedGame.title = editForm.elements.input_title.value;
                updatedGame.releaseYear = parseInt(editForm.elements.input_release_year.value);
                updatedGame.genre = editForm.elements.select_genre.value;
                updatedGame.beaten = editForm.elements.checkbox_beaten.checked;
            
                let url = `/api/game/${game.id}`;
                let options = {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    mode: 'cors',
                    cache: 'default',
                    body: JSON.stringify(updatedGame)
                };
                // fetch des modifications d'un jeu
                fetch(url, options)
                .then((res) => {
                    if(res.ok) {
                        return res.json();
                    }
                    return Promise.reject(res);
                })
                .then((response) => {
                    window.location.href = `/pages/game.html#${gameId}`;
                })
                .catch((err) => {
                    console.log('Error fetch put', err);
                })
            });
        }
    })
    .catch((err) => {
        console.log('Erreur fetch get game ', err);
    });
}