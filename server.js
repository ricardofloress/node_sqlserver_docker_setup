const express = require('express');
const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';
const sql = require("mssql");
//docker build -t docker_node_sqlserver/node_docker_setup_app .
/*Successfully tagged docker_node_sqlserver:latest
SECURITY WARNING: You are building a Docker image from Windows against a non-Windows Docker host. All files and directories added to build context will have '-rwxr-xr-x' permissions. It is recommended to double check and reset permissions for sensitive files and directories.
*/
//docker run -p 3000:3000 -d docker_node_sqlserver/node_docker_setup_app
config = {
    user: 'sa',
    password: 'Guimarares2020#',
    server: 'sql-server-db',
    database: 'testdb',
    port: 1433,
    options: {
        enableArithAbort: true
    }
};

app.get('/', async (req, res) => {
    let pool;
    try {
        pool = await sql.connect(config);
        const { recordset } = await sql.query('select * from users');
        res.json(recordset);
    } catch (error) {
        res.send(error);
    } finally {
        await pool.close();
        console.log('Connection Closed');
    }
});

const server = app.listen(PORT, HOST);