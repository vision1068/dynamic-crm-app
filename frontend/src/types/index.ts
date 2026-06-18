export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  accountId?: string;
  jobTitle: string;
  status: 'Active' | 'Inactive';
  createdAt: string;
  lastActivity?: string;
  address?: string;
  city?: string;
  country?: string;
}

export interface Account {
  id: string;
  name: string;
  industry: string;
  website?: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  country: string;
  revenue?: number;
  employees?: number;
  status: 'Active' | 'Inactive' | 'Prospect';
  createdAt: string;
  owner: string;
}

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  source: 'Web' | 'Phone' | 'Email' | 'Referral' | 'Social Media' | 'Trade Show';
  stage: 'New' | 'Contacted' | 'Qualified' | 'Proposal' | 'Negotiation' | 'Closed Won' | 'Closed Lost';
  estimatedValue?: number;
  createdAt: string;
  owner: string;
  notes?: string;
}

export interface Opportunity {
  id: string;
  name: string;
  accountId: string;
  accountName: string;
  contactId?: string;
  contactName?: string;
  stage: 'Prospecting' | 'Qualification' | 'Proposal' | 'Negotiation' | 'Closed Won' | 'Closed Lost';
  probability: number;
  amount: number;
  closeDate: string;
  owner: string;
  description?: string;
  createdAt: string;
}

export type ActivityType = 'Call' | 'Email' | 'Meeting' | 'Task' | 'Note';

export interface Activity {
  id: string;
  type: ActivityType;
  subject: string;
  description?: string;
  relatedTo?: string;
  relatedType?: 'Contact' | 'Account' | 'Lead' | 'Opportunity';
  relatedId?: string;
  dueDate?: string;
  completedAt?: string;
  status: 'Planned' | 'Completed' | 'Cancelled';
  owner: string;
  createdAt: string;
}

export interface KPIStats {
  totalLeads: number;
  totalOpportunities: number;
  totalContacts: number;
  totalAccounts: number;
  totalRevenue: number;
  wonDeals: number;
  openDeals: number;
  conversionRate: number;
}
