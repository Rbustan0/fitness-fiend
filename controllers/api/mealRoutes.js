const router = require('express').Router();

const { Meal, User, Workout } = require('../../models');
const withAuth = require('../../utils/auth');



// Create a new meal for a specific user. 
// ! THIS WORKS 
router.post('/', withAuth, async (req, res) => {
    try {
        const newMeal = await Meal.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newMeal);

        
        // const meal = newMeal.get({ plain: true })
        // res.json(meal);
        // res.render('mealsAll', meal)
    } catch (err) {
        res.status(500).json(err);

     

    }
});




// This changes an individual meal of a user
// ! WORKS
router.put('/:id', withAuth, async (req, res) => {

try{
    const meal = await Meal.findOne({
        where: { id: req.params.id, user_id: req.session.user_id },
    });
    
    if (!meal) {
        res.status(404).json({ error: 'Meal not found' });

        return;
    }

    const updatedMeal = await meal.update(req.body);
    res.json(updatedMeal);



}
catch{
    res.status(500).json({ error: "Failed to update meal" });
    
}


});

// Deletes meal of individual user
// ! WORKS
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const meal = await Meal.findOne({
            where: { id: req.params.id, user_id: req.session.user_id },
        });
        if (!meal) {
            res.status(404).json({ error: 'Meal not found.' });
           
            return;
        }
        await meal.destroy();
        res.json({ message: 'Meal deleted.' });



    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete meal.' });
  
    }
});



module.exports = router;