const { Router } = require("express");
const Vehicle = require("./model");
const vehicleRouter = Router();
const { addVehicle, getAllMakes, getMake} = require("./controllers");

vehicleRouter.post("/vehicle", addVehicle);
vehicleRouter.get("/vehicles", getAllMakes)
vehicleRouter.get("/vehicles/:make", getMake)
module.exports = vehicleRouter;
