export interface Trade {
  id: number;
  pair: string;
  type: 'Buy' | 'Sell';
  entryPrice: number;
  exitPrice: number;
  profit: number;
  date: string;
  time: string;
  status: 'Win' | 'Loss';
  lotSize?: number;
  pips?: number;
  risk?: number;
  reward?: number;
  strategy?: string;
  notes?: string;
  takeProfit?: number;
  stopLoss?: number;
  timeframe?: string;
  tags?: string[];
  mood?: string;
  screenshots?: {
    url: string;
    caption: string;
  }[];
}

export interface Notification {
  id: number;
  read: boolean;
  message: string;
  time: string;
}

export interface PairPerformance {
  pair: string;
  code: string;
  trades: number;
  profit: number;
  winRate: number;
  color: {
    bg: string;
    darkBg: string;
    text: string;
    darkText: string;
  };
}

export interface DashboardStats {
  balance: number;
  profit: number;
  loss: number;
  winRate: number;
  balanceChange: number;
  profitChange: number;
  lossChange: number;
  winRateChange: number;
}

export interface ChartData {
  dates: string[];
  dailyProfitData: number[];
  cumulativeProfitData: number[];
}

export interface RiskMetrics {
  averageRiskRewardRatio: number;
  averageRiskPerTrade: number;
  winRate: number;
  profitFactor: number;
  expectancy: number;
  maxDrawdown: number;
  sharpeRatio: number;
  consecutiveWins: number;
  consecutiveLosses: number;
  bestTrade: number;
  worstTrade: number;
  averageWin: number;
  averageLoss: number;
  riskDistribution: {
    low: number;
    medium: number;
    high: number;
  };
  timeframePerformance: Record<string, { winRate: number, profitFactor: number }>;
}

export interface PairStatistics {
  pair: string;
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  winRate: number;
  totalProfit: number;
  averagePips: number;
  buyTrades: number;
  sellTrades: number;
  buyWinRate: number;
  sellWinRate: number;
  bestTrade: number;
  worstTrade: number;
  averageHoldingTime: number;
  mostProfitableTimeframe: string;
  mostCommonStrategy: string;
}
