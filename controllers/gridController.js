const express = require('express');
const router = express.Router();
const config = require('../config');
const mysql = require('mysql');

const db = mysql.createConnection({
    user: config.user,
    host: config.host,
    password: config.password,
    database: config.database
})

router.get("/palavras", (req, res) => {
    db.query("SELECT * FROM palavra", (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    })
})

router.get("/palavra/:nome", (req, res) => {
    const nome = req.params.nome;
    db.query("SELECT * from palavra WHERE nome LIKE ? ", nome, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    })
})

module.exports = router;