import { useState } from 'react';
import { Bell, AlertTriangle, Cloud, Droplets, MapPin, Plus, X, Zap } from 'lucide-react';

interface Alert {
  id: string;
  location: string;
  type: 'warning' | 'watch' | 'advisory';
  severity: 'Low' | 'Medium' | 'High';
  message: string;
  timestamp: string;
  validUntil: string;
}

interface Watchlist {
  id: string;
  address: string;
  riskScore: number;
  alertsEnabled: boolean;
}

export function AlertSystem() {
  const [activeAlerts] = useState<Alert[]>([
    {
      id: '1',
      location: 'Jakarta Selatan',
      type: 'warning',
      severity: 'High',
      message: 'Heavy rainfall expected (150-200mm) in the next 6 hours. High flood risk in low-lying areas.',
      timestamp: '2024-12-15T10:00:00',
      validUntil: '2024-12-15T20:00:00',
    },
    {
      id: '2',
      location: 'Tangerang',
      type: 'watch',
      severity: 'Medium',
      message: 'River water levels rising. Monitor conditions closely.',
      timestamp: '2024-12-15T08:30:00',
      validUntil: '2024-12-16T08:30:00',
    },
    {
      id: '3',
      location: 'Jakarta Utara',
      type: 'warning',
      severity: 'High',
      message: 'Coastal flooding possible due to high tide combined with rain.',
      timestamp: '2024-12-15T09:00:00',
      validUntil: '2024-12-15T18:00:00',
    },
  ]);

  const [watchlist, setWatchlist] = useState<Watchlist[]>([
    {
      id: '1',
      address: 'The Green Residence IV, Tangerang',
      riskScore: 35,
      alertsEnabled: true,
    },
    {
      id: '2',
      address: 'Pantai Indah Kapuk, Jakarta Utara',
      riskScore: 78,
      alertsEnabled: true,
    },
  ]);

  const [weatherData] = useState({
    temperature: 28,
    humidity: 85,
    rainfall: 45,
    windSpeed: 15,
    forecast: 'Heavy Rain',
  });

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'warning':
        return { bg: 'from-red-500 to-red-600', badge: 'bg-red-100 text-red-700' };
      case 'watch':
        return { bg: 'from-orange-500 to-orange-600', badge: 'bg-orange-100 text-orange-700' };
      case 'advisory':
        return { bg: 'from-yellow-500 to-yellow-600', badge: 'bg-yellow-100 text-yellow-700' };
      default:
        return { bg: 'from-gray-500 to-gray-600', badge: 'bg-gray-100 text-gray-700' };
    }
  };

  const toggleAlert = (id: string) => {
    setWatchlist(
      watchlist.map((item) =>
        item.id === id ? { ...item, alertsEnabled: !item.alertsEnabled } : item
      )
    );
  };

  const removeFromWatchlist = (id: string) => {
    setWatchlist(watchlist.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-4 px-4 py-4">
      {/* Header */}
      <div className="bg-white rounded-3xl shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-yellow-500 rounded-xl flex items-center justify-center">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg">Alert System</h2>
              <p className="text-xs text-gray-500">Real-time monitoring</p>
            </div>
          </div>
          <div className="bg-red-500 text-white px-3 py-1.5 rounded-full text-xs shadow-lg">
            {activeAlerts.length} Active
          </div>
        </div>
      </div>

      {/* Current Weather */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-500 rounded-3xl shadow-xl p-6 text-white">
        <div className="flex items-center gap-2 mb-4">
          <Cloud className="w-5 h-5" />
          <h3 className="text-base">Weather Now</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/10 backdrop-blur rounded-2xl p-4">
            <div className="text-3xl mb-2">🌡️</div>
            <div className="text-xs opacity-90">Temperature</div>
            <div className="text-xl">{weatherData.temperature}°C</div>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-2xl p-4">
            <div className="text-3xl mb-2">💧</div>
            <div className="text-xs opacity-90">Humidity</div>
            <div className="text-xl">{weatherData.humidity}%</div>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-2xl p-4">
            <div className="text-3xl mb-2">☔</div>
            <div className="text-xs opacity-90">Rainfall</div>
            <div className="text-xl">{weatherData.rainfall}mm</div>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-2xl p-4">
            <div className="text-3xl mb-2">💨</div>
            <div className="text-xs opacity-90">Wind</div>
            <div className="text-xl">{weatherData.windSpeed} km/h</div>
          </div>
        </div>

        <div className="mt-4 bg-white/20 backdrop-blur rounded-2xl p-3 text-center">
          <div className="text-sm opacity-90">Forecast</div>
          <div className="text-lg">{weatherData.forecast}</div>
        </div>
      </div>

      {/* Active Alerts */}
      <div className="space-y-3">
        <h3 className="text-sm text-gray-600 px-2">⚠️ Active Alerts</h3>
        {activeAlerts.map((alert) => {
          const color = getAlertColor(alert.type);
          return (
            <div
              key={alert.id}
              className="bg-white rounded-3xl shadow-lg overflow-hidden"
            >
              <div className={`bg-gradient-to-br ${color.bg} p-4 text-white`}>
                <div className="flex items-start gap-3 mb-3">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm uppercase tracking-wide">{alert.type}</span>
                      <span className={`px-2 py-0.5 rounded-lg text-xs ${color.badge} bg-white`}>
                        {alert.severity}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs opacity-90">
                      <MapPin className="w-3 h-3" />
                      <span>{alert.location}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <p className="text-sm text-gray-700 leading-relaxed mb-3">{alert.message}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>
                    Issued: {new Date(alert.timestamp).toLocaleTimeString('id-ID', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                  <span>
                    Until: {new Date(alert.validUntil).toLocaleTimeString('id-ID', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Watchlist */}
      <div className="bg-white rounded-3xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base flex items-center gap-2">
            <MapPin className="w-5 h-5 text-green-600" />
            Property Watchlist
          </h3>
          <button className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
            <Plus className="w-4 h-4 text-white" />
          </button>
        </div>

        <div className="space-y-3">
          {watchlist.map((item) => (
            <div
              key={item.id}
              className="p-4 border-2 border-gray-200 rounded-2xl hover:border-green-300 transition-colors"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-gray-900 mb-1 truncate">{item.address}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-600">Risk: {item.riskScore}</span>
                    <span
                      className={`px-2 py-0.5 rounded-lg text-xs ${
                        item.riskScore < 50
                          ? 'bg-green-100 text-green-700'
                          : item.riskScore < 75
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {item.riskScore < 50 ? 'Low-Medium' : item.riskScore < 75 ? 'High' : 'Very High'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => toggleAlert(item.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl transition-all ${
                    item.alertsEnabled
                      ? 'bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  <Bell className="w-4 h-4" />
                  <span className="text-xs">{item.alertsEnabled ? 'Alerts ON' : 'Alerts OFF'}</span>
                </button>
                <button
                  onClick={() => removeFromWatchlist(item.id)}
                  className="px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {watchlist.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Bell className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm">No properties in watchlist</p>
            </div>
          )}
        </div>
      </div>

      {/* BMKG Integration */}
      <div className="bg-gradient-to-br from-green-50 to-yellow-50 rounded-3xl shadow-lg p-6 border-2 border-green-200">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-yellow-500 rounded-xl flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-base">BMKG Integration</h3>
        </div>
        <p className="text-sm text-gray-700 leading-relaxed">
          Data real-time dari BMKG (Badan Meteorologi, Klimatologi, dan Geofisika). 
          Update setiap 15 menit untuk peringatan dini yang akurat.
        </p>
        <div className="mt-4 flex items-center gap-2 text-xs text-green-700">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Live monitoring active</span>
        </div>
      </div>
    </div>
  );
}
