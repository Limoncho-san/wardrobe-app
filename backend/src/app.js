import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());


// Default API response
app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

export default app;
