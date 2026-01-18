import { useState } from 'react';
import { Layers, Calendar, TrendingUp, Info, MapPin, Maximize2 } from 'lucide-react';

export function FloodMap() {
  const [selectedLayer, setSelectedLayer] = useState<'historical' | 'current' | 'future'>('current');
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  // Indonesia regions with risk data
  const indonesiaRegions = [
    { id: 'jakarta', name: 'DKI Jakarta', risk: 78, color: '#ef4444', x: 52, y: 48 },
    { id: 'jabar', name: 'Jawa Barat', risk: 65, color: '#f97316', x: 50, y: 52 },
    { id: 'jateng', name: 'Jawa Tengah', risk: 58, color: '#f59e0b', x: 54, y: 54 },
    { id: 'jatim', name: 'Jawa Timur', risk: 52, color: '#eab308', x: 60, y: 54 },
    { id: 'banten', name: 'Banten', risk: 68, color: '#f97316', x: 48, y: 50 },
    { id: 'yogya', name: 'DI Yogyakarta', risk: 45, color: '#eab308', x: 54, y: 56 },
    { id: 'sumut', name: 'Sumatera Utara', risk: 62, color: '#f97316', x: 32, y: 28 },
    { id: 'sumbar', name: 'Sumatera Barat', risk: 55, color: '#eab308', x: 28, y: 38 },
    { id: 'riau', name: 'Riau', risk: 70, color: '#ef4444', x: 32, y: 38 },
    { id: 'sumsel', name: 'Sumatera Selatan', risk: 72, color: '#ef4444', x: 30, y: 46 },
    { id: 'kalbar', name: 'Kalimantan Barat', risk: 58, color: '#f59e0b', x: 48, y: 38 },
    { id: 'kaltim', name: 'Kalimantan Timur', risk: 48, color: '#eab308', x: 60, y: 38 },
    { id: 'sulsel', name: 'Sulawesi Selatan', risk: 52, color: '#eab308', x: 66, y: 46 },
    { id: 'sulut', name: 'Sulawesi Utara', risk: 45, color: '#eab308', x: 68, y: 32 },
    { id: 'bali', name: 'Bali', risk: 42, color: '#eab308', x: 62, y: 56 },
    { id: 'ntb', name: 'NTB', risk: 38, color: '#22c55e', x: 64, y: 58 },
    { id: 'ntt', name: 'NTT', risk: 35, color: '#22c55e', x: 68, y: 58 },
    { id: 'papua', name: 'Papua', risk: 40, color: '#eab308', x: 82, y: 46 },
  ];

  const getRiskLabel = (risk: number) => {
    if (risk < 25) return 'Rendah';
    if (risk < 50) return 'Sedang';
    if (risk < 75) return 'Tinggi';
    return 'Sangat Tinggi';
  };

  const getRiskColor = (risk: number) => {
    if (risk < 25) return '#22c55e';
    if (risk < 50) return '#eab308';
    if (risk < 75) return '#f97316';
    return '#ef4444';
  };

  return (
    <div className="space-y-4 px-4 py-4">
      {/* Header */}
      <div className="bg-white rounded-3xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-yellow-500 rounded-xl flex items-center justify-center">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg">Indonesia Flood Risk Map</h2>
            <p className="text-xs text-gray-500">Real-time risk visualization</p>
          </div>
        </div>

        {/* Layer Selection */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setSelectedLayer('historical')}
            className={`flex-1 px-4 py-3 rounded-xl transition-all ${
              selectedLayer === 'historical'
                ? 'bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            <Calendar className="w-4 h-4 mx-auto mb-1" />
            <div className="text-xs">Historical</div>
          </button>
          <button
            onClick={() => setSelectedLayer('current')}
            className={`flex-1 px-4 py-3 rounded-xl transition-all ${
              selectedLayer === 'current'
                ? 'bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            <Layers className="w-4 h-4 mx-auto mb-1" />
            <div className="text-xs">Current</div>
          </button>
          <button
            onClick={() => setSelectedLayer('future')}
            className={`flex-1 px-4 py-3 rounded-xl transition-all ${
              selectedLayer === 'future'
                ? 'bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            <TrendingUp className="w-4 h-4 mx-auto mb-1" />
            <div className="text-xs">Prediction</div>
          </button>
        </div>
      </div>

      {/* Map Visualization */}
      <div className="bg-white rounded-3xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Info className="w-4 h-4" />
            <span>Tap region for details</span>
          </div>
          <button className="p-2 bg-gray-100 rounded-xl">
            <Maximize2 className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Simplified Indonesia Map */}
        <div className="relative w-full aspect-[16/10] bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl overflow-hidden border-2 border-blue-200">
          <svg viewBox="0 0 100 70" className="w-full h-full">
            {/* Water/Ocean background elements */}
            <defs>
              <pattern id="waves" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M0 10 Q 5 8, 10 10 T 20 10" stroke="#3b82f6" strokeWidth="0.3" fill="none" opacity="0.2"/>
              </pattern>
            </defs>
            <rect width="100" height="70" fill="url(#waves)"/>

            {/* Sumatra (simplified) */}
            <path
              d="M 25 25 Q 28 30, 26 35 L 24 42 Q 26 46, 28 48 L 26 52 Q 24 54, 22 52 L 20 48 Q 18 44, 20 40 L 22 35 Q 20 30, 22 26 Z"
              fill="#86efac"
              stroke="#22c55e"
              strokeWidth="0.5"
              className="hover:opacity-80 cursor-pointer transition-opacity"
            />

            {/* Java (simplified) */}
            <path
              d="M 45 48 L 64 48 Q 66 50, 64 52 L 62 54 Q 60 56, 58 54 L 46 54 Q 44 52, 45 50 Z"
              fill="#fde047"
              stroke="#eab308"
              strokeWidth="0.5"
              className="hover:opacity-80 cursor-pointer transition-opacity"
            />

            {/* Kalimantan (simplified) */}
            <path
              d="M 45 32 Q 48 30, 52 32 L 58 36 Q 60 40, 58 44 L 54 46 Q 50 48, 46 46 L 42 42 Q 40 38, 42 34 Z"
              fill="#fcd34d"
              stroke="#f59e0b"
              strokeWidth="0.5"
              className="hover:opacity-80 cursor-pointer transition-opacity"
            />

            {/* Sulawesi (simplified) */}
            <path
              d="M 65 28 Q 68 26, 70 28 L 72 32 Q 74 36, 72 40 L 68 46 Q 66 48, 64 46 L 62 42 Q 60 38, 62 34 L 64 30 Z"
              fill="#fcd34d"
              stroke="#f59e0b"
              strokeWidth="0.5"
              className="hover:opacity-80 cursor-pointer transition-opacity"
            />

            {/* Papua (simplified) */}
            <path
              d="M 75 40 Q 78 38, 82 40 L 88 44 Q 90 46, 88 48 L 84 50 Q 80 52, 76 50 L 72 46 Q 70 44, 72 42 Z"
              fill="#bef264"
              stroke="#84cc16"
              strokeWidth="0.5"
              className="hover:opacity-80 cursor-pointer transition-opacity"
            />

            {/* Region Markers */}
            {indonesiaRegions.map((region) => (
              <g key={region.id}>
                <circle
                  cx={region.x}
                  cy={region.y}
                  r="3"
                  fill={region.color}
                  opacity="0.8"
                  className="cursor-pointer hover:opacity-100 transition-opacity"
                  onClick={() => setSelectedRegion(region.id)}
                />
                <circle
                  cx={region.x}
                  cy={region.y}
                  r="4.5"
                  fill="none"
                  stroke={region.color}
                  strokeWidth="0.5"
                  opacity="0.5"
                  className="cursor-pointer"
                  onClick={() => setSelectedRegion(region.id)}
                >
                  <animate
                    attributeName="r"
                    from="4.5"
                    to="6"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    from="0.5"
                    to="0"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            ))}
          </svg>
        </div>

        {/* Legend */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="text-xs text-gray-600 mb-3">Risk Level</div>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
              <span className="text-xs text-gray-600">Low (0-25)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
              <span className="text-xs text-gray-600">Medium (25-50)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-orange-500"></div>
              <span className="text-xs text-gray-600">High (50-75)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500"></div>
              <span className="text-xs text-gray-600">Very High (75-100)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg p-5 text-white">
          <div className="text-3xl mb-2">23%</div>
          <div className="text-xs opacity-90">Low Risk Areas</div>
        </div>
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl shadow-lg p-5 text-white">
          <div className="text-3xl mb-2">35%</div>
          <div className="text-xs opacity-90">Medium Risk</div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg p-5 text-white">
          <div className="text-3xl mb-2">28%</div>
          <div className="text-xs opacity-90">High Risk</div>
        </div>
        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-lg p-5 text-white">
          <div className="text-3xl mb-2">14%</div>
          <div className="text-xs opacity-90">Very High Risk</div>
        </div>
      </div>

      {/* Region List */}
      <div className="bg-white rounded-3xl shadow-lg p-6">
        <h3 className="text-base mb-4">Regions Risk Overview</h3>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {indonesiaRegions
            .sort((a, b) => b.risk - a.risk)
            .map((region) => (
              <div
                key={region.id}
                onClick={() => setSelectedRegion(region.id)}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                  selectedRegion === region.id
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getRiskColor(region.risk) }}
                    ></div>
                    <span className="text-sm text-gray-900">{region.name}</span>
                  </div>
                  <span
                    className="text-xs px-2 py-1 rounded-lg"
                    style={{
                      backgroundColor: `${getRiskColor(region.risk)}20`,
                      color: getRiskColor(region.risk),
                    }}
                  >
                    {getRiskLabel(region.risk)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full transition-all duration-500"
                      style={{
                        width: `${region.risk}%`,
                        backgroundColor: getRiskColor(region.risk),
                      }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">{region.risk}%</span>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-br from-green-50 to-yellow-50 rounded-3xl shadow-lg p-6 border-2 border-green-200">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-yellow-500 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-base">AI Insights</h3>
        </div>
        <p className="text-sm text-gray-700 leading-relaxed">
          Berdasarkan analisis ML, area Jakarta dan sekitarnya menunjukkan tren peningkatan risiko banjir.
          Model prediksi kami merekomendasikan monitoring ketat untuk 14 provinsi dengan risk score di atas 50%.
        </p>
      </div>
    </div>
  );
}
