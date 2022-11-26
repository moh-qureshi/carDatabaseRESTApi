const { ObjectId } = require("mongodb");
const Vehicle = require("./model");
exports.addVehicle = async (req, res) =>{
    try {
        const vehicleObj = {"make": req.body.make}
        const newMake = await Vehicle.create(vehicleObj);
        res.send({newMake})
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
        const make = await Vehicle.findOne( {"name": req.params.make} ).exec()
        const test = make.name
        res.send({test});
    } catch (error) {
        console.log(error);
        res.send({ error })
    }
};

exports.getModel = async (req, res) => {
    try {
        const vehicle = await Vehicle.findOne({"make.name": req.params.make}).exec()
        const models = vehicle.make.models
        for (let i = 0; i < models.length; i++){
         if(models[i].model_name === req.params.model){
           res.send(models[i]);
         }
        }
    } catch (error) {
        console.log(error);
        res.send({ error })
    }
};

exports.addModel = async (req, res) => {
  try {
      const vehicle = await Vehicle.findOneAndUpdate({"make.name": req.params.make}).exec()
      const models = vehicle.make.models
      models.push({
        "model_name": "String",
        "body_type": "String",
        "fuel_type": "String",
        "doors": "String",
        "people": "String",
        "car_img": ["Array", "dadasds", "dasdasd"],
        "features": ["Array", "dadasds", "dasdasd"],
        "specifications": {
            "performance_specs": ["Array", "dadasds", "dasdasd"],
            "safety_specs": ["Array", "dadasds", "dasdasd"],
            "dimension_specs": ["Array", "dadasds", "dasdasd"]
            },
            "_id": `${ObjectId()}` 
      })
      vehicle.save()
      res.send(console.log(`Model added to ${req.params.make}`), console.log(`${req.params.make} now has ${models.length} models`));
  } catch (error) {
      console.log(error);
      res.send({ error })
  }
};

exports.updateVehicle = async (req, res) => {
  try {
      const vehicle = await Vehicle.findOne({"make.name": req.params.make}).exec()
      const models = vehicle.make.models
      for (let i = 0; i < models.length; i++){
       if(models[i].model_name === req.params.model){
        // Select field to update
        models[i].doors = "2"
      }
    }
    vehicle.save()
    res.send(console.log(`${req.params.make} has been updated`));
  } catch (error) {
      console.log(error);
      res.send({ error })
  }
};

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
  // 'electronic_stability_programme':'true',
  // 'fog_lights':'true',
  // 'immobiliser':'true',
  // 'head_restraints':'true',
  // 'power-assisted_steering':'true',
  // 'traction_control_system':'true',
  // 'tyre_repair_kit':'true',
// },
// "dimension_specs": {
//   "height":"",
//   "length":"",
//   "width":"",
//   "wheelbase":"",
//   "fuel_tank_capacity":"",
//   "minimum kerb weight":""    
// }}
// },
// { '$merge': {into: "carsDBREST"} }
// ]).exec()