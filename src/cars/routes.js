const { Router } = require("express");
const Vehicle = require("./model");
const vehicleRouter = Router();
const { addVehicle, getAllMakes, getMake, getModel, updateVehicle} = require("./controllers");

vehicleRouter.post("/vehicle", addVehicle);
vehicleRouter.get("/vehicles", getAllMakes)
vehicleRouter.get("/vehicles/:make", getMake)
vehicleRouter.get("/vehicles/:make/:model", getModel)
vehicleRouter.patch("/vehicles/update/:make/:model/:newModelName", updateVehicle)
module.exports = vehicleRouter;
