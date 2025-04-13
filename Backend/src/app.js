const express = require("express");
const { connectDb } = require("./config/database");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

const allowedOrigins = [process.env.CLIENT_URL || "http://localhost:5173"];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

const adminRouter = require("./routes/adminRoute");
const { verifyToken, isAdmin } = require("./middleware/adminMiddleware");

app.use("/admin", verifyToken, isAdmin, adminRouter);

app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({ message: "Something went wrong on the server." });
});

const port = process.env.SERVER_PORT || 3000;
connectDb()
  .then(() => {
    console.log("Database Connected");
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Database Connection Error:", err.message);
  });

module.exports = app;
