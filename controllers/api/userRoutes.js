const router = require('express').Router();
const { User, Meal, Workout } = require('../../models');
const { findByPk } = require('../../models/user');
const withAuth = require('../../utils/auth');



// ! Login Shiz
// THIS WORKS
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});


// ! User Shiz

// GET ALL USERS for testing purposes - THIS WORKS
router.get('/', async (req, res) => {
try {
  const userData = await User.findAll();
  res.json(userData);
}
catch (err) {
  res.status(500).json(err);
}
});


// GET USER ID: THIS WORKS
router.get('/:id', withAuth, async (req, res) => {
  try{
    const userData = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Meal }, { model: Workout }]
    });
    res.status(200).json(userData);
  }
  catch (err) {
    res.status(500).json(err);
  }
});


// Update information for a specific user. THIS WORKS
router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedUserData = await User.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json(updatedUserData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// Retrieve all meals for a specific user. Could have thrown this in the meal routes but seems to work with a User route as a catch all.
// THIS WORKS
router.get('/meals/:id', withAuth, async (req, res) => {
  try {
    const mealData = await Meal.findAll({
      where: { user_id: req.params.id },
    });
    res.status(200).json(mealData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// Create a new meal for a specific user. THIS WORKS
router.post('/meals/:id', withAuth, async (req, res) => {
  try {
    const newMeal = await Meal.create({
      ...req.body,
      user_id: req.params.id,
    });
    res.status(200).json(newMeal);
  } catch (err) {
    res.status(500).json(err);
  }
});


// // Retrieve all workouts for a specific user. this is also in the workout routes
// router.get('/:id/workouts', async (req, res) => {
//   try {
//     const workoutData = await Workout.findAll({
//       where: { user_id: req.params.id },
//     });
//     res.status(200).json(workoutData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// Get all User workouts specific to the user - 
// router.get('/workout/:id', async (req, res) => {
//   const id = parseInt (req.params.id)
//   try {
//       const allWorkouts = await Workout.findByPk(id, {where:[{ id: user_id }]}
//        );
//       res.json(allWorkouts);
//   } catch (error) {
//       console.error(error)
//       res.status(500).json({ message: "Failed to fetch workouts." });
//   }
// });

router.get('/workout/:id', async (req, res) => {
  try {
    const workoutData = await Workout.findAll({
      where: { user_id: req.params.id },
    });
    res.status(200).json(workoutData);
  } catch (err) {
    res.status(500).json(err);
  }
});




// Create a new workout for a specific user.
// THIS WORKS!
router.post('/workout/:id', async (req, res) => {
  try {
    const newWorkout = await Workout.create({
      ...req.body,
      user_id: req.params.id,
    });
    res.status(200).json(newWorkout);
  } catch (err) {
    res.status(500).json(err);
  }
});




module.exports = router;
