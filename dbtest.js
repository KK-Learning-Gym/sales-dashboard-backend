const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.POSTGRESDB_URI,
    ssl: true,
});

client.connect();

client.query('CREATE TABLE test;', (err, res) => {
    try {
        for (let row of res.rows) {
            console.log(JSON.stringify(row));
        }
    }
    catch (err) {
        throw err;
    }
    finally {
        client.end();
    }


});