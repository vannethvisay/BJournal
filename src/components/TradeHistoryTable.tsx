import React, { useState } from 'react'
import { ArrowDown, ArrowUp, MoreHorizontal, ExternalLink } from 'lucide-react'
import { useDashboard } from '../context/DashboardContext'
import TradeDetailsModal from './TradeDetailsModal'
import { Trade } from '../types'

const TradeHistoryTable = () => {
  const { 
    getFilteredTrades, 
    sortTrades, 
    activeTradeId, 
    setActiveTradeId,
    deleteTrade
  } = useDashboard()
  
  const [selectedTrade, setSelectedTrade] = useState<Trade | null>(null)
  
  const trades = getFilteredTrades()
  
  const handleViewDetails = (trade: Trade, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedTrade(trade)
  }
  
  const handleMoreOptions = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    const confirmDelete = window.confirm(`Do you want to delete trade #${id}?`)
    if (confirmDelete) {
      deleteTrade(id)
    }
  }
  
  return (
    <>
      <div className="overflow-x-auto -mx-6">
        <table className="w-full">
          <thead>
            <tr className="text-left text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
              <th className="pb-3 font-medium px-6 cursor-pointer" onClick={() => sortTrades('pair')}>
                <div className="flex items-center gap-1">
                  <span>Pair</span>
                </div>
              </th>
              <th className="pb-3 font-medium cursor-pointer" onClick={() => sortTrades('type')}>
                <div className="flex items-center gap-1">
                  <span>Type</span>
                </div>
              </th>
              <th className="pb-3 font-medium cursor-pointer" onClick={() => sortTrades('entryPrice')}>
                <div className="flex items-center gap-1">
                  <span>Entry Price</span>
                </div>
              </th>
              <th className="pb-3 font-medium cursor-pointer" onClick={() => sortTrades('exitPrice')}>
                <div className="flex items-center gap-1">
                  <span>Exit Price</span>
                </div>
              </th>
              <th className="pb-3 font-medium cursor-pointer" onClick={() => sortTrades('profit')}>
                <div className="flex items-center gap-1">
                  <span>Profit/Loss</span>
                </div>
              </th>
              <th className="pb-3 font-medium cursor-pointer" onClick={() => sortTrades('date')}>
                <div className="flex items-center gap-1">
                  <span>Date & Time</span>
                </div>
              </th>
              <th className="pb-3 font-medium cursor-pointer" onClick={() => sortTrades('status')}>
                <div className="flex items-center gap-1">
                  <span>Status</span>
                </div>
              </th>
              <th className="pb-3 font-medium text-right px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((trade) => (
              <tr 
                key={trade.id} 
                className={`border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 ${activeTradeId === trade.id ? 'bg-indigo-50 dark:bg-indigo-900/20' : ''} cursor-pointer`}
                onClick={() => {
                  setActiveTradeId(trade.id)
                  setSelectedTrade(trade)
                }}
              >
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className={`h-9 w-9 rounded-xl flex items-center justify-center text-xs font-bold
                      ${trade.pair === 'EUR/USD' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 
                        trade.pair === 'GBP/USD' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-500' :
                        trade.pair === 'USD/JPY' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-500' :
                        'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-500'}`}>
                      {trade.pair.split('/').map(c => c[0]).join('')}
                    </div>
                    <span className="font-medium">{trade.pair}</span>
                  </div>
                </td>
                <td className="py-4">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium
                    ${trade.type === 'Buy' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-500' : 
                    'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-500'}`}>
                    {trade.type === 'Buy' ? (
                      <>
                        <ArrowUp className="h-3 w-3" />
                        <span>Buy</span>
                      </>
                    ) : (
                      <>
                        <ArrowDown className="h-3 w-3" />
                        <span>Sell</span>
                      </>
                    )}
                  </span>
                </td>
                <td className="py-4 font-mono">{trade.entryPrice}</td>
                <td className="py-4 font-mono">{trade.exitPrice}</td>
                <td className={`py-4 font-medium ${trade.profit > 0 ? 'text-emerald-600 dark:text-emerald-500' : 'text-red-600 dark:text-red-500'}`}>
                  <span className="font-mono">{trade.profit > 0 ? `+${trade.profit}` : trade.profit}</span>
                  <span className="text-xs ml-1">pips</span>
                </td>
                <td className="py-4">
                  <div className="flex flex-col">
                    <span>{trade.date}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{trade.time}</span>
                  </div>
                </td>
                <td className="py-4">
                  <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium
                    ${trade.status === 'Win' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-500' : 
                    'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-500'}`}>
                    {trade.status}
                  </span>
                </td>
                <td className="py-4 text-right px-6">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 p-1"
                      onClick={(e) => handleViewDetails(trade, e)}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </button>
                    <button 
                      className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 p-1"
                      onClick={(e) => handleMoreOptions(trade.id, e)}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {selectedTrade && (
        <TradeDetailsModal 
          trade={selectedTrade} 
          onClose={() => setSelectedTrade(null)} 
        />
      )}
    </>
  )
}

export default TradeHistoryTable
