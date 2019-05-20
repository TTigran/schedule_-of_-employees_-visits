
const CONNECT = require('../public/classes/connect');
const POOL = CONNECT.pool();


const getPerson= (request, response) => {
    POOL.query('SELECT * FROM persons', (err, res) => {
        if(err){
            response.send(err.message)
        }else{
            response.send(res.rows)
        }

    });

}


const getGrafic= (request, response) => {

    POOL.query('SELECT * FROM atendenc_date', (err, res) => {
        if(err){
            response.send(err)
        }else{
            response.send(res.rows)
        }

    });

}


module.exports = {
    getPerson,
    getGrafic,

};