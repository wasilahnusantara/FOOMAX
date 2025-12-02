
import React, { useState, useEffect } from 'react';
import type { Recipe, DashboardData, MarketerData, MemberData, AdminData, TerritoryData, RunnerData, User, UserRole } from './types';
import { generateRecipe } from './services/geminiService';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import RecipeCard from './components/RecipeCard';
import LoadingSpinner from './components/LoadingSpinner';
import Welcome from './components/Welcome';
import Footer from './components/Footer';
import MerchantDashboard from './components/MerchantDashboard';
import MarketerDashboard from './components/MarketerDashboard';
import MemberDashboard from './components/MemberDashboard';
import AdminDashboard from './components/AdminDashboard';
import TerritoryDashboard from './components/TerritoryDashboard';
import RunnerDashboard from './components/RunnerDashboard';
import AuthScreen from './components/AuthScreen';

type ViewType = 'finder' | 'merchant' | 'marketer' | 'member' | 'admin' | 'territory' | 'runner';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [view, setView] = useState<ViewType>('finder');
  
  // Data States
  const [merchantData, setMerchantData] = useState<DashboardData | null>(null);
  const [marketerData, setMarketerData] = useState<MarketerData | null>(null);
  const [memberData, setMemberData] = useState<MemberData | null>(null);
  const [adminData, setAdminData] = useState<AdminData | null>(null);
  const [territoryData, setTerritoryData] = useState<TerritoryData | null>(null);
  const [runnerData, setRunnerData] = useState<RunnerData | null>(null);

  const handleLogin = (user: User) => {
      setCurrentUser(user);
      // Automatically redirect based on role
      switch (user.role) {
          case 'merchant': setView('merchant'); break;
          case 'marketer': setView('marketer'); break;
          case 'runner': setView('runner'); break;
          case 'admin': setView('admin'); break;
          case 'territory': setView('territory'); break;
          case 'member': default: setView('finder'); break; // Member starts at finder to buy food
      }
  };

  const handleLogout = () => {
      setCurrentUser(null);
      setRecipe(null);
      setView('finder');
  };

  const handleUpgradeToMarketer = () => {
      if (currentUser) {
          const updatedUser = { ...currentUser, role: 'marketer' as UserRole };
          setCurrentUser(updatedUser);
          setView('marketer');
          // In a real app, this would trigger an API call to update the DB
      }
  };

  // Fetch dashboard data on component mount (Mock Data for 5.5% Model)
  useEffect(() => {
    // 1. Merchant Data (The Client)
    const mockMerchantData: DashboardData = {
      popularDishes: ['Spicy Beef Rendang', 'Ayam Penyet', 'Nasi Lemak Royal'],
      trendingIngredients: ['Sambal Belacan', 'Coconut Milk', 'Lemongrass'],
      financials: {
          grossSales: 'Rp 100,000,000',
          marketingCost: 'Rp 5,500,000', // 5.5% Agency Fee
          netPayout: 'Rp 94,500,000', // 94.5% Net
          totalTransactions: 1250
      }
    };
    setMerchantData(mockMerchantData);

    // 2. Marketer Data (The Affiliate - 3.0%)
    const mockMarketerData: MarketerData = {
        name: currentUser?.name || "Faris (Top Marketer)",
        activeCampaigns: [
            { id: 'CMP-01', dishName: 'Family Combo Platter', restaurant: 'Pagi Sore', commissionRate: '3.0%', potentialEarning: 'Rp 15,000/sale', clicks: 120, conversions: 8 },
            { id: 'CMP-02', dishName: 'Spicy Duck Special', restaurant: 'Bebek Kaleyo', commissionRate: '3.0%', potentialEarning: 'Rp 4,500/sale', clicks: 85, conversions: 12 },
        ],
        stats: {
            totalCommission: 'Rp 4,500,000', // Ju'alah
            totalSalesGenerated: 'Rp 150,000,000',
            conversionRate: '8.5%',
        }
    };
    setMarketerData(mockMarketerData);

    // 3. Member Data (The Customer)
    const mockMemberData: MemberData = {
        name: currentUser?.name || 'Aisha',
        orderHistory: [
            { id: 'H-01', dishName: 'Beef Rendang', restaurant: 'Pagi Sore', date: '2024-07-25', price: 'Rp 75,000' },
            { id: 'H-02', dishName: 'Chicken Satay', restaurant: 'Sate Khas Senayan', date: '2024-07-22', price: 'Rp 45,000' },
        ]
    };
    setMemberData(mockMemberData);

    // 4. Admin Data (Platform Owner - 1.0% Ops + 1.0% Infaq)
    const mockAdminData: AdminData = {
        stats: {
            totalMerchants: 120,
            totalMarketers: 450,
            totalPlatformRevenue: 'Rp 15,000,000', // 1% Ujrah al-Nizam
            totalInfaqCollected: 'Rp 15,000,000', // 1% Tabarru'
        },
        merchants: [
            { id: 'M-01', name: 'Restoran Sederhana', location: 'Jakarta Selatan', status: 'active', documents: { ssm: true, halalCert: true, shopPhoto: true }, joinDate: '2024-01-15' },
            { id: 'M-02', name: 'Warung Bu Ani', location: 'Bandung', status: 'pending', documents: { ssm: true, halalCert: false, shopPhoto: true }, joinDate: '2024-02-20' },
            { id: 'M-03', name: 'Sate Pak Kumis', location: 'Jakarta Pusat', status: 'suspended', documents: { ssm: true, halalCert: true, shopPhoto: true }, joinDate: '2023-11-05' },
        ],
        adRequests: [
            { id: 'AD-01', merchantName: 'Restoran Sederhana', content: 'Promo Merdeka: Diskon 17%', duration: '7 Hari', budget: 'Rp 500.000', status: 'pending' },
            { id: 'AD-02', merchantName: 'Bebek Kaleyo', content: 'Banner Homepage Utama', duration: '30 Hari', budget: 'Rp 2.000.000', status: 'approved' },
        ],
        financeLogs: [
            { id: 'TX-991', merchant: 'Pagi Sore', amount: 'Rp 10.000.000', agencyFee: 'Rp 550.000', date: '2024-02-25', status: 'paid' },
            { id: 'TX-992', merchant: 'Sate Khas Senayan', amount: 'Rp 5.000.000', agencyFee: 'Rp 275.000', date: '2024-02-26', status: 'pending' },
        ],
        reports: [
            { id: 'R-01', reporter: 'User_99', target: 'Warung Bu Ani', reason: 'Makanan basi saat diterima', status: 'open' },
        ],
        systemStatus: 'Online'
    };
    setAdminData(mockAdminData);

    // 5. Territory Data (Area Rep - 0.5%)
    const mockTerritoryData: TerritoryData = {
        stats: {
            regionName: 'Jakarta Selatan',
            totalMerchants: 45,
            totalSalesVolume: 'Rp 500,000,000',
            supervisionFee: 'Rp 2,500,000' // 0.5% Ujrah al-Ishraf
        },
        topPerformers: [
            { name: 'Pagi Sore', role: 'Merchant', volume: 'Rp 120jt' },
            { name: 'Faris', role: 'Marketer', volume: 'Rp 80jt' },
        ]
    };
    setTerritoryData(mockTerritoryData);

    // 6. Runner Data (Courier - Fee Based)
    const mockRunnerData: RunnerData = {
        activeOrders: [
            { id: 'ORD-101', restaurant: 'Pagi Sore', customerName: 'Ibu Ani', deliveryAddress: 'Jl. Melawai No. 12', status: 'In Transit' },
            { id: 'ORD-102', restaurant: 'Sate Khas Senayan', customerName: 'Pak Budi', deliveryAddress: 'Apt. Senopati Unit 5B', status: 'Pending Pickup' }
        ],
        alerts: [
            { id: 1, type: 'new_order', message: 'New order available nearby: Rp 15.000 fee' },
            { id: 2, type: 'urgent', message: 'Order #ORD-101 is running late!' }
        ],
        stats: {
            completedDeliveries: 42,
            averageDeliveryTime: '28 mins',
            totalEarnings: 'Rp 850,000'
        }
    };
    setRunnerData(mockRunnerData);

  }, [currentUser]);


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
                      <div className="mt-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative text-center" role="alert">
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
        case 'merchant':
            return merchantData && <MerchantDashboard data={merchantData} />;
        case 'marketer':
            return marketerData && <MarketerDashboard data={marketerData} />;
        case 'runner':
            return runnerData && <RunnerDashboard data={runnerData} />;
        case 'member':
            // Pass handleUpgradeToMarketer to MemberDashboard
            return memberData && <MemberDashboard data={memberData} onUpgrade={handleUpgradeToMarketer} isMarketer={currentUser?.role === 'marketer'} />;
        case 'admin':
            return adminData && merchantData && marketerData && <AdminDashboard adminData={adminData} platformData={{popularDishes: merchantData.popularDishes, marketerStats: marketerData.stats}} />;
        case 'territory':
            return territoryData && <TerritoryDashboard data={territoryData} />;
        default:
            return <Welcome />;
    }
  }

  // If not logged in, show AuthScreen
  if (!currentUser) {
      return <AuthScreen onLogin={handleLogin} />;
  }

  return (
    <div className="flex flex-col min-h-screen font-sans text-text-primary bg-background">
      <Header view={view} setView={setView as any} onLogout={handleLogout} />
      <main className="flex-grow container mx-auto p-4 md:p-8 flex flex-col items-center w-full">
        {renderView()}
      </main>
      <Footer />
    </div>
  );
}

export default App;
