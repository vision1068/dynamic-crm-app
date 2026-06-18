import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { activities, Activity } from '../data/store';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.json(activities);
});

router.get('/:id', (req: Request, res: Response) => {
  const activity = activities.find(a => a.id === req.params.id);
  if (!activity) return res.status(404).json({ error: 'Activity not found' });
  return res.json(activity);
});

router.post('/', (req: Request, res: Response) => {
  const newActivity: Activity = {
    ...req.body,
    id: uuidv4(),
    createdAt: new Date().toISOString().split('T')[0],
  };
  activities.push(newActivity);
  res.status(201).json(newActivity);
});

router.put('/:id', (req: Request, res: Response) => {
  const idx = activities.findIndex(a => a.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Activity not found' });
  activities[idx] = { ...activities[idx], ...req.body, id: req.params.id };
  return res.json(activities[idx]);
});

router.delete('/:id', (req: Request, res: Response) => {
  const idx = activities.findIndex(a => a.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Activity not found' });
  activities.splice(idx, 1);
  return res.status(204).send();
});

export default router;
