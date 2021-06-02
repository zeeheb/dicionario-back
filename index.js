const express = require('express');
const app = express();
const cors = require('cors');
const db = require('mysql');
var config = require('./config');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: config.user,
    host: config.host,
    password: config.password,
    database: config.database
})

app.post('/palavra/cadastrar'), (req, res) => {
    const palavra = req.body.palavra;
    const regiao = req.body.regiao;

    db.query('INSERT INTO palavra ')
}


app.listen(3001, () => {
    console.log('.........server running on 3001........');
})