import "dotenv/config"
import "express-async-errors"
import express from "express"
import cors from "cors"

import { errorHandlerMiddleware } from "./app/middlewares/error-handler.middleware"
import { routes } from "./app/routes"
import morgan from "morgan"
import setupSwagger from "./app/config/swagger"

function main() {
  const app = express()
  app.use(morgan("dev"))
  app.use(cors())
  app.use(express.json())
  app.use("/api", routes)
  setupSwagger(app)
  app.use(errorHandlerMiddleware)

  const PORT = process.env.PORT || 5000
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`)
  })
}

main()
