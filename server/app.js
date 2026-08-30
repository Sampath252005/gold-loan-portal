import express from "express";
import cors from "cors";

const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "https://gold-loan-portal-six.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Gold Loan API is running",
  });
});

export default app;
