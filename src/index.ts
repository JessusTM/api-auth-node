import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

dotenv.config();

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`[index.ts] Servidor corriendo en el puerto ${port}`);
});
