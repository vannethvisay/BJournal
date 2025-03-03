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
  PieChart,
  BarChart3,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  ArrowUp,
  ArrowDown,
  AlertTriangle,
  Shield,
  Target
} from 'lucide-react'
import { useDashboard } from '../context/DashboardContext'
import { Doughnut, Bar } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js'

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title)

const RiskAnalysisPage = () => {
  const { 
    darkMode, 
    timeRange, 
    notifications, 
    showNotifications,
    riskMetrics,
    toggleDarkMode,
    toggleNotifications,
    markAllNotificationsAsRead,
    setTimeRange
  } = useDashboard()
  
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
  
  // Risk distribution chart data
  const riskDistributionData = {
    labels: ['Low Risk (≤1%)', 'Medium Risk (1-2%)', 'High Risk (>2%)'],
    datasets: [
      {
        data: [
          riskMetrics.riskDistribution.low,
          riskMetrics.riskDistribution.medium,
          riskMetrics.riskDistribution.high
        ],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)'
        ],
        borderColor: [
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(239, 68, 68, 1)'
        ],
        borderWidth: 1,
      },
    ],
  }
  
  // Timeframe performance chart data
  const timeframeLabels = Object.keys(riskMetrics.timeframePerformance)
  const timeframeWinRates = timeframeLabels.map(tf => riskMetrics.timeframePerformance[tf].winRate)
  const timeframeProfitFactors = timeframeLabels.map(tf => riskMetrics.timeframePerformance[tf].profitFactor)
  
  const timeframePerformanceData = {
    labels: timeframeLabels,
    datasets: [
      {
        label: 'Win Rate (%)',
        data: timeframeWinRates,
        backgroundColor: 'rgba(79, 70, 229, 0.6)',
        borderColor: 'rgba(79, 70, 229, 1)',
        borderWidth: 1,
      },
      {
        label: 'Profit Factor',
        data: timeframeProfitFactors,
        backgroundColor: 'rgba(16, 185, 129, 0.6)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 1,
      }
    ],
  }
  
  return (
    <div className="flex-1 overflow-y-auto">
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Risk Analysis</h1>
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
            <h2 className="text-xl font-bold mb-1">Risk Management Overview</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Analyze your trading risk metrics</p>
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
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Risk/Reward Ratio</p>
                  <h3 className="text-2xl font-bold">1:{formattedRiskMetrics.averageRiskRewardRatio}</h3>
                </div>
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl">
                  <Target className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>
              <div className="flex items-center text-emerald-600 dark:text-emerald-500">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">+0.2</span>
                <span className="text-slate-500 dark:text-slate-400 text-sm ml-1">from last period</span>
              </div>
            </div>
            <div className="h-1 w-full bg-indigo-600"></div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm overflow-hidden card-hover">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Win Rate</p>
                  <h3 className="text-2xl font-bold">{formattedRiskMetrics.winRate}</h3>
                </div>
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
                  <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-500" />
                </div>
              </div>
              <div className="flex items-center text-emerald-600 dark:text-emerald-500">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">+3.2%</span>
                <span className="text-slate-500 dark:text-slate-400 text-sm ml-1">from last period</span>
              </div>
            </div>
            <div className="h-1 w-full bg-emerald-600"></div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm overflow-hidden card-hover">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Max Drawdown</p>
                  <h3 className="text-2xl font-bold">{riskMetrics.maxDrawdown} pips</h3>
                </div>
                <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-xl">
                  <TrendingDown className="h-5 w-5 text-red-600 dark:text-red-500" />
                </div>
              </div>
              <div className="flex items-center text-emerald-600 dark:text-emerald-500">
                <ArrowDown className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">-12%</span>
                <span className="text-slate-500 dark:text-slate-400 text-sm ml-1">from last period</span>
              </div>
            </div>
            <div className="h-1 w-full bg-red-600"></div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm overflow-hidden card-hover">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Profit Factor</p>
                  <h3 className="text-2xl font-bold">{formattedRiskMetrics.profitFactor}</h3>
                </div>
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                  <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-500" />
                </div>
              </div>
              <div className="flex items-center text-emerald-600 dark:text-emerald-500">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">+0.3</span>
                <span className="text-slate-500 dark:text-slate-400 text-sm ml-1">from last period</span>
              </div>
            </div>
            <div className="h-1 w-full bg-blue-600"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6 card-hover">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold mb-1">Risk Distribution</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">How you allocate risk per trade</p>
              </div>
            </div>
            
            <div className="h-64 flex items-center justify-center">
              <Doughnut 
                data={riskDistributionData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: {
                        usePointStyle: true,
                        padding: 20,
                        color: darkMode ? '#94a3b8' : '#64748b',
                        font: {
                          family: "'Inter', sans-serif",
                          size: 12,
                        }
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
          
          <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6 card-hover">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold mb-1">Timeframe Performance</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Win rate and profit factor by timeframe</p>
              </div>
            </div>
            
            <div className="h-64">
              <Bar 
                data={timeframePerformanceData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top',
                      labels: {
                        usePointStyle: true,
                        boxWidth: 6,
                        boxHeight: 6,
                        padding: 20,
                        color: darkMode ? '#94a3b8' : '#64748b',
                        font: {
                          family: "'Inter', sans-serif",
                          size: 12,
                        }
                      }
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: {
                        color: darkMode ? '#334155' : '#e2e8f0',
                      },
                      ticks: {
                        color: '#94a3b8',
                        font: {
                          family: "'Inter', sans-serif",
                          size: 10
                        }
                      }
                    },
                    x: {
                      grid: {
                        display: false,
                      },
                      ticks: {
                        color: '#94a3b8',
                        font: {
                          family: "'Inter', sans-serif",
                          size: 10
                        }
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6 card-hover">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold mb-1">Trade Performance</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Win/loss metrics and statistics</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-xl">
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Best Trade</p>
                <p className="text-xl font-medium text-emerald-600 dark:text-emerald-500">+{riskMetrics.bestTrade} pips</p>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-xl">
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Worst Trade</p>
                <p className="text-xl font-medium text-red-600 dark:text-red-500">{riskMetrics.worstTrade} pips</p>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-xl">
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Average Win</p>
                <p className="text-xl font-medium text-emerald-600 dark:text-emerald-500">{formattedRiskMetrics.averageWin}</p>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-xl">
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Average Loss</p>
                <p className="text-xl font-medium text-red-600 dark:text-red-500">{formattedRiskMetrics.averageLoss}</p>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-xl">
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Consecutive Wins</p>
                <p className="text-xl font-medium text-emerald-600 dark:text-emerald-500">{riskMetrics.consecutiveWins}</p>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-xl">
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Consecutive Losses</p>
                <p className="text-xl font-medium text-red-600 dark:text-red-500">{riskMetrics.consecutiveLosses}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6 card-hover">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold mb-1">Advanced Risk Metrics</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Detailed risk analysis indicators</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-xl">
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Expectancy</p>
                <p className="text-xl font-medium">{formattedRiskMetrics.expectancy}</p>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-xl">
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Sharpe Ratio</p>
                <p className="text-xl font-medium">{formattedRiskMetrics.sharpeRatio}</p>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-xl">
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Avg Risk per Trade</p>
                <p className="text-xl font-medium">{formattedRiskMetrics.averageRiskPerTrade}</p>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-xl">
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Win/Loss Ratio</p>
                <p className="text-xl font-medium">{(riskMetrics.averageWin / riskMetrics.averageLoss).toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6 card-hover">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold mb-1">Risk Management Recommendations</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Suggestions to improve your risk management</p>
            </div>
            <button className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:underline">
              <span>View All Recommendations</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-500 rounded-lg mt-1">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Improve Risk/Reward Ratio</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Your current risk/reward ratio is 1:{formattedRiskMetrics.averageRiskRewardRatio}. Consider aiming for at least 1:2 to improve long-term profitability.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-500 rounded-lg mt-1">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Maintain Position Sizing</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Your average risk per trade is {formattedRiskMetrics.averageRiskPerTrade} which is within the recommended range. Continue to keep risk per trade below 2% of account balance.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg mt-1">
                  <Target className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Focus on {Object.entries(riskMetrics.timeframePerformance).sort((a, b) => b[1].winRate - a[1].winRate)[0][0]} Timeframe</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Your highest win rate ({Object.entries(riskMetrics.timeframePerformance).sort((a, b) => b[1].winRate - a[1].winRate)[0][1].winRate.toFixed(1)}%) is on the {Object.entries(riskMetrics.timeframePerformance).sort((a, b) => b[1].winRate - a[1].winRate)[0][0]} timeframe. Consider focusing more trades on this timeframe.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default RiskAnalysisPage
