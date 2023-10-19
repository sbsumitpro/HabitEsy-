const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home_controller")
const passport = require("passport");

router.get("/",homeController.home)
router.post("/habbits/create",homeController.create)
router.get("/habbits/destroy", homeController.destroyHabbit);
router.post("/habbits/status/toggle", homeController.toggleStatus);
router.get("/habbits/status/:habbit_id", homeController.getAllStatus);
router.get("/habbits/status/count/:habbit_id", homeController.getStatCount);

router.use("/users",require("./users"))


module.exports = router;