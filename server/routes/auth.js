const router = require('express').Router();
const prismaClient = require('../prismaClient') // Ensure this points to your Prisma client instance
const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

// Validation function
const validateUser = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password"),
    });
    return schema.validate(data);
};

router.post('/', async (req, res) => {
    try {
        // Check if prismaClient is defined
        if (!prismaClient || !prismaClient.user) {
            throw new Error("Prisma client is not properly initialized.");
        }

        const { error } = validateUser(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });

        const user = await prismaClient.user.findUnique({
            where: { email: req.body.email }
        });

        if (!user) return res.status(401).send({ message: "Invalid Email or Password" });

        // Verify password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(401).send({ message: "Invalid Email or Password" });

        // Generate JWT token
        const token = jwt.sign({ id: user.id }, process.env.JWTPRIVATEKEY, {
            expiresIn: '7d'
        });

        res.status(200).send({ data: token, message: "Logged in successfully" });
    } catch (error) {
        console.error('Error details:', error.message); // Log error details for debugging
        res.status(500).send({ message: "Internal Server Error" });
    }
});

module.exports = router;
