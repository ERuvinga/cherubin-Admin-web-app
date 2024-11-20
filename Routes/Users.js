// Routers for Authentification of users
const router = require("express").Router();
const CtrlUser = require("../Controllers/users");
const CtrlrCheckAutorizationUser = require("../Controllers/Authentification/Autorizations");

router.get("/:useRole/:status", CtrlUser.getAllUsers);
router.post("/New", CtrlrCheckAutorizationUser.CheckAutorizationUser, CtrlUser.NewUser);
router.delete("/Delete/:id", CtrlUser.deleteUser);

module.exports = router;