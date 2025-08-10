import connectToMongo from "./utils/db.js";
 
import express from "express";
 
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
connectToMongo();

const app = express();
const port = process.env.PORT || 3000;

// ✅ CORS Options
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://jobflux-full-stack-8sja.vercel.app",
  ],
  credentials: true,
};
app.use(cors(corsOptions));

// ✅ Middlewares
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// ✅ Test Route
app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Hello from backend",
  });
});

// ✅ API Routes
 

// ✅ Server Listener
app.listen(port, () => {
  console.log(`Website is running at http://localhost:${port}`);
});
