import React, { useState } from 'react'
import { 
  Calendar, 
  ChevronDown, 
  Filter, 
  Search, 
  Bell, 
  User,
  Sun,
  Moon,
  BarChart,
  ArrowUp,
  ArrowDown,
  ChevronRight,
  Clock,
  Sparkles
} from 'lucide-react'
import { useDashboard } from '../context/DashboardContext'
import PairDetailsModal from '../components/PairDetailsModal'
import { PairPerformance } from '../types'

const PairStatisticsPage = () => {
  const { 
    darkMode, 
    timeRange, 
    notifications, 
    showNotifications,
    pairStatistics,
    topPairs,
    toggleDarkMode,
    toggleNotifications,
    markAllNotificationsAsRead,
    setTimeRange
  } = useDashboard()
  
  const [selectedPair, setSelectedPair] = useState<PairPerformance | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  
  const unreadCount = notifications.filter(n => !n.read).length
  
  // Filter pair statistics based on search term
  const filteredPairStats = pairStatistics.filter(pair => 
    pair.pair.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  // Find the corresponding PairPerformance object for a pair
  const findPairPerformance = (pairName: string): PairPerformance | null => {
    const pairPerf = topPairs.find(p => p.pair === pairName)
    return pairPerf || null
  }
  
  return (
    <div className="flex-1 overflow-y-auto">
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Pair Statistics</h1>
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <Calendar className="h-4 w-4" />
              <span>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search pairs..." 
                className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-700/50 border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
            <h2 className="text-xl font-bold mb-1">Currency Pair Analysis</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Detailed statistics for each currency pair</p>
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
          {topPairs.map(pair => (
            <div 
              key={pair.code} 
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6 card-hover cursor-pointer"
              onClick={() => setSelectedPair(pair)}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`h-12 w-12 ${pair.color.bg} ${pair.color.darkBg} rounded-xl flex items-center justify-center ${pair.color.text} ${pair.color.darkText} font-bold text-lg`}>
                  {pair.code}
                </div>
                <div>
                  <h3 className="font-bold">{pair.pair}</h3>
                  <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                    <Clock className="h-3 w-3" />
                    <span>{pair.trades} trades</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-500 dark:text-slate-400">Win Rate</span>
                    <span className="font-medium">{pair.winRate}%</span>
                  </div>
                  <div className="h-2 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${pair.winRate >= 60 ? 'bg-emerald-500' : pair.winRate >= 45 ? 'bg-amber-500' : 'bg-red-500'}`}
                      style={{ width: `${pair.winRate}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500 dark:text-slate-400">Profit</span>
                  <span className={`font-medium ${pair.profit >= 0 ? 'text-emerald-600 dark:text-emerald-500' : 'text-red-600 dark:text-red-500'}`}>
                    {pair.profit >= 0 ? '+' : ''}{pair.profit.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500 dark:text-slate-400">View Details</span>
                  <ChevronRight className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6 card-hover mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold mb-1">Detailed Pair Statistics</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Comprehensive analysis of all currency pairs</p>
            </div>
          </div>
          
          <div className="overflow-x-auto -mx-6">
            <table className="w-full">
              <thead>
                <tr className="text-left text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                  <th className="pb-3 font-medium px-6">Pair</th>
                  <th className="pb-3 font-medium">Trades</th>
                  <th className="pb-3 font-medium">Win Rate</th>
                  <th className="pb-3 font-medium">Profit</th>
                  <th className="pb-3 font-medium">Avg Pips</th>
                  <th className="pb-3 font-medium">Buy/Sell Ratio</th>
                  <th className="pb-3 font-medium">Best Strategy</th>
                  <th className="pb-3 font-medium">Best Timeframe</th>
                </tr>
              </thead>
              <tbody>
                {filteredPairStats.map((pair) => (
                  <tr 
                    key={pair.pair} 
                    className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer"
                    onClick={() => {
                      const pairPerf = findPairPerformance(pair.pair)
                      if (pairPerf) {
                        setSelectedPair(pairPerf)
                      }
                    }}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className={`h-9 w-9 rounded-xl flex items-center justify-center text-xs font-bold
                          ${pair.pair === 'EUR/USD' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 
                            pair.pair === 'GBP/USD' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-500' :
                            pair.pair === 'USD/JPY' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-500' :
                            'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-500'}`}>
                          {pair.pair.split('/').map(c => c[0]).join('')}
                        </div>
                        <span className="font-medium">{pair.pair}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-1">
                        <span>{pair.totalTrades}</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          ({pair.winningTrades}W / {pair.losingTrades}L)
                        </span>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${pair.winRate >= 60 ? 'bg-emerald-500' : pair.winRate >= 45 ? 'bg-amber-500' : 'bg-red-500'}`}
                            style={{ width: `${pair.winRate}%` }}
                          ></div>
                        </div>
                        <span className="font-medium">{pair.winRate.toFixed(1)}%</span>
                      </div>
                    </td>
                    <td className={`py-4 font-medium ${pair.totalProfit > 0 ? 'text-emerald-600 dark:text-emerald-500' : 'text-red-600 dark:text-red-500'}`}>
                      {pair.totalProfit > 0 ? '+' : ''}{pair.totalProfit} pips
                    </td>
                    <td className="py-4 font-medium">
                      {pair.averagePips.toFixed(1)} pips
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-1">
                        <span className="text-emerald-600 dark:text-emerald-500">{pair.buyTrades}</span>
                        <span>/</span>
                        <span className="text-red-600 dark:text-red-500">{pair.sellTrades}</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">
                          ({(pair.buyTrades / (pair.buyTrades + pair.sellTrades) * 100).toFixed(0)}%)
                        </span>
                      </div>
                    </td>
                    <td className="py-4">
                      {pair.mostCommonStrategy || 'N/A'}
                    </td>
                    <td className="py-4">
                      {pair.mostProfitableTimeframe || 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6 card-hover">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold mb-1">Buy vs Sell Performance</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Direction-based performance analysis</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {filteredPairStats.slice(0, 4).map(pair => (
                <div key={pair.pair} className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-xl">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`h-8 w-8 rounded-lg flex items-center justify-center text-xs font-bold
                        ${pair.pair === 'EUR/USD' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 
                          pair.pair === 'GBP/USD' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-500' :
                          pair.pair === 'USD/JPY' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-500' :
                          'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-500'}`}>
                        {pair.pair.split('/').map(c => c[0]).join('')}
                      </div>
                      <span className="font-medium">{pair.pair}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                      <Sparkles className="h-3 w-3 text-amber-500" />
                      <span>{pair.winRate.toFixed(1)}% overall win rate</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <div className="flex items-center gap-1">
                          <ArrowUp className="h-3 w-3 text-emerald-600 dark:text-emerald-500" />
                          <span className="text-slate-600 dark:text-slate-300">Buy Trades</span>
                        </div>
                        <span className="font-medium">{pair.buyWinRate.toFixed(1)}% win</span>
                      </div>
                      <div className="h-2 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${pair.buyWinRate >= 60 ? 'bg-emerald-500' : pair.buyWinRate >= 45 ? 'bg-amber-500' : 'bg-red-500'}`}
                          style={{ width: `${pair.buyWinRate}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <div className="flex items-center gap-1">
                          <ArrowDown className="h-3 w-3 text-red-600 dark:text-red-500" />
                          <span className="text-slate-600 dark:text-slate-300">Sell Trades</span>
                        </div>
                        <span className="font-medium">{pair.sellWinRate.toFixed(1)}% win</span>
                      </div>
                      <div className="h-2 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${pair.sellWinRate >= 60 ? 'bg-emerald-500' : pair.sellWinRate >= 45 ? 'bg-amber-500' : 'bg-red-500'}`}
                          style={{ width: `${pair.sellWinRate}%` }}
                        ></div>
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
                <h3 className="text-lg font-bold mb-1">Timeframe Analysis</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Performance across different timeframes</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {filteredPairStats.slice(0, 4).map(pair => (
                <div key={pair.pair} className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-xl">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`h-8 w-8 rounded-lg flex items-center justify-center text-xs font-bold
                        ${pair.pair === 'EUR/USD' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 
                          pair.pair === 'GBP/USD' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-500' :
                          pair.pair === 'USD/JPY' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-500' :
                          'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-500'}`}>
                        {pair.pair.split('/').map(c => c[0]).join('')}
                      </div>
                      <span className="font-medium">{pair.pair}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-300">Best Timeframe</span>
                      <span className="font-medium">{pair.mostProfitableTimeframe || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-300">Best Strategy</span>
                      <span className="font-medium">{pair.mostCommonStrategy || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-300">Avg Holding Time</span>
                      <span className="font-medium">{pair.averageHoldingTime.toFixed(1)} hours</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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

export default PairStatisticsPage
