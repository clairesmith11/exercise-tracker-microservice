const express = require('express');
const controllers = require('./controllers');

const router = express.Router();

router.post('/new-user', controllers.newUser);
router.post('/add', controllers.newExercise);
router.get('/users', controllers.getAllUsers);
router.get('/log', controllers.getUserExercises);

module.exports = router;