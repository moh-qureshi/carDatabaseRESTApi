const mongoose = require("mongoose")

const vehicleSchema = new mongoose.Schema({
    make: [{
        name: String,
        make_logo: String,
        country: String  
    }],
    model: [{
        name: String,
        body_type: String,
        model_logo: String,
        fuel_type: String,
        doors: String,
        people: String,
        car_img: Array,
        features: Array
    }]
})

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

module.exports = Vehicle;