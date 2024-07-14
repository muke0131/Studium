const express = require("express")
const router = express.Router()
const { auth } = require("../middlewares/AuthMiddleware")
const {
  deleteProfile,
  updateProfile,
  getAllUserDetails,
  updateDisplayPicture,
  getEnrolledCourses,
} = require("../controllers/ProfileController")

router.delete("/deleteProfile", auth, deleteProfile)
router.put("/updateProfile", auth, updateProfile)
router.get("/getUserDetails", auth, getAllUserDetails)
router.get("/getEnrolledCourses", auth, getEnrolledCourses)
router.put("/updateDisplayPicture", auth, updateDisplayPicture)

module.exports = router