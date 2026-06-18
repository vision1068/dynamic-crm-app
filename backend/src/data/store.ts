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
  source: string;
  stage: string;
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
  stage: string;
  probability: number;
  amount: number;
  closeDate: string;
  owner: string;
  description?: string;
  createdAt: string;
}

export interface Activity {
  id: string;
  type: string;
  subject: string;
  description?: string;
  relatedTo?: string;
  relatedType?: string;
  relatedId?: string;
  dueDate?: string;
  completedAt?: string;
  status: 'Planned' | 'Completed' | 'Cancelled';
  owner: string;
  createdAt: string;
}

export const contacts: Contact[] = [
  { id: 'con-1', firstName: 'John', lastName: 'Smith', email: 'john.smith@contoso.com', phone: '+1 (555) 111-1111', company: 'Contoso Corporation', accountId: 'acc-1', jobTitle: 'CTO', status: 'Active', createdAt: '2023-01-20', city: 'Redmond', country: 'USA' },
  { id: 'con-2', firstName: 'Maria', lastName: 'Garcia', email: 'maria.garcia@fabrikam.com', phone: '+1 (555) 222-2222', company: 'Fabrikam Industries', accountId: 'acc-2', jobTitle: 'VP of Procurement', status: 'Active', createdAt: '2023-02-25', city: 'Chicago', country: 'USA' },
  { id: 'con-3', firstName: 'Robert', lastName: 'Johnson', email: 'robert.j@northwind.com', phone: '+1 (555) 333-3333', company: 'Northwind Traders', accountId: 'acc-3', jobTitle: 'Director of Sales', status: 'Active', createdAt: '2023-03-15', city: 'New York', country: 'USA' },
  { id: 'con-4', firstName: 'Lisa', lastName: 'Chen', email: 'lisa.chen@adventureworks.com', phone: '+1 (555) 444-4444', company: 'Adventure Works', accountId: 'acc-4', jobTitle: 'CEO', status: 'Active', createdAt: '2023-04-10', city: 'Denver', country: 'USA' },
  { id: 'con-5', firstName: 'David', lastName: 'Williams', email: 'david.w@litware.com', phone: '+1 (555) 555-5555', company: 'Litware Inc', accountId: 'acc-5', jobTitle: 'CFO', status: 'Active', createdAt: '2023-05-20', city: 'Boston', country: 'USA' },
];

export const accounts: Account[] = [
  { id: 'acc-1', name: 'Contoso Corporation', industry: 'Technology', website: 'https://contoso.com', phone: '+1 (555) 100-2000', email: 'info@contoso.com', address: '1 Microsoft Way', city: 'Redmond', country: 'USA', revenue: 50000000, employees: 500, status: 'Active', createdAt: '2023-01-15', owner: 'Sarah Johnson' },
  { id: 'acc-2', name: 'Fabrikam Industries', industry: 'Manufacturing', website: 'https://fabrikam.com', phone: '+1 (555) 200-3000', email: 'contact@fabrikam.com', address: '123 Industrial Ave', city: 'Chicago', country: 'USA', revenue: 120000000, employees: 1200, status: 'Active', createdAt: '2023-02-20', owner: 'Mike Chen' },
  { id: 'acc-3', name: 'Northwind Traders', industry: 'Retail', website: 'https://northwind.com', phone: '+1 (555) 300-4000', email: 'sales@northwind.com', address: '456 Commerce St', city: 'New York', country: 'USA', revenue: 30000000, employees: 250, status: 'Active', createdAt: '2023-03-10', owner: 'Emily Davis' },
  { id: 'acc-4', name: 'Adventure Works', industry: 'Sports & Recreation', phone: '+1 (555) 400-5000', email: 'info@adventureworks.com', address: '789 Mountain Rd', city: 'Denver', country: 'USA', revenue: 75000000, employees: 800, status: 'Active', createdAt: '2023-04-05', owner: 'Sarah Johnson' },
  { id: 'acc-5', name: 'Litware Inc', industry: 'Financial Services', phone: '+1 (555) 500-6000', email: 'contact@litware.com', address: '321 Finance Blvd', city: 'Boston', country: 'USA', revenue: 200000000, employees: 2000, status: 'Prospect', createdAt: '2023-05-12', owner: 'Mike Chen' },
];

