// Mock Data for PolitiTrades Development
// Realistic sample data for politicians, trades, tickers, and news

export type Party = "Democrat" | "Republican" | "Independent";
export type Chamber = "House" | "Senate";
export type TradeType = "buy" | "sell";

export interface MockPolitician {
  id: string;
  name: string;
  shortName: string;
  initials: string;
  party: Party;
  chamber: Chamber;
  state: string;
  position?: string;
  photoUrl?: string;
  totalTrades: number;
  avgReturn: number;
  winRate: number;
  totalValue: number;
  topSector: string;
}

export interface MockTrade {
  id: string;
  politicianId: string;
  politician: MockPolitician;
  ticker: string;
  companyName: string;
  type: TradeType;
  amountMin: number;
  amountMax: number;
  transactionDate: Date;
  filingDate: Date;
  sector: string;
  returnSinceFiling: number;
  priceAtTrade?: number;
  currentPrice?: number;
  sourceUrl: string;
  sourceType: "form4" | "ptr";
}

export interface MockTicker {
  symbol: string;
  companyName: string;
  price: number;
  change: number;
  changePercent: number;
  sparklineData: number[];
  sector: string;
  marketCap?: string;
}

export interface MockNewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  publishedAt: Date;
  relatedTickers: string[];
  relatedPoliticians: string[];
  imageUrl?: string;
  url: string;
}

// ============================================
// MOCK POLITICIANS
// ============================================

export const MOCK_POLITICIANS: MockPolitician[] = [
  {
    id: "np-001",
    name: "Nancy Pelosi",
    shortName: "N. Pelosi",
    initials: "NP",
    party: "Democrat",
    chamber: "House",
    state: "CA",
    position: "Speaker Emerita",
    totalTrades: 147,
    avgReturn: 18.4,
    winRate: 72,
    totalValue: 24500000,
    topSector: "Technology",
  },
  {
    id: "dc-001",
    name: "Dan Crenshaw",
    shortName: "D. Crenshaw",
    initials: "DC",
    party: "Republican",
    chamber: "House",
    state: "TX",
    totalTrades: 89,
    avgReturn: 12.1,
    winRate: 65,
    totalValue: 8200000,
    topSector: "Energy",
  },
  {
    id: "mm-001",
    name: "Mitch McConnell",
    shortName: "M. McConnell",
    initials: "MM",
    party: "Republican",
    chamber: "Senate",
    state: "KY",
    position: "Senate Minority Leader",
    totalTrades: 52,
    avgReturn: 9.8,
    winRate: 58,
    totalValue: 12400000,
    topSector: "Finance",
  },
  {
    id: "cs-001",
    name: "Chuck Schumer",
    shortName: "C. Schumer",
    initials: "CS",
    party: "Democrat",
    chamber: "Senate",
    state: "NY",
    position: "Senate Majority Leader",
    totalTrades: 34,
    avgReturn: 7.2,
    winRate: 55,
    totalValue: 5800000,
    topSector: "Finance",
  },
  {
    id: "tk-001",
    name: "Tommy Tuberville",
    shortName: "T. Tuberville",
    initials: "TT",
    party: "Republican",
    chamber: "Senate",
    state: "AL",
    totalTrades: 132,
    avgReturn: 15.6,
    winRate: 68,
    totalValue: 19200000,
    topSector: "Defense",
  },
  {
    id: "mq-001",
    name: "Michael McCaul",
    shortName: "M. McCaul",
    initials: "MC",
    party: "Republican",
    chamber: "House",
    state: "TX",
    totalTrades: 78,
    avgReturn: 11.3,
    winRate: 62,
    totalValue: 15600000,
    topSector: "Technology",
  },
  {
    id: "jt-001",
    name: "Josh Gottheimer",
    shortName: "J. Gottheimer",
    initials: "JG",
    party: "Democrat",
    chamber: "House",
    state: "NJ",
    totalTrades: 95,
    avgReturn: 14.2,
    winRate: 70,
    totalValue: 11300000,
    topSector: "Technology",
  },
  {
    id: "mg-001",
    name: "Marjorie Taylor Greene",
    shortName: "M. Greene",
    initials: "MG",
    party: "Republican",
    chamber: "House",
    state: "GA",
    totalTrades: 43,
    avgReturn: 8.9,
    winRate: 54,
    totalValue: 3200000,
    topSector: "Energy",
  },
  {
    id: "rk-001",
    name: "Ro Khanna",
    shortName: "R. Khanna",
    initials: "RK",
    party: "Democrat",
    chamber: "House",
    state: "CA",
    totalTrades: 28,
    avgReturn: 16.8,
    winRate: 75,
    totalValue: 8900000,
    topSector: "Technology",
  },
  {
    id: "mw-001",
    name: "Mark Warner",
    shortName: "M. Warner",
    initials: "MW",
    party: "Democrat",
    chamber: "Senate",
    state: "VA",
    totalTrades: 67,
    avgReturn: 13.4,
    winRate: 66,
    totalValue: 21500000,
    topSector: "Technology",
  },
  {
    id: "pp-001",
    name: "Paul Pelosi",
    shortName: "P. Pelosi",
    initials: "PP",
    party: "Democrat",
    chamber: "House",
    state: "CA",
    position: "Spouse Filing",
    totalTrades: 112,
    avgReturn: 21.2,
    winRate: 78,
    totalValue: 32000000,
    topSector: "Technology",
  },
  {
    id: "tc-001",
    name: "Ted Cruz",
    shortName: "T. Cruz",
    initials: "TC",
    party: "Republican",
    chamber: "Senate",
    state: "TX",
    totalTrades: 24,
    avgReturn: 6.5,
    winRate: 52,
    totalValue: 2100000,
    topSector: "Energy",
  },
];

