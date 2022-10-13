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
    const update = await Vehicle.aggregate([
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
        }, {
          '$set': {
            //change to field that needs to update - will add new field if field doesn't exist
            "specs": [{
              "0-60": "3.5 seconds",
              "valves": "20"
            }]
          }
        }, {
          '$merge': {
            'into': 'vehicles'
          }
        }
    ]).exec()
    console.log(`${req.params.make} ${req.params.model} has been updated`)
    res.send({update})
  } catch (error) {
    console.log(error);
    res.send({ error })
  }
}

// '$addFields': { 'performance_specs': {
//   '0-60':'3.5 seconds',
//   'top_speed':'120 mph',
//   'cylinders':'5',
//   'engine_power':'210 bhp',
// },
// 'safety_specs': {
//   'air_bags':'true',
//   'alarm':'true',
//   'anti-lock_brakes':'true',
//   'central_door_locking':'true',
//   'deadlocks':'true',
//   'electronic_stability_programme':'true',
//   'fog_lights':'true',
//   'immobiliser':'true',
//   'head_restraints':'true',
//   'power-assisted_steering':'true',
//   'traction_control_system':'true',
//   'tyre_repair_kit':'true',
// },
// 'dimension_specs': {
//   'height':'',
//   'length':'',
//   'width':'',
//   'wheelbase':'',
//   'fuel_tank_capacity':'',
//   'minimum kerb weight':''    
// }}
// },
// { '$merge': {into: "carsDBREST"} }
// ]).exec()