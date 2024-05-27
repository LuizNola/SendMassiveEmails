import {connectRabbitMQ} from '../config/rabbitmq.config';
import sendMassiveEmails from '../services/sendMassiveEmail.service';
require('dotenv').config();

export const sendEmailConsumer = async () => {

  const queue = process.env.SEND_EMAIL_CONSUMER as string;
  try {
    const channel = await connectRabbitMQ();
    await channel.assertQueue(queue, { durable: true });
    console.log(`Aguardando mensagens na fila ${queue}`);

    channel.consume(queue, async (msg) => {
      if (msg !== null) {
        const messageContent = msg.content.toString();
        console.log(`Mensagem recebida: ${messageContent}`);

        channel.ack(msg);

        await sendMassiveEmails(messageContent)

        console.log("Concluido Com sucesso!!")
      }
    });
  } catch (error) {
    console.error('Erro ao consumir mensagens do RabbitMQ:', error);
  }
};
