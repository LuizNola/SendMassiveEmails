import { clearCacheByKey, getCachedKey } from "../config/redis.config";
import { sendEmail } from "../helpers/sendEmail.helper";

export default async function sendMassiveEmails(emailListId: string) {
    const emailList = await getCachedKey(emailListId)
    
    emailList?.split(',').map((email => {
        if(false){
            sendEmail(email, "Email massivo", "Esse e um dos emails disparados")
        }else{
            console.log("Para nao lascar com meu email")
        }
    }))

    clearCacheByKey(emailListId)
}