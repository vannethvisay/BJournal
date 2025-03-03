import React from 'react'
import { 
  Calendar, 
  ChevronDown, 
  Filter, 
  Search, 
  Bell, 
  User,
  Sun,
  Moon,
  DollarSign,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Plus,
  ArrowUp,
  ArrowDown,
  Percent,
  Clock
} from 'lucide-react'
import { useDashboard } from '../context/DashboardContext'

const InvestmentsPage = () => {
  const { 
    darkMode, 
    timeRange, 
    notifications, 
    showNotifications,
    toggleDarkMode,
    toggleNotifications,
    markAllNotificationsAsRead,
    setTimeRange
  } = useDashboard()
  
  const unreadCount = notifications.filter(n => !n.read).length
  
  // Mock investments data
  const investments = [
    {
      id: 1,
      name: 'Forex Trading Portfolio',
      initialInvestment: 10000,
      currentValue: 12450.80,
      profit: 2450.80,
      roi: 24.5,
      startDate: '2023-01-15',
      duration: '4 months',
      status: 'Active',
      type: 'Forex',
      risk: 'Medium'
    },
    {
      id: 2,
      name: 'Crypto Trading Fund',
      initialInvestment: 5000,
      currentValue: 6780.50,
      profit: 1780.50,
      roi: 35.6,
      startDate: '2023-02-20',
      duration: '3 months',
      status: 'Active',
      type: 'Crypto',
      risk: 'High'
    },
    {
      id: 3,
      name: 'Conservative Stock Portfolio',
      initialInvestment: 15000,
      currentValue: 15750.25,
      profit: 750.25,
      roi: 5.0,
      startDate: '2023-01-05',
      duration: '5 months',
      status: 'Active',
      type: 'Stocks',
      risk: 'Low'
    },
    {
      id: 4,
      name: 'Algorithmic Trading System',
      initialInvestment: 8000,
      currentValue: 7650.40,
      profit: -349.60,
      roi: -4.4,
      startDate: '2023-03-10',
      duration: '2 months',
      status: 'Active',
      type: 'Forex',
      risk: 'Medium'
    }
  ]
  
  // Calculate totals
  const totalInvestment = investments.reduce((sum, inv) => sum + inv.initialInvestment, 0)
  const totalCurrentValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0)
  const totalProfit = investments.reduce((sum, inv) => sum + inv.profit, 0)
  const totalROI = (totalProfit / totalInvestment) * 100
  
  return (
    <div className="flex-1 overflow-y-auto">
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Investments</h1>
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <Calendar className="h-4 w-4" />
              <span>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-700/50 border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64 text-sm"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            </div>
            
            <button 
              className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
              onClick={toggleDarkMode}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            <div className="relative">
              <button 
                className="relative p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
                onClick={toggleNotifications}
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
                )}
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden z-20">
                  <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
                    <h3 className="font-medium">Notifications</h3>
                    <button 
                      className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                      onClick={markAllNotificationsAsRead}
                    >
                      Mark all as read
                    </button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map(notification => (
                      <div 
                        key={notification.id} 
                        className={`p-4 border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 ${!notification.read ? 'bg-indigo-50 dark:bg-indigo-900/20' : ''}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`mt-1 h-2 w-2 rounded-full ${!notification.read ? 'bg-indigo-600 dark:bg-indigo-400' : 'bg-transparent'}`}></div>
                          <div>
                            <p className="text-sm">{notification.message}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center border-t border-slate-200 dark:border-slate-700">
                    <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-700">
              <div className="h-9 w-9 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <User className="h-5 w-5" />
              </div>
              <div className="flex items-center gap-1 cursor-pointer">
                <span className="font-medium text-sm">John Doe</span>
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <main className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-bold mb-1">Investment Portfolio</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Track and manage your investment performance</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-xl transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span className="font-medium">New Investment</span>
            </button>
            <button className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
            <select 
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="30">Last 30 Days</option>
              <option value="90">Last 90 Days</option>
              <option value="365">Last Year</option>
              <option value="all">All Time</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm overflow-hidden card-hover">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Total Invested</p>
                  <h3 className="text-2xl font-bold">${totalInvestment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
                </div>
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl">
                  <DollarSign className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>
              <div className="flex items-center text-slate-500 dark:text-slate-400">
                <span className="text-sm">Across {investments.length} investments</span>
              </div>
            </div>
            <div className="h-1 w-full bg-indigo-600"></div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm overflow-hidden card-hover">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Current Value</p>
                  <h3 className="text-2xl font-bold">${totalCurrentValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
                </div>
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
                  <BarChart3 className="h-5 w-5 text-emerald-600 dark:text-emerald-500" />
                </div>
              </div>
              <div className="flex items-center text-emerald-600 dark:text-emerald-500">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">+${totalProfit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            </div>
            <div className="h-1 w-full bg-emerald-600"></div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm overflow-hidden card-hover">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Total ROI</p>
                  <h3 className="text-2xl font-bold">{totalROI.toFixed(2)}%</h3>
                </div>
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                  <Percent className="h-5 w-5 text-blue-600 dark:text-blue-500" />
                </div>
              </div>
              <div className="flex items-center text-emerald-600 dark:text-emerald-500">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">+5.2%</span>
                <span className="text-slate-500 dark:text-slate-400 text-sm ml-1">from last month</span>
              </div>
            </div>
            <div className="h-1 w-full bg-blue-600"></div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm overflow-hidden card-hover">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Best Performer</p>
                  <h3 className="text-2xl font-bold">+{Math.max(...investments.map(inv => inv.roi)).toFixed(1)}%</h3>
                </div>
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                  <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-500" />
                </div>
              </div>
              <div className="flex items-center text-slate-500 dark:text-slate-400">
                <span className="text-sm">{investments.sort((a, b) => b.roi - a.roi)[0].name}</span>
              </div>
            </div>
            <div className="h-1 w-full bg-purple-600"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6 card-hover">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold mb-1">Investment Performance</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">ROI comparison across investments</p>
              </div>
            </div>
            
            <div className="overflow-x-auto -mx-6">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                    <th className="pb-3 font-medium px-6">Investment</th>
                    <th className="pb-3 font-medium">Initial</th>
                    <th className="pb-3 font-medium">Current</th>
                    <th className="pb-3 font-medium">Profit/Loss</th>
                    <th className="pb-3 font-medium">ROI</th>
                    <th className="pb-3 font-medium">Duration</th>
                    <th className="pb-3 font-medium">Type</th>
                    <th className="pb-3 font-medium">Risk</th>
                  </tr>
                </thead>
                <tbody>
                  {investments.map(investment => (
                    <tr key={investment.id} className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className={`h-9 w-9 rounded-xl flex items-center justify-center text-xs font-bold
                            ${investment.type === 'Forex' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 
                              investment.type === 'Crypto' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-500' :
                              'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-500'}`}>
                            {investment.type.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium">{investment.name}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Started: {investment.startDate}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 font-medium">
                        ${investment.initialInvestment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="py-4 font-medium">
                        ${investment.currentValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className={`py-4 font-medium ${investment.profit >= 0 ? 'text-emerald-600 dark:text-emerald-500' : 'text-red-600 dark:text-red-500'}`}>
                        <div className="flex items-center gap-1">
                          {investment.profit >= 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                          <span>${Math.abs(investment.profit).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>
                      </td>
                      <td className={`py-4 font-medium ${investment.roi >= 0 ? 'text-emerald-600 dark:text-emerald-500' : 'text-red-600 dark:text-red-500'}`}>
                        {investment.roi >= 0 ? '+' : ''}{investment.roi.toFixed(1)}%
                      </td>
                      <td className="py-4">
                        {investment.duration}
                      </td>
                      <td className="py-4">
                        {investment.type}
                      </td>
                      <td className="py-4">
                        <span className={`px-2 py-1 text-xs rounded-full
                          ${investment.risk === 'Low' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-500' : 
                            investment.risk === 'Medium' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-500' :
                            'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-500'}`}>
                          {investment.risk}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6 card-hover">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold mb-1">Portfolio Allocation</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Distribution by investment type</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center h-64">
              <div className="w-48 h-48 rounded-full border-8 border-slate-100 dark:border-slate-700 relative">
                {/* Forex segment */}
                <div className="absolute inset-0 bg-indigo-500 rounded-full" style={{ clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 50%)' }}></div>
                {/* Crypto segment */}
                <div className="absolute inset-0 bg-amber-500 rounded-full" style={{ clipPath: 'polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)' }}></div>
                {/* Stocks segment */}
                <div className="absolute inset-0 bg-emerald-500 rounded-full" style={{ clipPath: 'polygon(50% 50%, 50% 100%, 0% 100%, 0% 50%, 0% 0%, 50% 0%)' }}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center">
                    <PieChart className="h-8 w-8 text-slate-400" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-3 mt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 bg-indigo-500 rounded-full"></div>
                  <span className="text-sm">Forex</span>
                </div>
                <span className="text-sm font-medium">47%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 bg-amber-500 rounded-full"></div>
                  <span className="text-sm">Crypto</span>
                </div>
                <span className="text-sm font-medium">13%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 bg-emerald-500 rounded-full"></div>
                  <span className="text-sm">Stocks</span>
                </div>
                <span className="text-sm font-medium">40%</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6 card-hover">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold mb-1">Investment Timeline</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Recent investment activity</p>
              </div>
            </div>
            
            <div className="space-y-6">
              {investments.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()).map(investment => (
                <div key={investment.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center
                      ${investment.type === 'Forex' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 
                        investment.type === 'Crypto' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-500' :
                        'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-500'}`}>
                      <DollarSign className="h-5 w-5" />
                    </div>
                    <div className="w-0.5 h-full bg-slate-200 dark:bg-slate-700 mt-2"></div>
                  </div>
                  <div className="flex-1">
                    <div className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-xl">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{investment.name}</h4>
                        <span className={`px-2 py-0.5 text-xs rounded-full
                          ${investment.status === 'Active' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-500' : 
                            'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-500'}`}>
                          {investment.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-3">
                        <Clock className="h-3 w-3" />
                        <span>Started on {investment.startDate}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Initial Investment</p>
                          <p className="font-medium">${investment.initialInvestment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-slate-500 dark:text-slate-400">Current Value</p>
                          <p className="font-medium">${investment.currentValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span>ROI</span>
                          <span className={`font-medium ${investment.roi >= 0 ? 'text-emerald-600 dark:text-emerald-500' : 'text-red-600 dark:text-red-500'}`}>
                            {investment.roi >= 0 ? '+' : ''}{investment.roi.toFixed(1)}%
                          </span>
                        </div>
                        <div className="h-1.5 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${investment.roi >= 0 ? 'bg-emerald-500' : 'bg-red-500'}`}
                            style={{ width: `${Math.min(Math.abs(investment.roi) * 2, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6 card-hover">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold mb-1">Investment Insights</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Performance analysis and recommendations</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-xl">
                <h4 className="font-medium mb-2">Portfolio Performance</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
                  Your overall portfolio is {totalROI >= 0 ? 'up' : 'down'} {Math.abs(totalROI).toFixed(1)}% since inception.
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-500 dark:text-slate-400 mb-1">Best Performer</p>
                    <p className="font-medium text-emerald-600 dark:text-emerald-500">
                      {investments.sort((a, b) => b.roi - a.roi)[0].name} (+{investments.sort((a, b) => b.roi - a.roi)[0].roi.toFixed(1)}%)
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-500 dark:text-slate-400 mb-1">Worst Performer</p>
                    <p className="font-medium text-red-600 dark:text-red-500">
                      {investments.sort((a, b) => a.roi - b.roi)[0].name} ({investments.sort((a, b) => a.roi - b.roi)[0].roi.toFixed(1)}%)
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-xl">
                <h4 className="font-medium mb-2">Risk Assessment</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Portfolio Risk Level</span>
                      <span className="font-medium">Medium</span>
                    </div>
                    <div className="h-2 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Diversification Score</span>
                      <span className="font-medium">Good</span>
                    </div>
                    <div className="h-2 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-xl">
                <h4 className="font-medium mb-2">Recommendations</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-slate-600 dark:text-slate-300">
                  <li>Consider increasing allocation to Forex investments based on strong performance</li>
                  <li>Review and potentially adjust the Algorithmic Trading System strategy</li>
                  <li>Your portfolio has a good balance of risk, maintain current diversification</li>
                  <li>Set up monthly contribution to your best performing investment</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default InvestmentsPage