// ============================================
// MOCK TICKERS
// ============================================

export const MOCK_TICKERS: MockTicker[] = [
  {
    symbol: "NVDA",
    companyName: "NVIDIA Corporation",
    price: 875.32,
    change: 12.45,
    changePercent: 1.44,
    sparklineData: [820, 835, 850, 840, 860, 870, 875],
    sector: "Technology",
    marketCap: "$2.1T",
  },
  {
    symbol: "AAPL",
    companyName: "Apple Inc.",
    price: 182.52,
    change: -2.18,
    changePercent: -1.18,
    sparklineData: [188, 186, 184, 183, 181, 180, 182],
    sector: "Technology",
    marketCap: "$2.8T",
  },
  {
    symbol: "MSFT",
    companyName: "Microsoft Corporation",
    price: 415.26,
    change: 5.32,
    changePercent: 1.3,
    sparklineData: [400, 405, 408, 410, 412, 414, 415],
    sector: "Technology",
    marketCap: "$3.1T",
  },
  {
    symbol: "GOOGL",
    companyName: "Alphabet Inc.",
    price: 141.8,
    change: 1.92,
    changePercent: 1.37,
    sparklineData: [135, 137, 138, 140, 139, 141, 142],
    sector: "Technology",
    marketCap: "$1.8T",
  },
  {
    symbol: "AMZN",
    companyName: "Amazon.com Inc.",
    price: 178.25,
    change: 3.45,
    changePercent: 1.97,
    sparklineData: [168, 170, 172, 175, 176, 177, 178],
    sector: "Consumer",
    marketCap: "$1.9T",
  },
  {
    symbol: "TSLA",
    companyName: "Tesla Inc.",
    price: 248.42,
    change: -8.56,
    changePercent: -3.33,
    sparklineData: [265, 260, 255, 252, 250, 249, 248],
    sector: "Automotive",
    marketCap: "$790B",
  },
  {
    symbol: "META",
    companyName: "Meta Platforms Inc.",
    price: 505.68,
    change: 8.24,
    changePercent: 1.66,
    sparklineData: [480, 485, 490, 495, 500, 503, 506],
    sector: "Technology",
    marketCap: "$1.3T",
  },
  {
    symbol: "JPM",
    companyName: "JPMorgan Chase & Co.",
    price: 198.45,
    change: 2.12,
    changePercent: 1.08,
    sparklineData: [190, 192, 194, 195, 196, 197, 198],
    sector: "Finance",
    marketCap: "$570B",
  },
  {
    symbol: "XOM",
    companyName: "Exxon Mobil Corporation",
    price: 112.34,
    change: -1.28,
    changePercent: -1.13,
    sparklineData: [115, 114, 113, 112, 113, 112, 112],
    sector: "Energy",
    marketCap: "$450B",
  },
  {
    symbol: "LMT",
    companyName: "Lockheed Martin Corp.",
    price: 456.78,
    change: 4.56,
    changePercent: 1.01,
    sparklineData: [445, 448, 450, 452, 454, 455, 457],
    sector: "Defense",
    marketCap: "$110B",
  },
  {
    symbol: "RTX",
    companyName: "RTX Corporation",
    price: 98.24,
    change: 1.12,
    changePercent: 1.15,
    sparklineData: [94, 95, 96, 97, 97, 98, 98],
    sector: "Defense",
    marketCap: "$145B",
  },
  {
    symbol: "PFE",
    companyName: "Pfizer Inc.",
    price: 28.45,
    change: -0.32,
    changePercent: -1.11,
    sparklineData: [29, 29, 28, 28, 28, 28, 28],
    sector: "Healthcare",
    marketCap: "$160B",
  },
  {
    symbol: "BAC",
    companyName: "Bank of America Corp.",
    price: 37.82,
    change: 0.45,
    changePercent: 1.2,
    sparklineData: [36, 36, 37, 37, 37, 38, 38],
    sector: "Finance",
    marketCap: "$295B",
  },
  {
    symbol: "DIS",
    companyName: "Walt Disney Company",
    price: 112.56,
    change: 2.34,
    changePercent: 2.12,
    sparklineData: [105, 107, 108, 110, 111, 112, 113],
    sector: "Entertainment",
    marketCap: "$205B",
  },
  {
    symbol: "AMD",
    companyName: "Advanced Micro Devices",
    price: 156.78,
    change: 4.56,
    changePercent: 2.99,
    sparklineData: [145, 148, 150, 152, 154, 155, 157],
    sector: "Technology",
    marketCap: "$253B",
  },
  {
    symbol: "CRM",
    companyName: "Salesforce Inc.",
    price: 272.34,
    change: -3.45,
    changePercent: -1.25,
    sparklineData: [280, 278, 276, 275, 274, 273, 272],
    sector: "Technology",
    marketCap: "$264B",
  },
  {
    symbol: "COIN",
    companyName: "Coinbase Global Inc.",
    price: 225.67,
    change: 12.34,
    changePercent: 5.78,
    sparklineData: [200, 205, 210, 215, 218, 222, 226],
    sector: "Finance",
    marketCap: "$54B",
  },
  {
    symbol: "PLTR",
    companyName: "Palantir Technologies",
    price: 24.56,
    change: 0.89,
    changePercent: 3.76,
    sparklineData: [22, 22, 23, 23, 24, 24, 25],
    sector: "Technology",
    marketCap: "$54B",
  },
  {
    symbol: "CVX",
    companyName: "Chevron Corporation",
    price: 156.78,
    change: -2.12,
    changePercent: -1.33,
    sparklineData: [160, 159, 158, 157, 157, 157, 157],
    sector: "Energy",
    marketCap: "$290B",
  },
  {
    symbol: "V",
    companyName: "Visa Inc.",
    price: 278.45,
    change: 3.21,
    changePercent: 1.17,
    sparklineData: [270, 272, 274, 275, 276, 277, 278],
    sector: "Finance",
    marketCap: "$560B",
  },
];

