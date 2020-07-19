'use strict';
const uuidv4 = require('uuid/v4');
const bcrypt = require("bcrypt");
const config = require("../config");

const hashPasswordGenerate = (password) => {
  const salt = bcrypt.genSaltSync(config.saltRound);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      id : uuidv4(),
      username : 'Dheeraj',
      email : 'dheeraj123@gmail.com',
      password : hashPasswordGenerate('Password@123'),
      role :  "SUPER_ADMIN",
      createdAt : (new Date()).toISOString(),
      updatedAt : (new Date()).toISOString()
    },{
      id: uuidv4(),
      username : 'Prajjwal',
      email : 'prajjwal123@gmail.com',
      password : hashPasswordGenerate('Pass@123'),
      role : "ADMIN",
      createdAt : (new Date()).toISOString(),
      updatedAt : (new Date()).toISOString()  
    },{ 
      id : uuidv4(),
      username : 'ABC',
      email : 'abc123@gmail.com',
      password : hashPasswordGenerate('abc@123'),
      role : "USER",
      createdAt : (new Date()).toISOString(),
      updatedAt : (new Date()).toISOString()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', {
      username: ["Dheeraj","Prajjwal","ABC"] 
    });
  }
};
