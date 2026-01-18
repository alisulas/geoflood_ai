import { useState } from 'react';
import { Search, MapPin, Loader, AlertTriangle, CheckCircle, XCircle, ChevronRight, Zap, TrendingUp, BarChart3, Clock } from 'lucide-react';

interface RiskResult {
  address: string;
  riskScore: number;
  riskCategory: 'Rendah' | 'Sedang' | 'Tinggi' | 'Sangat Tinggi';
  factors: {
    historicalFlood: number;
    elevation: number;
    drainageSystem: number;
    proximityToWater: number;
    rainfall: number;
    landUseChange: number;
  };
  insights: string[];
  coordinates: { lat: number; lng: number };
}

// 15 DATA DUMMY PROFILES dengan variasi berbeda
const DUMMY_RISK_PROFILES = [
  // Profile 1: VERY LOW RISK (Score: 15-20)
  {
    riskScore: 18,
    riskCategory: 'Rendah' as const,
    factors: {
      historicalFlood: 12,
      elevation: 85,
      drainageSystem: 92,
      proximityToWater: 15,
      rainfall: 45,
      landUseChange: 20,
    },
    insights: [
      'Area ini tidak tercatat mengalami banjir dalam 10 tahun terakhir',
      'Elevasi tanah 12-15m di atas permukaan laut, sangat aman',
      'Sistem drainase dinilai excellent dengan infrastruktur modern',
      'Jarak ke badan air terdekat: 2000-2500m, sangat jauh',
      'Curah hujan rata-rata tahunan: 2150mm (rendah)',
      'Tidak ada perubahan tata guna lahan signifikan dalam 5 tahun terakhir',
    ],
  },
  
  // Profile 2: LOW RISK (Score: 22-28)
  {
    riskScore: 25,
    riskCategory: 'Rendah' as const,
    factors: {
      historicalFlood: 18,
      elevation: 78,
      drainageSystem: 85,
      proximityToWater: 25,
      rainfall: 52,
      landUseChange: 28,
    },
    insights: [
      'Area ini tercatat mengalami 1 kejadian banjir ringan dalam 10 tahun terakhir',
      'Elevasi tanah 10-12m di atas permukaan laut',
      'Sistem drainase dinilai sangat baik dengan maintenance rutin',
      'Jarak ke badan air terdekat: 1500-2000m',
      'Curah hujan rata-rata tahunan: 2280mm',
      'Perubahan tata guna lahan minimal dalam 5 tahun terakhir',
    ],
  },
  
  // Profile 3: LOW-MEDIUM RISK (Score: 32-38)
  {
    riskScore: 35,
    riskCategory: 'Sedang' as const,
    factors: {
      historicalFlood: 28,
      elevation: 65,
      drainageSystem: 72,
      proximityToWater: 38,
      rainfall: 58,
      landUseChange: 42,
    },
    insights: [
      'Area ini tercatat mengalami 1-2 kejadian banjir dalam 10 tahun terakhir',
      'Elevasi tanah 8-10m di atas permukaan laut',
      'Sistem drainase dinilai cukup memadai, perlu monitoring',
      'Jarak ke badan air terdekat: 1000-1500m',
      'Curah hujan rata-rata tahunan: 2380mm',
      'Perubahan tata guna lahan moderat dalam 5 tahun terakhir',
    ],
  },
  
  // Profile 4: MEDIUM RISK (Score: 42-48)
  {
    riskScore: 45,
    riskCategory: 'Sedang' as const,
    factors: {
      historicalFlood: 42,
      elevation: 55,
      drainageSystem: 65,
      proximityToWater: 48,
      rainfall: 65,
      landUseChange: 52,
    },
    insights: [
      'Area ini tercatat mengalami 2-3 kejadian banjir dalam 10 tahun terakhir',
      'Elevasi tanah 6-8m di atas permukaan laut',
      'Sistem drainase dinilai cukup memadai namun kadang overload',
      'Jarak ke badan air terdekat: 800-1000m',
      'Curah hujan rata-rata tahunan: 2480mm',
      'Perubahan tata guna lahan cukup signifikan dalam 5 tahun terakhir',
    ],
  },
  
  // Profile 5: MEDIUM-HIGH RISK (Score: 52-58)
  {
    riskScore: 55,
    riskCategory: 'Tinggi' as const,
    factors: {
      historicalFlood: 58,
      elevation: 45,
      drainageSystem: 52,
      proximityToWater: 62,
      rainfall: 72,
      landUseChange: 65,
    },
    insights: [
      'Area ini tercatat mengalami 3-4 kejadian banjir dalam 10 tahun terakhir',
      'Elevasi tanah 4-6m di atas permukaan laut',
      'Sistem drainase dinilai perlu perbaikan di beberapa titik',
      'Jarak ke badan air terdekat: 600-800m',
      'Curah hujan rata-rata tahunan: 2580mm (tinggi)',
      'Perubahan tata guna lahan signifikan, berkurangnya area resapan',
    ],
  },
  
  // Profile 6: HIGH RISK (Score: 62-68)
  {
    riskScore: 65,
    riskCategory: 'Tinggi' as const,
    factors: {
      historicalFlood: 68,
      elevation: 38,
      drainageSystem: 45,
      proximityToWater: 72,
      rainfall: 78,
      landUseChange: 72,
    },
    insights: [
      'Area ini tercatat mengalami 4-5 kejadian banjir dalam 10 tahun terakhir',
      'Elevasi tanah 3-4m di atas permukaan laut, rendah',
      'Sistem drainase dinilai perlu perbaikan menyeluruh',
      'Jarak ke badan air terdekat: 400-600m, cukup dekat',
      'Curah hujan rata-rata tahunan: 2680mm (sangat tinggi)',
      'Perubahan tata guna lahan sangat signifikan dalam 5 tahun terakhir',
    ],
  },
  
  // Profile 7: VERY HIGH RISK (Score: 72-78)
  {
    riskScore: 75,
    riskCategory: 'Sangat Tinggi' as const,
    factors: {
      historicalFlood: 82,
      elevation: 28,
      drainageSystem: 38,
      proximityToWater: 85,
      rainfall: 82,
      landUseChange: 78,
    },
    insights: [
      'Area ini tercatat mengalami 5-7 kejadian banjir dalam 10 tahun terakhir',
      'Elevasi tanah 1.5-3m di atas permukaan laut, sangat rendah',
      'Sistem drainase dinilai perlu perbaikan urgent',
      'Jarak ke badan air terdekat: 200-400m, sangat dekat',
      'Curah hujan rata-rata tahunan: 2780mm (ekstrim)',
      'Perubahan tata guna lahan drastis, hilangnya area resapan',
    ],
  },
  
  // Profile 8: EXTREME RISK (Score: 82-88)
  {
    riskScore: 85,
    riskCategory: 'Sangat Tinggi' as const,
    factors: {
      historicalFlood: 92,
      elevation: 18,
      drainageSystem: 28,
      proximityToWater: 95,
      rainfall: 88,
      landUseChange: 85,
    },
    insights: [
      'Area ini tercatat mengalami 7+ kejadian banjir dalam 10 tahun terakhir',
      'Elevasi tanah 0.5-1.5m di atas permukaan laut, critical',
      'Sistem drainase dinilai sangat buruk, sering tersumbat',
      'Jarak ke badan air terdekat: < 200m, langsung berbatasan',
      'Curah hujan rata-rata tahunan: 2850mm (ekstrim tinggi)',
      'Area mengalami konversi lahan masif, hampir tidak ada resapan',
    ],
  },
  
  // Profile 9: COASTAL LOW (Score: 28-35) - Area pantai tapi elevated
  {
    riskScore: 32,
    riskCategory: 'Sedang' as const,
    factors: {
      historicalFlood: 35,
      elevation: 68,
      drainageSystem: 75,
      proximityToWater: 45,
      rainfall: 55,
      landUseChange: 38,
    },
    insights: [
      'Area pantai dengan elevasi baik, 1-2 kejadian banjir ringan',
      'Elevasi tanah 8-10m, cukup tinggi untuk area pesisir',
      'Sistem drainase coastal yang terawat dengan baik',
      'Jarak ke garis pantai: 800-1200m dengan seawall protection',
      'Curah hujan rata-rata tahunan: 2320mm',
      'Development terkontrol dengan green space memadai',
    ],
  },
  
  // Profile 10: URBAN DENSE MEDIUM (Score: 48-55)
  {
    riskScore: 52,
    riskCategory: 'Tinggi' as const,
    factors: {
      historicalFlood: 55,
      elevation: 48,
      drainageSystem: 42,
      proximityToWater: 58,
      rainfall: 68,
      landUseChange: 75,
    },
    insights: [
      'Area urban padat, 3-4 kejadian banjir akibat genangan',
      'Elevasi tanah 5-6m, cukup namun terpengaruh urban heat',
      'Sistem drainase overload saat hujan deras',
      'Jarak ke sungai: 500-700m, melewati area padat',
      'Curah hujan rata-rata tahunan: 2520mm',
      'Urbanisasi cepat mengurangi area resapan hingga 60%',
    ],
  },
  
  // Profile 11: RIVERSIDE HIGH (Score: 68-75)
  {
    riskScore: 72,
    riskCategory: 'Sangat Tinggi' as const,
    factors: {
      historicalFlood: 85,
      elevation: 32,
      drainageSystem: 48,
      proximityToWater: 88,
      rainfall: 75,
      landUseChange: 68,
    },
    insights: [
      'Area tepi sungai, 6-7 kejadian banjir luapan dalam 10 tahun',
      'Elevasi tanah 2-3m, sering terluapi saat musim hujan',
      'Sistem drainase tidak optimal, sering backflow dari sungai',
      'Jarak ke sungai: 100-300m, zona merah banjir',
      'Curah hujan rata-rata tahunan: 2650mm',
      'Perubahan bentang sungai dan sedimentasi meningkat',
    ],
  },
  
  // Profile 12: VALLEY/LOWLAND MEDIUM (Score: 58-65)
  {
    riskScore: 62,
    riskCategory: 'Tinggi' as const,
    factors: {
      historicalFlood: 62,
      elevation: 42,
      drainageSystem: 55,
      proximityToWater: 65,
      rainfall: 78,
      landUseChange: 58,
    },
    insights: [
      'Area lembah/dataran rendah, 4-5 kejadian genangan',
      'Elevasi tanah 4-5m, cekungan natural menampung air',
      'Sistem drainase cukup namun gravitasi kurang optimal',
      'Jarak ke titik terendah: 300-500m, area tangkapan air',
      'Curah hujan rata-rata tahunan: 2620mm',
      'Topografi natural membuat air berkumpul di area ini',
    ],
  },
  
  // Profile 13: PLANNED CITY LOW (Score: 20-25)
  {
    riskScore: 23,
    riskCategory: 'Rendah' as const,
    factors: {
      historicalFlood: 15,
      elevation: 82,
      drainageSystem: 88,
      proximityToWater: 22,
      rainfall: 48,
      landUseChange: 25,
    },
    insights: [
      'Kota terencana modern, tidak ada kejadian banjir signifikan',
      'Elevasi tanah 11-13m, didesain dengan master plan optimal',
      'Sistem drainase terintegrasi dengan teknologi modern',
      'Jarak ke badan air: 1800-2200m dengan retention pond',
      'Curah hujan rata-rata tahunan: 2200mm',
      'Tata ruang terkontrol ketat dengan 40% green space',
    ],
  },
  
  // Profile 14: RECLAIMED LAND HIGH (Score: 78-85)
  {
    riskScore: 82,
    riskCategory: 'Sangat Tinggi' as const,
    factors: {
      historicalFlood: 88,
      elevation: 22,
      drainageSystem: 35,
      proximityToWater: 92,
      rainfall: 85,
      landUseChange: 88,
    },
    insights: [
      'Area reklamasi/bekas rawa, 7+ kejadian banjir dan genangan',
      'Elevasi tanah 1-2m, land subsidence aktif 3-5cm/tahun',
      'Sistem drainase tidak mampu mengatasi muka air tanah tinggi',
      'Jarak ke laut/sungai: < 500m, pengaruh pasang-surut tinggi',
      'Curah hujan rata-rata tahunan: 2780mm',
      'Konversi lahan basah menyebabkan hilangnya buffer natural',
    ],
  },
  
  // Profile 15: SUBURBAN STABLE (Score: 38-45)
  {
    riskScore: 42,
    riskCategory: 'Sedang' as const,
    factors: {
      historicalFlood: 38,
      elevation: 62,
      drainageSystem: 68,
      proximityToWater: 42,
      rainfall: 62,
      landUseChange: 48,
    },
    insights: [
      'Area suburban, 2-3 kejadian genangan lokal dalam 10 tahun',
      'Elevasi tanah 6-8m, cukup stabil',
      'Sistem drainase suburban standard, perlu upgrade',
      'Jarak ke saluran air: 700-900m',
      'Curah hujan rata-rata tahunan: 2420mm',
      'Development suburban normal dengan mix residential-commercial',
    ],
  },
];

