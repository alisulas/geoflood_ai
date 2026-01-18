import { useState } from 'react';
import { DollarSign, TrendingDown, Calculator, PieChart as PieChartIcon, TrendingUp, AlertCircle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

export function FinancialCalculator({ property }: { property?: any }) {
  const [propertyPrice, setPropertyPrice] = useState(2500000000);
  const [riskScore] = useState(property?.riskScore || 50);
  const [projectionYears, setProjectionYears] = useState(10);

  const formatCurrency = (value: number) => {
    if (value >= 1000000000) {
      return `Rp ${(value / 1000000000).toFixed(1)}M`;
    }
    return `Rp ${(value / 1000000).toFixed(0)}jt`;
  };

  const calculateCosts = () => {
    const riskMultiplier = riskScore / 100;
    
    const annualInsurance = propertyPrice * 0.005 * (1 + riskMultiplier);
    const mitigationCost = propertyPrice * 0.08 * riskMultiplier;
    const maintenanceCost = propertyPrice * 0.015 * (1 + riskMultiplier * 0.5);
    
    const depreciationRate = riskScore > 70 ? 0.03 : riskScore > 50 ? 0.02 : 0.01;
    const futureValue = propertyPrice * Math.pow(1 - depreciationRate, projectionYears);
    const totalDepreciation = propertyPrice - futureValue;
    
    const rentalIncome = propertyPrice * 0.06;
    const totalCosts = annualInsurance + maintenanceCost;
    const netIncome = rentalIncome - totalCosts;
    const roi = (netIncome / propertyPrice) * 100;
    
    return {
      annualInsurance,
      mitigationCost,
      maintenanceCost,
      totalDepreciation,
      futureValue,
      rentalIncome,
      netIncome,
      roi,
      depreciationRate,
    };
  };

  const costs = calculateCosts();

  const generateTCOData = () => {
    const data = [];
    for (let year = 1; year <= 10; year += 2) {
      const cumulativeInsurance = costs.annualInsurance * year;
      const cumulativeMaintenance = costs.maintenanceCost * year;
      const total = cumulativeInsurance + cumulativeMaintenance + costs.mitigationCost;
      
      data.push({
        year: `${year}y`,
        total: total / 1000000000,
      });
    }
    return data;
  };

  const tcoData = generateTCOData();

  const costBreakdownData = [
    { name: 'Property', value: propertyPrice, color: '#16a34a' },
    { name: 'Insurance', value: costs.annualInsurance * 10, color: '#0ea5e9' },
    { name: 'Maintenance', value: costs.maintenanceCost * 10, color: '#f59e0b' },
    { name: 'Mitigation', value: costs.mitigationCost, color: '#8b5cf6' },
  ];

  return (
    <div className="space-y-4 px-4 py-4">
      {/* Header */}
      <div className="bg-white rounded-3xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-yellow-500 rounded-xl flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg">Financial Calculator</h2>
            <p className="text-xs text-gray-500">Investment analysis</p>
          </div>
        </div>

        {/* Input */}
        <div>
          <label className="text-sm text-gray-600 mb-2 block">Property Price (Rp)</label>
          <input
            type="number"
            value={propertyPrice}
            onChange={(e) => setPropertyPrice(Number(e.target.value))}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"
          />
          <div className="mt-3">
            <label className="text-sm text-gray-600 mb-2 block">Projection Period: {projectionYears} years</label>
            <input
              type="range"
              min="5"
              max="20"
              step="5"
              value={projectionYears}
              onChange={(e) => setProjectionYears(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-5 text-white">
          <DollarSign className="w-6 h-6 mb-2 opacity-90" />
          <div className="text-xs opacity-90 mb-1">Annual Insurance</div>
          <div className="text-lg">{formatCurrency(costs.annualInsurance)}</div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg p-5 text-white">
          <AlertCircle className="w-6 h-6 mb-2 opacity-90" />
          <div className="text-xs opacity-90 mb-1">Mitigation Cost</div>
          <div className="text-lg">{formatCurrency(costs.mitigationCost)}</div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg p-5 text-white">
          <TrendingDown className="w-6 h-6 mb-2 opacity-90" />
          <div className="text-xs opacity-90 mb-1">Depreciation</div>
          <div className="text-lg">{formatCurrency(costs.totalDepreciation)}</div>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg p-5 text-white">
          <TrendingUp className="w-6 h-6 mb-2 opacity-90" />
          <div className="text-xs opacity-90 mb-1">ROI (Rental)</div>
          <div className="text-lg">{costs.roi.toFixed(2)}%</div>
        </div>
      </div>

      {/* TCO Chart */}
      <div className="bg-white rounded-3xl shadow-lg p-6">
        <h3 className="text-base mb-4 flex items-center gap-2">
          <Calculator className="w-5 h-5 text-green-600" />
          Total Cost of Ownership
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={tcoData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="year" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip 
              formatter={(value: number) => `Rp ${value.toFixed(2)}M`}
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: 'none', 
                borderRadius: '12px', 
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
              }}
            />
            <Bar dataKey="total" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#16a34a" />
                <stop offset="100%" stopColor="#eab308" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Cost Breakdown */}
      <div className="bg-white rounded-3xl shadow-lg p-6">
        <h3 className="text-base mb-4 flex items-center gap-2">
          <PieChartIcon className="w-5 h-5 text-green-600" />
          10-Year Cost Breakdown
        </h3>
        
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={costBreakdownData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {costBreakdownData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => formatCurrency(value)} />
          </PieChart>
        </ResponsiveContainer>

        <div className="space-y-2 mt-4">
          {costBreakdownData.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl">
              <div className="flex items-center gap-3">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-gray-700">{item.name}</span>
              </div>
              <span className="text-sm text-gray-900">{formatCurrency(item.value)}</span>
            </div>
          ))}
          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-yellow-50 rounded-2xl border-2 border-green-200">
            <span className="text-sm text-gray-900">Total</span>
            <span className="text-sm text-green-700">
              {formatCurrency(costBreakdownData.reduce((sum, item) => sum + item.value, 0))}
            </span>
          </div>
        </div>
      </div>

      {/* Property Value Projection */}
      <div className="bg-white rounded-3xl shadow-lg p-6">
        <h3 className="text-base mb-4">Property Value Projection</h3>
        <div className="space-y-3">
          <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-600 mb-1">Current Value</div>
                <div className="text-xl text-blue-600">{formatCurrency(propertyPrice)}</div>
              </div>
              <div className="text-3xl">🏠</div>
            </div>
          </div>
          
          <div className="p-4 bg-orange-50 rounded-2xl border border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-600 mb-1">In {projectionYears} Years</div>
                <div className="text-xl text-orange-600">{formatCurrency(costs.futureValue)}</div>
              </div>
              <div className="text-3xl">📉</div>
            </div>
          </div>
          
          <div className="p-4 bg-red-50 rounded-2xl border border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-600 mb-1">Depreciation</div>
                <div className="text-xl text-red-600">{formatCurrency(costs.totalDepreciation)}</div>
                <div className="text-xs text-red-600 mt-1">
                  -{(costs.depreciationRate * 100).toFixed(1)}% per year
                </div>
              </div>
              <div className="text-3xl">⚠️</div>
            </div>
          </div>
        </div>
      </div>

      {/* Investment Analysis */}
      <div className="bg-white rounded-3xl shadow-lg p-6">
        <h3 className="text-base mb-4">Investment Analysis</h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-green-50 rounded-2xl p-4 border border-green-200">
            <div className="text-xs text-gray-600 mb-1">Rental Income</div>
            <div className="text-base text-green-600">{formatCurrency(costs.rentalIncome)}</div>
            <div className="text-xs text-gray-500 mt-1">Per year</div>
          </div>
          <div className="bg-orange-50 rounded-2xl p-4 border border-orange-200">
            <div className="text-xs text-gray-600 mb-1">Annual Cost</div>
            <div className="text-base text-orange-600">
              {formatCurrency(costs.annualInsurance + costs.maintenanceCost)}
            </div>
            <div className="text-xs text-gray-500 mt-1">Total</div>
          </div>
          <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200">
            <div className="text-xs text-gray-600 mb-1">Net Income</div>
            <div className="text-base text-blue-600">{formatCurrency(costs.netIncome)}</div>
            <div className="text-xs text-gray-500 mt-1">Yearly</div>
          </div>
        </div>
      </div>

      {/* Recommendation */}
      <div className="bg-gradient-to-br from-green-600 to-yellow-500 rounded-3xl shadow-xl p-6 text-white">
        <div className="flex items-center gap-2 mb-3">
          <DollarSign className="w-5 h-5" />
          <h3 className="text-base">Financial Recommendation</h3>
        </div>
        <p className="text-sm opacity-95 leading-relaxed">
          {riskScore > 70
            ? `⚠️ High financial risk: Property ini memiliki potensi depreciation ${((costs.totalDepreciation / propertyPrice) * 100).toFixed(1)}% dan biaya operasional tinggi. Pertimbangkan properti alternatif atau budget tambahan ${formatCurrency(costs.mitigationCost)} untuk mitigasi.`
            : riskScore > 50
            ? `⚡ Moderate risk: Investasi layak dengan mitigasi yang tepat. Budget ${formatCurrency(costs.mitigationCost)} dapat mengamankan nilai investasi Anda.`
            : `✅ Low risk: Investasi solid dengan ROI ${costs.roi.toFixed(2)}% per tahun. Biaya operasional terjangkau dan risiko depreciation minimal.`}
        </p>
      </div>
    </div>
  );
}
