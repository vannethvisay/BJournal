import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { format, subDays, parseISO, differenceInDays } from 'date-fns';
import { 
  Trade, 
  Notification, 
  PairPerformance, 
  DashboardStats,
  ChartData,
  RiskMetrics,
  PairStatistics
} from '../types';

interface DashboardContextType {
  // Data
  trades: Trade[];
  notifications: Notification[];
  topPairs: PairPerformance[];
  stats: DashboardStats;
  chartData: ChartData;
  riskMetrics: RiskMetrics;
  pairStatistics: PairStatistics[];
  
  // UI State
  darkMode: boolean;
  timeRange: string;
  showNotifications: boolean;
  activeTradeId: number | null;
  
  // Actions
  setTrades: React.Dispatch<React.SetStateAction<Trade[]>>;
  setTimeRange: React.Dispatch<React.SetStateAction<string>>;
  toggleDarkMode: () => void;
  toggleNotifications: () => void;
  markAllNotificationsAsRead: () => void;
  setActiveTradeId: React.Dispatch<React.SetStateAction<number | null>>;
  addTrade: (trade: Omit<Trade, 'id' | 'status'>) => void;
  deleteTrade: (id: number) => void;
  sortTrades: (field: keyof Trade) => void;
  getFilteredTrades: () => Trade[];
  getFilteredChartData: () => ChartData;
  getFilteredRiskMetrics: () => RiskMetrics;
  getFilteredPairStatistics: () => PairStatistics[];
}

const initialTrades: Trade[] = [
  {
    id: 1,
    pair: 'EUR/USD',
    type: 'Buy',
    entryPrice: 1.0865,
    exitPrice: 1.0912,
    profit: 47,
    date: '2023-05-15',
    time: '14:32',
    status: 'Win',
    lotSize: 0.5,
    pips: 47,
    risk: 1.2,
    reward: 2.5,
    strategy: 'Trend Following',
    notes: 'Strong uptrend on H4, waited for pullback to enter',
    timeframe: 'H4',
    stopLoss: 1.0840,
    takeProfit: 1.0915,
    tags: ['trend', 'pullback', 'high-probability']
  },
  {
    id: 2,
    pair: 'GBP/USD',
    type: 'Sell',
    entryPrice: 1.2540,
    exitPrice: 1.2485,
    profit: 55,
    date: '2023-05-14',
    time: '10:15',
    status: 'Win',
    lotSize: 0.7,
    pips: 55,
    risk: 1.5,
    reward: 3.0,
    strategy: 'Breakout',
    notes: 'Clean break of support level with strong momentum',
    timeframe: 'H1',
    stopLoss: 1.2570,
    takeProfit: 1.2480,
    tags: ['breakout', 'support', 'momentum']
  },
  {
    id: 3,
    pair: 'USD/JPY',
    type: 'Buy',
    entryPrice: 134.25,
    exitPrice: 133.80,
    profit: -45,
    date: '2023-05-13',
    time: '09:45',
    status: 'Loss',
    lotSize: 0.3,
    pips: -45,
    risk: 1.0,
    reward: 2.0,
    strategy: 'Range Bounce',
    notes: 'Failed bounce from range support, market broke down',
    timeframe: 'M30',
    stopLoss: 133.75,
    takeProfit: 134.75,
    tags: ['range', 'support', 'failed-pattern']
  },
  {
    id: 4,
    pair: 'AUD/USD',
    type: 'Sell',
    entryPrice: 0.6680,
    exitPrice: 0.6710,
    profit: -30,
    date: '2023-05-12',
    time: '16:20',
    status: 'Loss',
    lotSize: 0.4,
    pips: -30,
    risk: 0.8,
    reward: 1.6,
    strategy: 'Reversal',
    notes: 'Potential reversal at resistance failed, stopped out',
    timeframe: 'H1',
    stopLoss: 0.6720,
    takeProfit: 0.6640,
    tags: ['reversal', 'resistance', 'failed-pattern']
  },
  {
    id: 5,
    pair: 'EUR/USD',
    type: 'Buy',
    entryPrice: 1.0820,
    exitPrice: 1.0875,
    profit: 55,
    date: '2023-05-11',
    time: '11:05',
    status: 'Win',
    lotSize: 0.6,
    pips: 55,
    risk: 1.3,
    reward: 2.6,
    strategy: 'Support/Resistance',
    notes: 'Strong bounce from major support level with confirmation',
    timeframe: 'D1',
    stopLoss: 1.0790,
    takeProfit: 1.0880,
    tags: ['support', 'bounce', 'daily-level']
  },
  {
    id: 6,
    pair: 'USD/JPY',
    type: 'Sell',
    entryPrice: 135.60,
    exitPrice: 135.20,
    profit: 40,
    date: '2023-05-10',
    time: '13:45',
    status: 'Win',
    lotSize: 0.5,
    pips: 40,
    risk: 1.0,
    reward: 2.0,
    strategy: 'Trend Following',
    notes: 'Continuation of downtrend after pullback',
    timeframe: 'H4',
    stopLoss: 135.90,
    takeProfit: 135.10,
    tags: ['trend', 'continuation', 'pullback']
  },
  {
    id: 7,
    pair: 'GBP/USD',
    type: 'Buy',
    entryPrice: 1.2420,
    exitPrice: 1.2390,
    profit: -30,
    date: '2023-05-09',
    time: '15:30',
    status: 'Loss',
    lotSize: 0.4,
    pips: -30,
    risk: 0.9,
    reward: 1.8,
    strategy: 'Breakout',
    notes: 'False breakout of resistance level',
    timeframe: 'M15',
    stopLoss: 1.2385,
    takeProfit: 1.2455,
    tags: ['breakout', 'resistance', 'false-signal']
  },
  {
    id: 8,
    pair: 'AUD/USD',
    type: 'Buy',
    entryPrice: 0.6640,
    exitPrice: 0.6685,
    profit: 45,
    date: '2023-05-08',
    time: '08:15',
    status: 'Win',
    lotSize: 0.5,
    pips: 45,
    risk: 1.1,
    reward: 2.2,
    strategy: 'Support/Resistance',
    notes: 'Strong bounce from key support zone',
    timeframe: 'H1',
    stopLoss: 0.6620,
    takeProfit: 0.6690,
    tags: ['support', 'bounce', 'key-level']
  }
];

