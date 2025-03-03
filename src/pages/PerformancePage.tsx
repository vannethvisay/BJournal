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
  ArrowUp,
  ArrowDown,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Clock,
  Sparkles,
  ChevronRight
} from 'lucide-react'
import { useDashboard } from '../context/DashboardContext'
import PerformanceChart from '../components/PerformanceChart'
import PairDetailsModal from '../components/PairDetailsModal'
import { PairPerformance } from '../types'

const PerformancePage = () => {
  const { 
    darkMode, 
    timeRange, 
    notifications, 
    showNotifications,
    stats,
    topPairs,
    toggleDarkMode,
    toggleNotifications,
    markAllNotificationsAsRead,
    setTimeRange
  } = useDashboard()
  
  const [selectedPair, setSelectedPair] = React.useState<PairPerformance | null>(null)
  
  const unreadCount = notifications.filter(n => !n.read).length
  
  return (
    <div className="flex-1 overflow-y-auto">
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Performance Analytics</h1>
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
            <h2 className="text-xl font-bold mb-1">Performance Overview</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Track your trading performance over time</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700"
              onClick={() => document.dispatchEvent(new CustomEvent('open-new-trade-modal'))}
            >
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
            <select 
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="7">Last 7 Days</option>
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
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Total Balance</p>
                  <h3 className="text-2xl font-bold">${stats.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
                </div>
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl">
                  <BarChart3 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>
              <div className="flex items-center text-emerald-600 dark:text-emerald-500">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">+{stats.balanceChange}%</span>
                <span className="text-slate-500 dark:text-slate-400 text-sm ml-1">from last period</span>
              </div>
            </div>
            <div className="h-1 w-full bg-indigo-600"></div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm overflow-hidden card-hover">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Total Profit</p>
                  <h3 className="text-2xl font-bold">${stats.profit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
                </div>
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
                  <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-500" />
                </div>
              </div>
              <div className="flex items-center text-emerald-600 dark:text-emerald-500">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">+{stats.profitChange}%</span>
                <span className="text-slate-500 dark:text-slate-400 text-sm ml-1">from last period</span>
              </div>
            </div>
            <div className="h-1 w-full bg-emerald-600"></div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm overflow-hidden card-hover">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Total Loss</p>
                  <h3 className="text-2xl font-bold">${stats.loss.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
                </div>
                <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-xl">
                  <TrendingDown className="h-5 w-5 text-red-600 dark:text-red-500" />
                </div>
              </div>
              <div className="flex items-center text-red-600 dark:text-red-500">
                <ArrowDown className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">{stats.lossChange}%</span>
                <span className="text-slate-500 dark:text-slate-400 text-sm ml-1">from last period</span>
              </div>
            </div>
            <div className="h-1 w-full bg-red-600"></div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm overflow-hidden card-hover">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Win Rate</p>
                  <h3 className="text-2xl font-bold">{stats.winRate.toFixed(1)}%</h3>
                </div>
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                  <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-500" />
                </div>
              </div>
              <div className="flex items-center text-emerald-600 dark:text-emerald-500">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">+{stats.winRateChange}%</span>
                <span className="text-slate-500 dark:text-slate-400 text-sm ml-1">from last period</span>
              </div>
            </div>
            <div className="h-1 w-full bg-blue-600"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6 card-hover">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold mb-1">Performance Chart</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Your profit/loss over time</p>
              </div>
              <div className="flex items-center gap-2">
                <select 
                  className="bg-slate-100 dark:bg-slate-700/50 border-none rounded-xl px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                >
                  <option value="7">Last 7 Days</option>
                  <option value="30">Last 30 Days</option>
                  <option value="90">Last 90 Days</option>
                  <option value="365">Last Year</option>
                  <option value="all">All Time</option>
                </select>
              </div>
            </div>
            <PerformanceChart />
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6 card-hover">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold mb-1">Top Pairs</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Your best performing pairs</p>
              </div>
              <button className="text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:underline">View All</button>
            </div>
            
            <div className="space-y-4">
              {topPairs.map(pair => (
                <div 
                  key={pair.code} 
                  className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/30 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors cursor-pointer"
                  onClick={() => setSelectedPair(pair)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 ${pair.color.bg} ${pair.color.darkBg} rounded-xl flex items-center justify-center ${pair.color.text} ${pair.color.darkText} font-bold`}>
                      {pair.code}
                    </div>
                    <div>
                      <p className="font-medium">{pair.pair}</p>
                      <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                        <Clock className="h-3 w-3" />
                        <span>{pair.trades} trades</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${pair.profit >= 0 ? 'text-emerald-600 dark:text-emerald-500' : 'text-red-600 dark:text-red-500'}`}>
                      {pair.profit >= 0 ? '+' : ''}{pair.profit.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    </p>
                    <div className="flex items-center justify-end gap-1 text-xs text-slate-500 dark:text-slate-400">
                      <Sparkles className="h-3 w-3 text-amber-500" />
                      <span>{pair.winRate}% win</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6 card-hover mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold mb-1">Performance Metrics</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Key performance indicators</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-xl">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Total Trades</p>
              <p className="text-xl font-bold">{topPairs.reduce((sum, pair) => sum + pair.trades, 0)}</p>
              <div className="flex items-center text-emerald-600 dark:text-emerald-500 mt-2 text-xs">
                <ArrowUp className="h-3 w-3 mr-1" />
                <span>+12% from last period</span>
              </div>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-xl">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Average Win</p>
              <p className="text-xl font-bold text-emerald-600 dark:text-emerald-500">+42 pips</p>
              <div className="flex items-center text-emerald-600 dark:text-emerald-500 mt-2 text-xs">
                <ArrowUp className="h-3 w-3 mr-1" />
                <span>+5% from last period</span>
              </div>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-xl">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Average Loss</p>
              <p className="text-xl font-bold text-red-600 dark:text-red-500">-28 pips</p>
              <div className="flex items-center text-emerald-600 dark:text-emerald-500 mt-2 text-xs">
                <ArrowUp className="h-3 w-3 mr-1" />
                <span>+8% from last period</span>
              </div>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-xl">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Profit Factor</p>
              <p className="text-xl font-bold">2.4</p>
              <div className="flex items-center text-emerald-600 dark:text-emerald-500 mt-2 text-xs">
                <ArrowUp className="h-3 w-3 mr-1" />
                <span>+0.3 from last period</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6 card-hover">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold mb-1">Monthly Performance</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Your trading results by month</p>
            </div>
            <button className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:underline">
              <span>View Detailed Report</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          
          <div className="overflow-x-auto -mx-6">
            <table className="w-full">
              <thead>
                <tr className="text-left text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                  <th className="pb-3 font-medium px-6">Month</th>
                  <th className="pb-3 font-medium">Trades</th>
                  <th className="pb-3 font-medium">Win Rate</th>
                  <th className="pb-3 font-medium">Profit/Loss</th>
                  <th className="pb-3 font-medium">Best Pair</th>
                  <th className="pb-3 font-medium">Worst Pair</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="py-4 px-6 font-medium">May 2023</td>
                  <td className="py-4">32</td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: '72%' }}></div>
                      </div>
                      <span>72%</span>
                    </div>
                  </td>
                  <td className="py-4 text-emerald-600 dark:text-emerald-500 font-medium">+$1,245.80</td>
                  <td className="py-4">EUR/USD</td>
                  <td className="py-4">USD/JPY</td>
                </tr>
                <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="py-4 px-6 font-medium">April 2023</td>
                  <td className="py-4">28</td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: '64%' }}></div>
                      </div>
                      <span>64%</span>
                    </div>
                  </td>
                  <td className="py-4 text-emerald-600 dark:text-emerald-500 font-medium">+$980.50</td>
                  <td className="py-4">GBP/USD</td>
                  <td className="py-4">AUD/USD</td>
                </tr>
                <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="py-4 px-6 font-medium">March 2023</td>
                  <td className="py-4">35</td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: '51%' }}></div>
                      </div>
                      <span>51%</span>
                    </div>
                  </td>
                  <td className="py-4 text-emerald-600 dark:text-emerald-500 font-medium">+$320.25</td>
                  <td className="py-4">EUR/USD</td>
                  <td className="py-4">USD/JPY</td>
                </tr>
                <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="py-4 px-6 font-medium">February 2023</td>
                  <td className="py-4">22</td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
                        <div className="h-full bg-red-500 rounded-full" style={{ width: '41%' }}></div>
                      </div>
                      <span>41%</span>
                    </div>
                  </td>
                  <td className="py-4 text-red-600 dark:text-red-500 font-medium">-$450.30</td>
                  <td className="py-4">GBP/USD</td>
                  <td className="py-4">EUR/USD</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
      
      {selectedPair && (
        <PairDetailsModal 
          pair={selectedPair} 
          onClose={() => setSelectedPair(null)} 
        />
      )}
    </div>
  )
}

export default PerformancePage