// Helper to get ticker by symbol
export function getTickerBySymbol(symbol: string): MockTicker | undefined {
  return MOCK_TICKERS.find((t) => t.symbol === symbol);
}

// ============================================
// MOCK TRADES
// ============================================

function createTrade(
  id: string,
  politicianId: string,
  ticker: string,
  type: TradeType,
  amountMin: number,
  amountMax: number,
  daysAgo: number,
  filingDaysAfter: number,
  returnPercent: number,
  sourceType: "form4" | "ptr" = "form4"
): MockTrade {
  const politician = MOCK_POLITICIANS.find((p) => p.id === politicianId)!;
  const tickerData = getTickerBySymbol(ticker);
  const transactionDate = new Date();
  transactionDate.setDate(transactionDate.getDate() - daysAgo);
  const filingDate = new Date(transactionDate);
  filingDate.setDate(filingDate.getDate() + filingDaysAfter);

  return {
    id,
    politicianId,
    politician,
    ticker,
    companyName: tickerData?.companyName || ticker,
    type,
    amountMin,
    amountMax,
    transactionDate,
    filingDate,
    sector: tickerData?.sector || "Unknown",
    returnSinceFiling: returnPercent,
    currentPrice: tickerData?.price,
    sourceUrl: `https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&filenum=${id}`,
    sourceType,
  };
}

