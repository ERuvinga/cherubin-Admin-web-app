// Routers for Authentification of users
const router = require("express").Router();
const CtrlUser = require("../../Controllers/Authentification")

router.post("/Login", CtrlUser.login);
router.post("/ActiveAccount", CtrlUser.Activation_account);
router.post("/newUser", CtrlUser.registerNewUser);

module.exports = router;