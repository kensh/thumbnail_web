const redis = require("redis");
const client = redis.createClient();
 
client.on("error", (err) => {
    console.log("Error " + err);
});


const get = (key) => {

  return new Promise((resolve, reject) => {
    client.get(key, (err, reply) => {
      if(!reply){
        reject('not found');
      } else {
        console.log("reply: '%s'", reply);
        resolve(reply);
      }
    });
  });
};

const getall = () => {

  return new Promise((resolve) => {
    client.keys("thumbnail_*", (err, replies) => {
      console.log(replies.length + " replies:");
      replies.forEach((reply, i) => {
        console.log("    " + i + ": " + reply);
      });
      resolve(replies.map(r => r.replace('thumbnail_','')));
    });
  });
};

exports.get = get;
exports.getall = getall;
