import React from 'react'
import { X, ArrowUp, ArrowDown, Calendar, Clock, DollarSign, BarChart3, FileText, Target, TrendingUp, Activity, Tag } from 'lucide-react'
import { Trade } from '../types'

interface TradeDetailsModalProps {
  trade: Trade
  onClose: () => void
}

const TradeDetailsModal: React.FC<TradeDetailsModalProps> = ({ trade, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className={`h-10 w-10 rounded-xl flex items-center justify-center text-xs font-bold
              ${trade.pair === 'EUR/USD' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 
                trade.pair === 'GBP/USD' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-500' :
                trade.pair === 'USD/JPY' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-500' :
                'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-500'}`}>
              {trade.pair.split('/').map(c => c[0]).join('')}
            </div>
            <div>
              <h2 className="text-xl font-bold">{trade.pair} Trade Details</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {trade.date} at {trade.time}
              </p>
            </div>
          </div>
          <button 
            className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-slate-50 dark:bg-slate-700/30 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg
                  ${trade.type === 'Buy' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-500' : 
                  'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-500'}`}>
                  {trade.type === 'Buy' ? <ArrowUp className="h-5 w-5" /> : <ArrowDown className="h-5 w-5" />}
                </div>
                <div>
                  <h3 className="font-medium">Trade Type</h3>
                  <p className={`text-lg font-bold
                    ${trade.type === 'Buy' ? 'text-emerald-600 dark:text-emerald-500' : 
                    'text-red-600 dark:text-red-500'}`}>
                    {trade.type}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Entry Price</p>
                  <p className="font-mono font-medium">{trade.entryPrice}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Exit Price</p>
                  <p className="font-mono font-medium">{trade.exitPrice}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Lot Size</p>
                  <p className="font-medium">{trade.lotSize}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Pips</p>
                  <p className={`font-medium ${trade.profit > 0 ? 'text-emerald-600 dark:text-emerald-500' : 'text-red-600 dark:text-red-500'}`}>
                    {trade.profit > 0 ? `+${trade.profit}` : trade.profit}
                  </p>
                </div>
                {trade.stopLoss && (
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Stop Loss</p>
                    <p className="font-mono font-medium text-red-600 dark:text-red-500">{trade.stopLoss}</p>
                  </div>
                )}
                {trade.takeProfit && (
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Take Profit</p>
                    <p className="font-mono font-medium text-emerald-600 dark:text-emerald-500">{trade.takeProfit}</p>
                  </div>
                )}
                {trade.timeframe && (
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Timeframe</p>
                    <p className="font-medium">{trade.timeframe}</p>
                  </div>
                )}
                {trade.mood && (
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Trading Mood</p>
                    <p className="font-medium">{trade.mood}</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-700/30 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg
                  ${trade.status === 'Win' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-500' : 
                  'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-500'}`}>
                  <DollarSign className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Outcome</h3>
                  <p className={`text-lg font-bold
                    ${trade.status === 'Win' ? 'text-emerald-600 dark:text-emerald-500' : 
                    'text-red-600 dark:text-red-500'}`}>
                    {trade.status}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Date</p>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-slate-400" />
                    <p className="font-medium">{trade.date}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Time</p>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-slate-400" />
                    <p className="font-medium">{trade.time}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Risk</p>
                  <p className="font-medium">{trade.risk}%</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Reward</p>
                  <p className="font-medium">{trade.reward}%</p>
                </div>
                {trade.risk && trade.reward && (
                  <div className="col-span-2">
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Risk/Reward Ratio</p>
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-blue-500" />
                      <p className="font-medium">1:{(trade.reward / trade.risk).toFixed(1)}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-slate-50 dark:bg-slate-700/30 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-500 rounded-lg">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Strategy</h3>
                </div>
              </div>
              <p className="text-slate-700 dark:text-slate-300">{trade.strategy || 'No strategy specified'}</p>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-700/30 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-500 rounded-lg">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Notes</h3>
                </div>
              </div>
              <p className="text-slate-700 dark:text-slate-300">{trade.notes || 'No notes added'}</p>
            </div>
          </div>
          
          {trade.tags && trade.tags.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-700/30 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-500 rounded-lg">
                  <Tag className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Tags</h3>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {trade.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-slate-200 dark:bg-slate-600 rounded-full text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {trade.screenshots && trade.screenshots.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-700/30 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-500 rounded-lg">
                  <Activity className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Trade Screenshots</h3>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {trade.screenshots.map((screenshot, index) => (
                  <div key={index} className="bg-white dark:bg-slate-700 rounded-lg overflow-hidden">
                    <img 
                      src={screenshot.url} 
                      alt={`Trade screenshot ${index + 1}`} 
                      className="w-full h-auto object-cover"
                    />
                    {screenshot.caption && (
                      <p className="p-3 text-sm text-slate-700 dark:text-slate-300">
                        {screenshot.caption}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="flex justify-end gap-3 p-6 border-t border-slate-200 dark:border-slate-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default TradeDetailsModal
