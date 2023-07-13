const express = require("express");
// instantiating the server
const app = express();
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload")



app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());

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

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret:process.env.CLOUD_API_SECRET
})

// importing the ROUTES
const product = require("./routes/productRoute");
const order = require("./routes/orderRoute");
const user = require("./routes/userRoute");
const payment = require("./routes/paymentRoute");
// mounting the routes on /api/v1

app.use("/api/v1",user);
app.use("/api/v1", product);
app.use("/api/v1", order);
app.use("/api/v1", payment);

// Middleware for Errors
// we have to use this middleware after mounting all the routes
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
