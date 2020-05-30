export type RequestBody<T> = {
	[P in keyof T]?: T[P] extends Array<infer U> ? Array<string> : string;
};