export const MOCK_TRADES: MockTrade[] = [
  // Recent trades (today/yesterday)
  createTrade("t-001", "np-001", "NVDA", "buy", 1000001, 5000000, 0, 1, 12.4),
  createTrade("t-002", "dc-001", "XOM", "sell", 15001, 50000, 0, 1, -2.1),
  createTrade("t-003", "tk-001", "LMT", "buy", 50001, 100000, 0, 2, 8.5),
  createTrade("t-004", "pp-001", "AAPL", "buy", 500001, 1000000, 1, 1, 5.2),
  createTrade("t-005", "mq-001", "MSFT", "buy", 100001, 250000, 1, 2, 6.8),

  // This week
  createTrade("t-006", "mm-001", "JPM", "buy", 250001, 500000, 2, 1, 4.2),
  createTrade("t-007", "jt-001", "GOOGL", "buy", 100001, 250000, 2, 2, 7.3),
  createTrade("t-008", "np-001", "META", "buy", 500001, 1000000, 3, 1, 9.8),
  createTrade("t-009", "rk-001", "AMD", "buy", 50001, 100000, 3, 2, 15.2),
  createTrade("t-010", "tc-001", "CVX", "sell", 15001, 50000, 4, 1, -3.4),
  createTrade("t-011", "mw-001", "CRM", "buy", 100001, 250000, 4, 2, -1.2),
  createTrade("t-012", "tk-001", "RTX", "buy", 250001, 500000, 5, 1, 5.6),
  createTrade("t-013", "mg-001", "XOM", "buy", 15001, 50000, 5, 2, 2.3),
  createTrade("t-014", "cs-001", "BAC", "buy", 50001, 100000, 6, 1, 3.8),

  // Last week
  createTrade("t-015", "np-001", "TSLA", "sell", 1000001, 5000000, 8, 2, 8.2),
  createTrade("t-016", "dc-001", "LMT", "buy", 100001, 250000, 9, 1, 11.4),
  createTrade("t-017", "pp-001", "NVDA", "buy", 1000001, 5000000, 10, 2, 18.6),
  createTrade("t-018", "jt-001", "AMZN", "buy", 250001, 500000, 11, 1, 7.9),
  createTrade("t-019", "mq-001", "PLTR", "buy", 50001, 100000, 12, 2, 22.4),
  createTrade("t-020", "tk-001", "DIS", "buy", 100001, 250000, 13, 1, 4.5),

  // Two weeks ago
  createTrade("t-021", "mm-001", "V", "buy", 500001, 1000000, 15, 2, 6.2),
  createTrade("t-022", "rk-001", "GOOGL", "buy", 100001, 250000, 16, 1, 12.8),
  createTrade("t-023", "np-001", "COIN", "buy", 250001, 500000, 17, 2, 28.5),
  createTrade("t-024", "tc-001", "XOM", "buy", 50001, 100000, 18, 1, -1.8),
  createTrade("t-025", "mw-001", "MSFT", "buy", 250001, 500000, 19, 2, 8.4),

  // This month
  createTrade("t-026", "cs-001", "JPM", "buy", 100001, 250000, 22, 1, 5.6),
  createTrade("t-027", "mg-001", "TSLA", "buy", 15001, 50000, 23, 2, -8.2),
  createTrade("t-028", "dc-001", "RTX", "buy", 250001, 500000, 24, 1, 9.3),
  createTrade("t-029", "pp-001", "META", "buy", 500001, 1000000, 25, 2, 14.7),
  createTrade("t-030", "jt-001", "AMD", "buy", 100001, 250000, 26, 1, 18.2),

  // Last month
  createTrade("t-031", "np-001", "AAPL", "buy", 1000001, 5000000, 35, 2, 4.8),
  createTrade("t-032", "tk-001", "LMT", "buy", 500001, 1000000, 38, 1, 12.1),
  createTrade("t-033", "mq-001", "NVDA", "buy", 250001, 500000, 40, 2, 24.6),
  createTrade("t-034", "mm-001", "BAC", "buy", 100001, 250000, 42, 1, 8.9),
  createTrade("t-035", "rk-001", "CRM", "sell", 50001, 100000, 45, 2, 6.2),

  // Older trades
  createTrade("t-036", "pp-001", "GOOGL", "buy", 500001, 1000000, 50, 2, 15.4),
  createTrade("t-037", "dc-001", "CVX", "buy", 100001, 250000, 55, 1, 3.2),
  createTrade("t-038", "np-001", "DIS", "sell", 250001, 500000, 60, 2, -4.5),
  createTrade("t-039", "cs-001", "V", "buy", 100001, 250000, 65, 1, 7.8),
  createTrade("t-040", "tk-001", "PLTR", "buy", 250001, 500000, 70, 2, 32.1),

  // More variety
  createTrade("t-041", "mw-001", "AMZN", "buy", 250001, 500000, 75, 1, 11.2),
  createTrade("t-042", "jt-001", "PFE", "sell", 50001, 100000, 80, 2, -8.4),
  createTrade("t-043", "mg-001", "RTX", "buy", 15001, 50000, 85, 1, 6.7),
  createTrade("t-044", "tc-001", "LMT", "buy", 100001, 250000, 90, 2, 14.3),
  createTrade("t-045", "np-001", "MSFT", "buy", 500001, 1000000, 95, 1, 9.6),
  createTrade("t-046", "pp-001", "TSLA", "buy", 1000001, 5000000, 100, 2, -12.4),
  createTrade("t-047", "dc-001", "AMD", "buy", 100001, 250000, 105, 1, 21.8),
  createTrade("t-048", "tk-001", "COIN", "buy", 250001, 500000, 110, 2, 45.2),
  createTrade("t-049", "mq-001", "META", "buy", 100001, 250000, 115, 1, 16.9),
  createTrade("t-050", "rk-001", "NVDA", "buy", 250001, 500000, 120, 2, 38.4),
];

