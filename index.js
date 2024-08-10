const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const productRouter = require("./routes/products");
const authRoutes = require("./routes/auth");

dotenv.config();

const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.error("DB connection error:", err));

const allowedOrigins = [
  "http://localhost:8081",
  "https://ecommerceapp-1.netlify.app",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true, // If you need to allow cookies or authorization headers
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/api/products", productRouter);
app.use("/api/auth", authRoutes);
app.use("/api/users", require("./routes/user"));
app.use("/api/orders", require("./routes/order"));
app.use("/api/payments", require("./routes/payment"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);
  res.status(500).send("Something went wrong!");
});

app.listen(port, () => console.log(`Server running on port ${port}`));

//stripe integration (placeholder)
