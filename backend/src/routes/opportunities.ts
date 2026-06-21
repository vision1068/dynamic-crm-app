import { Router, Request, Response } from 'express';
import { crmGet, crmPost, crmPatch, crmDelete } from '../crmClient';

const router = Router();

const SELECT = 'opportunityid,name,estimatedvalue,closeprobability,stepname,salesstage,createdon,actualclosedate,statuscode';

function mapOpportunity(o: Record<string, unknown>) {
  return {
    id: o['opportunityid'],
    name: o['name'] ?? '',
    value: o['estimatedvalue'] ?? null,
    probability: o['closeprobability'] ?? null,
    stage: o['salesstage@OData.Community.Display.V1.FormattedValue'] ?? o['stepname'] ?? '',
    status: o['statuscode@OData.Community.Display.V1.FormattedValue'] ?? '',
    closeDate: o['actualclosedate'] ? String(o['actualclosedate']).split('T')[0] : null,
    accountId: o['_parentaccountid_value'] ?? null,
    account: o['_parentaccountid_value@OData.Community.Display.V1.FormattedValue'] ?? '',
    createdAt: o['createdon'] ? String(o['createdon']).split('T')[0] : '',
  };
}

router.get('/', async (_req: Request, res: Response) => {
  try {
    const data = await crmGet<Record<string, unknown>[]>('opportunities', {
      $select: SELECT,
      $orderby: 'createdon desc',
      $top: '250',
    });
    res.json(data.map(mapOpportunity));
  } catch (err: unknown) {
    res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const data = await crmGet<Record<string, unknown>>(`opportunities(${req.params.id})`, { $select: SELECT });
    res.json(mapOpportunity(data));
  } catch (err: unknown) {
    res.status(404).json({ error: err instanceof Error ? err.message : String(err) });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const result = await crmPost<Record<string, unknown>>('opportunities', {
      name: req.body.name,
      estimatedvalue: req.body.value,
      closeprobability: req.body.probability,
      stepname: req.body.stage,
      actualclosedate: req.body.closeDate,
    });
    res.status(201).json(result);
  } catch (err: unknown) {
    res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    await crmPatch(`opportunities(${req.params.id})`, {
      name: req.body.name,
      estimatedvalue: req.body.value,
      closeprobability: req.body.probability,
      stepname: req.body.stage,
      actualclosedate: req.body.closeDate,
    });
    res.json({ id: req.params.id, ...req.body });
  } catch (err: unknown) {
    res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await crmDelete(`opportunities(${req.params.id})`);
    res.status(204).send();
  } catch (err: unknown) {
    res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
});

export default router;
