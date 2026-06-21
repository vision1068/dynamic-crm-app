import { Router, Request, Response } from 'express';
import { crmGet, crmPost, crmPatch, crmDelete } from '../crmClient';

const router = Router();

const SELECT = 'leadid,firstname,lastname,emailaddress1,telephone1,companyname,jobtitle,leadqualitycode,leadsourcecode,estimatedvalue,createdon,statuscode';

function mapLead(l: Record<string, unknown>) {
  return {
    id: l['leadid'],
    firstName: l['firstname'] ?? '',
    lastName: l['lastname'] ?? '',
    email: l['emailaddress1'] ?? '',
    phone: l['telephone1'] ?? '',
    company: l['companyname'] ?? '',
    jobTitle: l['jobtitle'] ?? '',
    source: l['leadsourcecode@OData.Community.Display.V1.FormattedValue'] ?? '',
    quality: l['leadqualitycode@OData.Community.Display.V1.FormattedValue'] ?? '',
    estimatedValue: l['estimatedvalue'] ?? null,
    status: l['statuscode@OData.Community.Display.V1.FormattedValue'] ?? '',
    createdAt: l['createdon'] ? String(l['createdon']).split('T')[0] : '',
  };
}

router.get('/', async (_req: Request, res: Response) => {
  try {
    const data = await crmGet<Record<string, unknown>[]>('leads', {
      $select: SELECT,
      $orderby: 'createdon desc',
      $top: '250',
    });
    res.json(data.map(mapLead));
  } catch (err: unknown) {
    res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const data = await crmGet<Record<string, unknown>>(`leads(${req.params.id})`, { $select: SELECT });
    res.json(mapLead(data));
  } catch (err: unknown) {
    res.status(404).json({ error: err instanceof Error ? err.message : String(err) });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const result = await crmPost<Record<string, unknown>>('leads', {
      firstname: req.body.firstName,
      lastname: req.body.lastName,
      emailaddress1: req.body.email,
      telephone1: req.body.phone,
      companyname: req.body.company,
      jobtitle: req.body.jobTitle,
      estimatedvalue: req.body.estimatedValue,
    });
    res.status(201).json(result);
  } catch (err: unknown) {
    res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    await crmPatch(`leads(${req.params.id})`, {
      firstname: req.body.firstName,
      lastname: req.body.lastName,
      emailaddress1: req.body.email,
      telephone1: req.body.phone,
      companyname: req.body.company,
      jobtitle: req.body.jobTitle,
      estimatedvalue: req.body.estimatedValue,
    });
    res.json({ id: req.params.id, ...req.body });
  } catch (err: unknown) {
    res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await crmDelete(`leads(${req.params.id})`);
    res.status(204).send();
  } catch (err: unknown) {
    res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
});

export default router;
