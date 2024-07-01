const Appointment = require("../models/appointmentModel");

const addappointment = async (req, res) => {
  try {
    // Extract data from the request
    const {
      patientId,
      doctorId,
      appointmentDate,
      appointmentTime,
      appointmentType,
      diabtesReading,
      bloodPreseureLow,
      bloodPreseureHigh,
    } = req.body;

    // Create a new job posting
    const appointment = await Appointment.create({
      patientId,
      doctorId,
      appointmentDate,
      appointmentTime,
      appointmentType,
      diabtesReading,
      bloodPreseureLow,
      bloodPreseureHigh,
    });
    console.log(appointment, "appointment");
    res.status(201).json(appointment);
  } catch (error) {
    console.error("Appointment creation failed:", error);
    res.status(500).json({ error: "Appointment creation failed" + error });
  }
};

// const finddoctorById = async (req, res) => {
//     try {
//         console.log(req,"request")
//         console.log(req.params.id,"doctorId")
//         const doctorId=req.params.id
//         const doctor = await Appointment.findById(doctorId);
//         console.log(doctor,"doctor")
//         if (!doctor) return res.status(404).send({ message: "doctor not found" });

//         res.json(doctor);
//     } catch (error) {
//         console.error('Error fetching user by doctor:', error);
//         res.status(500).json({ error: 'Error fetching user' });
//     }
// };

const finddoctorAll = async (req, res) => {
  try {
    const users = await Appointment.find();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Error fetching users" });
  }
};
const finddoctorbyId = async (req, res) => {
  try {
    const doctorId = req.params.doctorId;
    const doctor = await Appointment.findOne({ doctorId: doctorId });

    if (!doctor) return res.status(404).send({ message: "doctor not found" });

    res.json(doctor);
  } catch (error) {
    console.error("Error fetching doctor by ID:", error);
    res.status(500).json({ error: "Error fetching doctor" });
  }
};

module.exports = { addappointment, finddoctorAll, finddoctorbyId };
