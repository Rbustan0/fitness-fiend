const router = require('express').Router();
const { User, Meal, Workout } = require('../../models');
const { findByPk } = require('../../models/user');
const withAuth = require('../../utils/auth');



// ! Login Shiz


// session data required for login
//! THIS WORKS
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
// TODO: COMMENT THIS OUT WHEN SUBMITTING
router.get('/', async (req, res) => {
try {
  const userData = await User.findAll();
  res.json(userData);
}
catch (err) {
  res.status(500).json(err);
}
});


// GET USER ID with associated meals and associated workouts
//  ! works! withAuth,
router.get('/:id',  async (req, res) => {
  try{
    const userData = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Meal }, { model: Workout }]
    });
    res.status(200).json(userData);
    // TODO: render in handlebars
    
  }
  catch (err) {
    res.status(500).json(err);
    // TODO: render in handlebars
    
  }
});


// Update information for a specific user. 
// ! THIS WORKS
router.put('/' , withAuth, async (req, res) => {
  try {
    const updatedUserData = await User.update({
      ...req.body
    },{
      where: {
        id: req.session.user_id
      },
      
    });
    res.status(200).json(updatedUserData);
   
    
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
    
  }
});


// Retrieve all meals for a specific user. Could have thrown this in the meal routes but seems to work with a User route as a catch all.
// ! THIS WORKS 
router.get('/meal/:id', withAuth, async (req, res) => {
  try {
    const mealData = await Meal.findAll({
      where: { user_id: req.params.id },
    });
    res.status(200).json(mealData);

    //TODO: render in handlebars

  } catch (err) {
    res.status(500).json(err);

    //TODO: render in handlebars

  }
});




// Gets all workouts pertaining to the user.
// ! Works! 
router.get('/workout/:id', withAuth, async (req, res) => {
  try {
    const allWorkouts = await Workout.findAll({ where: { user_id: req.params.id } });
    res.json(allWorkouts);

    // TODO: render in handlebars


  }
  catch (error) {

    console.error(error);
    res.status(500).json({ message: "Failed to fetch workouts." });
  }

  // TODO: render in handlebars

});




// Create a new workout for a specific user.
// ! THIS WORKS! 
router.post('/workout/:id', withAuth, async (req, res) => {
  try {
    const newWorkout = await Workout.create({
      ...req.body,
      user_id: req.params.id,
    });
    
    res.status(200).json(newWorkout);

    // TODO: render in handlebars

  } catch (err) {
    
    res.status(500).json(err);

    // TODO: render in handlebars

  }
});




module.exports = router;
