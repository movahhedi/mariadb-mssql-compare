// cspell:ignore Kysely

import mssql from "mssql";
import mysql from "mysql2/promise";
import * as dotenv from "dotenv";
import { performance } from "perf_hooks";
import { Kysely, MysqlDialect } from "kysely";
import { Kysely_MariaDB_Database } from "./KyselyTypes";

dotenv.config();

let StartTime: number, EndTime: number, Query: string;
interface IResult {
	DBType: "MariaDB" | "MySQL" | "MSSQL";
	ORM: "none" | "Kysely";
	Time: number;
	Query: string;
	Memo: string;
}

const Results: IResult[] = [];

const COUNT = Number(process.env.COUNT) || 1000;

const MSSQL_Connection = await mssql.connect(process.env.MSSQL_STRING as string);

const MariaDB_Config = {
	host: process.env.MARIADB_HOST,
	user: process.env.MARIADB_USER,
	password: process.env.MARIADB_PASS,
	database: process.env.MARIADB_NAME,
};

// const MariaDB_Connection = await mysql.createConnection(MariaDB_Config);

const MariaDB_Kysely_Connection = new Kysely<Kysely_MariaDB_Database>({
	dialect: new MysqlDialect({
		pool: mysql.createPool({
			host: process.env.MARIADB_HOST,
			user: process.env.MARIADB_USER,
			password: process.env.MARIADB_PASS,
			database: process.env.MARIADB_NAME,
		}),
	}),
});

console.log(MariaDB_Config);

console.log("Connected to all DBs");

console.log(await MariaDB_Kysely_Connection.selectFrom("account").where("Id", "=", 1).select("Id").executeTakeFirst());

// MSSQL
Query = "SELECT Id FROM test WHERE Id=1;";
StartTime = performance.now();
for (let i = 0; i < COUNT; i++) {
	await MSSQL_Connection.query(Query);
}
EndTime = performance.now();

Results.push({
	DBType: "MSSQL",
	ORM: "none",
	Time: EndTime - StartTime,
	Query: Query,
	Memo: "",
});
console.log("MSSQL complete");

// MariaDB
Query = "SELECT Id FROM account WHERE Id=1;";
StartTime = performance.now();
for (let i = 0; i < COUNT; i++) {
	await MariaDB_Connection.execute(Query);
}
EndTime = performance.now();

Results.push({
	DBType: "MariaDB",
	ORM: "none",
	Time: EndTime - StartTime,
	Query: Query,
	Memo: "",
});
console.log("MariaDB complete");

// MariaDB-Kysely
Query = "Code: SELECT Id FROM account WHERE Id=1;";
StartTime = performance.now();
for (let i = 0; i < COUNT; i++) {
	await MariaDB_Kysely_Connection.selectFrom("account").where("Id", "=", 1).select("Id").executeTakeFirst();
}
EndTime = performance.now();

Results.push({
	DBType: "MariaDB",
	ORM: "Kysely",
	Time: EndTime - StartTime,
	Query: Query,
	Memo: "",
});
console.log("MariaDB-Kysely complete");

// Log results
console.table(Results);
