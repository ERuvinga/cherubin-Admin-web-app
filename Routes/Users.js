// Routers for Authentification of users
const router = require("express").Router();
const CtrlUser = require("../Controllers/users");

router.get("/:useRole/:status", CtrlUser.getAllUsers);
router.get("/locators", CtrlUser.getLocators);
router.delete("/Delete/:id", CtrlUser.deleteUser);
router.post("/logout", CtrlUser.logout);
router.post("/NewAppart",  CtrlUser.NewAppartement);

module.exports = router;