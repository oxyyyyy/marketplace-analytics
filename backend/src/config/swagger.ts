import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Marketplace Dashboard API",
      version: "1.0.0",
      description: "Real-time analytics API for marketplace dashboard",
      contact: {
        name: "API Support",
        email: "support@example.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3001",
        description: "Development server",
      },
    ],
    tags: [
      {
        name: "Metrics",
        description: "Real-time metrics and analytics endpoints",
      },
      {
        name: "Health",
        description: "Service health check",
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/index.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
