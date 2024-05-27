import { sendMessage } from "../config/rabbitmq.config";
import { writeCache } from "../config/redis.config"
import { isValidEmail } from "../helpers/email.validator"
import { v4 as uuidv4 } from 'uuid';
require('dotenv').config();

export default async function uploadEmailList(emailList: Array<string>, minutesOfPersistence: number = 10) {
    const failMails: Array<string> = []
    
    emailList.forEach((email)=> {
        if(!isValidEmail(email)){
            failMails.push(email)
        }
    })

    if(failMails.length > 0){
        return {
            statusCode: 400,
            success: false,
            message: `Os seguintes emails são invalidos: ${failMails.join(", ")}`
        }
    }

    const id = uuidv4();
    writeCache(id, emailList.join(), 60 * minutesOfPersistence)

    sendMessage(process.env.SEND_EMAIL_CONSUMER as string, id)
    
    return {
        statusCode: 201,
        success: true,
        message: "Lista criada com sucesso"
    }
}