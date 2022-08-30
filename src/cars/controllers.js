const Vehicle = require("./model");

exports.addVehicle = async (req, res) =>{
    try {
        const vehicleObj = {
            make: req.body.make,
            model: req.body.model
        }
        const newVehicle = await Vehicle.create(vehicleObj);
        res.send({newVehicle})
    } catch (error) {
        console.log(error);
        res.send({error})
    }
}

exports.getAllMakes = async (req, res) => {
    try {
        const makes = await Vehicle.find()
        console.log(makes)
        res.send({makes})
    } catch (error) {
        console.log(error);
        res.send({ error })
    }
};