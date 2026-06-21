import { Router, Request, Response } from 'express';
import { crmGet, crmPost, crmPatch, crmDelete } from '../crmClient';

const router = Router();

const SELECT = 'accountid,name,industrycode,websiteurl,telephone1,emailaddress1,address1_composite,address1_city,address1_country,revenue,numberofemployees,statuscode,createdon';

function mapAccount(a: Record<string, unknown>) {
  return {
    id: a['accountid'],
    name: a['name'] ?? '',
    industry: a['industrycode@OData.Community.Display.V1.FormattedValue'] ?? '',
    website: a['websiteurl'] ?? '',
    phone: a['telephone1'] ?? '',
    email: a['emailaddress1'] ?? '',
    address: a['address1_composite'] ?? '',
    city: a['address1_city'] ?? '',
    country: a['address1_country'] ?? '',
    revenue: a['revenue'] ?? null,
    employees: a['numberofemployees'] ?? null,
    status: (a['statuscode@OData.Community.Display.V1.FormattedValue'] as string) === 'Active' ? 'Active' : 'Inactive',
    createdAt: a['createdon'] ? String(a['createdon']).split('T')[0] : '',
  };
}

router.get('/', async (_req: Request, res: Response) => {
  try {
    const data = await crmGet<Record<string, unknown>[]>('accounts', {
      $select: SELECT,
      $orderby: 'createdon desc',
      $top: '250',
    });
    res.json(data.map(mapAccount));
  } catch (err: unknown) {
    res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const data = await crmGet<Record<string, unknown>>(`accounts(${req.params.id})`, { $select: SELECT });
    res.json(mapAccount(data));
  } catch (err: unknown) {
    res.status(404).json({ error: err instanceof Error ? err.message : String(err) });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const result = await crmPost<Record<string, unknown>>('accounts', {
      name: req.body.name,
      websiteurl: req.body.website,
      telephone1: req.body.phone,
      emailaddress1: req.body.email,
      address1_city: req.body.city,
      address1_country: req.body.country,
      numberofemployees: req.body.employees,
      revenue: req.body.revenue,
    });
    res.status(201).json(result);
  } catch (err: unknown) {
    res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    await crmPatch(`accounts(${req.params.id})`, {
      name: req.body.name,
      websiteurl: req.body.website,
      telephone1: req.body.phone,
      emailaddress1: req.body.email,
      address1_city: req.body.city,
      address1_country: req.body.country,
      numberofemployees: req.body.employees,
      revenue: req.body.revenue,
    });
    res.json({ id: req.params.id, ...req.body });
  } catch (err: unknown) {
    res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await crmDelete(`accounts(${req.params.id})`);
    res.status(204).send();
  } catch (err: unknown) {
    res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
});

export default router;
