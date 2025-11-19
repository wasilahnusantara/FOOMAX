
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
}

// Runner Dashboard Types
export interface Order {
  id: string;
  customerName: string;
  restaurant: string;
  deliveryAddress: string;
  status: 'Pending Pickup' | 'In Transit' | 'Delivered';
}

export interface RunnerStats {
    completedDeliveries: number;
    averageDeliveryTime: string; // e.g., "25 mins"
    totalEarnings: string; // e.g., "$150.75"
}

export interface RunnerAlert {
    id: number;
    type: 'new_order' | 'info' | 'urgent' | 'warning';
    message: string;
}

export interface RunnerData {
    activeOrders: Order[];
    stats: RunnerStats;
    alerts: RunnerAlert[];
}

// Member Dashboard Types
export interface MemberOrderHistory {
    id: string;
    dishName: string;
    restaurant: string;
    date: string; // e.g., "2024-07-28"
}

export interface MemberData {
    name: string;
    orderHistory: MemberOrderHistory[];
}

// Admin Dashboard Types
export interface AdminStats {
    totalUsers: number;
    totalRestaurants: number;
    totalRunners: number;
    totalOrders: number;
}

export interface RecentActivity {
    id: number;
    type: 'new_user' | 'new_restaurant' | 'milestone';
    description: string;
}

export interface AdminData {
    stats: AdminStats;
    recentActivity: RecentActivity[];
    systemStatus: string;
}

// Watcher Dashboard Types
export interface LiveLog {
    id: number;
    timestamp: string;
    service: 'auth' | 'orders' | 'delivery' | 'database';
    message: string;
    level: 'info' | 'warning' | 'error';
}

export interface PerformanceMetric {
    uptime: string;
    apiLatency: string; // e.g., "45ms"
    dbUsage: string; // e.g., "65%"
}

export interface WatcherData {
    liveLogs: LiveLog[];
    performance: PerformanceMetric;
}
