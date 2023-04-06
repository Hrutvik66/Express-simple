const express = require("express");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use("/api/items", require("./routes/api/users"));

app.listen(8000, () => console.log("Server started"));
