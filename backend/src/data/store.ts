import { v4 as uuidv4 } from 'uuid';

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface Account {
  id: string;
  name: string;
  industry: string;
  revenue: number;
  employees: number;
  website: string;
  phone: string;
  city: string;
  country: string;
  status: 'active' | 'inactive' | 'prospect';
  createdAt: string;
}

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone: string;
  source: string;
  stage: 'new' | 'contacted' | 'qualified' | 'proposal' | 'closed';
  value: number;
  createdAt: string;
}

export interface Opportunity {
  id: string;
  name: string;
  accountId: string;
  accountName: string;
  contactId: string;
  contactName: string;
  stage: 'prospecting' | 'qualification' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  value: number;
  probability: number;
  closeDate: string;
  createdAt: string;
}

export interface Activity {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'task';
  subject: string;
  description: string;
  relatedTo: string;
  relatedType: 'contact' | 'account' | 'lead' | 'opportunity';
  status: 'open' | 'completed' | 'cancelled';
  dueDate: string;
  createdAt: string;
}

export const contacts: Contact[] = [
  { id: uuidv4(), firstName: 'Sarah', lastName: 'Johnson', email: 'sarah.johnson@contoso.com', phone: '+1-555-0101', company: 'Contoso Ltd', jobTitle: 'VP of Sales', status: 'active', createdAt: '2024-01-15' },
  { id: uuidv4(), firstName: 'Michael', lastName: 'Chen', email: 'michael.chen@fabrikam.com', phone: '+1-555-0102', company: 'Fabrikam Inc', jobTitle: 'CTO', status: 'active', createdAt: '2024-01-20' },
  { id: uuidv4(), firstName: 'Emily', lastName: 'Rodriguez', email: 'emily.r@northwind.com', phone: '+1-555-0103', company: 'Northwind Traders', jobTitle: 'Procurement Manager', status: 'active', createdAt: '2024-02-01' },
];

export const accounts: Account[] = [
  { id: uuidv4(), name: 'Contoso Ltd', industry: 'Technology', revenue: 5000000, employees: 250, website: 'www.contoso.com', phone: '+1-555-1001', city: 'Seattle', country: 'USA', status: 'active', createdAt: '2023-06-01' },
  { id: uuidv4(), name: 'Fabrikam Inc', industry: 'Manufacturing', revenue: 12000000, employees: 800, website: 'www.fabrikam.com', phone: '+1-555-1002', city: 'Chicago', country: 'USA', status: 'active', createdAt: '2023-07-15' },
];

export const leads: Lead[] = [
  { id: uuidv4(), firstName: 'Robert', lastName: 'Parker', email: 'rparker@alpineski.com', company: 'Alpine Ski House', phone: '+1-555-2001', source: 'Website', stage: 'qualified', value: 25000, createdAt: '2024-03-01' },
  { id: uuidv4(), firstName: 'Anna', lastName: 'Martinez', email: 'anna@bellows.com', company: 'Bellows College', phone: '+1-555-2002', source: 'Referral', stage: 'contacted', value: 15000, createdAt: '2024-03-05' },
];

export const opportunities: Opportunity[] = [
  { id: uuidv4(), name: 'Contoso Enterprise License', accountId: '1', accountName: 'Contoso Ltd', contactId: '1', contactName: 'Sarah Johnson', stage: 'negotiation', value: 150000, probability: 75, closeDate: '2024-04-30', createdAt: '2024-01-15' },
  { id: uuidv4(), name: 'Fabrikam Manufacturing Suite', accountId: '2', accountName: 'Fabrikam Inc', contactId: '2', contactName: 'Michael Chen', stage: 'proposal', value: 280000, probability: 50, closeDate: '2024-05-15', createdAt: '2024-02-01' },
];

export const activities: Activity[] = [
  { id: uuidv4(), type: 'call', subject: 'Initial Discovery Call', description: 'Discussed business needs', relatedTo: 'Sarah Johnson', relatedType: 'contact', status: 'completed', dueDate: '2024-03-10', createdAt: '2024-03-10' },
  { id: uuidv4(), type: 'meeting', subject: 'Product Demo', description: 'Live demo of CRM features', relatedTo: 'Contoso Enterprise License', relatedType: 'opportunity', status: 'open', dueDate: '2024-03-20', createdAt: '2024-03-14' },
];
