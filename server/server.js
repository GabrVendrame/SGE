const presentationRoutes = require("./routes/presentationRoutes");
const eventRoutes = require("./routes/eventRoutes");
const express = require("express");
const notes = require("./data/notes");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleWare");
let cors = require("cors");
const app = express();

dotenv.config();
connectDB();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API in running");
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/presentations", presentationRoutes);

app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`start on ${PORT} `));
