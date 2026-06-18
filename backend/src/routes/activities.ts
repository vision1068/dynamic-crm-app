import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { activities } from '../data/store';

const router = Router();

router.get('/', (_req, res) => res.json(activities));

router.get('/:id', (req, res) => {
  const item = activities.find((i: any) => i.id === req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  return res.json(item);
});

router.post('/', (req, res) => {
  const item = { ...req.body, id: uuidv4(), createdAt: new Date().toISOString().split('T')[0] };
  activities.push(item as any);
  res.status(201).json(item);
});

router.put('/:id', (req, res) => {
  const index = activities.findIndex((i: any) => i.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Not found' });
  (activities as any)[index] = { ...(activities as any)[index], ...req.body };
  return res.json((activities as any)[index]);
});

router.delete('/:id', (req, res) => {
  const index = activities.findIndex((i: any) => i.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Not found' });
  activities.splice(index, 1);
  return res.status(204).send();
});

export default router;
