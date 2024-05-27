import { Request, Response } from "express";
import uploadEmailListService from "../services/uploadEmailList.service"
import { isNumber } from "util";

export async function uploadEmailList(req: Request, res: Response){

    const emailList = req.body.emailList
    if(!emailList || !Array.isArray(emailList)){
       return res.status(400).json({"sucess": false, "message": "O Campo emailList e obrigatorio, e deve ser uma lista!"})
    }

    if(req.body.minutesOfPersistence && !isNumber(req.body.minutesOfPersistence)){
       return res.status(400).json({"sucess": false, "message": "O Campo minutesOfPersistence deve ser um numero!"})
    }

    const result = await uploadEmailListService(emailList, req.body.minutesOfPersistence)

   return res.status(result.statusCode).json({"success": result.success, "message": result.message})

}