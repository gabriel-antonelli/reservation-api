import { Request, Response } from 'express';

export default {
	async getAllVideos(_: Request, res: Response): Promise<Response> {
		return res.send('teste');
	},
};
