import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import fileupload from "express-fileupload";
import path from "path";
import apiRoutes from './routes/routes.js'
import swaggerSpec from "./swaggerConfig.js";
import swaggerUi from "swagger-ui-express";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "2000mb" }));
app.use(cors({ origin: "*" }));
app.use(fileupload());
app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.use("/api", apiRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/swagger-json', (req, res) => {
  res.json(swaggerSpec);
});


app.listen(PORT, () => {
  console.log(`App is listening at PORT ${PORT}`);
});