export const leads: Lead[] = [
  { id: 'lead-1', firstName: 'Thomas', lastName: 'Anderson', email: 'thomas.a@company.com', phone: '+1 (555) 901-0001', company: 'Matrix Corp', jobTitle: 'IT Director', source: 'Web', stage: 'New', estimatedValue: 45000, createdAt: '2024-01-02', owner: 'Sarah Johnson' },
  { id: 'lead-2', firstName: 'Patricia', lastName: 'Wilson', email: 'patricia.w@startup.io', phone: '+1 (555) 902-0002', company: 'TechStart Inc', jobTitle: 'COO', source: 'Referral', stage: 'Contacted', estimatedValue: 120000, createdAt: '2023-12-28', owner: 'Mike Chen', notes: 'Interested in enterprise plan' },
  { id: 'lead-3', firstName: 'Kevin', lastName: 'Moore', email: 'kevin.m@bigretail.com', phone: '+1 (555) 903-0003', company: 'Big Retail Co', jobTitle: 'VP Technology', source: 'Trade Show', stage: 'Qualified', estimatedValue: 250000, createdAt: '2023-12-15', owner: 'Emily Davis' },
  { id: 'lead-4', firstName: 'Sandra', lastName: 'Davis', email: 'sandra.d@healthtech.com', phone: '+1 (555) 904-0004', company: 'HealthTech Solutions', jobTitle: 'CIO', source: 'Email', stage: 'Proposal', estimatedValue: 180000, createdAt: '2023-12-01', owner: 'Sarah Johnson' },
  { id: 'lead-5', firstName: 'James', lastName: 'Lee', email: 'james.l@finservices.com', phone: '+1 (555) 905-0005', company: 'Premium Financial', jobTitle: 'Director of IT', source: 'Phone', stage: 'Negotiation', estimatedValue: 95000, createdAt: '2023-11-20', owner: 'Mike Chen' },
];

export const opportunities: Opportunity[] = [
  { id: 'opp-1', name: 'Contoso Enterprise License', accountId: 'acc-1', accountName: 'Contoso Corporation', contactId: 'con-1', contactName: 'John Smith', stage: 'Negotiation', probability: 75, amount: 450000, closeDate: '2024-02-28', owner: 'Sarah Johnson', description: 'Full enterprise CRM deployment for 500 users', createdAt: '2023-10-01' },
  { id: 'opp-2', name: 'Fabrikam Manufacturing Suite', accountId: 'acc-2', accountName: 'Fabrikam Industries', contactId: 'con-2', contactName: 'Maria Garcia', stage: 'Proposal', probability: 50, amount: 280000, closeDate: '2024-03-15', owner: 'Mike Chen', description: 'Supply chain and inventory management integration', createdAt: '2023-11-15' },
  { id: 'opp-3', name: 'Northwind Retail Platform', accountId: 'acc-3', accountName: 'Northwind Traders', contactId: 'con-3', contactName: 'Robert Johnson', stage: 'Closed Won', probability: 100, amount: 175000, closeDate: '2024-01-15', owner: 'Emily Davis', description: 'E-commerce and POS integration', createdAt: '2023-09-01' },
  { id: 'opp-4', name: 'Adventure Works Analytics', accountId: 'acc-4', accountName: 'Adventure Works', contactId: 'con-4', contactName: 'Lisa Chen', stage: 'Qualification', probability: 30, amount: 320000, closeDate: '2024-04-30', owner: 'Sarah Johnson', description: 'Business intelligence and reporting platform', createdAt: '2023-12-01' },
  { id: 'opp-5', name: 'Litware Financial Platform', accountId: 'acc-5', accountName: 'Litware Inc', contactId: 'con-5', contactName: 'David Williams', stage: 'Prospecting', probability: 15, amount: 850000, closeDate: '2024-06-30', owner: 'Mike Chen', description: 'Financial risk management and compliance suite', createdAt: '2024-01-02' },
];

export const activities: Activity[] = [
  { id: 'act-1', type: 'Call', subject: 'Discovery call with John Smith', description: 'Discussed current pain points and potential solutions for Contoso', relatedTo: 'John Smith', relatedType: 'Contact', relatedId: 'con-1', completedAt: '2024-01-10T14:30:00Z', status: 'Completed', owner: 'Sarah Johnson', createdAt: '2024-01-10' },
  { id: 'act-2', type: 'Email', subject: 'Proposal follow-up - Fabrikam', description: 'Sent updated proposal with revised pricing to Maria Garcia', relatedTo: 'Fabrikam Industries', relatedType: 'Account', relatedId: 'acc-2', completedAt: '2024-01-09T10:15:00Z', status: 'Completed', owner: 'Mike Chen', createdAt: '2024-01-09' },
  { id: 'act-3', type: 'Meeting', subject: 'Product demo - Northwind Traders', description: 'Live product demonstration for the Northwind team', relatedTo: 'Robert Johnson', relatedType: 'Contact', relatedId: 'con-3', dueDate: '2024-01-15T09:00:00Z', status: 'Planned', owner: 'Emily Davis', createdAt: '2024-01-08' },
  { id: 'act-4', type: 'Task', subject: 'Prepare contract for Contoso', description: 'Draft enterprise license agreement with legal team review', relatedTo: 'Contoso Enterprise License', relatedType: 'Opportunity', relatedId: 'opp-1', dueDate: '2024-01-20T17:00:00Z', status: 'Planned', owner: 'Sarah Johnson', createdAt: '2024-01-10' },
  { id: 'act-5', type: 'Note', subject: 'Meeting notes - Adventure Works', description: 'Lisa Chen very interested in advanced analytics. Needs board approval for budget over $300k.', relatedTo: 'Adventure Works Analytics', relatedType: 'Opportunity', relatedId: 'opp-4', completedAt: '2024-01-06T16:00:00Z', status: 'Completed', owner: 'Sarah Johnson', createdAt: '2024-01-06' },
];
