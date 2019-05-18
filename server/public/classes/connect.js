 const config_data = require('../../config');


 class Connect {

   static  pool (){
       const { Pool } = require('pg')
       const pool = new Pool({ connectionString: `postgresql://${config_data.username}:${config_data.password}@${config_data.localhost}:${config_data.port}/${config_data.database}` });
       return pool;
   }

   static cors(){
       return{
           origin: `http://localhost:${config_data.cors}`,
           methods: ['GET',"POST","PUT","DELETE"],
           allowedHeaders: ['Origin','X-Requested-With','contentType','Content-Type','Accept','Authorization'],
           credentials: true,
           optionsSuccessStatus: 200,
       }
   }
}

module.exports = Connect;