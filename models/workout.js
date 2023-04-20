// TODO Change accordingly

//user_id, id (primary key), workout_name, workout_description, workout_type, duration, date_created, 
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./user');

class Workout extends Model {}

Workout.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    workout_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    workout_description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    workout_type: {
      type: DataTypes.ENUM('cardio', 'strength training', 'conditional training', 'sport', 'calesthetics', 'stretching'),
      allowNull: false
    },

    calories_burnt: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }

  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'workout',
  }
);

module.exports = Workout;
