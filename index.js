const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors"); // Import the cors package
const app = express();
const productRouter = require("./routes/products");

dotenv.config();

const port = 3000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

// Configure CORS to handle multiple origins
const allowedOrigins = [
  "http://localhost:8081", // Local development URL
  "https://ecommerceapp-1.netlify.app", // Production URL
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

// Use CORS middleware with the options
app.use(cors(corsOptions));

// Body parser middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Routes
app.use("/api/products", productRouter);

// Start the server
app.listen(process.env.PORT || port, () =>
  console.log(`Example app listening on port ${process.env.PORT || port}!`)
);