const EXAMPLE_ADDRESSES = [
  {
    address: 'The Green Residence IV, Jl. Karawaci-Legok, Tangerang',
    icon: '🏘️',
    tag: 'Recommended',
  },
  {
    address: 'Jl. Sudirman No. 45, Jakarta Selatan',
    icon: '🏢',
    tag: 'Premium',
  },
  {
    address: 'Serpong Garden, BSD City, Tangerang Selatan',
    icon: '🌳',
    tag: 'Low Risk',
  },
  {
    address: 'Pantai Indah Kapuk, Jakarta Utara',
    icon: '🌊',
    tag: 'High Risk',
  },
];

export function RiskScanner({ 
  onPropertySelect, 
  onNavigate,
  moreFeatures 
}: { 
  onPropertySelect: (property: any) => void;
  onNavigate: (tab: string) => void;
  moreFeatures: any[];
}) {
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RiskResult | null>(null);

  const mockAnalysis = (userAddress: string): RiskResult => {
    // RANDOMLY select one of 15 dummy profiles
    const randomProfile = DUMMY_RISK_PROFILES[Math.floor(Math.random() * DUMMY_RISK_PROFILES.length)];
    
    // Return profile dengan alamat yang diinput user
    return {
      address: userAddress,
      riskScore: randomProfile.riskScore,
      riskCategory: randomProfile.riskCategory,
      coordinates: { lat: -6.2088, lng: 106.8456 },
      factors: randomProfile.factors,
      insights: randomProfile.insights,
    };
  };

  const handleScan = async (selectedAddress?: string) => {
    const targetAddress = selectedAddress || address;
    if (!targetAddress.trim()) return;

    setLoading(true);
    setResult(null);
    
    // Simulate API call with realistic delay
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const analysisResult = mockAnalysis(targetAddress);
    setResult(analysisResult);
    onPropertySelect(analysisResult);
    setLoading(false);
  };

  const getRiskColor = (score: number) => {
    if (score < 25) return { bg: 'bg-green-500', text: 'text-green-600', light: 'bg-green-50' };
    if (score < 50) return { bg: 'bg-yellow-500', text: 'text-yellow-600', light: 'bg-yellow-50' };
    if (score < 75) return { bg: 'bg-orange-500', text: 'text-orange-600', light: 'bg-orange-50' };
    return { bg: 'bg-red-500', text: 'text-red-600', light: 'bg-red-50' };
  };

  return (
    <div className="space-y-4">
      {/* Search Section */}
      <div className="bg-gradient-to-br from-green-600 to-green-500 px-4 pt-4 pb-6 -mt-0">
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleScan()}
            placeholder="Cari alamat properti..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl shadow-lg border-0 focus:ring-2 focus:ring-yellow-400 text-base"
          />
          {address && (
            <button
              onClick={() => handleScan()}
              disabled={loading}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  <span className="text-sm">Scan</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="mx-4">
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-green-200 rounded-full"></div>
                <div className="absolute top-0 left-0 w-20 h-20 border-4 border-green-600 rounded-full border-t-transparent animate-spin"></div>
              </div>
              <div className="text-center">
                <div className="text-lg text-gray-900 mb-2">Analyzing with AI...</div>
                <div className="text-sm text-gray-500">Processing multi-factor data</div>
              </div>
              <div className="w-full space-y-2 mt-4">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                  <span>Analyzing historical flood data...</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse delay-100"></div>
                  <span>Processing elevation & topography...</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse delay-200"></div>
                  <span>Calculating drainage system score...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Example Addresses */}
      {!result && !loading && (
        <div className="px-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm text-gray-600">📍 Try Example Locations</h3>
            <span className="text-xs text-gray-400">Tap to scan</span>
          </div>
          {EXAMPLE_ADDRESSES.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                setAddress(item.address);
                handleScan(item.address);
              }}
              className="w-full bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition-all text-left"
            >
              <div className="flex items-center gap-3">
                <div className="text-3xl">{item.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-gray-900 truncate">{item.address}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{item.tag}</div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Results */}
      {result && !loading && (
        <div className="px-4 space-y-4">
          {/* Risk Score Card */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            {/* Header with gradient */}
            <div className={`${getRiskColor(result.riskScore).bg} bg-gradient-to-br from-opacity-90 to-opacity-100 p-6`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="text-white/90 text-sm mb-1">Risk Analysis Result</div>
                  <div className="text-white text-base line-clamp-2">{result.address}</div>
                </div>
              </div>
              
              {/* Big Score Display */}
              <div className="flex items-center justify-center py-6">
                <div className="relative">
                  <svg className="w-40 h-40 transform -rotate-90">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth="12"
                      fill="none"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="white"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${(result.riskScore / 100) * 440} 440`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-5xl text-white">{result.riskScore}</div>
                    <div className="text-white/90 text-sm">/ 100</div>
                  </div>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur rounded-2xl px-4 py-3 text-center">
                <div className="text-white text-lg">{result.riskCategory}</div>
              </div>
            </div>

            {/* Factor Analysis */}
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-yellow-500" />
                <h4 className="text-base">AI Multi-Factor Analysis</h4>
              </div>
              
              {Object.entries(result.factors).map(([key, value]) => (
                <div key={key}>
                  <div className="flex items-center justify-between mb-2 text-sm">
                    <span className="text-gray-700 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className={`px-2 py-1 rounded-lg text-xs ${
                      value > 70 ? 'bg-red-100 text-red-700' : 
                      value > 40 ? 'bg-yellow-100 text-yellow-700' : 
                      'bg-green-100 text-green-700'
                    }`}>
                      {Math.round(value)}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-1000 ${
                        value > 70 ? 'bg-red-500' :
                        value > 40 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Insights */}
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-yellow-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-base">Deep Learning Insights</h4>
            </div>
            <div className="space-y-3">
              {result.insights.map((insight, idx) => (
                <div key={idx} className="flex gap-3 p-3 bg-gradient-to-r from-green-50 to-yellow-50 rounded-2xl">
                  <div className="w-6 h-6 bg-gradient-to-br from-green-600 to-yellow-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs">
                    {idx + 1}
                  </div>
                  <p className="text-sm text-gray-700 flex-1">{insight}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h4 className="text-base mb-4">Quick Actions</h4>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => onNavigate('map')}
                className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-2xl text-left hover:shadow-md transition-all"
              >
                <MapPin className="w-6 h-6 text-blue-600 mb-2" />
                <div className="text-sm text-gray-900">View on Map</div>
              </button>
              <button 
                onClick={() => onNavigate('prediction')}
                className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-2xl text-left hover:shadow-md transition-all"
              >
                <TrendingUp className="w-6 h-6 text-purple-600 mb-2" />
                <div className="text-sm text-gray-900">Future Predict</div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* More Features */}
      {!result && !loading && (
        <div className="px-4 space-y-3">
          <h3 className="text-sm text-gray-600">🚀 More Features</h3>
          <div className="grid grid-cols-2 gap-3">
            {moreFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <button
                  key={feature.id}
                  onClick={() => onNavigate(feature.id)}
                  className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition-all"
                >
                  <div className="bg-gradient-to-br from-green-100 to-yellow-100 w-12 h-12 rounded-xl flex items-center justify-center mb-3">
                    <Icon className="w-6 h-6 text-green-700" />
                  </div>
                  <div className="text-sm text-gray-900">{feature.name}</div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Stats Banner */}
      {!result && !loading && (
        <div className="mx-4 bg-gradient-to-r from-green-600 to-yellow-500 rounded-3xl shadow-xl p-6 text-white">
          <div className="text-sm opacity-90 mb-3">Platform Statistics</div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-2xl mb-1">50K+</div>
              <div className="text-xs opacity-80">Properties Scanned</div>
            </div>
            <div>
              <div className="text-2xl mb-1">98%</div>
              <div className="text-xs opacity-80">AI Accuracy</div>
            </div>
            <div>
              <div className="text-2xl mb-1">24/7</div>
              <div className="text-xs opacity-80">Real-time Data</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}