import { Router, Request, Response } from 'express';
import { crmGet, crmPost, crmPatch, crmDelete } from '../crmClient';

const router = Router();

const SELECT = 'activityid,subject,description,activitytypecode,statecode,scheduledstart,scheduledend,createdon';

function mapActivity(a: Record<string, unknown>) {
  return {
    id: a['activityid'],
    subject: a['subject'] ?? '',
    description: a['description'] ?? '',
    type: a['activitytypecode@OData.Community.Display.V1.FormattedValue'] ?? a['activitytypecode'] ?? '',
    status: a['statecode@OData.Community.Display.V1.FormattedValue'] ?? '',
    startDate: a['scheduledstart'] ? String(a['scheduledstart']).split('T')[0] : null,
    endDate: a['scheduledend'] ? String(a['scheduledend']).split('T')[0] : null,
    regardingId: a['_regardingobjectid_value'] ?? null,
    regarding: a['_regardingobjectid_value@OData.Community.Display.V1.FormattedValue'] ?? '',
    createdAt: a['createdon'] ? String(a['createdon']).split('T')[0] : '',
  };
}

router.get('/', async (_req: Request, res: Response) => {
  try {
    const data = await crmGet<Record<string, unknown>[]>('activitypointers', {
      $select: SELECT,
      $orderby: 'createdon desc',
      $top: '250',
    });
    res.json(data.map(mapActivity));
  } catch (err: unknown) {
    res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const data = await crmGet<Record<string, unknown>>(`activitypointers(${req.params.id})`, { $select: SELECT });
    res.json(mapActivity(data));
  } catch (err: unknown) {
    res.status(404).json({ error: err instanceof Error ? err.message : String(err) });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const entitySet = req.body.type === 'Phone Call' ? 'phonecalls'
      : req.body.type === 'Email' ? 'emails'
      : 'tasks';
    const result = await crmPost<Record<string, unknown>>(entitySet, {
      subject: req.body.subject,
      description: req.body.description,
      scheduledstart: req.body.startDate,
      scheduledend: req.body.endDate,
    });
    res.status(201).json(result);
  } catch (err: unknown) {
    res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    await crmPatch(`tasks(${req.params.id})`, {
      subject: req.body.subject,
      description: req.body.description,
      scheduledstart: req.body.startDate,
      scheduledend: req.body.endDate,
    });
    res.json({ id: req.params.id, ...req.body });
  } catch (err: unknown) {
    res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await crmDelete(`activitypointers(${req.params.id})`);
    res.status(204).send();
  } catch (err: unknown) {
    res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
});

export default router;
