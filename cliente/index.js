const express = require('express')
const session = require('express-session')
const app = express()
const port = 8000
const redis = require('redis');

app.use(express.static('public'));
app.listen(port, () => {
    console.log(`Api listening at http://localhost:${port}`)
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const RedisStore = connectRedis(session);

const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,   
    port: 6379
});

redisClient.on("error", function(error) {
  console.error(error);
});

app.get('/', (req,res) => {
	res.send("Hello word");
});