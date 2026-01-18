import { useState } from 'react';
import { Plus, X, Check, BarChart3, TrendingDown, Shield } from 'lucide-react';

interface Property {
  id: string;
  address: string;
  riskScore: number;
  price: number;
  elevation: number;
  distanceToWater: number;
  drainageScore: number;
  historicalFloods: number;
  insuranceCost: number;
}

export function PropertyComparison() {
  const [properties] = useState<Property[]>([
    {
      id: '1',
      address: 'The Green Residence IV, Tangerang',
      riskScore: 35,
      price: 1800000000,
      elevation: 8.5,
      distanceToWater: 1200,
      drainageScore: 75,
      historicalFloods: 1,
      insuranceCost: 12000000,
    },
    {
      id: '2',
      address: 'Pantai Indah Kapuk, Jakarta Utara',
      riskScore: 78,
      price: 3200000000,
      elevation: 2.1,
      distanceToWater: 350,
      drainageScore: 45,
      historicalFloods: 6,
      insuranceCost: 45000000,
    },
    {
      id: '3',
      address: 'BSD City, Tangerang Selatan',
      riskScore: 22,
      price: 2100000000,
      elevation: 11.5,
      distanceToWater: 1800,
      drainageScore: 88,
      historicalFloods: 0,
      insuranceCost: 8000000,
    },
  ]);

  const getRiskColor = (score: number) => {
    if (score < 25) return { bg: 'from-green-500 to-green-600', text: 'text-green-600', light: 'bg-green-50' };
    if (score < 50) return { bg: 'from-yellow-500 to-yellow-600', text: 'text-yellow-600', light: 'bg-yellow-50' };
    if (score < 75) return { bg: 'from-orange-500 to-orange-600', text: 'text-orange-600', light: 'bg-orange-50' };
    return { bg: 'from-red-500 to-red-600', text: 'text-red-600', light: 'bg-red-50' };
  };

  const formatCurrency = (value: number) => {
    if (value >= 1000000000) {
      return `Rp ${(value / 1000000000).toFixed(1)}M`;
    }
    return `Rp ${(value / 1000000).toFixed(0)}jt`;
  };

  const getBestValue = (metric: keyof Property) => {
    if (metric === 'riskScore' || metric === 'historicalFloods' || metric === 'insuranceCost' || metric === 'price') {
      return Math.min(...properties.map(p => p[metric] as number));
    }
    return Math.max(...properties.map(p => p[metric] as number));
  };

  return (
    <div className="space-y-4 px-4 py-4">
      {/* Header */}
      <div className="bg-white rounded-3xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-yellow-500 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg">Compare Properties</h2>
              <p className="text-xs text-gray-500">Side-by-side analysis</p>
            </div>
          </div>
          <button className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
            <Plus className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Property Count */}
        <div className="bg-gradient-to-r from-green-50 to-yellow-50 rounded-2xl p-4 border-2 border-green-200">
          <div className="text-sm text-gray-700">
            Comparing <strong>{properties.length} properties</strong> based on flood risk and financial factors
          </div>
        </div>
      </div>

      {/* Properties Comparison Cards */}
      <div className="space-y-3">
        {properties.map((property, index) => {
          const color = getRiskColor(property.riskScore);
          const isBestRisk = property.riskScore === getBestValue('riskScore');
          const isBestPrice = property.price === getBestValue('price');
          
          return (
            <div key={property.id} className="bg-white rounded-3xl shadow-lg overflow-hidden">
              {/* Header with Risk Score */}
              <div className={`bg-gradient-to-br ${color.bg} p-5 text-white`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="text-xs opacity-90 mb-1">Property #{index + 1}</div>
                    <div className="text-sm pr-2">{property.address}</div>
                  </div>
                  {isBestRisk && (
                    <div className="bg-white/20 backdrop-blur rounded-full px-3 py-1 text-xs whitespace-nowrap flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      Best
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-4">
                  <div>
                    <div className="text-3xl">{property.riskScore}</div>
                    <div className="text-xs opacity-90">Risk Score</div>
                  </div>
                  <div className="flex-1">
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-white"
                        style={{ width: `${property.riskScore}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="p-5 space-y-3">
                {/* Price */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <span>💰</span>
                    <span>Price</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {isBestPrice && <Check className="w-4 h-4 text-green-600" />}
                    <span className="text-sm">{formatCurrency(property.price)}</span>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-blue-50 rounded-2xl p-3">
                    <div className="text-xs text-gray-600 mb-1">Elevation</div>
                    <div className="flex items-center gap-1">
                      {property.elevation === getBestValue('elevation') && (
                        <Check className="w-3 h-3 text-blue-600" />
                      )}
                      <span className="text-sm text-blue-600">{property.elevation}m</span>
                    </div>
                  </div>

                  <div className="bg-teal-50 rounded-2xl p-3">
                    <div className="text-xs text-gray-600 mb-1">To Water</div>
                    <div className="flex items-center gap-1">
                      {property.distanceToWater === getBestValue('distanceToWater') && (
                        <Check className="w-3 h-3 text-teal-600" />
                      )}
                      <span className="text-sm text-teal-600">{property.distanceToWater}m</span>
                    </div>
                  </div>

                  <div className="bg-purple-50 rounded-2xl p-3">
                    <div className="text-xs text-gray-600 mb-1">Drainage</div>
                    <div className="flex items-center gap-1">
                      {property.drainageScore === getBestValue('drainageScore') && (
                        <Check className="w-3 h-3 text-purple-600" />
                      )}
                      <span className="text-sm text-purple-600">{property.drainageScore}/100</span>
                    </div>
                  </div>

                  <div className="bg-orange-50 rounded-2xl p-3">
                    <div className="text-xs text-gray-600 mb-1">Floods (10y)</div>
                    <div className="flex items-center gap-1">
                      {property.historicalFloods === getBestValue('historicalFloods') && (
                        <Check className="w-3 h-3 text-orange-600" />
                      )}
                      <span className="text-sm text-orange-600">{property.historicalFloods}x</span>
                    </div>
                  </div>
                </div>

                {/* Insurance */}
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-200">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Shield className="w-4 h-4 text-purple-600" />
                    <span>Annual Insurance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {property.insuranceCost === getBestValue('insuranceCost') && (
                      <Check className="w-4 h-4 text-purple-600" />
                    )}
                    <span className="text-sm text-purple-600">{formatCurrency(property.insuranceCost)}</span>
                  </div>
                </div>

                {/* TCO */}
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl border border-green-200">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <TrendingDown className="w-4 h-4 text-green-600" />
                    <span>TCO (5 years)</span>
                  </div>
                  <span className="text-sm text-green-600">
                    {formatCurrency(property.price + (property.insuranceCost * 5))}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Best Choice Recommendation */}
      <div className="bg-gradient-to-br from-green-600 to-yellow-500 rounded-3xl shadow-xl p-6 text-white">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
            <BarChart3 className="w-5 h-5" />
          </div>
          <h3 className="text-base">AI Recommendation</h3>
        </div>
        <p className="text-sm opacity-95 leading-relaxed">
          <strong>{properties.reduce((best, curr) => 
            curr.riskScore < best.riskScore ? curr : best
          ).address}</strong> adalah pilihan terbaik dengan risiko banjir terendah ({properties.reduce((best, curr) => 
            curr.riskScore < best.riskScore ? curr : best
          ).riskScore}) dan sistem mitigasi yang excellent. Property ini menawarkan nilai investasi jangka panjang yang optimal.
        </p>
      </div>

      {/* Comparison Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-2xl shadow-lg p-5">
          <div className="text-xs text-gray-600 mb-2">Best Risk Score</div>
          <div className="text-2xl text-green-600">{getBestValue('riskScore')}</div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-5">
          <div className="text-xs text-gray-600 mb-2">Lowest Insurance</div>
          <div className="text-lg text-blue-600">{formatCurrency(getBestValue('insuranceCost'))}</div>
        </div>
      </div>
    </div>
  );
}
