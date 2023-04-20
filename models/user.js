// TODO Change accordingly

// User id, email, password (figure out how to hash), weight (foreign key), goal weight, height, age, bmi, meals (foreign key) 


const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      }
    },
    
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    
    goal_weight: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    
    height:{
      type: DataTypes.INTEGER,
      allowNull: false
    },

    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    
    bmi:{
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    hooks:{
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      }
  },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;
