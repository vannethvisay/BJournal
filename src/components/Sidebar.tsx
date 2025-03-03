import React, { useState } from 'react'
import { 
  BarChart3, 
  Clock, 
  CreditCard, 
  DollarSign, 
  Home, 
  PieChart, 
  Settings, 
  User,
  LogOut,
  Plus,
  BookOpen,
  ChevronRight,
  ChevronDown,
  LineChart,
  BarChart
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useDashboard } from '../context/DashboardContext'

const Sidebar = () => {
  const location = useLocation()
  const { setActiveTradeId } = useDashboard()
  
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    analytics: location.pathname.includes('/analytics')
  })
  
  const toggleMenu = (menu: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }))
  }

  const handleNewTrade = () => {
    setActiveTradeId(null)
    document.dispatchEvent(new CustomEvent('open-new-trade-modal'))
  }
  
  return (
    <div className="w-64 h-full bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
            <BarChart3 className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-400">
            ForexJournal
          </h1>
        </div>
        
        <button 
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 px-4 rounded-xl transition-colors mb-8"
          onClick={handleNewTrade}
        >
          <Plus className="h-4 w-4" />
          <span className="font-medium">New Trade</span>
        </button>
        
        <nav>
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 px-3">
            Main
          </div>
          <ul className="space-y-1 mb-8">
            <li>
              <Link 
                to="/" 
                className={`flex items-center gap-3 p-3 rounded-xl font-medium ${
                  location.pathname === '/' 
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20' 
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                }`}
              >
                <Home className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <div>
                <button 
                  onClick={() => toggleMenu('analytics')}
                  className="w-full flex items-center justify-between p-3 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <BarChart3 className="h-5 w-5" />
                    <span>Analytics</span>
                  </div>
                  {expandedMenus.analytics ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
                
                {expandedMenus.analytics && (
                  <ul className="pl-10 mt-1 space-y-1">
                    <li>
                      <Link 
                        to="/analytics/performance" 
                        className={`block p-2 text-sm rounded-lg ${
                          location.pathname === '/analytics/performance' 
                            ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20' 
                            : 'text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                        }`}
                      >
                        Performance
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/analytics/risk" 
                        className={`block p-2 text-sm rounded-lg ${
                          location.pathname === '/analytics/risk' 
                            ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20' 
                            : 'text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                        }`}
                      >
                        Risk Analysis
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/analytics/pairs" 
                        className={`block p-2 text-sm rounded-lg ${
                          location.pathname === '/analytics/pairs' 
                            ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20' 
                            : 'text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                        }`}
                      >
                        Pair Statistics
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </li>
            <li>
              <Link 
                to="/statistics" 
                className={`flex items-center gap-3 p-3 rounded-xl font-medium ${
                  location.pathname === '/statistics' 
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20' 
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                }`}
              >
                <PieChart className="h-5 w-5" />
                <span>Statistics</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/history" 
                className={`flex items-center gap-3 p-3 rounded-xl font-medium ${
                  location.pathname === '/history' 
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20' 
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                }`}
              >
                <Clock className="h-5 w-5" />
                <span>Trade History</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/journal" 
                className={`flex items-center gap-3 p-3 rounded-xl font-medium ${
                  location.pathname === '/journal' 
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20' 
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                }`}
              >
                <BookOpen className="h-5 w-5" />
                <span>Journal</span>
              </Link>
            </li>
          </ul>
          
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 px-3">
            Finance
          </div>
          <ul className="space-y-1">
            <li>
              <Link 
                to="/accounts" 
                className={`flex items-center gap-3 p-3 rounded-xl font-medium ${
                  location.pathname === '/accounts' 
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20' 
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                }`}
              >
                <CreditCard className="h-5 w-5" />
                <span>Accounts</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/investments" 
                className={`flex items-center gap-3 p-3 rounded-xl font-medium ${
                  location.pathname === '/investments' 
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20' 
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                }`}
              >
                <DollarSign className="h-5 w-5" />
                <span>Investments</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      
      <div className="mt-auto p-6 border-t border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <User className="h-5 w-5" />
          </div>
          <div>
            <p className="font-medium">John Doe</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Pro Trader</p>
          </div>
        </div>
        
        <div className="flex gap-1">
          <button className="flex-1 flex items-center justify-center gap-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50 py-2 rounded-lg">
            <Settings className="h-4 w-4" />
            <span className="text-sm">Settings</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50 py-2 rounded-lg">
            <LogOut className="h-4 w-4" />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
