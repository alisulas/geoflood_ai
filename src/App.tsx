import { useState } from 'react';
import { RiskScanner } from './components/RiskScanner';
import { FloodMap } from './components/FloodMap';
import { PropertyComparison } from './components/PropertyComparison';
import { FuturePrediction } from './components/FuturePrediction';
import { CommunityReports } from './components/CommunityReports';
import { AlertSystem } from './components/AlertSystem';
import { MitigationRecommendations } from './components/MitigationRecommendations';
import { FinancialCalculator } from './components/FinancialCalculator';
import { Home, MapPin, BarChart3, TrendingUp, Users, Bell, Shield, DollarSign } from 'lucide-react';
import logoImage from 'figma:asset/6fa7638192ead1571970b350c09ed7b91598e361.png';

export default function App() {
  const [activeTab, setActiveTab] = useState('scanner');
  const [selectedProperty, setSelectedProperty] = useState<any>(null);

  const tabs = [
    { id: 'scanner', name: 'Home', icon: Home },
    { id: 'map', name: 'Map', icon: MapPin },
    { id: 'prediction', name: 'Predict', icon: TrendingUp },
    { id: 'community', name: 'Community', icon: Users },
  ];

  const moreFeatures = [
    { id: 'comparison', name: 'Compare', icon: BarChart3 },
    { id: 'alerts', name: 'Alerts', icon: Bell },
    { id: 'mitigation', name: 'Mitigation', icon: Shield },
    { id: 'financial', name: 'Financial', icon: DollarSign },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-green-500 sticky top-0 z-50 shadow-lg">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={logoImage} alt="GeoFlood Logo" className="h-10 object-contain" />
            </div>
            <button className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
              <Bell className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-4">
        {activeTab === 'scanner' && (
          <RiskScanner 
            onPropertySelect={setSelectedProperty}
            onNavigate={(tab) => setActiveTab(tab)}
            moreFeatures={moreFeatures}
          />
        )}
        {activeTab === 'map' && <FloodMap />}
        {activeTab === 'comparison' && <PropertyComparison />}
        {activeTab === 'prediction' && (
          <FuturePrediction property={selectedProperty} />
        )}
        {activeTab === 'community' && <CommunityReports />}
        {activeTab === 'alerts' && <AlertSystem />}
        {activeTab === 'mitigation' && (
          <MitigationRecommendations property={selectedProperty} />
        )}
        {activeTab === 'financial' && (
          <FinancialCalculator property={selectedProperty} />
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50">
        <div className="grid grid-cols-4 gap-1 px-2 py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-green-50 text-green-600'
                    : 'text-gray-500'
                }`}
              >
                <Icon className={`w-6 h-6 ${isActive ? 'scale-110' : ''} transition-transform`} />
                <span className="text-xs">{tab.name}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}