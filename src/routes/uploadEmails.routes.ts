import express from "express"
import { uploadEmailList } from "../controllers/uploadEmail.controller"

const router = express.Router()

router.post('/', (req, res) => uploadEmailList(req, res) )

export default router
