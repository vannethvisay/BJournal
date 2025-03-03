import React from 'react'
import { X, TrendingUp, TrendingDown, BarChart3, Clock, Calendar, ArrowUp, ArrowDown } from 'lucide-react'
import { PairPerformance } from '../types'
import { useDashboard } from '../context/DashboardContext'

interface PairDetailsModalProps {
  pair: PairPerformance
  onClose: () => void
}

const PairDetailsModal: React.FC<PairDetailsModalProps> = ({ pair, onClose }) => {
  const { pairStatistics, getFilteredTrades } = useDashboard()
  
  // Get detailed statistics for this pair
  const pairStats = pairStatistics.find(p => p.pair === pair.pair)
  
  // Get all trades for this pair
  const allTrades = getFilteredTrades().filter(t => t.pair === pair.pair)
  
  // Sort trades by date (newest first)
  const sortedTrades = [...allTrades].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateB.getTime() - dateA.getTime();
  });
  
  // Get the most recent 5 trades
  const recentTrades = sortedTrades.slice(0, 5)
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className={`h-12 w-12 ${pair.color.bg} ${pair.color.darkBg} rounded-xl flex items-center justify-center ${pair.color.text} ${pair.color.darkText} font-bold text-lg`}>
              {pair.code}
            </div>
            <div>
              <h2 className="text-xl font-bold">{pair.pair} Analysis</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Performance overview and statistics
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-slate-50 dark:bg-slate-700/30 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-500 rounded-lg">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Win Rate</h3>
                  <p className="text-2xl font-bold">{pair.winRate}%</p>
                </div>
              </div>
              
              <div className="h-2 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden mb-2">
                <div 
                  className={`h-full rounded-full ${pair.winRate >= 60 ? 'bg-emerald-500' : pair.winRate >= 45 ? 'bg-amber-500' : 'bg-red-500'}`}
                  style={{ width: `${pair.winRate}%` }}
                ></div>
              </div>
              
              {pairStats && (
                <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
                  <div>
                    <p className="text-slate-500 dark:text-slate-400">Buy Win Rate</p>
                    <p className="font-medium">{pairStats.buyWinRate.toFixed(1)}%</p>
                  </div>
                  <div>
                    <p className="text-slate-500 dark:text-slate-400">Sell Win Rate</p>
                    <p className="font-medium">{pairStats.sellWinRate.toFixed(1)}%</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-700/30 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${pair.profit >= 0 ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-500' : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-500'}`}>
                  {pair.profit >= 0 ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
                </div>
                <div>
                  <h3 className="font-medium">Total Profit</h3>
                  <p className={`text-2xl font-bold ${pair.profit >= 0 ? 'text-emerald-600 dark:text-emerald-500' : 'text-red-600 dark:text-red-500'}`}>
                    {pair.profit >= 0 ? '+' : ''}{pair.profit.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                  </p>
                </div>
              </div>
              
              {pairStats && (
                <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
                  <div>
                    <p className="text-slate-500 dark:text-slate-400">Best Trade</p>
                    <p className="font-medium text-emerald-600 dark:text-emerald-500">+{pairStats.bestTrade} pips</p>
                  </div>
                  <div>
                    <p className="text-slate-500 dark:text-slate-400">Worst Trade</p>
                    <p className="font-medium text-red-600 dark:text-red-500">{pairStats.worstTrade} pips</p>
                  </div>
                  <div>
                    <p className="text-slate-500 dark:text-slate-400">Average Pips</p>
                    <p className="font-medium">{pairStats.averagePips.toFixed(1)} pips</p>
                  </div>
                  <div>
                    <p className="text-slate-500 dark:text-slate-400">Total Trades</p>
                    <p className="font-medium">{pairStats.totalTrades}</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-700/30 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-500 rounded-lg">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Trading Patterns</h3>
                </div>
              </div>
              
              {pairStats && (
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-slate-500 dark:text-slate-400 mb-1">Best Timeframe</p>
                    <p className="font-medium">{pairStats.mostProfitableTimeframe || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 dark:text-slate-400 mb-1">Best Strategy</p>
                    <p className="font-medium">{pairStats.mostCommonStrategy || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 dark:text-slate-400 mb-1">Buy/Sell Ratio</p>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <span className="text-emerald-600 dark:text-emerald-500 font-medium">{pairStats.buyTrades}</span>
                        <ArrowUp className="h-3 w-3 text-emerald-600 dark:text-emerald-500 ml-1" />
                      </div>
                      <span>/</span>
                      <div className="flex items-center">
                        <span className="text-red-600 dark:text-red-500 font-medium">{pairStats.sellTrades}</span>
                        <ArrowDown className="h-3 w-3 text-red-600 dark:text-red-500 ml-1" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-slate-500 dark:text-slate-400 mb-1">Avg Holding Time</p>
                    <p className="font-medium">{pairStats.averageHoldingTime.toFixed(1)} hours</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-700/30 rounded-xl p-4 mb-6">
            <h3 className="font-medium mb-4">Recent Trades</h3>
            
            {recentTrades.length > 0 ? (
              <div className="space-y-3">
                {recentTrades.map((trade) => (
                  <div 
                    key={trade.id} 
                    className="bg-white dark:bg-slate-700 rounded-lg p-3 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg
                        ${trade.type === 'Buy' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-500' : 
                        'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-500'}`}>
                        {trade.type === 'Buy' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{trade.type} {trade.pair}</p>
                          <span className={`px-2 py-0.5 text-xs rounded-full font-medium
                            ${trade.status === 'Win' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-500' : 
                            'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-500'}`}>
                            {trade.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{trade.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{trade.time}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${trade.profit > 0 ? 'text-emerald-600 dark:text-emerald-500' : 'text-red-600 dark:text-red-500'}`}>
                        {trade.profit > 0 ? '+' : ''}{trade.profit} pips
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {trade.entryPrice} → {trade.exitPrice}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 dark:text-slate-400 text-center py-4">No recent trades for this pair</p>
            )}
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-700/30 rounded-xl p-4">
            <h3 className="font-medium mb-4">Trading Recommendations</h3>
            
            {pairStats && (
              <div className="space-y-4">
                <div className="bg-white dark:bg-slate-700 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Strengths</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {pairStats.winRate > 60 && (
                      <li>High win rate of {pairStats.winRate.toFixed(1)}% indicates strong performance</li>
                    )}
                    {pairStats.buyWinRate > pairStats.sellWinRate && pairStats.buyWinRate > 55 && (
                      <li>Strong performance on buy trades ({pairStats.buyWinRate.toFixed(1)}% win rate)</li>
                    )}
                    {pairStats.sellWinRate > pairStats.buyWinRate && pairStats.sellWinRate > 55 && (
                      <li>Strong performance on sell trades ({pairStats.sellWinRate.toFixed(1)}% win rate)</li>
                    )}
                    {pairStats.averagePips > 0 && (
                      <li>Positive average pips per trade ({pairStats.averagePips.toFixed(1)})</li>
                    )}
                    {pairStats.mostProfitableTimeframe && (
                      <li>Best results on {pairStats.mostProfitableTimeframe} timeframe</li>
                    )}
                  </ul>
                </div>
                
                <div className="bg-white dark:bg-slate-700 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Areas for Improvement</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {pairStats.winRate < 50 && (
                      <li>Low win rate of {pairStats.winRate.toFixed(1)}% suggests reviewing strategy</li>
                    )}
                    {pairStats.buyWinRate < 45 && pairStats.buyTrades > 0 && (
                      <li>Poor performance on buy trades ({pairStats.buyWinRate.toFixed(1)}% win rate)</li>
                    )}
                    {pairStats.sellWinRate < 45 && pairStats.sellTrades > 0 && (
                      <li>Poor performance on sell trades ({pairStats.sellWinRate.toFixed(1)}% win rate)</li>
                    )}
                    {pairStats.averagePips < 0 && (
                      <li>Negative average pips per trade ({pairStats.averagePips.toFixed(1)})</li>
                    )}
                    {Math.abs(pairStats.worstTrade) > pairStats.bestTrade * 1.5 && (
                      <li>Losses are significantly larger than wins, consider tighter stop losses</li>
                    )}
                  </ul>
                </div>
                
                <div className="bg-white dark:bg-slate-700 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Recommendations</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {pairStats.mostProfitableTimeframe && (
                      <li>Focus on trading during {pairStats.mostProfitableTimeframe} timeframe</li>
                    )}
                    {pairStats.mostCommonStrategy && (
                      <li>Continue using {pairStats.mostCommonStrategy} strategy which has shown good results</li>
                    )}
                    {pairStats.buyWinRate > pairStats.sellWinRate && pairStats.buyWinRate > 55 && (
                      <li>Prioritize buy opportunities over sell opportunities</li>
                    )}
                    {pairStats.sellWinRate > pairStats.buyWinRate && pairStats.sellWinRate > 55 && (
                      <li>Prioritize sell opportunities over buy opportunities</li>
                    )}
                    {pairStats.totalTrades < 10 && (
                      <li>More trades needed to establish reliable patterns</li>
                    )}
                  </ul>
                </div>
              </div>
            )}
          </div>
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

export default PairDetailsModal
