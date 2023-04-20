// TODO EXPLAIN OUR RELATIONSHIPS

const User = require('./user');
const Workout = require('./workout');
const Meal = require('./meal');


User.hasMany(Workout, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Workout.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Meal, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Meal.belongsTo(User, {
  foreignKey: 'user_id'
});


module.exports = { User, Workout, Meal };
