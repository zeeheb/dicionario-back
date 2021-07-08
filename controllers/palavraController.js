const express = require('express');
const config = require('../config');
const router = express.Router();
const mysql = require('mysql');
const fs = require('fs');
const multer = require('multer');
const multerConfig = require('../config/multer');
const {v4 : uuidv4} = require('uuid')


const db = mysql.createConnection({
    user: config.user,
    host: config.host,
    password: config.password,
    database: config.database
})

router.post("/cadastrar", (req, res) => {
    // console.log(req.body);
    // console.log(req.file);
    const palavra = req.body.palavra;
    const regiao = req.body.regiao;
    const config = req.body.config;
    const pontoArtic = req.body.pontoArtic;
    const caminho = req.body.caminho;

    const idSinal = uuidv4();
    const idUsuario = uuidv4();
    const idPalavra = uuidv4();
    const idConfig = uuidv4();
    const idRegiao = uuidv4();
    const idPonto = uuidv4();

    const erros = [];
    const sucessos = [];

    db.query('INSERT INTO sinal (id_sinal , id_usuario, avaliacao, status, caminho) VALUES (?, ?, ?, ?, ?) ', [idSinal, idUsuario, 0, 0, caminho], (err, result) => {
        if (err) {
            erros.push(err)
        } else {
            sucessos.push(result);
        }
    });

    db.query('INSERT INTO palavra (id_palavra , id_usuario_criacao, palavra) ' +
        'VALUES (?, ?, ?) ', [idPalavra, idUsuario, palavra], (err, result) => {
        if (err) {
            erros.push(err)
        } else {
            sucessos.push(result);
        }
    });

    db.query('INSERT INTO sinal_config (id_config , id_sinal) ' +
        'VALUES (?, ?) ', [idConfig, idSinal], (err, result) => {
        if (err) {
            erros.push(err)
        } else {
            sucessos.push(result);
        }
    });

    db.query('INSERT INTO sinal_regiao (id_regiao , id_sinal) ' +
        'VALUES (?, ?) ', [idRegiao, idSinal], (err, result) => {
        if (err) {
            erros.push(err)
        } else {
            sucessos.push(result);
        }
    });

    db.query('INSERT INTO sinal_ponto (id_ponto , id_sinal) ' +
        'VALUES (?, ?) ', [idPonto, idSinal], (err, result) => {
        if (err) {
            erros.push(err)
        } else {
            sucessos.push(result);
        }
    });

    if (erros.length) {
        res.send(erros);
    } else {
        res.send(sucessos);
    }

    // pensar como fazer a tabela sinal config ponto regiao (adicionare atributo valor pra tabela)

});

router.post("/upload",  multer(multerConfig).single('file'), (req, res) => {
    console.log(req.file);
    console.log(req.body);
})

module.exports = router;