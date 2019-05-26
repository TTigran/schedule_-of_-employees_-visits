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
var a=0;
app.post('/api/rigth', (req, resp) => {
    console.log(a);
    resp.send(`${a++}`);
});
app.post('/api/left', (req, resp) => {
    if(a>0){
        resp.send(`${a--}`);
    }else{
        resp.send(`0`);
    }

});
app.get(`/perso/:id/:pn`, (req, resp) => {

    POOL.query(`SELECT * FROM atendenc_date a where person_id=${req.params.id} order by a.id limit 7 offset ${req.params.pn*7}`, (err, res) => {
        if(err){
            resp.send(err)
        }else{
            resp.send(res.rows);
        }
    });


});
app.post(`/api/atten`, (req, resp) => {
    console.log(req.body.post);

    POOL.query(`SELECT * FROM atendenc_date where person_id=${req.body.post}` , (err, res) => {
        if(err){
            resp.send(err)
        }else{
            console.log(res.rows);
            resp.send(res.rows);
        }
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

