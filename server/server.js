const DB = require('./router/queries');
const CORS = require('cors');
const CONNECT = require('./public/classes/connect');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(CORS(CONNECT.cors()));
app.get('/grafic', DB.getGrafic) ;
app.get('/api/person', DB.getPerson);

// app.post('/api/add', (req, res) => {
//     console.log(req.body);
//
// });

app.listen(port, () => console.log(`Listening on port ${port}`));
//Server



