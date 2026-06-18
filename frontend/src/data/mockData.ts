import { Contact, Account, Lead, Opportunity, Activity } from '../types';

export const mockContacts: Contact[] = [
  { id: '1', firstName: 'Sarah', lastName: 'Johnson', email: 'sarah.johnson@contoso.com', phone: '+1-555-0101', company: 'Contoso Ltd', jobTitle: 'VP of Sales', status: 'active', createdAt: '2024-01-15' },
  { id: '2', firstName: 'Michael', lastName: 'Chen', email: 'michael.chen@fabrikam.com', phone: '+1-555-0102', company: 'Fabrikam Inc', jobTitle: 'CTO', status: 'active', createdAt: '2024-01-20' },
  { id: '3', firstName: 'Emily', lastName: 'Rodriguez', email: 'emily.r@northwind.com', phone: '+1-555-0103', company: 'Northwind Traders', jobTitle: 'Procurement Manager', status: 'active', createdAt: '2024-02-01' },
  { id: '4', firstName: 'David', lastName: 'Kim', email: 'david.kim@adventure.com', phone: '+1-555-0104', company: 'Adventure Works', jobTitle: 'Director of IT', status: 'inactive', createdAt: '2024-02-10' },
  { id: '5', firstName: 'Lisa', lastName: 'Thompson', email: 'lisa.t@tailspin.com', phone: '+1-555-0105', company: 'Tailspin Toys', jobTitle: 'CEO', status: 'active', createdAt: '2024-02-15' },
  { id: '6', firstName: 'James', lastName: 'Wilson', email: 'jwilson@woodgrove.com', phone: '+1-555-0106', company: 'Woodgrove Bank', jobTitle: 'CFO', status: 'active', createdAt: '2024-03-01' },
];

export const mockAccounts: Account[] = [
  { id: '1', name: 'Contoso Ltd', industry: 'Technology', revenue: 5000000, employees: 250, website: 'www.contoso.com', phone: '+1-555-1001', city: 'Seattle', country: 'USA', status: 'active', createdAt: '2023-06-01' },
  { id: '2', name: 'Fabrikam Inc', industry: 'Manufacturing', revenue: 12000000, employees: 800, website: 'www.fabrikam.com', phone: '+1-555-1002', city: 'Chicago', country: 'USA', status: 'active', createdAt: '2023-07-15' },
  { id: '3', name: 'Northwind Traders', industry: 'Retail', revenue: 3500000, employees: 150, website: 'www.northwind.com', phone: '+1-555-1003', city: 'New York', country: 'USA', status: 'active', createdAt: '2023-08-20' },
  { id: '4', name: 'Adventure Works', industry: 'Sports & Recreation', revenue: 8000000, employees: 450, website: 'www.adventure-works.com', phone: '+1-555-1004', city: 'Denver', country: 'USA', status: 'prospect', createdAt: '2023-09-10' },
  { id: '5', name: 'Tailspin Toys', industry: 'Consumer Goods', revenue: 2000000, employees: 90, website: 'www.tailspintoys.com', phone: '+1-555-1005', city: 'Austin', country: 'USA', status: 'active', createdAt: '2023-10-05' },
];

export const mockLeads: Lead[] = [
  { id: '1', firstName: 'Robert', lastName: 'Parker', email: 'rparker@alpineski.com', company: 'Alpine Ski House', phone: '+1-555-2001', source: 'Website', stage: 'qualified', value: 25000, createdAt: '2024-03-01' },
  { id: '2', firstName: 'Anna', lastName: 'Martinez', email: 'anna@bellows.com', company: 'Bellows College', phone: '+1-555-2002', source: 'Referral', stage: 'contacted', value: 15000, createdAt: '2024-03-05' },
  { id: '3', firstName: 'Tom', lastName: 'Hayes', email: 'tom.hayes@citypower.com', company: 'City Power & Light', phone: '+1-555-2003', source: 'Trade Show', stage: 'proposal', value: 75000, createdAt: '2024-03-10' },
  { id: '4', firstName: 'Grace', lastName: 'Lee', email: 'grace.lee@datum.com', company: 'Datum Corporation', phone: '+1-555-2004', source: 'Cold Call', stage: 'new', value: 10000, createdAt: '2024-03-15' },
  { id: '5', firstName: 'Carlos', lastName: 'Santos', email: 'csantos@fourthcoffee.com', company: 'Fourth Coffee', phone: '+1-555-2005', source: 'LinkedIn', stage: 'closed', value: 30000, createdAt: '2024-02-20' },
];

export const mockOpportunities: Opportunity[] = [
  { id: '1', name: 'Contoso Enterprise License', accountId: '1', accountName: 'Contoso Ltd', contactId: '1', contactName: 'Sarah Johnson', stage: 'negotiation', value: 150000, probability: 75, closeDate: '2024-04-30', createdAt: '2024-01-15' },
  { id: '2', name: 'Fabrikam Manufacturing Suite', accountId: '2', accountName: 'Fabrikam Inc', contactId: '2', contactName: 'Michael Chen', stage: 'proposal', value: 280000, probability: 50, closeDate: '2024-05-15', createdAt: '2024-02-01' },
  { id: '3', name: 'Northwind POS Upgrade', accountId: '3', accountName: 'Northwind Traders', contactId: '3', contactName: 'Emily Rodriguez', stage: 'qualification', value: 45000, probability: 30, closeDate: '2024-06-01', createdAt: '2024-02-20' },
  { id: '4', name: 'Adventure Works CRM', accountId: '4', accountName: 'Adventure Works', contactId: '4', contactName: 'David Kim', stage: 'closed-won', value: 95000, probability: 100, closeDate: '2024-03-01', createdAt: '2023-12-01' },
  { id: '5', name: 'Tailspin Inventory System', accountId: '5', accountName: 'Tailspin Toys', contactId: '5', contactName: 'Lisa Thompson', stage: 'prospecting', value: 35000, probability: 15, closeDate: '2024-07-01', createdAt: '2024-03-01' },
];

export const mockActivities: Activity[] = [
  { id: '1', type: 'call', subject: 'Initial Discovery Call', description: 'Discussed business needs and pain points', relatedTo: 'Sarah Johnson', relatedType: 'contact', status: 'completed', dueDate: '2024-03-10', createdAt: '2024-03-10' },
  { id: '2', type: 'email', subject: 'Proposal Follow-up', description: 'Sent updated pricing proposal', relatedTo: 'Fabrikam Inc', relatedType: 'account', status: 'completed', dueDate: '2024-03-12', createdAt: '2024-03-12' },
  { id: '3', type: 'meeting', subject: 'Product Demo', description: 'Live demo of CRM features', relatedTo: 'Contoso Enterprise License', relatedType: 'opportunity', status: 'open', dueDate: '2024-03-20', createdAt: '2024-03-14' },
  { id: '4', type: 'task', subject: 'Prepare contract documents', description: 'Draft MSA and SOW for review', relatedTo: 'Adventure Works CRM', relatedType: 'opportunity', status: 'completed', dueDate: '2024-02-28', createdAt: '2024-02-25' },
  { id: '5', type: 'call', subject: 'Qualification Call', description: 'Budget and timeline discussion', relatedTo: 'Robert Parker', relatedType: 'contact', status: 'open', dueDate: '2024-03-22', createdAt: '2024-03-15' },
  { id: '6', type: 'email', subject: 'Newsletter Campaign', description: 'Q1 product update newsletter', relatedTo: 'Northwind Traders', relatedType: 'account', status: 'completed', dueDate: '2024-03-05', createdAt: '2024-03-05' },
];
