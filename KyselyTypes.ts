export interface Kysely_MariaDB_Database {
	account: Account_Table;
}

import type { Generated, Insertable, Selectable, Updateable, ColumnType } from "kysely";

export interface Account_Table {
	Id: Generated<number>;
	FullName: string | null;
	FName: string | null;
	LName: string | null;
	Mobile: string | null;
	Email: string | null;
	Role: number;
	Username: string | null;
	Gender: number | null;
	NationalId: string | null;
	BirthDate: string | null;
	FatherName: string | null;
	MotherName: string | null;
	Address: string | null;
	Bio: string | null;
	Website: string | null;
	SignupDT: ColumnType<Date, string | null, never>;
	PasswordHash: string | null;
	PrivateMemo: string | null;
}

export type Account = Selectable<Account_Table>;
export type Account_Insertable = Insertable<Account_Table>;
export type Account_Updateable = Updateable<Account_Table>;
