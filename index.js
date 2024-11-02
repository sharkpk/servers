require("dotenv").config();
const express = require("express");
const cors = require("cors");

const mainRoute = require("./src/routes");
const connectMongoDB = require("./src/libs/mongoose");
const statusCode = require("./src/utilities/status_code");

const app = express();
app.use(express.json());
// Enable CORS
app.use(
  cors({
    origin: "*", // You can specify allowed origins here, or use '*' to allow all origins
  })
);

// Access environment variables
const DB_URI = process.env.DB_URI;
const DB_NAME = process.env.DB_NAME;
const PORT = process.env.PORT;

// connection MongoDB
connectMongoDB(`${DB_URI}${DB_NAME}`);

// Use main router
app.use("/api", mainRoute);
app.use("*", (req, res) => {
  res.status(404).send({ ...statusCode[404], message: "Route Not Found" });
});

// listen app on Given Port
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
});
