import swaggerUi from "swagger-ui-express"
import { Express } from "express"
import swaggerOptions from "./swagger-options"

const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOptions))
}

export default setupSwagger
