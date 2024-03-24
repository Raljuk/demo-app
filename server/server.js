const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

const levels = [];

app.get('/levels', (req, res) => {
  res.json(levels);
});

app.post('/levels', (req, res) => {
  const { grid, totalMines } = req.body;
  const newLevel = { grid, totalMines };
  levels.push(newLevel);
  res.status(201).json(newLevel);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
