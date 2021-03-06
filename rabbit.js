const rabbit = require('amqplib/callback_api');
const QUEUE = 'task_queue';

const connect = () => {

  return new Promise((resolve, reject) => {
    rabbit.connect('amqp://rabbitmq', (err, con) => {
      con.createChannel((err, ch) => {
    	resolve(ch);
      });
    });
  });
};


const factory = () => {
   let channel = null;

   return async (msg) => {
      if(channel == null){
        channel = await connect();
      }
      
      channel.assertQueue(QUEUE, {durable: true});
      channel.sendToQueue(QUEUE, new Buffer.from(JSON.stringify(msg)), {persistent: true});
      console.log(" [x] enqueued '%s'", JSON.stringify(msg));
   };
}; 

exports.enqueue = factory(); 
