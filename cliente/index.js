const express = require("express");
const grpcClient = require('./clientgRPC');
const { createClient } = require("redis");

const app = express();
const port = 8000;

const client = createClient({
  socket: { host: process.env.REDIS_HOST, port: 6379 },
});
console.log({ host: process.env.REDIS_HOST, port: 6379 });
client.on("error", (err) => console.error("Redis Client Error", err));
client.connect();

app.get("/", (req,res)=>{
  res.send("api redis op")
});

/*app.get("/list", async (req,res)=>{
  const redisRes = await client.get("name")
  if(redisRes){
    res.send(redisRes);
  }else{
    res.send("no hay respuesta");
  }
});*/

app.get("/inventory/search", async (req, res) => {
  const { query } = req;
  const q = query.q;

  const redisRes = await client.get(q);
  console.log(redisRes);
  console.log(q);
  if (redisRes) {
    res.send(JSON.parse(redisRes));
  } else {
    grpcClient.ListarInv({ name: q }, async (err, data) => {
      if (err) {
        res.status(500).json({ err });
      } else {
        console.log(data)
        await client.set(q, JSON.stringify(data));
        res.send(data);
      }
    });
  }
});

app.listen(port, () => {
  console.log(`Api listening at http://localhost:${port}`)
});