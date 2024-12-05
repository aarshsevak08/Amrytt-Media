const express = require("express")
const { signup, login, updateuserbyid, forgotpassword, resetPassword } = require("../controller/user")
const router = express.Router()


router.post("/signup",signup)
router.post("/login",login)
router.put("/updateuserbyid/:id",updateuserbyid)
router.post("/forgotpassword",forgotpassword)
router.put("/resetpassword/:token",resetPassword)


module.exports = router