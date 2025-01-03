const router = require("express").Router();
const controller = require("../controllers/reclamationController");

//Api
router
  .route("/")
  .get(controller.find)
  .post(controller.create)
  .put(controller.update);

router.route("/:id").delete(controller.delete);
router.route("/getbyEmail").post(controller.findAllByEmail);

router.route("/info/:carId").get(controller.getInfo);
router.route("/info/:carId").put(controller.updateInfo);

router.get("/one", controller.findOne);
router.delete("/all", controller.deleteAll);

module.exports = router;
