const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const levels = [];

app.use(cors());

app.get('/levels', (req, res) => {
  res.json(levels);
});

app.post('/levels', (req, res) => {
  const {grid, totalMines} = req.body;
  const newLevel = {grid, totalMines};
  levels.push(newLevel);
  res.status(201).json(newLevel);
});

app.use(bodyParser.json());

exports.api = functions.https.onRequest(app);
