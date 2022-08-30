const { Router } = require("express");
const vehicleRouter = Router();
const { addVehicle, getAllMakes } = require("./controllers");

vehicleRouter.post("/vehicle", addVehicle);
vehicleRouter.get("/vehicle", getAllMakes)
module.exports = vehicleRouter;
