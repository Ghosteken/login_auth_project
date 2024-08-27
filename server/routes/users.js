const router = require('express').Router();
const { User, validateUser } = require('../models/user');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    try {
        const { error } = validateUser(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });

        const existingUser = await User.findByEmail(req.body.email);
        if (existingUser) return res.status(409).send({ message: "User with given email already exists!" });

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        await User.create({ ...req.body, password: hashPassword });
        res.status(201).send({ message: "User created successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

module.exports = router;
