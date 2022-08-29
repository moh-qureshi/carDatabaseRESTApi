require("./db/connection");
const express = require("express");
const app = express();
const port = process.env.PORT || 5001;
const vehicleRouter = require("./cars/routes");

app.use(express.json());
app.use(vehicleRouter);

app.listen(port, () =>{
    console.log(`Listening on port ${port}`)
});

