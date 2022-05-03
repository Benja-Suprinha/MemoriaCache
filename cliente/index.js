const express = require("express");
//const grpcClient = require("./clientegRPC");
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

app.get("/list", async (req,res)=>{
  const redisRes = await client.get("name")
  if(redisRes){
    res.send(redisRes);
  }else{
    res.send("no hay respuesta");
  }
});

/*app.get("/inventory/search", async (req, res) => {
  const { query } = req;
  const q = query.q;

  const redisRes = await client.get(q);
  console.log(redisRes);
  if (redisRes) {
    res.status(200).json(JSON.parse(redisRes));
  } else {
    grpcClient.ListarCasos({ name: q }, async (err, data) => {
      if (err) {
        res.status(500).json({ err });
      } else {
        await client.set(q, JSON.stringify(data));
        res.status(200).json({ data });
      }
    });
  }
});*/

app.listen(port, () => {
  console.log(`Api listening at http://localhost:${port}`)
});