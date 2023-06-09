const router = require('express').Router();
const { User, Meal, Workout } = require('../models');
const withAuth = require('../utils/auth');
const Sequelize = require('sequelize');



// Get User route
// No need for withauth (withAuth,)

// HOMEPAGE
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

// GET INDIVIDUAL MEALS NOT RELATED TO USER
router.get('/meal/:id', async (req, res) => {
  try {
      const id = parseInt(req.params.id);
      const oneMeal = await Meal.findByPk(id);
      if (oneMeal) {
        const meal = oneMeal.get({plain: true})
          // res.json(oneMeal);
          res.render('mealsAll', meal);
      } else {
          res.status(404).json({ error: 'Meal not found' });

          // TODO: render error on Handlebars
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to get meal' });
      
      // TODO: render error on Handlebars
  
    }
});

// GET all meals for user
router.get('/meals', async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      include: [{ model: Meal }]
    });
    
    const user = userData.get({ plain: true });
    //  res.json(user);
    res.render('mealsAll', { user, logged_in: req.session.logged_in });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get meal' });

    

  }
});

// GET all workouts for user
router.get('/workouts', async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      include: [{ model: Workout }] 
    });
    
    const user = userData.get({ plain: true });
    //  res.json(user);
    res.render('workoutsAll', { user, logged_in: req.session.logged_in}); 

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get workout!' });

    

  }
});

// GET all user info
router.get('/user', async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id);

    const user = userData.get({ plain: true });
    // res.json(user);
     res.render('user', { user, logged_in: req.session.logged_in });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get user' });



  }
});


// Get workout route
// GET WORKOUT BY USER ID
// ! Tested and Works
router.get('/workout/:id', async (req, res) => {
  try {
      const id = parseInt(req.params.id);
      const oneWorkout = await Workout.findByPk(id);
      if (oneWorkout) {
        const workout = oneWorkout.get({plain: true})
          // res.json(oneMeal);
          res.render('workoutUpdate', workout);
          // TODO: remove "user:" from associated handlebars template
          // TODO: fix date created formate as well as underscore template.
      } else {
          res.status(404).json({ error: 'Meal not found' });
          // TODO: render error on Handlebars
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to get workout bum!!' });
      // TODO: render error on Handlebars
  }
});

// does not include /api
// all workout, user, and meal routes include /api/
// ! Tested and Works
router.get('/user/:id', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id);
    // res.status(200).json(userData);
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
// ! Tested and presents Null response. Should work due to it being mostly boilerplate. NOTE: Need to check if user is able to create profiles.
router.get('/profile', async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      include: [{ model: Meal, attributes:[ "calories", [Sequelize.fn("SUM", Sequelize.col("calories")), "totalCalories"]]}, { model: Workout,  attributes:[ "calories_burnt", [Sequelize.fn("SUM", Sequelize.col("calories_burnt")), "totalCaloriesBurnt"]] }],
      attributes: { exclude: ['password'] },
    });

    // res.status(200).json(userData);
    // Serialize the user data so the template can read it
    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
    // TODO: render error on Handlebars
    // TODO: 404? Probably not.
  }
});

// ! Def works. Boilerplate.
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});



module.exports = router;


