import express from "express";
import authRouter from "./routers/authRouter.js";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

export const app = express();

const DB_URI = process.env.DB_URI;

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("Database connection successful");

    app.listen(3000, () => {
      console.log("Server started successful");
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

app.use(cors());

app.use(express.json());
app.use("/users", authRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});
