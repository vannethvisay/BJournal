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
  CreditCard,
  Plus,
  MoreVertical,
  ArrowUp,
  ArrowDown,
  DollarSign,
  Percent,
  BarChart3
} from 'lucide-react'
import { useDashboard } from '../context/DashboardContext'

const AccountsPage = () => {
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
  
  // Mock accounts data
  const accounts = [
    {
      id: 1,
      name: 'Main Trading Account',
      broker: 'IC Markets',
      balance: 24562.80,
      equity: 24780.50,
      margin: 1245.30,
      freeMargin: 23535.20,
      marginLevel: 1990.8,
      profit: 780.50,
      change: 3.2,
      currency: 'USD',
      leverage: '1:100',
      type: 'Live',
      lastUpdated: '2023-05-15 14:30'
    },
    {
      id: 2,
      name: 'Demo Practice',
      broker: 'FXCM',
      balance: 10000.00,
      equity: 9875.40,
      margin: 450.20,
      freeMargin: 9425.20,
      marginLevel: 2194.0,
      profit: -124.60,
      change: -1.2,
      currency: 'USD',
      leverage: '1:500',
      type: 'Demo',
      lastUpdated: '2023-05-15 14:30'
    },
    {
      id: 3,
      name: 'Long-term Investment',
      broker: 'Oanda',
      balance: 15780.25,
      equity: 15920.80,
      margin: 320.50,
      freeMargin: 15600.30,
      marginLevel: 4968.1,
      profit: 140.55,
      change: 0.9,
      currency: 'USD',
      leverage: '1:30',
      type: 'Live',
      lastUpdated: '2023-05-15 14:30'
    }
  ]
  
  return (
    <div className="flex-1 overflow-y-auto">
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Trading Accounts</h1>
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
            <h2 className="text-xl font-bold mb-1">Account Management</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Manage your trading accounts and track performance</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-xl transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span className="font-medium">Add Account</span>
            </button>
            <button className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm overflow-hidden card-hover">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Total Balance</p>
                  <h3 className="text-2xl font-bold">${accounts.reduce((sum, acc) => sum + acc.balance, 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
                </div>
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl">
                  <DollarSign className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>
              <div className="flex items-center text-emerald-600 dark:text-emerald-500">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">+2.5%</span>
                <span className="text-slate-500 dark:text-slate-400 text-sm ml-1">from last month</span>
              </div>
            </div>
            <div className="h-1 w-full bg-indigo-600"></div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm overflow-hidden card-hover">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Total Equity</p>
                  <h3 className="text-2xl font-bold">${accounts.reduce((sum, acc) => sum + acc.equity, 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
                </div>
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
                  <BarChart3 className="h-5 w-5 text-emerald-600 dark:text-emerald-500" />
                </div>
              </div>
              <div className="flex items-center text-emerald-600 dark:text-emerald-500">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">+1.8%</span>
                <span className="text-slate-500 dark:text-slate-400 text-sm ml-1">from last month</span>
              </div>
            </div>
            <div className="h-1 w-full bg-emerald-600"></div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm overflow-hidden card-hover">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Total Margin</p>
                  <h3 className="text-2xl font-bold">${accounts.reduce((sum, acc) => sum + acc.margin, 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
                </div>
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                  <Percent className="h-5 w-5 text-blue-600 dark:text-blue-500" />
                </div>
              </div>
              <div className="flex items-center text-emerald-600 dark:text-emerald-500">
                <ArrowDown className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">-5.2%</span>
                <span className="text-slate-500 dark:text-slate-400 text-sm ml-1">from last month</span>
              </div>
            </div>
            <div className="h-1 w-full bg-blue-600"></div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm overflow-hidden card-hover">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Open Accounts</p>
                  <h3 className="text-2xl font-bold">{accounts.length}</h3>
                </div>
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                  <CreditCard className="h-5 w-5 text-purple-600 dark:text-purple-500" />
                </div>
              </div>
              <div className="flex items-center text-emerald-600 dark:text-emerald-500">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">+1</span>
                <span className="text-slate-500 dark:text-slate-400 text-sm ml-1">from last month</span>
              </div>
            </div>
            <div className="h-1 w-full bg-purple-600"></div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6 card-hover mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold mb-1">Your Trading Accounts</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Manage and monitor all your accounts</p>
            </div>
          </div>
          
          <div className="overflow-x-auto -mx-6">
            <table className="w-full">
              <thead>
                <tr className="text-left text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                  <th className="pb-3 font-medium px-6">Account</th>
                  <th className="pb-3 font-medium">Balance</th>
                  <th className="pb-3 font-medium">Equity</th>
                  <th className="pb-3 font-medium">Margin</th>
                  <th className="pb-3 font-medium">Free Margin</th>
                  <th className="pb-3 font-medium">Margin Level</th>
                  <th className="pb-3 font-medium">P/L</th>
                  <th className="pb-3 font-medium">Leverage</th>
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map(account => (
                  <tr key={account.id} className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className={`h-9 w-9 rounded-xl flex items-center justify-center text-xs font-bold
                          ${account.type === 'Live' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-500' : 
                          'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-500'}`}>
                          {account.type === 'Live' ? 'LIVE' : 'DEMO'}
                        </div>
                        <div>
                          <p className="font-medium">{account.name}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{account.broker}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 font-medium">
                      ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-4 font-medium">
                      ${account.equity.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-4">
                      ${account.margin.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-4">
                      ${account.freeMargin.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-4">
                      {account.marginLevel.toFixed(1)}%
                    </td>
                    <td className={`py-4 font-medium ${account.profit >= 0 ? 'text-emerald-600 dark:text-emerald-500' : 'text-red-600 dark:text-red-500'}`}>
                      <div className="flex items-center gap-1">
                        {account.profit >= 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                        <span>${Math.abs(account.profit).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        <span className="text-xs">({account.profit >= 0 ? '+' : ''}{account.change}%)</span>
                      </div>
                    </td>
                    <td className="py-4">
                      {account.leverage}
                    </td>
                    <td className="py-4">
                      <button className="p-1 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300">
                        <MoreVertical className="h-4 w-4" />
                      </button>
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
                <h3 className="text-lg font-bold mb-1">Account Performance</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Monthly growth by account</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {accounts.map(account => (
                <div key={account.id} className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-xl">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`h-8 w-8 rounded-lg flex items-center justify-center text-xs font-bold
                        ${account.type === 'Live' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-500' : 
                        'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-500'}`}>
                        {account.type === 'Live' ? 'LIVE' : 'DEMO'}
                      </div>
                      <span className="font-medium">{account.name}</span>
                    </div>
                    <div className={`flex items-center gap-1 text-xs ${account.profit >= 0 ? 'text-emerald-600 dark:text-emerald-500' : 'text-red-600 dark:text-red-500'}`}>
                      {account.profit >= 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                      <span>{account.profit >= 0 ? '+' : ''}{account.change}% this month</span>
                    </div>
                  </div>
                  
                  <div className="h-2 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden mb-2">
                    <div 
                      className={`h-full rounded-full ${account.profit >= 0 ? 'bg-emerald-500' : 'bg-red-500'}`}
                      style={{ width: `${Math.min(Math.abs(account.change) * 5, 100)}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-2">
                    <span>Starting: ${(account.balance - account.profit).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    <span>Current: ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6 card-hover">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold mb-1">Account Settings</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Manage your account preferences</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-xl">
                <h4 className="font-medium mb-3">Account Synchronization</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                  Connect your trading accounts to automatically sync trades and balances.
                </p>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                  Connect Broker API
                </button>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-xl">
                <h4 className="font-medium mb-3">Notification Settings</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-slate-600 dark:text-slate-300">Balance Updates</label>
                    <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-slate-600 dark:text-slate-300">Margin Warnings</label>
                    <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-slate-600 dark:text-slate-300">Trade Notifications</label>
                    <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-xl">
                <h4 className="font-medium mb-3">Account Security</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                  Protect your account with additional security measures.
                </p>
                <button className="bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500 py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                  Enable Two-Factor Authentication
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AccountsPage
