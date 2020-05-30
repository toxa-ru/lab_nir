const path = require("path");
const nodeExternals = require("webpack-node-externals");
const WebpackShellPlugin = require("webpack-shell-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const { NODE_ENV = "production" } = process.env;

module.exports = {
	entry: "./src/index.ts",
	mode: NODE_ENV,
	target: "node",
	output: {
		path: path.resolve(__dirname, "build"),
		filename: "index.js",
	},
	resolve: {
		extensions: [".ts", ".js"],
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: ["ts-loader"],
			},
			{
				test: /\.sql$/,
				use: "raw-loader",
			},
		],
	},
	watch: NODE_ENV === "development",
	plugins: [
		new CopyWebpackPlugin({
			patterns: [{ from: "resources", to: "resources" }],
		}),
		new WebpackShellPlugin({ onBuildEnd: ["yarn run:dev"] }),
	],
	externals: [nodeExternals()],
	optimization: {
		usedExports: true,
	},
};
