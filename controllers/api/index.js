const router = require('express').Router();
const userRoutes = require('./userRoutes');
const mealRoutes = require('./mealRoutes');
const workoutRoutes = require('./workoutRoutes');


router.use('/user', userRoutes);
router.use('/meal', mealRoutes);
router.use('/workout', workoutRoutes);


module.exports = router;
