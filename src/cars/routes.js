const { Router } = require("express");
const Vehicle = require("./model");
const vehicleRouter = Router();
const { addVehicle, addModel, getAllMakes, getMake, getModel, updateVehicle} = require("./controllers");

vehicleRouter.post("/vehicles/add", addVehicle);
vehicleRouter.patch("/vehicles/add/:make/model", addModel);
vehicleRouter.get("/vehicles", getAllMakes)
vehicleRouter.get("/vehicles/:make", getMake)
vehicleRouter.get("/vehicles/:make/:model", getModel)
vehicleRouter.patch("/vehicles/update/:make/:model/", updateVehicle)
module.exports = vehicleRouter;
