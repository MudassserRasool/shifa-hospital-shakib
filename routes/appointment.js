

const router = require("express").Router();
const { addappointment,finddoctorAll,finddoctorbyId } = require("../Controller/appointment");

router.post("/", addappointment);
router.get("/findalldoctors",finddoctorAll)
router.get("/:doctorId",finddoctorbyId)
module.exports = router;
