import React, { useState, useRef } from 'react'
import { X, Upload, Trash2, Image, Plus, Minus } from 'lucide-react'
import { useDashboard } from '../context/DashboardContext'

interface NewTradeModalProps {
  onClose: () => void
}

interface Screenshot {
  id: string;
  dataUrl: string;
  caption: string;
}

const NewTradeModal: React.FC<NewTradeModalProps> = ({ onClose }) => {
  const { addTrade } = useDashboard()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [formData, setFormData] = useState({
    pair: 'EUR/USD',
    type: 'Buy',
    entryPrice: '',
    exitPrice: '',
    lotSize: '',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().split(' ')[0].substring(0, 5),
    strategy: '',
    notes: '',
    risk: '',
    reward: '',
    takeProfit: '',
    stopLoss: '',
    timeframe: 'H1',
    tags: '',
    mood: 'Neutral'
  })
  
  const [screenshots, setScreenshots] = useState<Screenshot[]>([])
  const [showAdvanced, setShowAdvanced] = useState(false)
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const entryPrice = parseFloat(formData.entryPrice)
    const exitPrice = parseFloat(formData.exitPrice)
    const lotSize = parseFloat(formData.lotSize)
    
    // Calculate profit in pips
    let profit = 0
    if (formData.type === 'Buy') {
      profit = Math.round((exitPrice - entryPrice) * 10000)
    } else {
      profit = Math.round((entryPrice - exitPrice) * 10000)
    }
    
    addTrade({
      pair: formData.pair,
      type: formData.type as 'Buy' | 'Sell',
      entryPrice,
      exitPrice,
      profit,
      date: formData.date,
      time: formData.time,
      lotSize,
      strategy: formData.strategy,
      notes: formData.notes,
      risk: formData.risk ? parseFloat(formData.risk) : undefined,
      reward: formData.reward ? parseFloat(formData.reward) : undefined,
      takeProfit: formData.takeProfit ? parseFloat(formData.takeProfit) : undefined,
      stopLoss: formData.stopLoss ? parseFloat(formData.stopLoss) : undefined,
      timeframe: formData.timeframe,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      mood: formData.mood,
      screenshots: screenshots.map(s => ({ url: s.dataUrl, caption: s.caption }))
    })
    
    onClose()
  }
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    
    Array.from(files).forEach(file => {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          const newScreenshot: Screenshot = {
            id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
            dataUrl: event.target.result,
            caption: ''
          }
          setScreenshots(prev => [...prev, newScreenshot])
        }
      }
      reader.readAsDataURL(file)
    })
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }
  
  const handleScreenshotDelete = (id: string) => {
    setScreenshots(prev => prev.filter(s => s.id !== id))
  }
  
  const handleCaptionChange = (id: string, caption: string) => {
    setScreenshots(prev => 
      prev.map(s => s.id === id ? { ...s, caption } : s)
    )
  }
  
  const toggleAdvanced = () => {
    setShowAdvanced(!showAdvanced)
  }
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-bold">Add New Trade</h2>
          <button 
            className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left column - Basic trade info */}
            <div>
              <h3 className="text-lg font-medium mb-4">Trade Information</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Currency Pair
                  </label>
                  <select
                    name="pair"
                    value={formData.pair}
                    onChange={handleChange}
                    className="w-full bg-slate-100 dark:bg-slate-700/50 border-none rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  >
                    <option value="EUR/USD">EUR/USD</option>
                    <option value="GBP/USD">GBP/USD</option>
                    <option value="USD/JPY">USD/JPY</option>
                    <option value="AUD/USD">AUD/USD</option>
                    <option value="USD/CAD">USD/CAD</option>
                    <option value="NZD/USD">NZD/USD</option>
                    <option value="EUR/GBP">EUR/GBP</option>
                    <option value="USD/CHF">USD/CHF</option>
                    <option value="EUR/JPY">EUR/JPY</option>
                    <option value="GBP/JPY">GBP/JPY</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Trade Type
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full bg-slate-100 dark:bg-slate-700/50 border-none rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  >
                    <option value="Buy">Buy</option>
                    <option value="Sell">Sell</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Entry Price
                  </label>
                  <input
                    type="number"
                    name="entryPrice"
                    value={formData.entryPrice}
                    onChange={handleChange}
                    step="0.00001"
                    className="w-full bg-slate-100 dark:bg-slate-700/50 border-none rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Exit Price
                  </label>
                  <input
                    type="number"
                    name="exitPrice"
                    value={formData.exitPrice}
                    onChange={handleChange}
                    step="0.00001"
                    className="w-full bg-slate-100 dark:bg-slate-700/50 border-none rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Lot Size
                  </label>
                  <input
                    type="number"
                    name="lotSize"
                    value={formData.lotSize}
                    onChange={handleChange}
                    step="0.01"
                    className="w-full bg-slate-100 dark:bg-slate-700/50 border-none rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full bg-slate-100 dark:bg-slate-700/50 border-none rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full bg-slate-100 dark:bg-slate-700/50 border-none rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Strategy
                </label>
                <input
                  type="text"
                  name="strategy"
                  value={formData.strategy}
                  onChange={handleChange}
                  className="w-full bg-slate-100 dark:bg-slate-700/50 border-none rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., Trend Following, Breakout, Support/Resistance"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-slate-100 dark:bg-slate-700/50 border-none rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Add your trade analysis, observations, or lessons learned..."
                />
              </div>
              
              <button
                type="button"
                onClick={toggleAdvanced}
                className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-4"
              >
                {showAdvanced ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                <span>{showAdvanced ? 'Hide Advanced Options' : 'Show Advanced Options'}</span>
              </button>
              
              {showAdvanced && (
                <div className="space-y-4 mb-4 bg-slate-50 dark:bg-slate-700/30 p-4 rounded-xl">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Risk (%)
                      </label>
                      <input
                        type="number"
                        name="risk"
                        value={formData.risk}
                        onChange={handleChange}
                        step="0.1"
                        className="w-full bg-white dark:bg-slate-700 border-none rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="e.g., 1.5"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Reward (%)
                      </label>
                      <input
                        type="number"
                        name="reward"
                        value={formData.reward}
                        onChange={handleChange}
                        step="0.1"
                        className="w-full bg-white dark:bg-slate-700 border-none rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="e.g., 3.0"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Stop Loss
                      </label>
                      <input
                        type="number"
                        name="stopLoss"
                        value={formData.stopLoss}
                        onChange={handleChange}
                        step="0.00001"
                        className="w-full bg-white dark:bg-slate-700 border-none rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Price level"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Take Profit
                      </label>
                      <input
                        type="number"
                        name="takeProfit"
                        value={formData.takeProfit}
                        onChange={handleChange}
                        step="0.00001"
                        className="w-full bg-white dark:bg-slate-700 border-none rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Price level"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Timeframe
                      </label>
                      <select
                        name="timeframe"
                        value={formData.timeframe}
                        onChange={handleChange}
                        className="w-full bg-white dark:bg-slate-700 border-none rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="M1">M1 (1 minute)</option>
                        <option value="M5">M5 (5 minutes)</option>
                        <option value="M15">M15 (15 minutes)</option>
                        <option value="M30">M30 (30 minutes)</option>
                        <option value="H1">H1 (1 hour)</option>
                        <option value="H4">H4 (4 hours)</option>
                        <option value="D1">D1 (Daily)</option>
                        <option value="W1">W1 (Weekly)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Trading Mood
                      </label>
                      <select
                        name="mood"
                        value={formData.mood}
                        onChange={handleChange}
                        className="w-full bg-white dark:bg-slate-700 border-none rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="Confident">Confident</option>
                        <option value="Cautious">Cautious</option>
                        <option value="Neutral">Neutral</option>
                        <option value="Impulsive">Impulsive</option>
                        <option value="Fearful">Fearful</option>
                        <option value="Greedy">Greedy</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      name="tags"
                      value={formData.tags}
                      onChange={handleChange}
                      className="w-full bg-white dark:bg-slate-700 border-none rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="e.g., news-based, high-volatility, key-level"
                    />
                  </div>
                </div>
              )}
            </div>
            
            {/* Right column - Screenshots */}
            <div>
              <h3 className="text-lg font-medium mb-4">Trade Screenshots</h3>
              
              <div className="mb-4 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-6 text-center">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  multiple
                  className="hidden"
                  id="screenshot-upload"
                />
                
                <label 
                  htmlFor="screenshot-upload"
                  className="flex flex-col items-center justify-center cursor-pointer"
                >
                  <Image className="h-12 w-12 text-slate-400 mb-2" />
                  <p className="text-slate-600 dark:text-slate-400 mb-1">Drag & drop screenshots or click to upload</p>
                  <p className="text-xs text-slate-500 dark:text-slate-500">PNG, JPG, GIF up to 10MB</p>
                  
                  <button
                    type="button"
                    className="mt-4 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl text-sm font-medium hover:bg-indigo-200 dark:hover:bg-indigo-800/30"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="flex items-center gap-1">
                      <Upload className="h-4 w-4" />
                      <span>Upload Screenshots</span>
                    </div>
                  </button>
                </label>
              </div>
              
              {screenshots.length > 0 && (
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Uploaded Screenshots ({screenshots.length})
                  </h4>
                  
                  <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                    {screenshots.map((screenshot) => (
                      <div 
                        key={screenshot.id} 
                        className="bg-slate-50 dark:bg-slate-700/30 rounded-xl p-3"
                      >
                        <div className="relative mb-2">
                          <img 
                            src={screenshot.dataUrl} 
                            alt="Trade screenshot" 
                            className="w-full h-auto rounded-lg object-cover"
                          />
                          <button
                            type="button"
                            className="absolute top-2 right-2 p-1 bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 rounded-full hover:bg-red-200 dark:hover:bg-red-800/50"
                            onClick={() => handleScreenshotDelete(screenshot.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <input
                          type="text"
                          value={screenshot.caption}
                          onChange={(e) => handleCaptionChange(screenshot.id, e.target.value)}
                          placeholder="Add a caption for this screenshot..."
                          className="w-full bg-white dark:bg-slate-700 border-none rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors"
            >
              Add Trade
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewTradeModal
