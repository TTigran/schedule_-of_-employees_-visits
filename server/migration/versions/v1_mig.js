var create_table_persons =
    `
 CREATE TABLE IF NOT EXISTS persons (
     id SERIAL  PRIMARY KEY NOT NULL,
     firstname varchar NOT NULL,
     lastname varchar  NOT NULL 
     
    )`;


module.exports = create_table_persons;









