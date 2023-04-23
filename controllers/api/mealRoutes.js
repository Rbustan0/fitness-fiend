const router = require('express').Router();

const { Meal, User, Workout } = require('../../models');
const withAuth = require('../../utils/auth');


// Get all meals
// Get Route


// Roye: Included where and include statements to make sure that only the user can see and access its own route data.

router.get('/', withAuth, async (req, res) => {
    try {
        const allMeals = await Meal.findAll({
            where: { user_id: req.session.user_id },
            include: [{model: User}]
        });
        res.json(allMeals);
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Failed to fetch meals." });
    }
});

// GOOD



// // req.body example    	{

// 		"meal_name": "Peanut butter & jelsdfaly",
// 		"description": "Tesdfst",
// 		"meal_date": "2023-03-20T00:00:00.000Z",
// 		"calories": 50,
// 		"meal_type": "lunch",
// 		"user_id": 3
// 	}

// POST route for creating a new meal
router.post('/', withAuth, async (req, res) => {
    try {
        const { meal_name, description, meal_date, calories, meal_type, user_id } = req.body; // Extracting the required fields from req.body
        const newMeal = await Meal.create({
            meal_name,
            description,
            meal_date,
            calories,
            meal_type,
            user_id
        });
        res.json(newMeal);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create new meal" });
    }
});


// ? added two routes incase CRUD



// TODO: NEED to fix routes so that it only edits the users meal not the rest. 

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

    // TODO Render some html message that indicates successful change

}
catch{
    res.status(500).json({ error: "Failed to update meal" });
}


});


router.delete('/:id', async (req, res) => {
    try{

        const meal = await Meal.findByPk(req.params.id);
        if (!meal) {
            res.status(404).json({ error: 'Meal not found' });
            return;
        }
        await meal.destroy();
        res.json({ message: 'Meal deleted' });

        // TODO Render some html message that indicates successful post
    }
    catch{
        res.status(500).json({ error: "Failed to delete meal" });
    }
})



module.exports = router;