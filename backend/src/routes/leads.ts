import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { leads, Lead } from '../data/store';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.json(leads);
});

router.get('/:id', (req: Request, res: Response) => {
  const lead = leads.find(l => l.id === req.params.id);
  if (!lead) return res.status(404).json({ error: 'Lead not found' });
  return res.json(lead);
});

router.post('/', (req: Request, res: Response) => {
  const newLead: Lead = {
    ...req.body,
    id: uuidv4(),
    createdAt: new Date().toISOString().split('T')[0],
  };
  leads.push(newLead);
  res.status(201).json(newLead);
});

router.put('/:id', (req: Request, res: Response) => {
  const idx = leads.findIndex(l => l.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Lead not found' });
  leads[idx] = { ...leads[idx], ...req.body, id: req.params.id };
  return res.json(leads[idx]);
});

router.delete('/:id', (req: Request, res: Response) => {
  const idx = leads.findIndex(l => l.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Lead not found' });
  leads.splice(idx, 1);
  return res.status(204).send();
});

export default router;
