const express = require("express")
const { Client } = require("pg");
const port = 3000

const conexion = {
  password: "marihuana",
  user: "postgres",
  database: "tiendita",
  host: "postgres",
  port: 5432,
}

const client = new Client(conexion); 
//client.connect();

const app = express()

app.get('/',(req,res) => {
    res.send("hola mundo")
})

app.get("/inventario", async (req, res) => {
    const results = await client
      .query("SELECT * FROM items")
      .then((payload) => {
        return payload.rows;
      })
      .catch(() => {
        throw new Error("Query failed");
      });
    res.setHeader("Content-Type", "application/json");
    res.status(200);
    res.send(JSON.stringify(results));
    console.log(results)
  });

(async () => {
await client.connect();

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
})();