// ============================================
// MOCK NEWS
// ============================================

export const MOCK_NEWS: MockNewsItem[] = [
  {
    id: "n-001",
    title: "Congress Trading Ban Bill Advances to Senate Floor",
    summary:
      "Bipartisan legislation that would ban members of Congress from trading individual stocks has cleared a key committee hurdle.",
    source: "Reuters",
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    relatedTickers: [],
    relatedPoliticians: ["np-001", "mm-001", "cs-001"],
    url: "https://reuters.com/article/congress-trading-ban",
  },
  {
    id: "n-002",
    title: "Pelosi's NVIDIA Options Net $2M Gain Amid AI Boom",
    summary:
      "Paul Pelosi's call options on NVIDIA have yielded significant returns as the chipmaker's stock surges on AI demand.",
    source: "Bloomberg",
    publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    relatedTickers: ["NVDA"],
    relatedPoliticians: ["np-001", "pp-001"],
    url: "https://bloomberg.com/article/pelosi-nvidia",
  },
  {
    id: "n-003",
    title: "Defense Stocks Rise on Pentagon Budget Increase",
    summary:
      "Lockheed Martin and RTX shares climb after Congress approves $886B defense budget, matching recent insider buying.",
    source: "WSJ",
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    relatedTickers: ["LMT", "RTX"],
    relatedPoliticians: ["tk-001", "dc-001"],
    url: "https://wsj.com/article/defense-stocks",
  },
  {
    id: "n-004",
    title: "Tuberville Under Scrutiny for Defense Stock Trades",
    summary:
      "Senator faces ethics questions after series of defense contractor stock purchases ahead of committee votes.",
    source: "Politico",
    publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    relatedTickers: ["LMT", "RTX"],
    relatedPoliticians: ["tk-001"],
    url: "https://politico.com/article/tuberville-trades",
  },
  {
    id: "n-005",
    title: "Tech Giants Rally as Rate Cut Hopes Boost Growth Stocks",
    summary:
      "Apple, Microsoft, and Meta all gain as investors anticipate Federal Reserve rate cuts in coming months.",
    source: "CNBC",
    publishedAt: new Date(Date.now() - 28 * 60 * 60 * 1000), // 28 hours ago
    relatedTickers: ["AAPL", "MSFT", "META", "GOOGL"],
    relatedPoliticians: [],
    url: "https://cnbc.com/article/tech-rally",
  },
  {
    id: "n-006",
    title: "SEC Proposes Stricter Reporting Rules for Congressional Trades",
    summary:
      "New proposal would require lawmakers to report stock transactions within 48 hours instead of 45 days.",
    source: "Reuters",
    publishedAt: new Date(Date.now() - 48 * 60 * 60 * 1000), // 2 days ago
    relatedTickers: [],
    relatedPoliticians: [],
    url: "https://reuters.com/article/sec-congress-rules",
  },
  {
    id: "n-007",
    title: "Energy Sector Sees Mixed Trading from Congress Members",
    summary:
      "While some lawmakers sell oil stocks, others accumulate positions in renewable energy companies.",
    source: "Bloomberg",
    publishedAt: new Date(Date.now() - 72 * 60 * 60 * 1000), // 3 days ago
    relatedTickers: ["XOM", "CVX"],
    relatedPoliticians: ["dc-001", "tc-001", "mg-001"],
    url: "https://bloomberg.com/article/energy-trades",
  },
  {
    id: "n-008",
    title: "AI Chip Stocks Dominate Congressional Portfolio Additions",
    summary:
      "NVIDIA and AMD top the list of most-purchased stocks by lawmakers in Q4 2024.",
    source: "MarketWatch",
    publishedAt: new Date(Date.now() - 96 * 60 * 60 * 1000), // 4 days ago
    relatedTickers: ["NVDA", "AMD"],
    relatedPoliticians: ["np-001", "pp-001", "rk-001", "mq-001"],
    url: "https://marketwatch.com/article/ai-congress",
  },
  {
    id: "n-009",
    title: "Bipartisan Bill Would Require Blind Trusts for Lawmakers",
    summary:
      "New legislation would force all Congress members to place investments in blind trusts.",
    source: "The Hill",
    publishedAt: new Date(Date.now() - 120 * 60 * 60 * 1000), // 5 days ago
    relatedTickers: [],
    relatedPoliticians: ["cs-001", "mm-001"],
    url: "https://thehill.com/article/blind-trusts",
  },
  {
    id: "n-010",
    title: "Meta Stock Jumps After Multiple Congressional Purchases",
    summary:
      "Several lawmakers disclosed META stock purchases days before positive earnings report.",
    source: "Business Insider",
    publishedAt: new Date(Date.now() - 168 * 60 * 60 * 1000), // 7 days ago
    relatedTickers: ["META"],
    relatedPoliticians: ["np-001", "pp-001", "mq-001"],
    url: "https://businessinsider.com/article/meta-congress",
  },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getRecentTrades(limit: number = 10): MockTrade[] {
  return [...MOCK_TRADES]
    .sort((a, b) => b.filingDate.getTime() - a.filingDate.getTime())
    .slice(0, limit);
}

export function getTodaysTrades(): MockTrade[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return MOCK_TRADES.filter((t) => {
    const tradeDate = new Date(t.filingDate);
    tradeDate.setHours(0, 0, 0, 0);
    return tradeDate.getTime() === today.getTime();
  });
}

export function getThisWeekTrades(): MockTrade[] {
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  return MOCK_TRADES.filter((t) => t.filingDate >= weekAgo).sort(
    (a, b) => b.filingDate.getTime() - a.filingDate.getTime()
  );
}

export function getTradesByPolitician(politicianId: string): MockTrade[] {
  return MOCK_TRADES.filter((t) => t.politicianId === politicianId).sort(
    (a, b) => b.filingDate.getTime() - a.filingDate.getTime()
  );
}

export function getTradesByTicker(ticker: string): MockTrade[] {
  return MOCK_TRADES.filter((t) => t.ticker === ticker).sort(
    (a, b) => b.filingDate.getTime() - a.filingDate.getTime()
  );
}

export function getTopMovers(limit: number = 5): MockPolitician[] {
  return [...MOCK_POLITICIANS]
    .sort((a, b) => b.avgReturn - a.avgReturn)
    .slice(0, limit);
}

export function getMostActivePoliticians(limit: number = 5): MockPolitician[] {
  return [...MOCK_POLITICIANS]
    .sort((a, b) => b.totalTrades - a.totalTrades)
    .slice(0, limit);
}

export function searchPoliticians(query: string): MockPolitician[] {
  const lowerQuery = query.toLowerCase();
  return MOCK_POLITICIANS.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.shortName.toLowerCase().includes(lowerQuery) ||
      p.state.toLowerCase().includes(lowerQuery) ||
      p.party.toLowerCase().includes(lowerQuery)
  );
}

