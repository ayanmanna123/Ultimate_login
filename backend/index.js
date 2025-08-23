import connectToMongo from "./utils/db.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import router from "./routes/user.route.js";
import { auth } from "express-oauth2-jwt-bearer";

dotenv.config();
connectToMongo();

const app = express();
const port = process.env.PORT || 5000;

// ✅ CORS Options
const corsOptions = {
  origin: ["http://localhost:5173", "https://ultimate-login-tuxb.vercel.app"],
  credentials: true,
};
app.use(cors(corsOptions));

// ✅ Auth0 JWT Check
const jwtCheck = auth({
  audience: "http://localhost:5000/api/v1",  
  issuerBaseURL: "https://dev-po1r5cykjnu8e0ld.us.auth0.com/",
  tokenSigningAlg: "RS256",
});

// enforce on all secured endpoints
app.use(jwtCheck);

// ✅ Secured Test Route
app.get("/authorized", (req, res) => {
  res.send("Secured Resource");
});

// ✅ Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Public Test Route
app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Hello from backend",
  });
});

// ✅ API Routes
app.use("/api/v1/user", router);

// ✅ Server Listener
app.listen(port, () => {
  console.log(`Website is running at http://localhost:${port}`);
});
