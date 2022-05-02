const express = require('express')
const session = require('express-session')
const connectRedis = require('connect-redis');
const cors = require('cors');
var bodyParser = require('body-parser');
const redis = require('redis');

const app = express()
const port = 8000

app.use(express.static('public'));

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

app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: 'mysecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
      maxAge: 1000
  }
}));

app.get("/", (req, res) => {
  res.send("hello world")
});


app.listen(port, () => {
  console.log(`Api listening at http://localhost:${port}`)
});