const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home_controller")

router.get("/",homeController.home)
router.post("/habbits/create",homeController.create)
router.get("/habbits/destroy", homeController.destroyHabbit);
router.get("/habbits/status/toggle", homeController.toggleStatus);
router.get("/habbits/status/:habbit_id", homeController.getAllStatus);
router.get("/habbits/status/count/:habbit_id", homeController.getStatCount);

module.exports = router;