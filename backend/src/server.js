const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const connectDB = require("./config/db");

dotenv.config();
const envFile =
  process.env.NODE_ENV === "production" ? "../.env" : "../.env.development";
dotenv.config({ path: envFile });

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");

app.get("/api/v1/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/posts", postRoutes);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
