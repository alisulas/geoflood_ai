import { useState } from 'react';
import { MapPin, Calendar, ThumbsUp, AlertTriangle, CheckCircle, Image, Users, Plus, Filter } from 'lucide-react';

interface FloodReport {
  id: string;
  location: string;
  date: string;
  severity: 'Low' | 'Medium' | 'High';
  waterDepth: number;
  duration: number;
  verified: boolean;
  likes: number;
  reporter: string;
  description: string;
  images?: number;
}

export function CommunityReports() {
  const [reports] = useState<FloodReport[]>([
    {
      id: '1',
      location: 'Jl. Sudirman, Jakarta Selatan',
      date: '2024-12-10',
      severity: 'High',
      waterDepth: 80,
      duration: 6,
      verified: true,
      likes: 24,
      reporter: 'Ahmad R.',
      description: 'Banjir cukup parah, air masuk ke beberapa rumah. Sistem drainase tersumbat sampah.',
      images: 3,
    },
    {
      id: '2',
      location: 'Jl. Karawaci, Tangerang',
      date: '2024-12-12',
      severity: 'Low',
      waterDepth: 20,
      duration: 2,
      verified: true,
      likes: 12,
      reporter: 'Budi S.',
      description: 'Genangan ringan setelah hujan deras di area Green Residence, cepat surut.',
      images: 2,
    },
    {
      id: '3',
      location: 'Pantai Indah Kapuk, Jakarta Utara',
      date: '2024-12-08',
      severity: 'High',
      waterDepth: 120,
      duration: 8,
      verified: true,
      likes: 42,
      reporter: 'Dewi L.',
      description: 'Banjir besar, banyak kendaraan mogok. Evakuasi diperlukan di beberapa area.',
      images: 5,
    },
    {
      id: '4',
      location: 'BSD City, Tangerang Selatan',
      date: '2024-12-13',
      severity: 'Low',
      waterDepth: 15,
      duration: 1,
      verified: true,
      likes: 8,
      reporter: 'Siti M.',
      description: 'Genangan minimal, hanya di beberapa titik rendah. Sistem drainase berfungsi baik.',
      images: 1,
    },
    {
      id: '5',
      location: 'Jl. Gatot Subroto, Jakarta Selatan',
      date: '2024-12-11',
      severity: 'Medium',
      waterDepth: 50,
      duration: 4,
      verified: false,
      likes: 15,
      reporter: 'Andi P.',
      description: 'Banjir sedang di area perumahan. Traffic terganggu beberapa jam.',
      images: 2,
    },
  ]);

  const [filterSeverity, setFilterSeverity] = useState<'All' | 'Low' | 'Medium' | 'High'>('All');
  const [showFilter, setShowFilter] = useState(false);

  const filteredReports = reports.filter((report) => {
    if (filterSeverity !== 'All' && report.severity !== filterSeverity) return false;
    return true;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Low':
        return { bg: 'from-green-500 to-green-600', badge: 'bg-green-100 text-green-700' };
      case 'Medium':
        return { bg: 'from-yellow-500 to-yellow-600', badge: 'bg-yellow-100 text-yellow-700' };
      case 'High':
        return { bg: 'from-red-500 to-red-600', badge: 'bg-red-100 text-red-700' };
      default:
        return { bg: 'from-gray-500 to-gray-600', badge: 'bg-gray-100 text-gray-700' };
    }
  };

  return (
    <div className="space-y-4 px-4 py-4">
      {/* Header */}
      <div className="bg-white rounded-3xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-yellow-500 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg">Community Reports</h2>
              <p className="text-xs text-gray-500">Crowdsourced flood data</p>
            </div>
          </div>
          <button className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
            <Plus className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-3 text-center">
            <div className="text-xl text-blue-600">{reports.length}</div>
            <div className="text-xs text-gray-600">Reports</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-3 text-center">
            <div className="text-xl text-green-600">
              {reports.filter((r) => r.verified).length}
            </div>
            <div className="text-xs text-gray-600">Verified</div>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-3 text-center">
            <div className="text-xl text-red-600">
              {reports.filter((r) => r.severity === 'High').length}
            </div>
            <div className="text-xs text-gray-600">Critical</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-3 text-center">
            <div className="text-xl text-purple-600">
              {(reports.reduce((sum, r) => sum + r.duration, 0) / reports.length).toFixed(0)}h
            </div>
            <div className="text-xs text-gray-600">Avg Time</div>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-3xl shadow-lg p-4">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="w-full flex items-center justify-between"
        >
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Filter className="w-4 h-4" />
            <span>Filter: {filterSeverity}</span>
          </div>
          <div className={`transition-transform ${showFilter ? 'rotate-180' : ''}`}>▼</div>
        </button>
        
        {showFilter && (
          <div className="mt-3 pt-3 border-t border-gray-200 flex gap-2">
            {(['All', 'Low', 'Medium', 'High'] as const).map((severity) => (
              <button
                key={severity}
                onClick={() => {
                  setFilterSeverity(severity);
                  setShowFilter(false);
                }}
                className={`flex-1 px-3 py-2 rounded-xl text-xs transition-all ${
                  filterSeverity === severity
                    ? 'bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {severity}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Reports List */}
      <div className="space-y-3">
        {filteredReports.map((report) => (
          <div
            key={report.id}
            className="bg-white rounded-3xl shadow-lg overflow-hidden"
          >
            {/* Header */}
            <div className={`bg-gradient-to-br ${getSeverityColor(report.severity).bg} p-4 text-white`}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm truncate">{report.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs opacity-90">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(report.date).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </span>
                    <span>by {report.reporter}</span>
                  </div>
                </div>
                {report.verified && (
                  <div className="bg-white/20 backdrop-blur rounded-full p-1.5">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-xl text-xs ${getSeverityColor(report.severity).badge} bg-white`}>
                  {report.severity} Severity
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <p className="text-sm text-gray-700 mb-4 leading-relaxed">{report.description}</p>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="bg-blue-50 rounded-xl p-3 text-center">
                  <div className="text-blue-600 mb-1">💧</div>
                  <div className="text-xs text-gray-600">Water Depth</div>
                  <div className="text-sm text-blue-600">{report.waterDepth}cm</div>
                </div>
                <div className="bg-purple-50 rounded-xl p-3 text-center">
                  <div className="text-purple-600 mb-1">⏱️</div>
                  <div className="text-xs text-gray-600">Duration</div>
                  <div className="text-sm text-purple-600">{report.duration}h</div>
                </div>
                <div className="bg-teal-50 rounded-xl p-3 text-center">
                  <div className="text-teal-600 mb-1">📸</div>
                  <div className="text-xs text-gray-600">Photos</div>
                  <div className="text-sm text-teal-600">{report.images || 0}</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-50 to-green-100 text-green-700 rounded-xl hover:shadow-md transition-all">
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-sm">Helpful ({report.likes})</span>
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:shadow-md transition-all">
                  <Image className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredReports.length === 0 && (
        <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-gray-600">No reports found</p>
        </div>
      )}

      {/* Add Report CTA */}
      <div className="bg-gradient-to-br from-green-600 to-yellow-500 rounded-3xl shadow-xl p-6 text-white">
        <h3 className="text-base mb-2">Help Your Community</h3>
        <p className="text-sm opacity-90 mb-4">
          Laporkan kejadian banjir di area Anda untuk membantu sesama pengguna membuat keputusan yang lebih baik.
        </p>
        <button className="w-full px-6 py-3 bg-white text-green-700 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
          <Plus className="w-5 h-5" />
          <span>Submit Flood Report</span>
        </button>
      </div>
    </div>
  );
}