export function searchTickers(query: string): MockTicker[] {
  const lowerQuery = query.toLowerCase();
  return MOCK_TICKERS.filter(
    (t) =>
      t.symbol.toLowerCase().includes(lowerQuery) ||
      t.companyName.toLowerCase().includes(lowerQuery) ||
      t.sector.toLowerCase().includes(lowerQuery)
  );
}

export function searchNews(query: string): MockNewsItem[] {
  const lowerQuery = query.toLowerCase();
  return MOCK_NEWS.filter(
    (n) =>
      n.title.toLowerCase().includes(lowerQuery) ||
      n.summary.toLowerCase().includes(lowerQuery) ||
      n.source.toLowerCase().includes(lowerQuery)
  );
}

export function getPoliticianById(id: string): MockPolitician | undefined {
  return MOCK_POLITICIANS.find((p) => p.id === id);
}

export function getTradeById(id: string): MockTrade | undefined {
  return MOCK_TRADES.find((t) => t.id === id);
}

export function getNewsById(id: string): MockNewsItem | undefined {
  return MOCK_NEWS.find((n) => n.id === id);
}

export function getRecentNews(limit: number = 5): MockNewsItem[] {
  return [...MOCK_NEWS]
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
    .slice(0, limit);
}

export function getNewsByPolitician(politicianId: string): MockNewsItem[] {
  return MOCK_NEWS.filter((n) =>
    n.relatedPoliticians.includes(politicianId)
  ).sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
}

