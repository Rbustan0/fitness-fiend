const router = require('express').Router();
const { Workout, Meal, User } = require('../../models');

const withAuth = require('../../utils/auth');


// ! THIS WORKS 
router.post('/', withAuth, async (req, res) => {
  try {
      const newWorkout = await Workout.create({
          ...req.body,
          user_id: req.session.user_id,
      });
      res.status(200).json(newWorkout);

      
      // const meal = newMeal.get({ plain: true })
      // res.json(meal);
      // res.render('mealsAll', meal)
  } catch (err) {
      res.status(500).json(err);



  }
});

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
//  ! WORKS
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