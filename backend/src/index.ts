import express from 'express';
import cors from 'cors';
import contactsRouter from './routes/contacts';
import accountsRouter from './routes/accounts';
import leadsRouter from './routes/leads';
import opportunitiesRouter from './routes/opportunities';
import activitiesRouter from './routes/activities';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

app.use('/api/contacts', contactsRouter);
app.use('/api/accounts', accountsRouter);
app.use('/api/leads', leadsRouter);
app.use('/api/opportunities', opportunitiesRouter);
app.use('/api/activities', activitiesRouter);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`CRM Backend running on http://localhost:${PORT}`);
});

export default app;