const initialNotifications: Notification[] = [
  { id: 1, read: false, message: "New market analysis available for EUR/USD", time: "10 min ago" },
  { id: 2, read: false, message: "EUR/USD approaching key resistance at 1.0950", time: "25 min ago" },
  { id: 3, read: true, message: "Account balance updated: +$1,245.30", time: "1 hour ago" },
  { id: 4, read: true, message: "Risk management alert: Drawdown approaching 5%", time: "3 hours ago" },
  { id: 5, read: true, message: "New economic calendar events added for this week", time: "Yesterday" }
];

const initialTopPairs: PairPerformance[] = [
  {
    pair: 'EUR/USD',
    code: 'EU',
    trades: 32,
    profit: 2156.20,
    winRate: 72,
    color: {
      bg: 'bg-indigo-100',
      darkBg: 'dark:bg-indigo-900/30',
      text: 'text-indigo-600',
      darkText: 'dark:text-indigo-400'
    }
  },
  {
    pair: 'GBP/USD',
    code: 'GU',
    trades: 28,
    profit: 1842.50,
    winRate: 68,
    color: {
      bg: 'bg-emerald-100',
      darkBg: 'dark:bg-emerald-900/30',
      text: 'text-emerald-600',
      darkText: 'dark:text-emerald-500'
    }
  },
  {
    pair: 'USD/JPY',
    code: 'UJ',
    trades: 24,
    profit: -524.80,
    winRate: 42,
    color: {
      bg: 'bg-amber-100',
      darkBg: 'dark:bg-amber-900/30',
      text: 'text-amber-600',
      darkText: 'dark:text-amber-500'
    }
  },
  {
    pair: 'AUD/USD',
    code: 'AU',
    trades: 18,
    profit: 968.30,
    winRate: 61,
    color: {
      bg: 'bg-purple-100',
      darkBg: 'dark:bg-purple-900/30',
      text: 'text-purple-600',
      darkText: 'dark:text-purple-500'
    }
  }
];

