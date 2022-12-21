const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')



connectToMongo();
const app = express();
const port = 4000;


// use cors to fetch data using API from DB
app.use(cors());
app.use(express.json());


app.use(express.json());

// available routes ./routes/auth are called end points
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})