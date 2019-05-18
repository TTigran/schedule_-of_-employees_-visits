var create_table_atendenc_date  = `
CREATE TABLE IF NOT EXISTS atendenc_date (
      id SERIAL  PRIMARY KEY ,
      person_id int not  null ,
      years     int,
      month      varchar,
      day       int,
      from_time varchar,
      to_time   varchar,
      FOREIGN KEY (person_id) REFERENCES persons(id)
    )
     `;


module.exports = create_table_atendenc_date ;