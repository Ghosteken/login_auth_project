const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Function to generate JWT token
const generateAuthToken = (userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWTPRIVATEKEY, { expiresIn: '7d' });
  return token;
};

// Function to validate user data (you can add more validation logic here)
const validateUserData = (data) => {
  const Joi = require('joi');
  const passwordComplexity = require('joi-password-complexity');

  const schema = Joi.object({
    firstName: Joi.string().required().label('First Name'),
    lastName: Joi.string().required().label('Last Name'),
    email: Joi.string().email().required().label('Email'),
    password: passwordComplexity().required().label('Password'),
  });

  return schema.validate(data);
};

module.exports = { generateAuthToken, validateUserData };
