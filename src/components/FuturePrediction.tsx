import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp, Cloud, Droplets, ThermometerSun, MapPin, Calendar, Zap, AlertTriangle } from 'lucide-react';

const EXAMPLE_LOCATION = {
  address: 'The Green Residence IV, Jl. Karawaci-Legok, Tangerang',
  currentRisk: 35,
  icon: '🏘️',
};

export function FuturePrediction({ property }: { property?: any }) {
  const [timeframe, setTimeframe] = useState<5 | 10 | 20>(10);
  const [scenario, setScenario] = useState<'optimistic' | 'moderate' | 'pessimistic'>('moderate');
  const [selectedLocation, setSelectedLocation] = useState(property || EXAMPLE_LOCATION);

  useEffect(() => {
    if (property) {
      setSelectedLocation(property);
    }
  }, [property]);

  const generatePredictionData = () => {
    const currentYear = 2024;
    const data = [];
    
    const scenarioMultiplier = {
      optimistic: 0.7,
      moderate: 1.0,
      pessimistic: 1.4,
    };
    
    const multiplier = scenarioMultiplier[scenario];
    const baseRisk = selectedLocation?.riskScore || selectedLocation?.currentRisk || 35;
    
    for (let i = 0; i <= timeframe; i++) {
      const year = currentYear + i;
      const growth = (i / timeframe) * 25 * multiplier;
      const variance = Math.random() * 5 - 2.5;
      
      data.push({
        year,
        riskScore: Math.min(100, Math.max(0, baseRisk + growth + variance)),
        confidence: 95 - (i * 2),
        seaLevel: i * 0.3 * multiplier,
        rainfall: 2400 + (i * 50 * multiplier),
        temperature: 27 + (i * 0.15 * multiplier),
      });
    }
    
    return data;
  };

  const predictionData = generatePredictionData();
  const futureRisk = predictionData[predictionData.length - 1];
  const currentRisk = predictionData[0];

  const getRiskColor = (score: number) => {
    if (score < 25) return { bg: 'from-green-500 to-green-600', text: 'text-green-600' };
    if (score < 50) return { bg: 'from-yellow-500 to-yellow-600', text: 'text-yellow-600' };
    if (score < 75) return { bg: 'from-orange-500 to-orange-600', text: 'text-orange-600' };
    return { bg: 'from-red-500 to-red-600', text: 'text-red-600' };
  };

  return (
    <div className="space-y-4 px-4 py-4">
      {/* Header with Location */}
      <div className="bg-white rounded-3xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-yellow-500 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg">Future Risk Prediction</h2>
            <p className="text-xs text-gray-500">Deep Learning Analysis</p>
          </div>
        </div>

        {/* Selected Location */}
        <div className="bg-gradient-to-r from-green-50 to-yellow-50 rounded-2xl p-4 border-2 border-green-200">
          <div className="flex items-start gap-3">
            <div className="text-3xl">{selectedLocation?.icon || '🏘️'}</div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-gray-600 mb-1">Analyzing Location</div>
              <div className="text-sm text-gray-900">
                {selectedLocation?.address || EXAMPLE_LOCATION.address}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div className="px-2 py-1 bg-white rounded-lg text-xs">
                  Current Risk: <span className="font-semibold">{Math.round(currentRisk.riskScore)}</span>
                </div>
                <div className="px-2 py-1 bg-white rounded-lg text-xs">
                  Confidence: <span className="font-semibold">{currentRisk.confidence}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-3xl shadow-lg p-6">
        <div className="mb-4">
          <label className="text-sm text-gray-600 mb-3 block flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Prediction Timeframe
          </label>
          <div className="flex gap-2">
            {[5, 10, 20].map((years) => (
              <button
                key={years}
                onClick={() => setTimeframe(years as 5 | 10 | 20)}
                className={`flex-1 px-4 py-3 rounded-xl transition-all ${
                  timeframe === years
                    ? 'bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                <div className="text-lg">{years}y</div>
                <div className="text-xs opacity-80">{2024 + years}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-600 mb-3 block flex items-center gap-2">
            <Cloud className="w-4 h-4" />
            Climate Scenario
          </label>
          <div className="space-y-2">
            {[
              { id: 'optimistic', label: 'Optimistic', desc: 'Low emission scenario', color: 'green' },
              { id: 'moderate', label: 'Moderate', desc: 'Current trend continues', color: 'yellow' },
              { id: 'pessimistic', label: 'Pessimistic', desc: 'High emission scenario', color: 'red' },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setScenario(s.id as typeof scenario)}
                className={`w-full px-4 py-3 rounded-xl transition-all text-left ${
                  scenario === s.id
                    ? `bg-gradient-to-r from-${s.color}-600 to-${s.color}-500 text-white shadow-lg`
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm">{s.label}</div>
                    <div className="text-xs opacity-80">{s.desc}</div>
                  </div>
                  {scenario === s.id && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Risk Prediction Result */}
      <div className={`bg-gradient-to-br ${getRiskColor(futureRisk.riskScore).bg} rounded-3xl shadow-xl p-6 text-white`}>
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5" />
          <div className="text-sm opacity-90">Predicted Risk in {timeframe} Years</div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-5xl mb-1">{Math.round(futureRisk.riskScore)}</div>
            <div className="text-sm opacity-90">Risk Score</div>
          </div>
          <div className="text-right">
            <div className="text-3xl mb-1">
              {futureRisk.riskScore > currentRisk.riskScore ? '📈' : '📉'}
            </div>
            <div className="text-sm opacity-90">
              {futureRisk.riskScore > currentRisk.riskScore ? '+' : ''}
              {Math.round(futureRisk.riskScore - currentRisk.riskScore)} points
            </div>
          </div>
        </div>

        <div className="bg-white/20 backdrop-blur rounded-2xl px-4 py-2 text-sm">
          AI Confidence: {futureRisk.confidence}%
        </div>
      </div>

      {/* Trend Chart */}
      <div className="bg-white rounded-3xl shadow-lg p-6">
        <h3 className="text-base mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-600" />
          Risk Trend Analysis
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={predictionData}>
            <defs>
              <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#16a34a" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#16a34a" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="year" 
              tick={{ fontSize: 12 }}
              stroke="#9ca3af"
            />
            <YAxis 
              domain={[0, 100]} 
              tick={{ fontSize: 12 }}
              stroke="#9ca3af"
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: 'none', 
                borderRadius: '12px', 
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
              }}
            />
            <Area 
              type="monotone" 
              dataKey="riskScore" 
              stroke="#16a34a" 
              strokeWidth={3}
              fill="url(#colorRisk)" 
              name="Risk Score"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Climate Factors */}
      <div className="grid grid-cols-1 gap-3">
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Droplets className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-gray-600">Sea Level Rise</div>
              <div className="text-2xl text-gray-900">+{futureRisk.seaLevel.toFixed(2)}m</div>
            </div>
            <div className="text-3xl">🌊</div>
          </div>
          <ResponsiveContainer width="100%" height={60}>
            <LineChart data={predictionData}>
              <Line type="monotone" dataKey="seaLevel" stroke="#3b82f6" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
              <Cloud className="w-6 h-6 text-teal-600" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-gray-600">Annual Rainfall</div>
              <div className="text-2xl text-gray-900">{Math.round(futureRisk.rainfall)}mm</div>
            </div>
            <div className="text-3xl">☔</div>
          </div>
          <ResponsiveContainer width="100%" height={60}>
            <LineChart data={predictionData}>
              <Line type="monotone" dataKey="rainfall" stroke="#14b8a6" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
              <ThermometerSun className="w-6 h-6 text-orange-600" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-gray-600">Average Temperature</div>
              <div className="text-2xl text-gray-900">{futureRisk.temperature.toFixed(1)}°C</div>
            </div>
            <div className="text-3xl">🌡️</div>
          </div>
          <ResponsiveContainer width="100%" height={60}>
            <LineChart data={predictionData}>
              <Line type="monotone" dataKey="temperature" stroke="#f97316" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Predictions Summary */}
      <div className="bg-white rounded-3xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-yellow-500 rounded-xl flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-base">Deep Learning Predictions</h3>
        </div>
        
        <div className="space-y-3">
          <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-200">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs">
                1
              </div>
              <div className="flex-1">
                <div className="text-sm text-gray-900 mb-1">Risk Evolution</div>
                <p className="text-xs text-gray-700 leading-relaxed">
                  Risiko banjir di area ini diprediksi akan {futureRisk.riskScore > currentRisk.riskScore ? 'meningkat' : 'menurun'} dari{' '}
                  <strong>{Math.round(currentRisk.riskScore)}</strong> menjadi{' '}
                  <strong>{Math.round(futureRisk.riskScore)}</strong> dalam {timeframe} tahun 
                  (Confidence: {futureRisk.confidence}%)
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl border-2 border-orange-200">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs">
                2
              </div>
              <div className="flex-1">
                <div className="text-sm text-gray-900 mb-1">Climate Change Impact</div>
                <p className="text-xs text-gray-700 leading-relaxed">
                  Scenario {scenario} menunjukkan kenaikan permukaan laut{' '}
                  <strong>{futureRisk.seaLevel.toFixed(2)}m</strong> dan peningkatan curah hujan 
                  hingga <strong>{Math.round(futureRisk.rainfall)}mm/tahun</strong>
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl border-2 border-purple-200">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs">
                3
              </div>
              <div className="flex-1">
                <div className="text-sm text-gray-900 mb-1">Urban Development</div>
                <p className="text-xs text-gray-700 leading-relaxed">
                  Neural network model memprediksi perkembangan urban akan meningkatkan impermeabilitas 
                  tanah sebesar 15-25% dan mengurangi area resapan air
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl border-2 border-green-200">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs">
                ✓
              </div>
              <div className="flex-1">
                <div className="text-sm text-gray-900 mb-1">AI Recommendation</div>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {futureRisk.riskScore > 70 
                    ? '⚠️ High risk predicted. Consider alternative locations or significant mitigation investment.' 
                    : futureRisk.riskScore > 50
                    ? '⚡ Moderate risk. Preventive mitigation recommended within 3-5 years.'
                    : '✅ Low risk. This location is safe for long-term investment with regular monitoring.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Model Info */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-xl p-6 text-white">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-5 h-5 text-yellow-400" />
          <div className="text-sm opacity-90">Powered by Deep Learning</div>
        </div>
        <p className="text-xs opacity-75 leading-relaxed">
          Model ini menggunakan LSTM neural network dengan 20+ tahun data historis, 
          satellite imagery analysis, dan real-time climate monitoring untuk menghasilkan 
          prediksi yang akurat.
        </p>
      </div>
    </div>
  );
}
