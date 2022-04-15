import { Router } from 'express';
import video from './controllers/video';

const router = Router();

router.get('/videos', video.getAllVideos);

export default router;
