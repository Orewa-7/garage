import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import voitureRoutes from "./routes/voitures.js";
import revuesRoutes from "./routes/revues.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import multer from "multer";
import { initTables, initData } from "./db.js";


const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});



const init = async () =>{
  await initTables();
  initData();
}

init();

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/voitures", voitureRoutes);
app.use("/api/revues", revuesRoutes);

app.listen(8800, () => {
  console.log("Connected!");
});
