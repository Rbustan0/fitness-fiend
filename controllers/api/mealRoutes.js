const router = require('express').Router();

const { Meal} = require('../../models');


// Get all meals
// Get Route
router.get('/', async (req, res) => {
    try {
        const allMeals = await Meal.findAll();
        res.json(allMeals);
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Failed to fetch meals." });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const oneMeal = await Meal.findByPk(id);
        if (oneMeal) {
            res.json(oneMeal);
        } else {
            res.status(404).json({ error: 'Meal not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get meal' });
    }
});


// // req.body example    	{

// 		"meal_name": "Peanut butter & jelsdfaly",
// 		"description": "Tesdfst",
// 		"meal_date": "2023-03-20T00:00:00.000Z",
// 		"calories": 50,
// 		"meal_type": "lunch",
// 		"user_id": 3
// 	}

// POST route for creating a new meal
router.post('/', async (req, res) => {
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



// Put Routes



// Delete Routes






module.exports = router;