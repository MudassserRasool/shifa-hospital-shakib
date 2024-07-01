const router = require("express").Router();
const { login } = require("../Controller/authController");
const {patientlogin} = require('../Controller/patientauth')
router.post("/", login);
router.post("/patient", patientlogin);

module.exports = router;