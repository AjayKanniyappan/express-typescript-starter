import { Router } from 'express';

const router = Router();

router.use('/api', (req, res) => {
  res.send('hi');
});

export default router;