// Generate dates for the last 30 days
const generateDates = (days: number) => {
  const dates = [];
  for (let i = days; i >= 0; i--) {
    dates.push(format(subDays(new Date(), i), 'MMM dd'));
  }
  return dates;
};

// Generate profit data with some randomness but trending upward
const generateProfitData = (days: number) => {
  let value = 500;
  const data = [];
  
  for (let i = 0; i < days + 1; i++) {
    // Add some randomness but generally trend upward
    const change = Math.random() * 100 - 30; // Random value between -30 and 70
    value += change;
    value = Math.max(value, 100); // Ensure we don't go below 100
    data.push(Math.round(value));
  }
  
  return data;
};

// Generate cumulative profit data
const generateCumulativeData = (profitData: number[]) => {
  let cumulative = 0;
  return profitData.map(profit => {
    cumulative += profit;
    return cumulative;
  });
};

const generateChartData = (days: number): ChartData => {
  const dates = generateDates(days);
  const dailyProfitData = generateProfitData(days);
  const cumulativeProfitData = generateCumulativeData(dailyProfitData);
  
  return {
    dates,
    dailyProfitData,
    cumulativeProfitData
  };
};

// Calculate risk metrics based on trades
const calculateRiskMetrics = (trades: Trade[]): RiskMetrics => {
  if (trades.length === 0) {
    return {
      averageRiskRewardRatio: 0,
      averageRiskPerTrade: 0,
      winRate: 0,
      profitFactor: 0,
      expectancy: 0,
      maxDrawdown: 0,
      sharpeRatio: 0,
      consecutiveWins: 0,
      consecutiveLosses: 0,
      bestTrade: 0,
      worstTrade: 0,
      averageWin: 0,
      averageLoss: 0,
      riskDistribution: {
        low: 0,
        medium: 0,
        high: 0
      },
      timeframePerformance: {}
    };
  }

  // Calculate win rate
  const winCount = trades.filter(t => t.status === 'Win').length;
  const winRate = (winCount / trades.length) * 100;

  // Calculate profit factor
  const grossProfit = trades
    .filter(t => t.profit > 0)
    .reduce((sum, t) => sum + t.profit, 0);
  
  const grossLoss = Math.abs(
    trades
      .filter(t => t.profit < 0)
      .reduce((sum, t) => sum + t.profit, 0)
  );
  
  const profitFactor = grossLoss === 0 ? grossProfit : grossProfit / grossLoss;

  // Calculate average risk/reward ratio
  const tradesWithRiskReward = trades.filter(t => t.risk && t.reward);
  const averageRiskRewardRatio = tradesWithRiskReward.length > 0
    ? tradesWithRiskReward.reduce((sum, t) => sum + (t.reward! / t.risk!), 0) / tradesWithRiskReward.length
    : 0;

  // Calculate average risk per trade
  const tradesWithRisk = trades.filter(t => t.risk);
  const averageRiskPerTrade = tradesWithRisk.length > 0
    ? tradesWithRisk.reduce((sum, t) => sum + t.risk!, 0) / tradesWithRisk.length
    : 0;

  // Calculate expectancy
  const winningTrades = trades.filter(t => t.profit > 0);
  const losingTrades = trades.filter(t => t.profit < 0);
  
  const averageWin = winningTrades.length > 0
    ? winningTrades.reduce((sum, t) => sum + t.profit, 0) / winningTrades.length
    : 0;
  
  const averageLoss = losingTrades.length > 0
    ? Math.abs(losingTrades.reduce((sum, t) => sum + t.profit, 0)) / losingTrades.length
    : 0;
  
  const expectancy = (winRate / 100) * averageWin - (1 - winRate / 100) * averageLoss;

  // Calculate max drawdown
  let maxDrawdown = 0;
  let peak = 0;
  let balance = 0;
  
  trades.sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateA.getTime() - dateB.getTime();
  }).forEach(trade => {
    balance += trade.profit;
    if (balance > peak) {
      peak = balance;
    }
    const drawdown = peak - balance;
    if (drawdown > maxDrawdown) {
      maxDrawdown = drawdown;
    }
  });

  // Calculate consecutive wins/losses
  let currentConsecutiveWins = 0;
  let maxConsecutiveWins = 0;
  let currentConsecutiveLosses = 0;
  let maxConsecutiveLosses = 0;
  
  trades.forEach(trade => {
    if (trade.profit > 0) {
      currentConsecutiveWins++;
      currentConsecutiveLosses = 0;
      if (currentConsecutiveWins > maxConsecutiveWins) {
        maxConsecutiveWins = currentConsecutiveWins;
      }
    } else {
      currentConsecutiveLosses++;
      currentConsecutiveWins = 0;
      if (currentConsecutiveLosses > maxConsecutiveLosses) {
        maxConsecutiveLosses = currentConsecutiveLosses;
      }
    }
  });

  // Calculate best and worst trades
  const bestTrade = Math.max(...trades.map(t => t.profit));
  const worstTrade = Math.min(...trades.map(t => t.profit));

  // Calculate risk distribution
  const riskDistribution = {
    low: trades.filter(t => t.risk && t.risk <= 1).length / trades.length * 100,
    medium: trades.filter(t => t.risk && t.risk > 1 && t.risk <= 2).length / trades.length * 100,
    high: trades.filter(t => t.risk && t.risk > 2).length / trades.length * 100
  };

  // Calculate timeframe performance
  const timeframePerformance: Record<string, { winRate: number, profitFactor: number }> = {};
  
  // Get unique timeframes
  const timeframes = [...new Set(trades.filter(t => t.timeframe).map(t => t.timeframe!))];
  
  timeframes.forEach(timeframe => {
    const timeframeTrades = trades.filter(t => t.timeframe === timeframe);
    const timeframeWinCount = timeframeTrades.filter(t => t.status === 'Win').length;
    const timeframeWinRate = (timeframeWinCount / timeframeTrades.length) * 100;
    
    const timeframeGrossProfit = timeframeTrades
      .filter(t => t.profit > 0)
      .reduce((sum, t) => sum + t.profit, 0);
    
    const timeframeGrossLoss = Math.abs(
      timeframeTrades
        .filter(t => t.profit < 0)
        .reduce((sum, t) => sum + t.profit, 0)
    );
    
    const timeframeProfitFactor = timeframeGrossLoss === 0 ? timeframeGrossProfit : timeframeGrossProfit / timeframeGrossLoss;
    
    timeframePerformance[timeframe] = {
      winRate: timeframeWinRate,
      profitFactor: timeframeProfitFactor
    };
  });

  // Calculate Sharpe ratio (simplified)
  const returns = trades.map(t => t.profit);
  const averageReturn = returns.reduce((sum, r) => sum + r, 0) / returns.length;
  const stdDeviation = Math.sqrt(
    returns.reduce((sum, r) => sum + Math.pow(r - averageReturn, 2), 0) / returns.length
  );
  const sharpeRatio = stdDeviation === 0 ? 0 : averageReturn / stdDeviation;

  return {
    averageRiskRewardRatio,
    averageRiskPerTrade,
    winRate,
    profitFactor,
    expectancy,
    maxDrawdown,
    sharpeRatio,
    consecutiveWins: maxConsecutiveWins,
    consecutiveLosses: maxConsecutiveLosses,
    bestTrade,
    worstTrade,
    averageWin,
    averageLoss,
    riskDistribution,
    timeframePerformance
  };
};

