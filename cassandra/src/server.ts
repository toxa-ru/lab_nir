import express from "express";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";
import swaggerUI from "swagger-ui-express";
import swaggerConfig from "./config/swagger.json";
import { api } from "./routes";
import { prepareUploadDir } from "./middlewares";

const app = express();
const port = 3000;

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerConfig));
app.use(prepareUploadDir);
app.use(bodyParser.json());
app.use(fileUpload());
app.use(api);

app.listen(port, () => console.log(`App running at ${port}`));
