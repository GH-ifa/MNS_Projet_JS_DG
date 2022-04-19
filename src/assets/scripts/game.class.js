export class Game {
    _id;
    _title;
    _releaseYear;
    _genre;
    _beaten;

    // constructeur de mon objet depuis sa version JSON
    constructor(json = {id: -1, title:'', releaseYear:-1, genre:'', beaten:false}) {
        this.id = json.id;
        this.title = json.title;
        this.releaseYear = json.releaseYear;
        this.genre = json.genre;
        this.beaten = json.beaten;
    }

    // fonction pour "stringifier" en JSON mon objet Game
    toJSON() {
        return {
            id: this.id,
            title: this.title,
            releaseYear: this.releaseYear,
            genre: this.genre,
            beaten: this.beaten,
        }
    }

    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }

    get title() {
        return this._title;
    }
    set title(title) {
        this._title = title;
    }

    get releaseYear() {
        return this._releaseYear;
    }
    set releaseYear(year) {
        this._releaseYear = (!isNaN(year))?year:0;
    }

    get genre() {
        return this._genre;
    }
    set genre(genre) {
        this._genre = genre;
    }

    get beaten() {
        return this._beaten;
    }
    set beaten(beaten) {
        this._beaten = (typeof beaten == "boolean") ? beaten : 0;
    }
}