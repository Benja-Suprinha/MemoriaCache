const express = require('express')
const app = express()
const port = 8000

app.use(express.static('public'));
app.listen(port, () => {
    console.log(`Api listening at http://localhost:${port}`)
});

app.get('/', (req,res) => {
	res.send("Hello word");	
});