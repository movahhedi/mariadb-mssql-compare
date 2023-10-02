import mssql from "mssql";
import mysql from "mysql2/promise";
import * as dotenv from "dotenv";
dotenv.config();

const COUNT = 1000000;

// make sure that any items are correctly URL encoded in the connection string
await mssql.connect(process.env.MSSQL_STRING as string);

console.time("MSSQL");
for (let index = 0; index < COUNT; index++) {
	await mssql.query`select * from test;`;
}
console.timeEnd("MSSQL");

// create the connection to database
const connection = await mysql.createConnection({
	host: process.env.MARIADB_HOST,
	user: process.env.MARIADB_USER,
	password: process.env.MARIADB_PASS,
	database: process.env.MARIADB_NAME,
});

console.time("MariaDB");
for (let index = 0; index < COUNT; index++) {
	await connection.execute('SELECT * FROM account');
}
console.timeEnd("MariaDB");
