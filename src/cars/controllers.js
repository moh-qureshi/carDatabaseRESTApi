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
        res.send({makes})
    } catch (error) {
        console.log(error);
        res.send({ error })
    }
};

exports.getMake = async (req, res) => {
    try {
        const make = await Vehicle.findOne( {"make.name": req.params.make} ).exec()
        res.send({make});
    } catch (error) {
        console.log(error);
        res.send({ error })
    }
};

exports.getModel = async (req, res) => {
    try {
        const model = await Vehicle.aggregate([
            {
              '$match': {
                'make.name': req.params.make
              }
            }, {
              '$unwind': {
                'path': '$model'
              }
            }, {
              '$match': {
                'model.name': req.params.model
              }
            }
          ]).exec()
        res.send({model});
    } catch (error) {
        console.log(error);
        res.send({ error })
    }
};

exports.updateVehicle = async (req, res) =>{
  try {
    const model = await Vehicle.aggregate( [
      {
        '$match': {
          'make.name': req.params.make
        }
      }, {
        '$unwind': {
          'path': '$model'
        }
      }, {
        '$match': {
          'model.name': req.params.model
        }
      },
      {
        //Change "model.name" to field to change/add
        '$addFields': { 'model.name': req.params.updatedEntry }
      }
    ]).exec() 
    res.send({model}) 
  } catch (error) {
    console.log(error);
    res.send({ error })
  }
}
