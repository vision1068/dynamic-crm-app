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

export interface DashboardStats {
  totalContacts: number;
  totalAccounts: number;
  totalLeads: number;
  totalOpportunities: number;
  pipelineValue: number;
  wonDeals: number;
}
