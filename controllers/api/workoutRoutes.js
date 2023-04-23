const router = require('express').Router();
const { Workout, Meal, User } = require('../../models');

const withAuth = require('../../utils/auth');


// PUT /workout/:id: Update information for a specific workout.
// ! WORKS 
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
//  
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