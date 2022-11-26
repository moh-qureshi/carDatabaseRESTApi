const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
    make:{
    name: String,
    make_logo: String,
    country: String,
    models: [{
        model_name: String,
        body_type: String,
        fuel_type: String,
        doors: String,
        people: String,
        car_img: Array,
        features: Array,
        specifications: {
            performance_specs: Array,
            safety_specs: Array,
            dimension_specs: Array
            }
        }]
    }
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
module.exports = Vehicle;