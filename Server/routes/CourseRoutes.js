const express = require("express");
const router = express.Router();

const {
  createCourse,
  showAllCourses,
  getCourseDetails,
} = require("../controllers/CourseController");

const {
  showAllCategories,
  createCategory,
  categoryPageDetails,
} = require("../controllers/CategoryController");

const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/SectionController");

const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../controllers/SubSectionController");

const {
  createRating,
  getAverageRating,
  getAllRatingsAndReviews,
} = require("../controllers/RatingsAndReviewController");

const {
  auth,
  isInstructor,
  isStudent,
  isAdmin,
} = require("../middlewares/AuthMiddleware");

router.post("/createCourse", auth, isInstructor, createCourse);
router.post("/addSection", auth, isInstructor, createSection);
router.post("/updateSection", auth, isInstructor, updateSection);
router.post("/deleteSection", auth, isInstructor, deleteSection);
router.post("/updateSubSection", auth, isInstructor, updateSubSection);
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);
router.post("/addSubSection", auth, isInstructor, createSubSection);
router.get("/getAllCourses", showAllCourses);
router.post("/getCourseDetails", getCourseDetails);

router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories);
router.post("/getCategoryPageDetails", categoryPageDetails);

router.post("/createRating", auth, isStudent, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRatingsAndReviews);

module.exports = router;
