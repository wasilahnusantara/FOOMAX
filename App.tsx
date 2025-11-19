import React, { useState, useEffect } from 'react';
import type { Recipe, DashboardData, RunnerData, MemberData, AdminData, WatcherData } from './types';
import { generateRecipe } from './services/geminiService';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import RecipeCard from './components/RecipeCard';
import LoadingSpinner from './components/LoadingSpinner';
import Welcome from './components/Welcome';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import RunnerDashboard from './components/RunnerDashboard';
import MemberDashboard from './components/MemberDashboard';
import AdminDashboard from './components/AdminDashboard';
import WatcherDashboard from './components/WatcherDashboard';

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [view, setView] = useState<'finder' | 'dashboard' | 'runner' | 'member' | 'admin' | 'watcher'>('finder');
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [runnerData, setRunnerData] = useState<RunnerData | null>(null);
  const [memberData, setMemberData] = useState<MemberData | null>(null);
  const [adminData, setAdminData] = useState<AdminData | null>(null);
  const [watcherData, setWatcherData] = useState<WatcherData | null>(null);

  // Fetch dashboard data on component mount
  useEffect(() => {
    // In a real app, this would be an API call to your backend
    const mockDashboardData: DashboardData = {
      popularDishes: ['Beef Rendang', 'Chicken Satay', 'Nasi Goreng', 'Gado-Gado', 'Soto Ayam'],
      trendingIngredients: ['Lemongrass', 'Galangal', 'Coconut Milk', 'Chili', 'Turmeric', 'Peanut'],
    };
    setDashboardData(mockDashboardData);

    const mockRunnerData: RunnerData = {
        activeOrders: [
            { id: 'ORD-001', customerName: 'Budi S.', restaurant: 'Sate Khas Senayan', deliveryAddress: '123 Jalan Sudirman, Jakarta', status: 'Pending Pickup' },
            { id: 'ORD-002', customerName: 'Ani W.', restaurant: 'Pagi Sore', deliveryAddress: '456 Jalan Thamrin, Jakarta', status: 'Pending Pickup' },
            { id: 'ORD-003', customerName: 'Citra L.', restaurant: 'Bakmi GM', deliveryAddress: '789 Jalan Gatot Subroto, Jakarta', status: 'In Transit' },
        ],
        stats: {
            completedDeliveries: 12,
            averageDeliveryTime: '28 mins',
            totalEarnings: 'Rp 450,000',
        },
        alerts: [
            { id: 1, type: 'new_order', message: 'New order received from Pagi Sore.' },
            { id: 2, type: 'urgent', message: 'Priority delivery for ORD-003 is due in 15 minutes.' },
            { id: 3, type: 'warning', message: 'High traffic reported near Jalan Sudirman.' },
        ]
    };
    setRunnerData(mockRunnerData);

    const mockMemberData: MemberData = {
        name: 'Aisha',
        orderHistory: [
            { id: 'H-01', dishName: 'Beef Rendang', restaurant: 'Pagi Sore', date: '2024-07-25' },
            { id: 'H-02', dishName: 'Chicken Satay', restaurant: 'Sate Khas Senayan', date: '2024-07-22' },
            { id: 'H-03', dishName: 'Gado-Gado', restaurant: 'Warung Bu Tini', date: '2024-07-19' },
            { id: 'H-04', dishName: 'Soto Ayam', restaurant: 'Soto Cak Har', date: '2024-07-15' },
        ]
    };
    setMemberData(mockMemberData);

    const mockAdminData: AdminData = {
        stats: {
            totalUsers: 1250,
            totalRestaurants: 85,
            totalRunners: 45,
            totalOrders: 5670,
        },
        recentActivity: [
            { id: 1, type: 'new_user', description: 'Aisha registered as a new member.' },
            { id: 2, type: 'new_restaurant', description: 'Sate Khas Senayan joined the platform.' },
            { id: 3, type: 'milestone', description: 'Platform reached 5,000 total orders.' },
        ],
        systemStatus: 'All Systems Operational'
    };
    setAdminData(mockAdminData);

    const mockWatcherData: WatcherData = {
        performance: {
            uptime: '99.98%',
            apiLatency: '52ms',
            dbUsage: '58%',
        },
        liveLogs: [
            { id: 1, timestamp: '14:32:05', service: 'orders', message: 'Order ORD-003 status updated to In Transit.', level: 'info' },
            { id: 2, timestamp: '14:32:01', service: 'delivery', message: 'Runner B-12 assigned to ORD-003.', level: 'info' },
            { id: 3, timestamp: '14:31:55', service: 'auth', message: 'User Aisha logged in successfully.', level: 'info' },
            { id: 4, timestamp: '14:31:40', service: 'database', message: 'Query latency > 500ms for user_profiles.', level: 'warning' },
            { id: 5, timestamp: '14:31:22', service: 'orders', message: 'New order ORD-003 received.', level: 'info' },
            { id: 6, timestamp: '14:30:15', service: 'auth', message: 'Failed login attempt for user: admin_test.', level: 'warning' },
        ]
    };
    setWatcherData(mockWatcherData);

  }, []);


  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setError("Please enter a dish or ingredient.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setRecipe(null);

    try {
      const generatedRecipe = await generateRecipe(query);
      setRecipe(generatedRecipe);
    } catch (err) {
      console.error(err);
      setError("Sorry, we couldn't fetch a recipe. The kitchen might be busy. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const renderView = () => {
    switch(view) {
        case 'finder':
            return (
                <div className="w-full max-w-3xl">
                    <SearchBar onSearch={handleSearch} isLoading={isLoading} />
                    {error && (
                      <div className="mt-6 bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded-lg relative text-center" role="alert">
                        <strong className="font-bold">Oops!</strong>
                        <span className="block sm:inline ml-2">{error}</span>
                      </div>
                    )}
                    <div className="mt-8">
                      {isLoading && <LoadingSpinner />}
                      {!isLoading && !error && recipe && <RecipeCard recipe={recipe} />}
                      {!isLoading && !error && !recipe && <Welcome />}
                    </div>
                </div>
            );
        case 'dashboard':
            return dashboardData && <Dashboard data={dashboardData} />;
        case 'runner':
            return runnerData && <RunnerDashboard data={runnerData} />;
        case 'member':
            return memberData && <MemberDashboard data={memberData} />;
        case 'admin':
            return adminData && dashboardData && runnerData && <AdminDashboard adminData={adminData} platformData={{popularDishes: dashboardData.popularDishes, runnerStats: runnerData.stats}} />;
        case 'watcher':
            return watcherData && adminData && <WatcherDashboard watcherData={watcherData} stats={adminData.stats} />;
        default:
            return <Welcome />;
    }
  }

  return (
    <div className="flex flex-col min-h-screen font-sans text-text-primary">
      <Header view={view} setView={setView} />
      <main className="flex-grow container mx-auto p-4 md:p-8 flex flex-col items-center w-full">
        {renderView()}
      </main>
      <Footer />
    </div>
  );
}

export default App;