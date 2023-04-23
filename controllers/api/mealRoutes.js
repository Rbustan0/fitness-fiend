const router = require('express').Router();

const { Meal, User, Workout } = require('../../models');
const withAuth = require('../../utils/auth');


router.put('/:id', withAuth, async (req, res) => {

try{
    const meal = await Meal.findOne({
        where: { id: req.params.id, user_id: req.session.user_id },
    });
    
    if (!meal) {
        res.status(404).json({ error: 'Meal not found' });
        // TODO Render in handlebars instead
        return;
    }

    const updatedMeal = await meal.update(req.body);
    res.json(updatedMeal);

    // TODO Render in handlebars instead

}
catch{
    res.status(500).json({ error: "Failed to update meal" });
    // TODO Render in handlebars instead
}


});


router.delete('/:id', withAuth, async (req, res) => {
    try {
        const meal = await Meal.findOne({
            where: { id: req.params.id, user_id: req.session.user_id },
        });
        if (!meal) {
            res.status(404).json({ error: 'Meal not found.' });
            // TODO Render in handlebars instead
            return;
        }
        await meal.destroy();
        res.json({ message: 'Meal deleted.' });

        // TODO Render in handlebars instead


    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete meal.' });
        // TODO Render in handlebars instead
    }
});



module.exports = router;