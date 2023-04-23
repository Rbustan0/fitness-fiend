const router = require('express').Router();
const { User, Meal, Workout } = require('../models');
const withAuth = require('../utils/auth');



// Get User route
// No need for withauth (withAuth,)
router.get('/', async (req, res) => {
  try {
    // Get all users
    const userData = await User.findAll();

    // Serialize data so the template can read it
    const users = userData.map((user) => user.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      users, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
//get meal route
// const meal = oneMeal.get({plain: true})
//res.render('mealsAll', meal)
router.get('/meal/:id', async (req, res) => {
  try {
      const id = parseInt(req.params.id);
      const oneMeal = await Meal.findByPk(id);
      if (oneMeal) {
        const meal = oneMeal.get({plain: true})
          // res.json(oneMeal);
          res.render('mealUpdate', meal)
      } else {
          res.status(404).json({ error: 'Meal not found' });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to get meal' });
  }
});

// Get workout route

router.get('/workout/:id', async (req, res) => {
  try {
      const id = parseInt(req.params.id);
      const oneWorkout = await Workout.findByPk(id);
      if (oneWorkout) {
        const workout = oneWorkout.get({plain: true})
          // res.json(oneMeal);
          res.render('workoutUpdate', workout)
      } else {
          res.status(404).json({ error: 'Meal not found' });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to get workout bum!!' });
  }
});

// does not include /api
// all workout, user, and meal routes include /api/

router.get('/user/:id', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id);

    const user = userData.get({ plain: true });

    res.render('user', {
      ...user,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });

    // Serialize the user data so the template can read it
    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
