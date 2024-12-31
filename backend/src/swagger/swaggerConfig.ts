import swaggerJsDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Book Search API",
    version: "1.0.0",
    description: "API for searching books using the Open Library API.",
  },
  servers: [
    {
      url: "http://localhost:5000/api",
      description: "Development Server",
    },
  ],
};

const swaggerOptions = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts"],
};

export const swaggerDocs = swaggerJsDoc(swaggerOptions);
