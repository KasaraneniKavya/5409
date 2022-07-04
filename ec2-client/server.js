const express = require('express')
const app = express();
const path = require('path')
const PORT = 5000;

app.use(express.static(path.join(__dirname, 'client', 'build')));
// app.get("/", (req, res) => {res.send("Welcome");}); 

app.listen(PORT, ()=>{
console.log('listening on port '+PORT);
})
