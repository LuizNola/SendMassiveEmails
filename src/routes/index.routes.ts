import express from "express"
import uploadEmailsRoutes from "./uploadEmails.routes"

const router = express.Router()

router.use('/emails', uploadEmailsRoutes)

export default router