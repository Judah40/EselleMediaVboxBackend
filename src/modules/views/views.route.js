const { optionalAuth } = require("../../middlewares/auth.middleware");
const { viewsController } = require("./views.controller");

const { Router } = require("express");

const router = Router();

router.post("/:id", optionalAuth, viewsController);
module.exports = router;
