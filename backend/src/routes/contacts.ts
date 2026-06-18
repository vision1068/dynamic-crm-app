import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { contacts } from '../data/store';

const router = Router();

router.get('/', (_req, res) => res.json(contacts));

router.get('/:id', (req, res) => {
  const item = contacts.find((i: any) => i.id === req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  return res.json(item);
});

router.post('/', (req, res) => {
  const item = { ...req.body, id: uuidv4(), createdAt: new Date().toISOString().split('T')[0] };
  contacts.push(item as any);
  res.status(201).json(item);
});

router.put('/:id', (req, res) => {
  const index = contacts.findIndex((i: any) => i.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Not found' });
  (contacts as any)[index] = { ...(contacts as any)[index], ...req.body };
  return res.json((contacts as any)[index]);
});

router.delete('/:id', (req, res) => {
  const index = contacts.findIndex((i: any) => i.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Not found' });
  contacts.splice(index, 1);
  return res.status(204).send();
});

export default router;
