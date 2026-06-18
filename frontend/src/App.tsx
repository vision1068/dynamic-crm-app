import { useState } from 'react'
import Layout from './components/Layout'
import Dashboard from './components/Dashboard'
import Contacts from './components/Contacts'
import Accounts from './components/Accounts'
import Leads from './components/Leads'
import Opportunities from './components/Opportunities'
import Activities from './components/Activities'

export type Page = 'dashboard' | 'contacts' | 'accounts' | 'leads' | 'opportunities' | 'activities'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard')

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard />
      case 'contacts': return <Contacts />
      case 'accounts': return <Accounts />
      case 'leads': return <Leads />
      case 'opportunities': return <Opportunities />
      case 'activities': return <Activities />
      default: return <Dashboard />
    }
  }

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </Layout>
  )
}

export default App
