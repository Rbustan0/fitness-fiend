const router = require('express').Router();
const { Workout, Meal } = require('../../models');





// Get All User workouts
  router.get('/', async (req, res) => {
      try {
          const allWorkouts = await Workout.findAll();
          res.json(allWorkouts);
      } catch (error) {
          console.error(error)
          res.status(500).json({ message: "Failed to fetch workouts." });
      }
  });



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



// GET /workouts/:id: Retrieve information by id
router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const workout = await Workout.findByPk(id);
    if (!workout) {
      res.status(404).json({ error: 'Workout not found' });
    } else {
      res.json(workout);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /workout/:id: Update information for a specific workout.
router.put('/:id', async (req, res) => {
  try {
    const workout = await Workout.findByPk(req.params.id);
    if (!workout) {
      res.status(404).json({ error: 'Workout not found' });
    } else {
      const updatedWorkout = await Workout.update(req.body);
      res.json(updatedWorkout);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /workout/:id: Delete a specific workout.
router.delete('/:id', async (req, res) => {
  try {
    const workout = await Workout.findByPk(req.params.id);
    if (!workout) {
      res.status(404).json({ error: 'Workout not found' });
    } else {
      await workout.destroy();
      res.json({ message: 'Workout deleted' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});




module.exports = router;