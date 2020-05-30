import { Client } from "cassandra-driver";
import { dbConfig } from "../config/DbConfig";

export class DbQueries {
	protected async executeQuery<T = undefined>(request: string) {
		const client = new Client(dbConfig);
		await client.connect();
		try {
			console.debug({ request: request.trim() });
			const result = await client.execute(request);
			console.debug({ result: JSON.stringify(result.rows) });
			if (!result) return;
			return (result.rows as unknown) as T;
		} catch (e) {
			console.error("Ошибка при выполнении запроса", e.stack);
			request.split("\n").forEach((str) => console.log(str.trim()));
			throw new Error(e.message);
		} finally {
			await client.shutdown();
		}
	}
}