// Calculate pair statistics based on trades
const calculatePairStatistics = (trades: Trade[]): PairStatistics[] => {
  // Get unique pairs
  const uniquePairs = [...new Set(trades.map(t => t.pair))];
  
  return uniquePairs.map(pair => {
    const pairTrades = trades.filter(t => t.pair === pair);
    const totalTrades = pairTrades.length;
    const winningTrades = pairTrades.filter(t => t.status === 'Win').length;
    const losingTrades = pairTrades.filter(t => t.status === 'Loss').length;
    const winRate = (winningTrades / totalTrades) * 100;
    
    const totalProfit = pairTrades.reduce((sum, t) => sum + t.profit, 0);
    const averagePips = totalProfit / totalTrades;
    
    const buyTrades = pairTrades.filter(t => t.type === 'Buy');
    const sellTrades = pairTrades.filter(t => t.type === 'Sell');
    
    const buyWinRate = buyTrades.length > 0 
      ? (buyTrades.filter(t => t.status === 'Win').length / buyTrades.length) * 100 
      : 0;
    
    const sellWinRate = sellTrades.length > 0 
      ? (sellTrades.filter(t => t.status === 'Win').length / sellTrades.length) * 100 
      : 0;
    
    // Calculate best and worst trades for this pair
    const bestTrade = Math.max(...pairTrades.map(t => t.profit));
    const worstTrade = Math.min(...pairTrades.map(t => t.profit));
    
    // Calculate average holding time (in hours)
    const holdingTimes = pairTrades.map(trade => {
      const entryDate = new Date(`${trade.date}T${trade.time}`);
      const exitDate = new Date(`${trade.date}T${trade.time}`); // Assuming same day for simplicity
      return (exitDate.getTime() - entryDate.getTime()) / (1000 * 60 * 60);
    });
    
    const averageHoldingTime = holdingTimes.reduce((sum, time) => sum + time, 0) / holdingTimes.length;
    
    // Calculate most profitable timeframe
    const timeframes = [...new Set(pairTrades.filter(t => t.timeframe).map(t => t.timeframe!))];
    let mostProfitableTimeframe = '';
    let highestProfit = -Infinity;
    
    timeframes.forEach(timeframe => {
      const timeframeTrades = pairTrades.filter(t => t.timeframe === timeframe);
      const timeframeProfit = timeframeTrades.reduce((sum, t) => sum + t.profit, 0);
      
      if (timeframeProfit > highestProfit) {
        highestProfit = timeframeProfit;
        mostProfitableTimeframe = timeframe;
      }
    });
    
    // Calculate most common strategy
    const strategies = pairTrades
      .filter(t => t.strategy)
      .map(t => t.strategy!);
    
    const strategyCounts: Record<string, number> = {};
    strategies.forEach(strategy => {
      strategyCounts[strategy] = (strategyCounts[strategy] || 0) + 1;
    });
    
    let mostCommonStrategy = '';
    let highestCount = 0;
    
    Object.entries(strategyCounts).forEach(([strategy, count]) => {
      if (count > highestCount) {
        highestCount = count;
        mostCommonStrategy = strategy;
      }
    });
    
    return {
      pair,
      totalTrades,
      winningTrades,
      losingTrades,
      winRate,
      totalProfit,
      averagePips,
      buyTrades: buyTrades.length,
      sellTrades: sellTrades.length,
      buyWinRate,
      sellWinRate,
      bestTrade,
      worstTrade,
      averageHoldingTime,
      mostProfitableTimeframe,
      mostCommonStrategy
    };
  });
};

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Data state
  const [trades, setTrades] = useState<Trade[]>(initialTrades);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [topPairs, setTopPairs] = useState<PairPerformance[]>(initialTopPairs);
  const [chartData, setChartData] = useState<ChartData>(generateChartData(30));
  const [riskMetrics, setRiskMetrics] = useState<RiskMetrics>(calculateRiskMetrics(initialTrades));
  const [pairStatistics, setPairStatistics] = useState<PairStatistics[]>(calculatePairStatistics(initialTrades));
  
  // UI state
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const [timeRange, setTimeRange] = useState('30');
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeTradeId, setActiveTradeId] = useState<number | null>(null);
  const [sortField, setSortField] = useState<keyof Trade | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  // Calculate dashboard stats
  const [stats, setStats] = useState<DashboardStats>({
    balance: 24562.00,
    profit: 8213.40,
    loss: 3352.80,
    winRate: 68.5,
    balanceChange: 2.5,
    profitChange: 12.3,
    lossChange: -5.1,
    winRateChange: 3.2
  });
  
  // Update chart data when time range changes
  useEffect(() => {
    const days = parseInt(timeRange);
    setChartData(generateChartData(days));
  }, [timeRange]);
  
  // Update risk metrics and pair statistics when trades change
  useEffect(() => {
    const filteredTrades = getFilteredTrades();
    setRiskMetrics(calculateRiskMetrics(filteredTrades));
    setPairStatistics(calculatePairStatistics(filteredTrades));
    
    // Update top pairs based on filtered trades
    const pairPerformance = calculatePairStatistics(filteredTrades);
    const updatedTopPairs = pairPerformance
      .sort((a, b) => b.totalProfit - a.totalProfit)
      .slice(0, 4)
      .map(pair => {
        // Find existing color scheme or assign a new one
        const existingPair = topPairs.find(p => p.pair === pair.pair);
        const colorScheme = existingPair ? existingPair.color : {
          bg: 'bg-indigo-100',
          darkBg: 'dark:bg-indigo-900/30',
          text: 'text-indigo-600',
          darkText: 'dark:text-indigo-400'
        };
        
        return {
          pair: pair.pair,
          code: pair.pair.split('/').map(c => c[0]).join(''),
          trades: pair.totalTrades,
          profit: pair.totalProfit,
          winRate: pair.winRate,
          color: colorScheme
        };
      });
    
    setTopPairs(updatedTopPairs);
    
    // Update dashboard stats
    const winCount = filteredTrades.filter(t => t.status === 'Win').length;
    const winRate = filteredTrades.length > 0 ? (winCount / filteredTrades.length) * 100 : 0;
    
    const totalProfit = filteredTrades
      .filter(t => t.profit > 0)
      .reduce((sum, t) => sum + t.profit, 0);
    
    const totalLoss = Math.abs(
      filteredTrades
        .filter(t => t.profit < 0)
        .reduce((sum, t) => sum + t.profit, 0)
    );
    
    const balance = 20000 + totalProfit - totalLoss; // Starting with base balance of 20000
    
    // Calculate changes (comparing to previous period)
    const previousPeriodDays = parseInt(timeRange) * 2;
    const currentPeriodCutoff = subDays(new Date(), parseInt(timeRange));
    const previousPeriodCutoff = subDays(currentPeriodCutoff, previousPeriodDays);
    
    const previousPeriodTrades = trades.filter(trade => {
      const tradeDate = parseISO(`${trade.date}T${trade.time}`);
      return tradeDate >= previousPeriodCutoff && tradeDate < currentPeriodCutoff;
    });
    
    const previousWinCount = previousPeriodTrades.filter(t => t.status === 'Win').length;
    const previousWinRate = previousPeriodTrades.length > 0 ? (previousWinCount / previousPeriodTrades.length) * 100 : 0;
    
    const previousProfit = previousPeriodTrades
      .filter(t => t.profit > 0)
      .reduce((sum, t) => sum + t.profit, 0);
    
    const previousLoss = Math.abs(
      previousPeriodTrades
        .filter(t => t.profit < 0)
        .reduce((sum, t) => sum + t.profit, 0)
    );
    
    const winRateChange = previousWinRate === 0 ? 0 : ((winRate - previousWinRate) / previousWinRate) * 100;
    const profitChange = previousProfit === 0 ? 0 : ((totalProfit - previousProfit) / previousProfit) * 100;
    const lossChange = previousLoss === 0 ? 0 : ((totalLoss - previousLoss) / previousLoss) * 100;
    const balanceChange = (totalProfit - totalLoss) - (previousProfit - previousLoss);
    
    setStats({
      balance,
      profit: totalProfit,
      loss: totalLoss,
      winRate,
      balanceChange: balanceChange > 0 ? 2.5 : -1.5, // Simplified for demo
      profitChange: profitChange || 0,
      lossChange: lossChange || 0,
      winRateChange: winRateChange || 0
    });
    
  }, [trades, timeRange]);
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
    setDarkMode(!darkMode);
  };
  
  // Toggle notifications panel
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };
  
  // Mark all notifications as read
  const markAllNotificationsAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };
  
  // Add a new trade
  const addTrade = (trade: Omit<Trade, 'id' | 'status'>) => {
    const newTrade: Trade = {
      ...trade,
      id: Math.max(...trades.map(t => t.id), 0) + 1,
      status: trade.profit > 0 ? 'Win' : 'Loss'
    };
    
    setTrades([newTrade, ...trades]);
    
    // Add notification for new trade
    const newNotification: Notification = {
      id: Math.max(...notifications.map(n => n.id), 0) + 1,
      read: false,
      message: `New ${newTrade.status === 'Win' ? 'winning' : 'losing'} trade added for ${newTrade.pair}`,
      time: 'Just now'
    };
    
    setNotifications([newNotification, ...notifications]);
  };
  
  // Delete a trade
  const deleteTrade = (id: number) => {
    setTrades(trades.filter(t => t.id !== id));
    
    // Add notification for deleted trade
    const newNotification: Notification = {
      id: Math.max(...notifications.map(n => n.id), 0) + 1,
      read: false,
      message: `Trade #${id} has been deleted`,
      time: 'Just now'
    };
    
    setNotifications([newNotification, ...notifications]);
  };
  
  // Sort trades
  const sortTrades = (field: keyof Trade) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    
    const sortedTrades = [...trades].sort((a, b) => {
      if (a[field] < b[field]) return sortDirection === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    
    setTrades(sortedTrades);
  };
  
  // Get filtered trades based on time range
  const getFilteredTrades = () => {
    if (timeRange === 'all') return trades;
    
    const days = parseInt(timeRange);
    const cutoffDate = subDays(new Date(), days);
    
    return trades.filter(trade => {
      const tradeDate = parseISO(`${trade.date}T${trade.time}`);
      return tradeDate >= cutoffDate;
    });
  };
  
  // Get filtered chart data based on time range
  const getFilteredChartData = () => {
    // For demo purposes, we're using the generated chart data
    // In a real app, this would calculate chart data from actual trades
    return chartData;
  };
  
  // Get filtered risk metrics based on time range
  const getFilteredRiskMetrics = () => {
    const filteredTrades = getFilteredTrades();
    return calculateRiskMetrics(filteredTrades);
  };
  
  // Get filtered pair statistics based on time range
  const getFilteredPairStatistics = () => {
    const filteredTrades = getFilteredTrades();
    return calculatePairStatistics(filteredTrades);
  };
  
  const value = {
    // Data
    trades,
    notifications,
    topPairs,
    stats,
    chartData,
    riskMetrics,
    pairStatistics,
    
    // UI State
    darkMode,
    timeRange,
    showNotifications,
    activeTradeId,
    
    // Actions
    setTrades,
    setTimeRange,
    toggleDarkMode,
    toggleNotifications,
    markAllNotificationsAsRead,
    setActiveTradeId,
    addTrade,
    deleteTrade,
    sortTrades,
    getFilteredTrades,
    getFilteredChartData,
    getFilteredRiskMetrics,
    getFilteredPairStatistics
  };
  
  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
