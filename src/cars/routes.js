const { Router } = require("express");
const vehicleRouter = Router();
const { addVehicle, getAllMakes } = require("./controllers");

vehicleRouter.post("/vehicle", addVehicle);
vehicleRouter.get("/allMakes", getAllMakes)
module.exports = vehicleRouter;
