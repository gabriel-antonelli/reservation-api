type ResponseBody =
	| string
	| number
	| boolean
	| { [x: string]: ResponseBody }
	| Array<ResponseBody>;

export interface HttpRequest {
	body?: ResponseBody;
}

export interface HttpResponse {
	statusCode: number;
	body: ResponseBody;
}
