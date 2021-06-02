const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
var config = require('./config');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: config.user,
    host: config.host,
    password: config.password,
    database: config.database
})

app.post("/cadastrar", (req, res) => {
    console.log(req.body);
    const palavra = req.body.palavra;
    const regiao = req.body.regiao;

    db.query('INSERT INTO palavra (nome , regiao) VALUES (?, ?) ', [palavra, regiao], (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    });
});

app.get("/palavras", (req, res) => {
    db.query("SELECT * FROM palavra", (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    })
})

app.get("/palavra/:nome", (req, res) => {
    const nome = req.params.nome;
    db.query("SELECT * from palavra WHERE nome LIKE ? ", nome, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    })
})



app.listen(3001, () => {
    console.log('.........server running on 3001........');
})