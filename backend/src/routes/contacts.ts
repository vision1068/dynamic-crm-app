import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { contacts, Contact } from '../data/store';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.json(contacts);
});

router.get('/:id', (req: Request, res: Response) => {
  const contact = contacts.find(c => c.id === req.params.id);
  if (!contact) return res.status(404).json({ error: 'Contact not found' });
  return res.json(contact);
});

router.post('/', (req: Request, res: Response) => {
  const newContact: Contact = {
    ...req.body,
    id: uuidv4(),
    createdAt: new Date().toISOString().split('T')[0],
  };
  contacts.push(newContact);
  res.status(201).json(newContact);
});

router.put('/:id', (req: Request, res: Response) => {
  const idx = contacts.findIndex(c => c.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Contact not found' });
  contacts[idx] = { ...contacts[idx], ...req.body, id: req.params.id };
  return res.json(contacts[idx]);
});

router.delete('/:id', (req: Request, res: Response) => {
  const idx = contacts.findIndex(c => c.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Contact not found' });
  contacts.splice(idx, 1);
  return res.status(204).send();
});

export default router;
