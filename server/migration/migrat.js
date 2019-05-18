class Migration  {
    static getInforMigration(configObject,column){
        configObject.query(column, (err, res) => {
            return res.rows;
        });
    }



    static runMigrationVersion(configObject,column,f=function(){}){
      configObject.query(column, (err, res) => {
          f();
      });
  }
}
module.exports = Migration;