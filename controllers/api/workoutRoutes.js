const router = require('express').Router();
const { Workout, Meal } = require('../../models');





// Get All User workouts
//   router.get('/', async (req, res) => {
//       try {
//           const allWorkouts = await Workout.findAll();
//           res.json(allWorkouts);
//       } catch (error) {
//           console.error(error)
//           res.status(500).json({ message: "Failed to fetch workouts." });
//       }
//   });



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




// GET /workouts/:id: Retrieve information for a specific workout.
router.get('/workout/:id', async (req, res) => {
  try {
    const workout = await Workout.findByPk(req.params.id);
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
router.put('/workout/:id', async (req, res) => {
  try {
    const workout = await Workout.findByPk(req.params.id);
    if (!workout) {
      res.status(404).json({ error: 'Workout not found' });
    } else {
      const updatedWorkout = await workout.update(req.body);
      res.json(updatedWorkout);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /workout/:id: Delete a specific workout.
router.delete('/workout/:id', async (req, res) => {
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