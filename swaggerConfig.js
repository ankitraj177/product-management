// swaggerConfig.js

import swaggerJSDoc from "swagger-jsdoc";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Your API Documentation",
      version: "1.0.0",
      description: "API documentation using Swagger",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: "Development server",
      },
    ],
  },
  apis: ["./Routes/*.js"], // Specify the path to your API route files
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
