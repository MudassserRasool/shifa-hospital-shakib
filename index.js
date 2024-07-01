require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const authRoutes = require("./routes/auth");
const signupRoutes = require("./routes/users");
const patientSignup = require("./routes/patientSignup");
const doctortiming = require("./routes/doctors");
const appointment = require("./routes/appointment");
app.use(express.json());
app.use(cors());

connection();

app.use("/api/auth", authRoutes);
app.use("/api/signup", signupRoutes);
app.use("/api/signup/patient", patientSignup);
app.use("/api/add/doctortiming", doctortiming);
app.use("/api/add/appointment", appointment);
const port = process.env.PORT || 8383;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