export function getNewsByTicker(ticker: string): MockNewsItem[] {
  return MOCK_NEWS.filter((n) => n.relatedTickers.includes(ticker)).sort(
    (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime()
  );
}

// Stats helpers
export function getTodayStats() {
  const todayTrades = getTodaysTrades();
  const totalVolume = todayTrades.reduce(
    (sum, t) => sum + (t.amountMin + t.amountMax) / 2,
    0
  );
  const uniquePoliticians = new Set(todayTrades.map((t) => t.politicianId))
    .size;

  return {
    totalTrades: todayTrades.length,
    totalVolume,
    activePoliticians: uniquePoliticians,
    buys: todayTrades.filter((t) => t.type === "buy").length,
    sells: todayTrades.filter((t) => t.type === "sell").length,
  };
}

function getYesterdaysTrades(): MockTrade[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  return MOCK_TRADES.filter((t) => {
    const tradeDate = new Date(t.filingDate);
    tradeDate.setHours(0, 0, 0, 0);
    return tradeDate.getTime() === yesterday.getTime();
  });
}

export function getTodayStatsWithTrends() {
  const todayTrades = getTodaysTrades();
  const yesterdayTrades = getYesterdaysTrades();

  const todayVolume = todayTrades.reduce(
    (sum, t) => sum + (t.amountMin + t.amountMax) / 2,
    0
  );
  const yesterdayVolume = yesterdayTrades.reduce(
    (sum, t) => sum + (t.amountMin + t.amountMax) / 2,
    0
  );

  const todayPoliticians = new Set(todayTrades.map((t) => t.politicianId)).size;
  const yesterdayPoliticians = new Set(
    yesterdayTrades.map((t) => t.politicianId)
  ).size;

  const calculateTrend = (today: number, yesterday: number) => {
    if (yesterday === 0) return { change: today > 0 ? 100 : 0, direction: today > 0 ? "up" : "neutral" as const };
    const change = ((today - yesterday) / yesterday) * 100;
    const direction = change > 0 ? "up" : change < 0 ? "down" : "neutral";
    return { change: Math.abs(change), direction: direction as "up" | "down" | "neutral" };
  };

  const tradesTrend = calculateTrend(
    todayTrades.length,
    yesterdayTrades.length
  );
  const volumeTrend = calculateTrend(todayVolume, yesterdayVolume);
  const politiciansTrend = calculateTrend(
    todayPoliticians,
    yesterdayPoliticians
  );

  return {
    totalTrades: todayTrades.length,
    totalVolume: todayVolume,
    activePoliticians: todayPoliticians,
    trends: {
      trades: tradesTrend,
      volume: volumeTrend,
      politicians: politiciansTrend,
    },
  };
}

export function getThisWeekStats() {
  const weekTrades = getThisWeekTrades();
  const totalVolume = weekTrades.reduce(
    (sum, t) => sum + (t.amountMin + t.amountMax) / 2,
    0
  );
  const uniquePoliticians = new Set(weekTrades.map((t) => t.politicianId)).size;

  return {
    tradesCount: weekTrades.length,
    totalVolume,
    uniquePoliticians,
    buys: weekTrades.filter((t) => t.type === "buy").length,
    sells: weekTrades.filter((t) => t.type === "sell").length,
  };
}

// Get related trades (same ticker, excluding current)
export function getRelatedTrades(tradeId: string, limit: number = 5): MockTrade[] {
  const trade = getTradeById(tradeId);
  if (!trade) return [];

  return MOCK_TRADES
    .filter((t) => t.ticker === trade.ticker && t.id !== tradeId)
    .sort((a, b) => b.filingDate.getTime() - a.filingDate.getTime())
    .slice(0, limit);
}

// ============================================
// COMPATIBILITY EXPORTS (for screen components)
// ============================================

// Export arrays with simpler names
export const mockPoliticians = MOCK_POLITICIANS.map((p) => ({
  ...p,
  // Add screen-compatible properties
  role: p.position || `${p.chamber} - ${p.state}`,
  party: p.party === "Democrat" ? "D" : p.party === "Republican" ? "R" : "I",
  imageUrl: p.photoUrl,
  stats: {
    totalTrades: p.totalTrades,
    avgReturn: p.avgReturn,
    winRate: p.winRate,
    totalValue: p.totalValue,
    topSector: p.topSector,
    tradingStyle: p.avgReturn > 15 ? "aggressive" : p.avgReturn > 10 ? "moderate" : "conservative",
    recentTrades: MOCK_TRADES.filter((t) => t.politicianId === p.id).slice(0, 5).length,
  },
}));

export const mockTrades = MOCK_TRADES.map((t) => ({
  ...t,
  // Add screen-compatible properties
  id: t.id,
  politicianName: t.politician.name,
  politicianParty: t.politician.party === "Democrat" ? "D" : t.politician.party === "Republican" ? "R" : "I",
  politicianImageUrl: t.politician.photoUrl,
  ticker: t.ticker,
  companyName: t.companyName,
  tradeType: t.type,
  amount: `$${(t.amountMin / 1000).toFixed(0)}K-$${(t.amountMax / 1000).toFixed(0)}K`,
  estimatedValue: (t.amountMin + t.amountMax) / 2,
  filedAt: t.filingDate.toISOString(),
  tradedAt: t.transactionDate.toISOString(),
  returnSinceFiling: t.returnSinceFiling,
}));

export const mockTickers = MOCK_TICKERS.map((t) => ({
  ...t,
  // Add screen-compatible properties
  name: t.companyName,
  sparklineData: t.sparklineData,
}));

export const mockNews = MOCK_NEWS;
