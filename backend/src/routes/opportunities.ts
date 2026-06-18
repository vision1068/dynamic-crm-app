import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { opportunities, Opportunity } from '../data/store';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.json(opportunities);
});

router.get('/:id', (req: Request, res: Response) => {
  const opp = opportunities.find(o => o.id === req.params.id);
  if (!opp) return res.status(404).json({ error: 'Opportunity not found' });
  return res.json(opp);
});

router.post('/', (req: Request, res: Response) => {
  const newOpp: Opportunity = {
    ...req.body,
    id: uuidv4(),
    createdAt: new Date().toISOString().split('T')[0],
  };
  opportunities.push(newOpp);
  res.status(201).json(newOpp);
});

router.put('/:id', (req: Request, res: Response) => {
  const idx = opportunities.findIndex(o => o.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Opportunity not found' });
  opportunities[idx] = { ...opportunities[idx], ...req.body, id: req.params.id };
  return res.json(opportunities[idx]);
});

router.delete('/:id', (req: Request, res: Response) => {
  const idx = opportunities.findIndex(o => o.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Opportunity not found' });
  opportunities.splice(idx, 1);
  return res.status(204).send();
});

export default router;
