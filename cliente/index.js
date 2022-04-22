const express = require('express')
const app = express()
const port = 8000
const redis = require('redis');

app.use(express.static('public'));
app.listen(port, () => {
    console.log(`Api listening at http://localhost:${port}`)
});

(async () => {
  const client = redis.createClient();

  client.on('error', (err) => console.log('Redis Client Error', err));

  await client.connect();

  await client.set('key', 'value');
  const value = await client.get('key');
})();

app.get('/', (req,res) => {
	res.send("Hello word");
});