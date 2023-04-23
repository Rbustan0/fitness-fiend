const router = require('express').Router();
const { Workout, Meal, User } = require('../../models');

const withAuth = require('../../utils/auth');






// Get All User workouts
// ! Edit and change this in USER ROUTE

// router.get('/', withAuth, async (req, res) => {
//   try {
//     const allWorkouts = await Workout.findAll({ where: { user_id: req.user.id } });
//     res.json(allWorkouts);

//     // TODO: render in handlebars


//   } 
//   catch (error) {

//     console.error(error)
//     res.status(500).json({ message: "Failed to fetch workouts." });
//   }

//   // TODO: render in handlebars

// });


// Post Route by Patricia
// router.post('/', async (req, res) => {
//     try {
//         const newWorkout = await Workout.create({
//             res.json(newWorkout);
//         } catch (error) {
//             console.error(error)
//             res.status(500).json({ message: "Failed to create workout." });
//         })
//     }
// });




// ! NOTE TO PATRICIA: COULD POSSIBLY REMOVE '/workout' FROM ROUTE NAME


// // GET /workouts/:id: Retrieve information by id DO NOT NEED IN WORKOUTS< will be in user
// router.get('/:id', async (req, res) => {
//   try {
//     const id = parseInt(req.params.id);
//     const workout = await Workout.findByPk(id);
//     if (!workout) {
//       res.status(404).json({ error: 'Workout not found' });
//     } else {
//       res.json(workout);
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// POST a new workout for a specific user. -- took this from user routes -- DO NOT NEED IN WORKOUTS, will be in user
// router.post('/:id/workouts', async (req, res) => {
//   try {
//     const newWorkout = await Workout.create({
//       ...req.body,
//       user_id: req.params.id,
//     });
//     res.status(200).json(newWorkout);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


// PUT /workout/:id: Update information for a specific workout.
router.put('/:id', withAuth, async (req, res) => {
  try {
    const workout = await Workout.findOne({ where: { id: req.params.id, user_id: req.user.id } });
    if (!workout) {
      res.status(404).json({ error: 'Workout not found' });
      // TODO: render in handlebars
      return;
    } 
      
    const updatedWorkout = await workout.update(req.body);
    res.json(updatedWorkout);

    // TODO: render in handlebars
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });

    // TODO: render in handlebars
  }
});


// DELETE /workout/:id: Delete a specific workout.
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const workout = await Workout.findOne({ where: { id: req.params.id, user_id: req.user.id } });
    
    if (!workout) {
      res.status(404).json({ error: 'Workout not found' });
      // TODO: render in handlebars
      return;
    }
      
      await workout.destroy();
      res.json({ message: 'Workout deleted' });
      // TODO: render in handlebars
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
    // TODO: render in handlebars
  }
});




module.exports = router;