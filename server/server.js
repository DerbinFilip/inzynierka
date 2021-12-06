const express = require("express");
const cors = require("cors");
const db = require("./models");
const routes = require("./routes/routes");
const { tutorials } = require("./models");
const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

db.sequelize.sync();
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.all("/addUser", (req, res) => {
    console.log(req.body);
});

require("./routes/routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});



