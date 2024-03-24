/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const levels = [];

app.use(cors()); // Добавляем middleware для CORS

app.get("/levels", (req, res) => {
    // Ваша логика получения уровней
    res.json(levels);
});

app.post("/levels", (req, res) => {
    const { grid, totalMines } = req.body;
    const newLevel = { grid, totalMines };
    levels.push(newLevel);
    res.status(201).json(newLevel);
});

app.use(bodyParser.json());

exports.api = functions.https.onRequest(app);
