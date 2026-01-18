import { useState } from 'react';
import { Shield, Wrench, FileText, CheckCircle, DollarSign, Zap, TrendingUp } from 'lucide-react';

interface Mitigation {
  id: string;
  title: string;
  description: string;
  estimatedCost: number;
  effectiveness: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timeframe: string;
  icon: string;
}

export function MitigationRecommendations({ property }: { property?: any }) {
  const riskScore = property?.riskScore || 50;

  const [recommendations] = useState<Mitigation[]>([
    {
      id: '1',
      title: 'Elevasi Bangunan',
      description: 'Meninggikan struktur bangunan 0.5-1m dari permukaan tanah.',
      estimatedCost: 150000000,
      effectiveness: 95,
      difficulty: 'Hard',
      timeframe: '2-3 bulan',
      icon: '🏗️',
    },
    {
      id: '2',
      title: 'Sistem Drainase Modern',
      description: 'Instalasi sistem drainase dengan pompa otomatis.',
      estimatedCost: 75000000,
      effectiveness: 85,
      difficulty: 'Medium',
      timeframe: '3-4 minggu',
      icon: '💧',
    },
    {
      id: '3',
      title: 'Waterproofing Premium',
      description: 'Lapisan waterproof pada dinding, lantai, dan fondasi.',
      estimatedCost: 45000000,
      effectiveness: 70,
      difficulty: 'Medium',
      timeframe: '2-3 minggu',
      icon: '🛡️',
    },
    {
      id: '4',
      title: 'Flood Barrier System',
      description: 'Barrier portable untuk proteksi cepat saat warning.',
      estimatedCost: 25000000,
      effectiveness: 60,
      difficulty: 'Easy',
      timeframe: '1 minggu',
      icon: '🚧',
    },
    {
      id: '5',
      title: 'Sump Pump Auto',
      description: 'Pompa celup otomatis untuk basement atau area rendah.',
      estimatedCost: 15000000,
      effectiveness: 75,
      difficulty: 'Easy',
      timeframe: '1-2 minggu',
      icon: '⚙️',
    },
    {
      id: '6',
      title: 'Landscape Grading',
      description: 'Modifikasi kontur tanah untuk aliran air optimal.',
      estimatedCost: 35000000,
      effectiveness: 65,
      difficulty: 'Medium',
      timeframe: '2-3 minggu',
      icon: '🌱',
    },
  ]);

  const [insuranceOptions] = useState([
    {
      provider: 'Asuransi Properti Prima',
      coverage: 'Comprehensive Flood',
      annualPremium: 12000000,
      claimLimit: 2000000000,
      features: ['24/7 Emergency', 'Full Coverage', 'Fast Claim'],
    },
    {
      provider: 'BCA Insurance',
      coverage: 'Premium Shield',
      annualPremium: 15000000,
      claimLimit: 3000000000,
      features: ['Premium Support', 'No Depreciation', 'Content Coverage'],
    },
  ]);

  const formatCurrency = (value: number) => {
    if (value >= 1000000000) {
      return `Rp ${(value / 1000000000).toFixed(1)}M`;
    }
    return `Rp ${(value / 1000000).toFixed(0)}jt`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-700';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'Hard':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const recommendedMitigations = recommendations.filter(m => {
    if (riskScore < 35) return m.difficulty === 'Easy';
    if (riskScore < 65) return m.difficulty === 'Easy' || m.difficulty === 'Medium';
    return true;
  });

  const totalCost = recommendedMitigations.reduce((sum, m) => sum + m.estimatedCost, 0);
  const avgEffectiveness = Math.round(
    recommendedMitigations.reduce((sum, m) => sum + m.effectiveness, 0) / recommendedMitigations.length
  );

  return (
    <div className="space-y-4 px-4 py-4">
      {/* Header */}
      <div className="bg-white rounded-3xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-yellow-500 rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg">Mitigation Plan</h2>
            <p className="text-xs text-gray-500">AI-powered recommendations</p>
          </div>
        </div>

        {/* Risk Score Summary */}
        <div className="bg-gradient-to-r from-green-50 to-yellow-50 rounded-2xl p-4 border-2 border-green-200">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-xs text-gray-600 mb-1">Current Risk Score</div>
              <div className="text-2xl text-gray-900">{riskScore}</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-600 mb-1">Solutions Found</div>
              <div className="text-2xl text-green-600">{recommendedMitigations.length}</div>
            </div>
          </div>
          <p className="text-xs text-gray-700">
            {recommendedMitigations.length} strategi mitigasi direkomendasikan untuk area Anda
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-5 text-white">
          <DollarSign className="w-6 h-6 mb-2 opacity-90" />
          <div className="text-xs opacity-90 mb-1">Total Investment</div>
          <div className="text-xl">{formatCurrency(totalCost)}</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg p-5 text-white">
          <TrendingUp className="w-6 h-6 mb-2 opacity-90" />
          <div className="text-xs opacity-90 mb-1">Avg Effectiveness</div>
          <div className="text-xl">{avgEffectiveness}%</div>
        </div>
      </div>

      {/* Mitigation Strategies */}
      <div className="space-y-3">
        <h3 className="text-sm text-gray-600 px-2">🛠️ Recommended Solutions</h3>
        {recommendedMitigations.map((mitigation) => (
          <div
            key={mitigation.id}
            className="bg-white rounded-3xl shadow-lg overflow-hidden"
          >
            <div className="p-5">
              <div className="flex items-start gap-4 mb-4">
                <div className="text-4xl flex-shrink-0">{mitigation.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-base text-gray-900">{mitigation.title}</h4>
                    <span className={`px-2 py-1 rounded-lg text-xs ${getDifficultyColor(mitigation.difficulty)}`}>
                      {mitigation.difficulty}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">
                    {mitigation.description}
                  </p>
                </div>
              </div>

              {/* Effectiveness Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-gray-600">Effectiveness</span>
                  <span className="text-green-600">{mitigation.effectiveness}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-600 to-green-500"
                    style={{ width: `${mitigation.effectiveness}%` }}
                  />
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-blue-50 rounded-2xl p-3">
                  <div className="text-xs text-gray-600 mb-1">Cost</div>
                  <div className="text-sm text-blue-600">{formatCurrency(mitigation.estimatedCost)}</div>
                </div>
                <div className="bg-purple-50 rounded-2xl p-3">
                  <div className="text-xs text-gray-600 mb-1">Timeframe</div>
                  <div className="text-sm text-purple-600">{mitigation.timeframe}</div>
                </div>
              </div>

              {/* Action Button */}
              <button className="w-full py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">View Details</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Insurance Options */}
      <div className="bg-white rounded-3xl shadow-lg p-6">
        <h3 className="text-base mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-600" />
          Insurance Options
        </h3>
        <div className="space-y-3">
          {insuranceOptions.map((insurance, idx) => (
            <div
              key={idx}
              className="border-2 border-gray-200 rounded-2xl p-4 hover:border-blue-300 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-sm text-gray-900 mb-1">{insurance.provider}</div>
                  <div className="text-xs text-gray-600">{insurance.coverage}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-600">Per Year</div>
                  <div className="text-lg text-blue-600">{formatCurrency(insurance.annualPremium)}</div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-3 mb-3">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Claim Limit</span>
                  <span className="text-gray-900">{formatCurrency(insurance.claimLimit)}</span>
                </div>
              </div>

              <div className="space-y-2 mb-3">
                {insurance.features.map((feature, fidx) => (
                  <div key={fidx} className="flex items-center gap-2 text-xs text-gray-700">
                    <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <button className="w-full py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm">
                Get Quote
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Document Generator */}
      <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl shadow-xl p-6 text-white">
        <div className="flex items-center gap-2 mb-3">
          <FileText className="w-5 h-5" />
          <h3 className="text-base">Generate Report</h3>
        </div>
        <p className="text-sm opacity-95 mb-4 leading-relaxed">
          Buat laporan komprehensif untuk KPR approval, insurance applications, dan due diligence.
        </p>
        <div className="flex gap-2">
          <button className="flex-1 px-4 py-3 bg-white text-purple-700 rounded-2xl shadow-lg hover:shadow-xl transition-all text-sm">
            📄 PDF Report
          </button>
          <button className="flex-1 px-4 py-3 bg-white/20 backdrop-blur border-2 border-white text-white rounded-2xl hover:bg-white/30 transition-all text-sm">
            📧 Email
          </button>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-br from-green-50 to-yellow-50 rounded-3xl shadow-lg p-6 border-2 border-green-200">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-yellow-500 rounded-xl flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-base">AI Analysis</h3>
        </div>
        <p className="text-sm text-gray-700 leading-relaxed">
          {riskScore > 70
            ? '⚠️ High risk detected. Prioritas tinggi untuk implementasi mitigasi komprehensif. Budget minimal ' + formatCurrency(totalCost * 0.7) + ' diperlukan untuk proteksi optimal.'
            : riskScore > 50
            ? '⚡ Medium risk. Rekomendasi implementasi preventif dalam 6-12 bulan. Focus pada drainage dan waterproofing.'
            : '✅ Low risk. Mitigasi dasar sudah cukup. Fokus pada monitoring dan maintenance rutin.'}
        </p>
      </div>
    </div>
  );
}
