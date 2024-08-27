const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

const prisma = new PrismaClient();

const validateUser = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required().label("First Name"),
        lastName: Joi.string().required().label("Last Name"),
        email: Joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password"),
    });
    return schema.validate(data);
};

const User = {
    create: async (userData) => {
        return await prisma.user.create({
            data: userData
        });
    },
    findByEmail: async (email) => {
        return await prisma.user.findUnique({
            where: { email }
        });
    },
};

const generateAuthToken = (userId) => {
    const token = jwt.sign({ id: userId }, process.env.JWTPRIVATEKEY, {
        expiresIn: "7d",
    });
    return token;
};

module.exports = { User, validateUser, generateAuthToken };
