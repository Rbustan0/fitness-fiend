// TODO: Edit Accordingly

const sequelize = require('../config/connection');
const { User, Meal, Workout } = require('../models');

const userData = require('./userData.json');
const mealData = require('./mealData.json');
const workoutData = require('./workoutData.json');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  console.log(User)
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const meals = await Meal.bulkCreate(mealData, {
        returning: true,
  });

  // const workouts = await Workout.bulkCreate(workoutData, {
  //   returning: true,
  // });

  // for (const project of projectData) {
  //   await Project.create({
  //     ...project,
  //     user_id: users[Math.floor(Math.random() * users.length)].id,
  //   });
  // }

  process.exit(0);
};

seedDatabase();
//asodi