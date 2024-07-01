// controllers/authController.js

const { patients } = require("../models/patients");
const Joi = require("joi");
const bcrypt = require("bcrypt");

const patientlogin = async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        const user = await patients.findOne({ email: req.body.email });
        if (!user)
            return res.status(401).send({ message: "Invalid Email or Password" });

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword)
            return res.status(401).send({ message: "Invalid Email or Password" });

        const token = await user.generateAuthToken();
        res.status(200).send({
            data: {
                name: user.name,
                condition:user.condition,
                specialization: user.specialization,
                email: user.email
            },
            token: token,
            message: "Logged in Successfully"
        });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
        console.log(error);
    }
};

const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password"),
    });
    return schema.validate(data);
};

module.exports = { patientlogin };