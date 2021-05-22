const Pool = require('pg').Pool
// const pool = new Pool({
//     user: 'babaduk',
//     host: 'localhost',
//     database: 'spot',
//     password: '123',
//     port: 5432,
// });

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'spot',
    password: '123',
    port: 5432,
});

// pool.query("CREATE DATABASE spot;", (err, res) => {
//     if(err) {
//         console.log(err);
//     }
// });

module.exports = pool;