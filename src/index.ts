import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { userView } from "./view/userView";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

dotenv.config();

app.use("/api", userView());

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`[index.ts] Servidor corriendo en el puerto ${port}`);
});
