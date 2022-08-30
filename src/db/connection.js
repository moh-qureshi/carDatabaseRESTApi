require("dotenv").config();
const mongoose = require("mongoose");

const connection = async () =>{
    try {
        await mongoose.connect("mongodb+srv://Mohammed:Test123@cluster0.k6mwrmt.mongodb.net/carsDBREST?retryWrites=true&w=majority");
        console.log("Sucessfully connected");
    } catch (error) {
        console.log(error);
    }
}

connection();