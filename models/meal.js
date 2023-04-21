// TODO Change accordingly

//id (primary), user_id (foreign key), meal_name, calories, meal_date, type 
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('../models');

class Meal extends Model {}

Meal.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    meal_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    meal_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    calories: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    meal_type: {
      type: DataTypes.ENUM('breakfast', 'lunch', 'dinner', 'snack'),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'meal',
  }
);

module.exports = Meal;
