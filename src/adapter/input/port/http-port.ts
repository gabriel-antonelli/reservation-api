type JsonBody =
	| string
	| number
	| boolean
	| { [x: string]: JsonBody }
	| Array<JsonBody>;

export interface HttpResponse {
	statusCode: number;
	body: JsonBody;
}
