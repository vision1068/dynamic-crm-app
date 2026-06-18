import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { accounts, Account } from '../data/store';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.json(accounts);
});

router.get('/:id', (req: Request, res: Response) => {
  const account = accounts.find(a => a.id === req.params.id);
  if (!account) return res.status(404).json({ error: 'Account not found' });
  return res.json(account);
});

router.post('/', (req: Request, res: Response) => {
  const newAccount: Account = {
    ...req.body,
    id: uuidv4(),
    createdAt: new Date().toISOString().split('T')[0],
  };
  accounts.push(newAccount);
  res.status(201).json(newAccount);
});

router.put('/:id', (req: Request, res: Response) => {
  const idx = accounts.findIndex(a => a.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Account not found' });
  accounts[idx] = { ...accounts[idx], ...req.body, id: req.params.id };
  return res.json(accounts[idx]);
});

router.delete('/:id', (req: Request, res: Response) => {
  const idx = accounts.findIndex(a => a.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Account not found' });
  accounts.splice(idx, 1);
  return res.status(204).send();
});

export default router;
