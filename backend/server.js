const express = require("express");
// instantiating the server
const app = express();
const database = require("./config/database");
const errorMiddleware = require("./middlewares/error");

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

// config file in process.env
const dotenv = require("dotenv");
dotenv.config({ path: "backend/config/config.env" });

// connecting to database
database.connectDatabase();

// importing the ROUTES
const product = require("./routes/productRoute");

// mounting the routes on /api/v1
app.use("/api/v1", product);

// Middleware for Errors
app.use(errorMiddleware);

const server = app.listen(process.env.PORT, (request, respond) => {
  console.log(`app is listening at PORT : ${process.env.PORT}`);
});

//Unhandled Promise Rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    // abnormal termination
    process.exit(1);
  });
});
