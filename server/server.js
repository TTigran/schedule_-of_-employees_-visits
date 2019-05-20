const DB = require('./router/queries');
const CORS = require('cors');
const CONNECT = require('./public/classes/connect');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const POOL = CONNECT.pool();
const fs =require('fs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(CORS(CONNECT.cors()));

app.get('/grafic', DB.getGrafic) ;
app.get('/api/person', DB.getPerson);

app.post('/api/world', (req, resp) => {
    let post = req.body.post

        POOL.query(`SELECT * FROM atendenc_date where person_id=${post}`, (err, res) => {
        if(err){
            resp.send(err)
        }else{
            resp.send(
                `${res.rows}`,
            );
        }
    });

});
app.get(`/perso/:id`, (req, resp) => {
    POOL.query(`SELECT * FROM atendenc_date where person_id=${req.params.id}`, (err, res) => {
        if(err){
            resp.send(err)
        }else{

                resp.send(res.rows);

        }
    });


});

app.listen(port, () => console.log(`Listening on port ${port}`));

