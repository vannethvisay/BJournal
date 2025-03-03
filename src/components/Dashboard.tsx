import React, { useState } from 'react'
import { 
  ArrowDown, 
  ArrowUp, 
  Bell, 
  Calendar,
  ChevronDown, 
  DollarSign, 
  Search, 
  TrendingDown, 
  TrendingUp, 
  User,
  BarChart3,
  Filter,
  ChevronRight,
  Clock,
  Sparkles,
  Sun,
  Moon,
  PieChart,
  BarChart,
  LineChart
} from 'lucide-react'
import TradeHistoryTable from './TradeHistoryTable'
import PerformanceChart from './PerformanceChart'
import { useDashboard } from '../context/DashboardContext'
import NewTradeModal from './NewTradeModal'
import PairDetailsModal from './PairDetailsModal'
import { PairPerformance, RiskMetrics, PairStatistics } from '../types'

const Dashboard = () => {
  const { 
    darkMode, 
    timeRange, 
    notifications, 
    showNotifications,
    stats,
    topPairs,
    riskMetrics,
    pairStatistics,
    toggleDarkMode,
    toggleNotifications,
    markAllNotificationsAsRead,
    setTimeRange
  } = useDashboard()
  
  const [showNewTradeModal, setShowNewTradeModal] = React.useState(false)
  const [selectedPair, setSelectedPair] = useState<PairPerformance | null>(null)
  const [activeTab, setActiveTab] = useState('performance')
  
  const unreadCount = notifications.filter(n => !n.read).length
  
  // Format risk metrics for display
  const formattedRiskMetrics = {
    ...riskMetrics,
    winRate: riskMetrics.winRate.toFixed(1) + '%',
    profitFactor: riskMetrics.profitFactor.toFixed(2),
    expectancy: riskMetrics.expectancy.toFixed(1) + ' pips',
    averageRiskRewardRatio: riskMetrics.averageRiskRewardRatio.toFixed(2),
    averageRiskPerTrade: riskMetrics.averageRiskPerTrade.toFixed(1) + '%',
    sharpeRatio: riskMetrics.sharpeRatio.toFixed(2),
    averageWin: riskMetrics.averageWin.toFixed(1) + ' pips',
    averageLoss: riskMetrics.averageLoss.toFixed(1) + ' pips',
  }
  
  return (
    <div className="flex-1 overflow-y-auto">
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Dashboard</h1>
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
            <h2 className="text-xl font-bold mb-1">Trading Overview</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Your trading performance at a glance</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-xl transition-colors"
              onClick={() => setShowNewTradeModal(true)}
            >
              <span className="font-medium">New Trade</span>
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
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Total Balance</p>
                  <h3 className="text-2xl font-bold">${stats.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
                </div>
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl">
                  <DollarSign className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>
              <div className="flex items-center text-emerald-600 dark:text-emerald-500">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">+{stats.balanceChange}%</span>
                <span className="text-slate-500 dark:text-slate-400 text-sm ml-1">from last month</span>
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
                <span className="text-slate-500 dark:text-slate-400 text-sm ml-1">from last month</span>
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
                <span className="text-slate-500 dark:text-slate-400 text-sm ml-1">from last month</span>
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
                <span className="text-slate-500 dark:text-slate-400 text-sm ml-1">from last month</span>
              </div>
            </div>
            <div className="h-1 w-full bg-blue-600"></div>
          </div>
        </div>
        
        <div className="flex items-center gap-4 mb-6">
          <button
            className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 ${
              activeTab === 'performance' 
                ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' 
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50'
            }`}
            onClick={() => setActiveTab('performance')}
          >
            <LineChart className="h-4 w-4" />
            <span>Performance</span>
          </button>
          <button
            className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 ${
              activeTab === 'risk' 
                ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' 
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50'
            }`}
            onClick={() => setActiveTab('risk')}
          >
            <PieChart className="h-4 w-4" />
            <span>Risk Analysis</span>
          </button>
          <button
            className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 ${
              activeTab === 'pairs' 
                ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' 
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50'
            }`}
            onClick={() => setActiveTab('pairs')}
          >
            <BarChart className="h-4 w-4" />
            <span>Pair Statistics</span>
          </button>
        </div>
        
        {activeTab === 'performance' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6 card-hover">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-bold mb-1">Performance Overview</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">Your profit/loss over time</p>
                </div>
                <div className="flex items-center gap-2">
                  <select 
                    className="bg-slate-100 dark:bg-slate-700/50 border-none rounded-xl px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
        )}
        
        {activeTab === 'risk' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6 card-hover">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-bold mb-1">Risk Metrics</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">Key risk management indicators</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-xl">
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Win Rate</p>
                  <p className="text-xl font-bold">{formattedRiskMetrics.winRate}</p>
                </div>
                
                <div className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-xl">
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Profit Factor</p>
                  <p className="text-xl font-bold">{formattedRiskMetrics.profitFactor}</p>
                </div>
                
                <div className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-xl">
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Expectancy</p>
                  <p className="text-xl font-bold">{formattedRiskMetrics.expectancy}</p>
                </div>
                
                <div className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-xl">
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Avg Risk/Reward</p>
                  <p className="text-xl font-bold">1:{formattedRiskMetrics.averageRiskRewardRatio}</p>
                </div>
                
                <div className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-xl">
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Max Drawdown</p>
                  <p className="text-xl font-bold">{riskMetrics.maxDrawdown} pips</p>
                </div>
                
                <div className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-xl">
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Sharpe Ratio</p>
                  <p className="text-xl font-bold">{formattedRiskMetrics.sharpeRatio}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-xl">
                  <h4 className="font-medium mb-3">Trade Performance</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Best Trade</p>
                      <p className="text-lg font-medium text-emerald-600 dark:text-emerald-500">+{riskMetrics.bestTrade} pips</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Worst Trade</p>
                      <p className="text-lg font-medium text-red-600 dark:text-red-500">{riskMetrics.worstTrade} pips</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Average Win</p>
                      <p className="text-lg font-medium text-emerald-600 dark:text-emerald-500">+{formattedRiskMetrics.averageWin}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Average Loss</p>
                      <p className="text-lg font-medium text-red-600 dark:text-red-500">-{formattedRiskMetrics.averageLoss}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-xl">
                  <h4 className="font-medium mb-3">Consistency Metrics</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Consecutive Wins</p>
                      <p className="text-lg font-medium text-emerald-600 dark:text-emerald-500">{riskMetrics.consecutiveWins}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Consecutive Losses</p>
                      <p className="text-lg font-medium text-red-600 dark:text-red-500">{riskMetrics.consecutiveLosses}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Avg Risk per Trade</p>
                      <p className="text-lg font-medium">{formattedRiskMetrics.averageRiskPerTrade}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Win/Loss Ratio</p>
                      <p className="text-lg font-medium">{(riskMetrics.averageWin / riskMetrics.averageLoss).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6 card-hover">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-bold mb-1">Risk Distribution</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">How you allocate risk</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-xl">
                  <h4 className="font-medium mb-3">Risk Level Distribution</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Low Risk (≤1%)</span>
                        <span className="font-medium">{riskMetrics.riskDistribution.low.toFixed(1)}%</span>
                      </div>
                      <div className="h-2 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-emerald-500 rounded-full" 
                          style={{ width: `${riskMetrics.riskDistribution.low}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Medium Risk (1-2%)</span>
                        <span className="font-medium">{riskMetrics.riskDistribution.medium.toFixed(1)}%</span>
                      </div>
                      <div className="h-2 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-amber-500 rounded-full" 
                          style={{ width: `${riskMetrics.riskDistribution.medium}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>High Risk (>2%)</span>
                        <span className="font-medium">{riskMetrics.riskDistribution.high.toFixed(1)}%</span>
                      </div>
                      <div className="h-2 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-red-500 rounded-full" 
                          style={{ width: `${riskMetrics.riskDistribution.high}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-xl">
                  <h4 className="font-medium mb-3">Timeframe Performance</h4>
                  <div className="space-y-3">
                    {Object.entries(riskMetrics.timeframePerformance).map(([timeframe, data]) => (
                      <div key={timeframe}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{timeframe}</span>
                          <span className="font-medium">{data.winRate.toFixed(1)}% Win Rate</span>
                        </div>
                        <div className="h-2 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${data.winRate >= 60 ? 'bg-emerald-500' : data.winRate >= 45 ? 'bg-amber-500' : 'bg-red-500'}`}
                            style={{ width: `${data.winRate}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'pairs' && (
          <div className="grid grid-cols-1 gap-6 mb-8">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6 card-hover">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-bold mb-1">Pair Statistics</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">Performance by currency pair</p>
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
                    {pairStatistics.map((pair) => (
                      <tr 
                        key={pair.pair} 
                        className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer"
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
          </div>
        )}
        
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6 card-hover">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold mb-1">Recent Trades</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Your latest trading activity</p>
            </div>
            <button className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:underline">
              <span>View All Trades</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          
          <TradeHistoryTable />
        </div>
      </main>
      
      {showNewTradeModal && (
        <NewTradeModal onClose={() => setShowNewTradeModal(false)} />
      )}
      
      {selectedPair && (
        <PairDetailsModal 
          pair={selectedPair} 
          onClose={() => setSelectedPair(null)} 
        />
      )}
    </div>
  )
}

export default Dashboard
