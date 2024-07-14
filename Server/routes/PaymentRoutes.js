const express = require("express")
const router = express.Router()

const { capturePayment, verifySignature } = require("../controllers/PaymentsController")
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/AuthMiddleware")
router.post("/capturePayment", auth, isStudent, capturePayment)
router.post("/verifySignature", verifySignature)

module.exports = router