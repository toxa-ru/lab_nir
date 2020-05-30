import { ClientOptions } from "cassandra-driver";

export const dbConfig: ClientOptions = {
	cloud: {
		secureConnectBundle: "./resources/secure-connect.zip",
	},
	credentials: {
		username: process.env.CASSANDRA_USERNAME ?? "",
		password: process.env.CASSANDRA_PASSWORD ?? "",
	},
};
