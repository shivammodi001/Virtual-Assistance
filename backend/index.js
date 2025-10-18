const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const authRouter = require("./routes/auth.routes")
const userRouter = require("./routes/user.routes");
const cors = require("cors");
const geminiResponse = require("./gemini");

dotenv.config();

const app = express();
// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cookieParser()); // Parse cookie

app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true
}));


const PORT = process.env.PORT || 5000;

// app.get("/", (req, res) => {
//   res.send("Server is running successfully!");
// });

app.use("/api/auth",authRouter);
app.use("/api/user", userRouter);


app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});
