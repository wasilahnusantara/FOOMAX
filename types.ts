
export interface Recipe {
  recipeName: string;
  description: string;
  prepTime: string;
  cookTime:string;
  servings: string;
  ingredients: string[];
  instructions: string[];
}

export interface DashboardData {
  popularDishes: string[];
  trendingIngredients: string[];
  financials: {
      grossSales: string;
      netPayout: string; // 94.5%
      marketingCost: string; // 5.5%
      totalTransactions: number;
  }
}

// Auth Types - Added 'runner' back
export type UserRole = 'member' | 'marketer' | 'merchant' | 'admin' | 'territory' | 'leader' | 'runner';

export interface User {
    name: string;
    email: string;
    role: UserRole;
}

// Marketer (Ex-Runner) Types - Akad: Ju'alah
export interface MarketingCampaign {
  id: string;
  dishName: string;
  restaurant: string;
  commissionRate: string; // "3.0%"
  potentialEarning: string;
  clicks: number;
  conversions: number;
}

export interface MarketerStats {
    totalCommission: string; // Ju'alah
    totalSalesGenerated: string;
    conversionRate: string;
}

export interface MarketerData {
    activeCampaigns: MarketingCampaign[];
    stats: MarketerStats;
    name: string;
}

// Member Types
export interface MemberOrderHistory {
    id: string;
    dishName: string;
    restaurant: string;
    date: string;
    price: string;
}

export interface MemberData {
    name: string;
    orderHistory: MemberOrderHistory[];
}

// --- NEW ADMIN TYPES ---

export interface AdminStats {
    totalMerchants: number;
    totalMarketers: number;
    totalInfaqCollected: string; // 1.0%
    totalPlatformRevenue: string; // 1.0%
}

export interface MerchantKYC {
    id: string;
    name: string;
    location: string;
    status: 'active' | 'pending' | 'suspended';
    documents: {
        ssm: boolean;
        halalCert: boolean;
        shopPhoto: boolean;
    };
    joinDate: string;
}

export interface AdRequest {
    id: string;
    merchantName: string;
    content: string; // e.g. "Promo Merdeka Banner"
    duration: string;
    budget: string;
    status: 'pending' | 'approved' | 'rejected';
}

export interface FinancialLog {
    id: string;
    merchant: string;
    amount: string; // Total Sales
    agencyFee: string; // 5.5%
    date: string;
    status: 'paid' | 'pending';
}

export interface UserReport {
    id: string;
    reporter: string;
    target: string;
    reason: string;
    status: 'open' | 'resolved';
}

export interface AdminData {
    stats: AdminStats;
    merchants: MerchantKYC[];
    adRequests: AdRequest[];
    financeLogs: FinancialLog[];
    reports: UserReport[];
    systemStatus: 'Online' | 'Maintenance' | 'Issues';
}

// Territory Partner (Ex-Watcher) Types - Akad: Ujrah al-Ishraf
export interface TerritoryStats {
    regionName: string;
    totalMerchants: number;
    totalSalesVolume: string;
    supervisionFee: string; // 0.5%
}

export interface TerritoryData {
    stats: TerritoryStats;
    topPerformers: { name: string; role: 'Merchant' | 'Marketer'; volume: string }[];
}

// Runner / Jastip Types
export interface Order {
    id: string;
    restaurant: string;
    customerName: string;
    deliveryAddress: string;
    status: 'Pending Pickup' | 'In Transit' | 'Delivered';
}

export interface RunnerAlert {
    id: number;
    type: 'new_order' | 'urgent' | 'warning' | 'info';
    message: string;
}

export interface RunnerStats {
    completedDeliveries: number;
    averageDeliveryTime: string;
    totalEarnings: string;
}

export interface RunnerData {
    activeOrders: Order[];
    alerts: RunnerAlert[];
    stats: RunnerStats;
}

export interface LiveLog {
    id: number;
    timestamp: string;
    level: 'info' | 'warning' | 'error';
    message: string;
}

export interface WatcherPerformance {
    uptime: string;
    apiLatency: string;
    dbUsage: string;
}

export interface WatcherData {
    performance: WatcherPerformance;
    liveLogs: LiveLog[];
}
