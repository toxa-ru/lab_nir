import dotenv from 'dotenv'
dotenv.config();

import { Client } from "cassandra-driver";
import { dbConfig } from "./config/DbConfig";
import {
	createBboxType,
	createCategoriesTable,
	createImagesTable,
	createVideoTable,
} from "./database/create_tables";

const run = async () => {
	try {
		const client = new Client(dbConfig);
		await client.connect();
		await client.execute(createBboxType);
		await client.execute(createVideoTable);
		await client.execute(createCategoriesTable);
		await client.execute(createImagesTable);
		await client.shutdown();

		require("./server");
	} catch (e) {
		console.log(e);
	}
};

run().catch((e) => {
	console.log("e:", e);
});
