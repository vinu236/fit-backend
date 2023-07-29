const express = require("express");
const app = express();
const cors=require('cors')
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();
const DB=require("./config/connection")
const errHandler=require("./middleware/errHandler")


//parsing incoming request as Json or Url encoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const corsOptions = {
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
};
app.use(cors(corsOptions))

app.set("port", process.env.PORT);
app.use(userRoutes);
app.use(errHandler);

app.listen(app.get("port"), () => {
  console.log(`server connected to ${app.get("port")}`);
});

DB();
