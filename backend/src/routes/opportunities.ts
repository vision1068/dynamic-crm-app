import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { opportunities } from '../data/store';

const router = Router();

router.get('/', (_req, res) => res.json(opportunities));

router.get('/:id', (req, res) => {
  const item = opportunities.find((i: any) => i.id === req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  return res.json(item);
});

router.post('/', (req, res) => {
  const item = { ...req.body, id: uuidv4(), createdAt: new Date().toISOString().split('T')[0] };
  opportunities.push(item as any);
  res.status(201).json(item);
});

router.put('/:id', (req, res) => {
  const index = opportunities.findIndex((i: any) => i.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Not found' });
  (opportunities as any)[index] = { ...(opportunities as any)[index], ...req.body };
  return res.json((opportunities as any)[index]);
});

router.delete('/:id', (req, res) => {
  const index = opportunities.findIndex((i: any) => i.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Not found' });
  opportunities.splice(index, 1);
  return res.status(204).send();
});

export default router;
