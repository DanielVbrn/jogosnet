import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "JogosNet API",
      version: "1.0.0",
      description: "API para gerenciamento de jogos e produtos",
    },
    servers: [
      {
        url: "https://backend-jogosnet.onrender.com",
        description: "Servidor de Produção",
      },
      {
        url: "http://localhost:3333",
        description: "Servidor Local",
      },
    ],
  },
  apis: ["./src/routes.ts"], 
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("📄 Swagger UI disponível em http://localhost:3333/api-docs");
}
