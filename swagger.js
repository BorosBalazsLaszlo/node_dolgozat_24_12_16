import swaggerAutogen from 'swagger-autogen';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const doc = {
    info: {
        title: "Cars dolgozat",
        version: "1.0.0",
        description: "Autókat kezel",
    },
    host: "localhost:3000",
    basePath: "/",
};

const outputFile = path.join(__dirname, "./swagger_output.json");
const routes = [path.join(__dirname, "./routes/car.js")];

swaggerAutogen()(outputFile, routes, doc).then(() =>{
    console.log("Swagger generálva");
});