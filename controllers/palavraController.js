const express = require('express');
const config = require('../config');
const router = express.Router();
const mysql = require('mysql');

const db = mysql.createConnection({
    user: config.user,
    host: config.host,
    password: config.password,
    database: config.database
})

router.post("/cadastrar", (req, res) => {
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

module.exports = router;