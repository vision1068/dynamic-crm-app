import { Router, Request, Response } from 'express';
import { crmGet, crmPost, crmPatch, crmDelete } from '../crmClient';

const router = Router();

const SELECT = 'contactid,firstname,lastname,emailaddress1,telephone1,mobilephone,jobtitle,statuscode,createdon,address1_city,address1_country';

function mapContact(c: Record<string, unknown>) {
  return {
    id: c['contactid'],
    firstName: c['firstname'] ?? '',
    lastName: c['lastname'] ?? '',
    email: c['emailaddress1'] ?? '',
    phone: c['telephone1'] ?? c['mobilephone'] ?? '',
    jobTitle: c['jobtitle'] ?? '',
    company: c['_parentaccountid_value@OData.Community.Display.V1.FormattedValue'] ?? '',
    accountId: c['_parentaccountid_value'] ?? null,
    status: (c['statuscode@OData.Community.Display.V1.FormattedValue'] as string) === 'Active' ? 'Active' : 'Inactive',
    createdAt: c['createdon'] ? String(c['createdon']).split('T')[0] : '',
    city: c['address1_city'] ?? '',
    country: c['address1_country'] ?? '',
  };
}

router.get('/', async (_req: Request, res: Response) => {
  try {
    const data = await crmGet<Record<string, unknown>[]>('contacts', {
      $select: SELECT,
      $orderby: 'createdon desc',
      $top: '250',
    });
    res.json(data.map(mapContact));
  } catch (err: unknown) {
    res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const data = await crmGet<Record<string, unknown>>(`contacts(${req.params.id})`, { $select: SELECT });
    res.json(mapContact(data));
  } catch (err: unknown) {
    res.status(404).json({ error: err instanceof Error ? err.message : String(err) });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const result = await crmPost<Record<string, unknown>>('contacts', {
      firstname: req.body.firstName,
      lastname: req.body.lastName,
      emailaddress1: req.body.email,
      telephone1: req.body.phone,
      jobtitle: req.body.jobTitle,
    });
    res.status(201).json(result);
  } catch (err: unknown) {
    res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    await crmPatch(`contacts(${req.params.id})`, {
      firstname: req.body.firstName,
      lastname: req.body.lastName,
      emailaddress1: req.body.email,
      telephone1: req.body.phone,
      jobtitle: req.body.jobTitle,
    });
    res.json({ id: req.params.id, ...req.body });
  } catch (err: unknown) {
    res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await crmDelete(`contacts(${req.params.id})`);
    res.status(204).send();
  } catch (err: unknown) {
    res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
});

export default router;
