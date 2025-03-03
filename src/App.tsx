import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import { DashboardProvider } from './context/DashboardContext'
import NewTradeModal from './components/NewTradeModal'
import PerformancePage from './pages/PerformancePage'
import RiskAnalysisPage from './pages/RiskAnalysisPage'
import PairStatisticsPage from './pages/PairStatisticsPage'
import TradeHistoryPage from './pages/TradeHistoryPage'
import JournalPage from './pages/JournalPage'
import AccountsPage from './pages/AccountsPage'
import InvestmentsPage from './pages/InvestmentsPage'
import StatisticsPage from './pages/StatisticsPage'

function App() {
  const [showNewTradeModal, setShowNewTradeModal] = React.useState(false)

  useEffect(() => {
    const handleOpenNewTradeModal = () => {
      setShowNewTradeModal(true)
    }

    document.addEventListener('open-new-trade-modal', handleOpenNewTradeModal)
    
    return () => {
      document.removeEventListener('open-new-trade-modal', handleOpenNewTradeModal)
    }
  }, [])

  return (
    <DashboardProvider>
      <Router>
        <div className="flex h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analytics/performance" element={<PerformancePage />} />
            <Route path="/analytics/risk" element={<RiskAnalysisPage />} />
            <Route path="/analytics/pairs" element={<PairStatisticsPage />} />
            <Route path="/statistics" element={<StatisticsPage />} />
            <Route path="/history" element={<TradeHistoryPage />} />
            <Route path="/journal" element={<JournalPage />} />
            <Route path="/accounts" element={<AccountsPage />} />
            <Route path="/investments" element={<InvestmentsPage />} />
          </Routes>
        </div>
        {showNewTradeModal && (
          <NewTradeModal onClose={() => setShowNewTradeModal(false)} />
        )}
      </Router>
    </DashboardProvider>
  )
}

export default App
