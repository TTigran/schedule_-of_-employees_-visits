const MIGRATION = require('./migrat');
const CONNECT = require('../../server/public/classes/connect');
const POOL = CONNECT.pool();
const fs = require('fs');

function runMig(name) {
    var version = require(`./versions/${name}`);
    MIGRATION.runMigrationVersion(POOL, version);
    addMigrationNameToDB(name);
    console.log(`${name}`);
}

function addMigrationNameToDB(name) {
// argument name for migration file
    var sql = `INSERT INTO mig_failes (name, created_date ) VALUES ('${name}','2019-04-26T14:25:34.427Z')`;

    POOL.query(sql, (err, res) => {
        if (err) {
            console.log("ERROR:  " + err.message);
        } else {
            console.log("Added  successfull");
        }

    });
}

function arr_diff(a1, a2) {

    var a = [], diff = [];

    for (var i = 0; i < a1.length; i++) {
        a[a1[i]] = true;
    }

    for (var i = 0; i < a2.length; i++) {
        if (a[a2[i]]) {
            delete a[a2[i]];
        } else {
            a[a2[i]] = true;
        }
    }

    for (var k in a) {
        diff.push(k);
    }

    return diff;
}


function controlMigration(a) {
    POOL.query('SELECT name FROM mig_failes', (err, res) => {
        if (err) {
            console.log("ERROR: " + err.message)
        } else {
            let data = res.rows;
            let temp = [];

            for (let i = 0; i < data.length; i++) {
                temp.push(data[i]['name']);
            }

            fs.readdir('migration/versions', (err, files) => {
                let mig_file_run = (arr_diff(temp, files));
                for (let i = 0; i < mig_file_run.length; i++) {
                    setTimeout(function () {
                        runMig(mig_file_run[i]);
                    }, i * 500)

                }


            });
        }
    });
}



MIGRATION.runMigrationVersion(POOL,
    `CREATE TABLE IF NOT EXISTS mig_failes (
            id SERIAL   NOT NULL,
            name varchar NOT NULL,
            created_date date )`, controlMigration);

