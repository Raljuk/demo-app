const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const levels: any = [];

app.use(cors()); // Добавляем middleware для CORS

app.get("/levels", (req: any, res: any) => {
  // Ваша логика получения уровней
  res.json(levels);
});

app.post("/levels", (req: any, res: any) => {
  const { grid, totalMines } = req.body;
  const newLevel = { grid, totalMines };
  levels.push(newLevel);
  res.status(201).json(newLevel);
});

app.use(bodyParser.json());

exports.api = functions.https.onRequest(app);
