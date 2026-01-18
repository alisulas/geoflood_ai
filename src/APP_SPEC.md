# GeoFlood - App Specification

## 📋 Executive Summary

**GeoFlood** adalah aplikasi prediksi risiko banjir berbasis AI/ML untuk pembeli properti di Indonesia. Aplikasi ini dirancang dengan pendekatan mobile-first, menggunakan teknologi Machine Learning dan Deep Learning untuk memberikan analisis risiko banjir yang akurat dan komprehensif.

**Platform:** Progressive Web App (PWA)  
**Target Device:** Smartphone Android (Mobile-First)  
**Design Language:** Terinspirasi Gojek (Green & Yellow Color Scheme)  
**Tech Stack:** React, TypeScript, Tailwind CSS v4, Recharts  

---

## 🎨 UI/UX Design System

### Color Palette
- **Primary Green:** `#16a34a` (Green-600) - Trust, Safety, Nature
- **Primary Yellow:** `#eab308` (Yellow-500) - Warning, Energy, Attention
- **Gradient Signature:** `from-green-600 to-yellow-500`
- **Risk Colors:**
  - Low Risk: Green (`#22c55e`)
  - Medium Risk: Yellow (`#eab308`)
  - High Risk: Orange (`#f97316`)
  - Very High Risk: Red (`#ef4444`)

### Typography
- **Base Font Size:** 16px
- **Headings:** Medium weight (500)
- **Body:** Normal weight (400)
- **Hierarchy:**
  - H1: 2xl
  - H2: xl
  - H3: lg
  - H4: base

### Design Principles
1. **Card-Based Layout** - Semua komponen menggunakan white cards dengan `rounded-3xl` (24px)
2. **Gradient Effects** - Header dan CTA menggunakan gradient green-yellow
3. **Smooth Animations** - Transisi 200ms ease untuk semua interaksi
4. **Mobile-First** - Optimized untuk layar 360px - 428px
5. **High Contrast** - Readable text dengan minimum WCAG AA compliance
6. **Touch-Friendly** - Minimum button size 44px × 44px

### Component Patterns

#### Cards
```css
bg-white rounded-3xl shadow-lg p-6
```

#### Buttons (Primary)
```css
bg-gradient-to-r from-green-600 to-green-500 
text-white rounded-2xl shadow-lg 
px-6 py-3 hover:shadow-xl transition-all
```

#### Input Fields
```css
w-full px-4 py-4 rounded-2xl 
border-2 border-gray-200 
focus:ring-2 focus:ring-yellow-400
```

#### Badges
```css
px-3 py-1 rounded-xl text-xs
bg-{color}-100 text-{color}-700
```

---

## 🏗️ Application Architecture

### Navigation Structure
```
GeoFlood App
├── Bottom Navigation (4 Tabs)
│   ├── Home (Scanner)
│   ├── Map
│   ├── Predict
│   └── Community
└── Additional Features (via Home)
    ├── Compare
    ├── Alerts
    ├── Mitigation
    └── Financial
```

### Component Hierarchy
```
App.tsx (Root)
├── Header (Sticky)
│   ├── Logo Image
│   └── Notification Bell
├── Main Content (Dynamic)
│   ├── RiskScanner.tsx
│   ├── FloodMap.tsx
│   ├── FuturePrediction.tsx
│   ├── CommunityReports.tsx
│   ├── PropertyComparison.tsx
│   ├── AlertSystem.tsx
│   ├── MitigationRecommendations.tsx
│   └── FinancialCalculator.tsx
└── Bottom Navigation (Fixed)
    └── 4 Navigation Tabs
```

---

## 🚀 Features Specification

### 1. Smart Risk Scanner
**File:** `/components/RiskScanner.tsx`

#### Purpose
Scan alamat properti dan dapatkan risk score berbasis AI multi-factor analysis.

#### UI Components
- Search input dengan icon MapPin
- Scan button dengan loading state
- Example addresses (4 preset locations)
- Risk result card dengan circular progress
- AI multi-factor analysis bars
- Deep learning insights cards
- Quick actions buttons

#### Data Flow
1. User mengetik/memilih alamat
2. Click "Scan" → Loading state (2.5s simulated delay)
3. Mock ML analysis menghasilkan:
   - Risk Score (0-100)
   - Risk Category (Rendah/Sedang/Tinggi/Sangat Tinggi)
   - 6 Factor Scores (Historical Flood, Elevation, Drainage, Proximity to Water, Rainfall, Land Use Change)
   - 6 AI-generated insights
4. Result ditampilkan dengan animasi
5. Property data disimpan di state untuk digunakan di tab lain

#### Example Addresses Data
```javascript
[
  {
    address: 'The Green Residence IV, Jl. Karawaci-Legok, Tangerang',
    icon: '🏘️',
    tag: 'Recommended',
    baseScore: 35
  },
  {
    address: 'Jl. Sudirman No. 45, Jakarta Selatan',
    icon: '🏢',
    tag: 'Premium',
    baseScore: 50
  },
  {
    address: 'Serpong Garden, BSD City, Tangerang Selatan',
    icon: '🌳',
    tag: 'Low Risk',
    baseScore: 25
  },
  {
    address: 'Pantai Indah Kapuk, Jakarta Utara',
    icon: '🌊',
    tag: 'High Risk',
    baseScore: 75
  }
]
```

#### Risk Calculation Logic
```javascript
// Base score ditentukan dari lokasi
if (address.includes('Pantai Indah Kapuk') || address.includes('Jakarta Utara')) {
  baseScore = 75; // High risk coastal area
} else if (address.includes('Serpong') || address.includes('BSD')) {
  baseScore = 25; // Low risk planned city
} else if (address.includes('Green Residence') || address.includes('Tangerang')) {
  baseScore = 35; // Medium-low suburban area
}

// Add variance untuk realistis
variance = (Math.random() - 0.5) * 10;
finalScore = Math.max(0, Math.min(100, baseScore + variance));
```

#### Stats Display
- **50K+** Properties Scanned
- **98%** AI Accuracy
- **24/7** Real-time Data

---

### 1.1. Detailed UI/UX Breakdown - Risk Scanner

#### A. "Analyzing with AI" - Loading State
**Component:** Loading animation dengan multi-stage progress

**Visual Elements:**
```jsx
<div className="bg-white rounded-3xl shadow-lg p-8">
  {/* Spinning loader */}
  <div className="relative">
    <div className="w-20 h-20 border-4 border-green-200 rounded-full"></div>
    <div className="absolute top-0 left-0 w-20 h-20 border-4 border-green-600 
                    rounded-full border-t-transparent animate-spin"></div>
  </div>
  
  {/* Loading text */}
  <div className="text-lg text-gray-900 mb-2">Analyzing with AI...</div>
  <div className="text-sm text-gray-500">Processing multi-factor data</div>
  
  {/* Progress indicators */}
  <div className="w-full space-y-2 mt-4">
    <div className="flex items-center gap-3">
      <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
      <span className="text-sm text-gray-600">Analyzing historical flood data...</span>
    </div>
    <div className="flex items-center gap-3 delay-100">
      <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
      <span className="text-sm text-gray-600">Processing elevation & topography...</span>
    </div>
    <div className="flex items-center gap-3 delay-200">
      <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
      <span className="text-sm text-gray-600">Calculating drainage system score...</span>
    </div>
  </div>
</div>
```

**Timing:**
- **Duration:** 2.5 seconds (simulated API call)
- **Animation:** Continuous spin + pulsing dots
- **Purpose:** Create trust, show AI processing complexity

**UX Considerations:**
- Prevents user from clicking multiple times
- Shows specific analysis steps (not just "Loading...")
- Creates perception of sophisticated AI processing
- Manages user expectations with progress indicators

---

#### B. "Risk Analysis Result" - Main Result Card

**Component:** Large card dengan gradient header + circular progress

**Structure:**
```jsx
<div className="bg-white rounded-3xl shadow-xl overflow-hidden">
  {/* Gradient Header (Dynamic color based on risk) */}
  <div className={`${getRiskColor(riskScore).bg} bg-gradient-to-br p-6`}>
    
    {/* Address Display */}
    <div className="text-white/90 text-sm mb-1">Risk Analysis Result</div>
    <div className="text-white text-base line-clamp-2">{address}</div>
    
    {/* Circular Progress (SVG) */}
    <div className="flex items-center justify-center py-6">
      <svg className="w-40 h-40 transform -rotate-90">
        {/* Background circle */}
        <circle cx="80" cy="80" r="70" 
                stroke="rgba(255,255,255,0.2)" 
                strokeWidth="12" fill="none" />
        
        {/* Progress circle */}
        <circle cx="80" cy="80" r="70" 
                stroke="white" strokeWidth="12" fill="none"
                strokeDasharray={`${(riskScore / 100) * 440} 440`}
                strokeLinecap="round" />
      </svg>
      
      {/* Score Number (Center) */}
      <div className="absolute">
        <div className="text-5xl text-white">{riskScore}</div>
        <div className="text-white/90 text-sm">/ 100</div>
      </div>
    </div>
    
    {/* Category Badge */}
    <div className="bg-white/20 backdrop-blur rounded-2xl px-4 py-3 text-center">
      <div className="text-white text-lg">{riskCategory}</div>
    </div>
  </div>
</div>
```

**Risk Color Mapping:**
```javascript
getRiskColor(score) {
  if (score < 25) return { 
    bg: 'bg-green-500', 
    text: 'text-green-600', 
    light: 'bg-green-50' 
  };
  if (score < 50) return { 
    bg: 'bg-yellow-500', 
    text: 'text-yellow-600', 
    light: 'bg-yellow-50' 
  };
  if (score < 75) return { 
    bg: 'bg-orange-500', 
    text: 'text-orange-600', 
    light: 'bg-orange-50' 
  };
  return { 
    bg: 'bg-red-500', 
    text: 'text-red-600', 
    light: 'bg-red-50' 
  };
}
```

**Visual Hierarchy:**
1. **Risk Score (Largest):** 5xl font, white color, center focus
2. **Category Label:** lg font, badge style
3. **Address:** Base font, truncated to 2 lines
4. **Progress Circle:** 140px diameter, animated stroke

---

#### C. "AI Multi-Factor Analysis" - Factor Bars

**Component:** 6 horizontal progress bars dengan labels dan percentages

**Structure:**
```jsx
<div className="p-6 space-y-4">
  <div className="flex items-center gap-2 mb-4">
    <Zap className="w-5 h-5 text-yellow-500" />
    <h4 className="text-base">AI Multi-Factor Analysis</h4>
  </div>
  
  {/* Factor Bars (6 items) */}
  {Object.entries(factors).map(([key, value]) => (
    <div key={key}>
      {/* Label + Percentage */}
      <div className="flex items-center justify-between mb-2 text-sm">
        <span className="text-gray-700 capitalize">
          {formatFactorName(key)}
        </span>
        <span className={`px-2 py-1 rounded-lg text-xs ${
          value > 70 ? 'bg-red-100 text-red-700' : 
          value > 40 ? 'bg-yellow-100 text-yellow-700' : 
          'bg-green-100 text-green-700'
        }`}>
          {Math.round(value)}%
        </span>
      </div>
      
      {/* Progress Bar */}
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full transition-all duration-1000 ${
          value > 70 ? 'bg-red-500' :
          value > 40 ? 'bg-yellow-500' : 'bg-green-500'
        }`}
        style={{ width: `${value}%` }} />
      </div>
    </div>
  ))}
</div>
```

**6 Factors Analyzed:**
1. **Historical Flood** - Kejadian banjir 10 tahun terakhir
2. **Elevation** - Ketinggian tanah dari permukaan laut
3. **Drainage System** - Kualitas sistem drainase
4. **Proximity To Water** - Jarak ke badan air
5. **Rainfall** - Curah hujan rata-rata
6. **Land Use Change** - Perubahan tata guna lahan

**Calculation Logic:**
```javascript
factors: {
  historicalFlood: baseScore > 60 ? 75 + random(20) : 20 + random(30),
  elevation: baseScore > 60 ? 20 + random(30) : 60 + random(30),
  drainageSystem: 100 - baseScore + random(-10, 10),
  proximityToWater: baseScore > 60 ? 70 + random(25) : 30 + random(30),
  rainfall: 50 + random(30),
  landUseChange: baseScore + random(-7.5, 7.5)
}
```

**Animation:**
- Bars animate from 0 to final width over 1 second
- Staggered animation (sequential reveal)
- Color changes based on threshold (0-40-70)

---

#### D. "Deep Learning Insights" - AI-Generated Text

**Component:** 6 numbered cards dengan gradient backgrounds

**Structure:**
```jsx
<div className="bg-white rounded-3xl shadow-lg p-6">
  <div className="flex items-center gap-2 mb-4">
    <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-yellow-500 
                    rounded-xl flex items-center justify-center">
      <TrendingUp className="w-5 h-5 text-white" />
    </div>
    <h4 className="text-base">Deep Learning Insights</h4>
  </div>
  
  <div className="space-y-3">
    {insights.map((insight, idx) => (
      <div key={idx} className="flex gap-3 p-3 
           bg-gradient-to-r from-green-50 to-yellow-50 rounded-2xl">
        
        {/* Number Badge */}
        <div className="w-6 h-6 bg-gradient-to-br from-green-600 to-yellow-500 
             text-white rounded-full flex items-center justify-center 
             flex-shrink-0 text-xs">
          {idx + 1}
        </div>
        
        {/* Insight Text */}
        <p className="text-sm text-gray-700 flex-1">{insight}</p>
      </div>
    ))}
  </div>
</div>
```

**6 AI Insights Generated:**
```javascript
insights: [
  `Area ini tercatat mengalami ${baseScore > 60 ? '5-7' : baseScore > 40 ? '2-3' : '0-1'} 
   kejadian banjir dalam 10 tahun terakhir`,
   
  `Elevasi tanah ${baseScore > 60 ? '1.5-3m' : baseScore > 40 ? '4-6m' : '8-12m'} 
   di atas permukaan laut`,
   
  `Sistem drainase dinilai ${baseScore > 60 ? 'perlu perbaikan' : 
   baseScore > 40 ? 'cukup memadai' : 'sangat baik'}`,
   
  `Jarak ke badan air terdekat: ${baseScore > 60 ? '200-400m' : 
   baseScore > 40 ? '500-800m' : '1000-1500m'}`,
   
  `Curah hujan rata-rata tahunan: ${2200 + Math.round(Math.random() * 400)}mm`,
  
  `Perubahan tata guna lahan ${baseScore > 60 ? 'signifikan' : 
   baseScore > 40 ? 'moderat' : 'minimal'} dalam 5 tahun terakhir`
]
```

**Content Strategy:**
- Dynamic text based on risk score
- Specific numbers for credibility (e.g., "2-3 kejadian", "8-12m")
- Technical terms explained simply
- Actionable information
- Mix of historical + current + future context

---

#### E. "Quick Actions" - Navigation Buttons

**Component:** 2×2 grid dengan icon buttons

**Structure:**
```jsx
<div className="bg-white rounded-3xl shadow-lg p-6">
  <h4 className="text-base mb-4">Quick Actions</h4>
  
  <div className="grid grid-cols-2 gap-3">
    {/* View on Map */}
    <button onClick={() => onNavigate('map')}
      className="bg-gradient-to-br from-blue-50 to-blue-100 
                 p-4 rounded-2xl text-left hover:shadow-md transition-all">
      <MapPin className="w-6 h-6 text-blue-600 mb-2" />
      <div className="text-sm text-gray-900">View on Map</div>
    </button>
    
    {/* Future Predict */}
    <button onClick={() => onNavigate('prediction')}
      className="bg-gradient-to-br from-purple-50 to-purple-100 
                 p-4 rounded-2xl text-left hover:shadow-md transition-all">
      <TrendingUp className="w-6 h-6 text-purple-600 mb-2" />
      <div className="text-sm text-gray-900">Future Predict</div>
    </button>
  </div>
</div>
```

**Actions Available:**
1. **View on Map** → Navigate to FloodMap tab
   - Shows property location on Indonesia map
   - Highlights relevant region
   - Context: Geographic visualization

2. **Future Predict** → Navigate to FuturePrediction tab
   - Shows 5-20 year projection
   - Climate scenario modeling
   - Context: Long-term planning

**UX Flow:**
```
User scans property → Gets result with property data
  ↓
Click "View on Map" → Navigate to Map tab
  ↓
Map highlights region → User explores regional data
  ↓
[OR]
  ↓
Click "Future Predict" → Navigate to Prediction tab
  ↓
Prediction uses scanned property data → Shows personalized forecast
```

---

### 1.2. Detailed UI/UX Breakdown - Future Prediction

#### A. "Prediction Timeframe" - Selector Buttons

**Component:** 3 button group dengan year display

**Structure:**
```jsx
<div className="bg-white rounded-3xl shadow-lg p-6">
  <label className="text-sm text-gray-600 mb-3 block flex items-center gap-2">
    <Calendar className="w-4 h-4" />
    Prediction Timeframe
  </label>
  
  <div className="flex gap-2">
    {[5, 10, 20].map((years) => (
      <button key={years}
        onClick={() => setTimeframe(years)}
        className={`flex-1 px-4 py-3 rounded-xl transition-all ${
          timeframe === years
            ? 'bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg'
            : 'bg-gray-100 text-gray-600'
        }`}>
        {/* Years */}
        <div className="text-lg">{years}y</div>
        {/* Target Year */}
        <div className="text-xs opacity-80">{2024 + years}</div>
      </button>
    ))}
  </div>
</div>
```

**Timeframe Options:**
- **5 Years (2029):** Short-term planning, high confidence
- **10 Years (2034):** Medium-term, balanced view
- **20 Years (2044):** Long-term investment, lower confidence

**Selection Effect:**
- Immediately re-calculates all predictions
- Updates chart data points
- Adjusts confidence scores
- Recalculates climate factors

---

#### B. "Risk Trend Analysis" - Area Chart

**Component:** Recharts AreaChart dengan gradient fill

**Structure:**
```jsx
<div className="bg-white rounded-3xl shadow-lg p-6">
  <h3 className="text-base mb-4 flex items-center gap-2">
    <TrendingUp className="w-5 h-5 text-green-600" />
    Risk Trend Analysis
  </h3>
  
  <ResponsiveContainer width="100%" height={250}>
    <AreaChart data={predictionData}>
      {/* Gradient Definition */}
      <defs>
        <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#16a34a" stopOpacity={0.8}/>
          <stop offset="95%" stopColor="#16a34a" stopOpacity={0.1}/>
        </linearGradient>
      </defs>
      
      {/* Grid */}
      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
      
      {/* Axes */}
      <XAxis dataKey="year" tick={{ fontSize: 12 }} stroke="#9ca3af" />
      <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} stroke="#9ca3af" />
      
      {/* Tooltip */}
      <Tooltip contentStyle={{ 
        backgroundColor: '#fff', 
        border: 'none', 
        borderRadius: '12px', 
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
      }}/>
      
      {/* Area */}
      <Area type="monotone" dataKey="riskScore" 
            stroke="#16a34a" strokeWidth={3}
            fill="url(#colorRisk)" name="Risk Score" />
    </AreaChart>
  </ResponsiveContainer>
</div>
```

**Chart Data Points:**
```javascript
// Example for 10-year prediction
predictionData = [
  { year: 2024, riskScore: 35, confidence: 95 },
  { year: 2025, riskScore: 37, confidence: 93 },
  { year: 2026, riskScore: 40, confidence: 91 },
  // ... up to selected timeframe
  { year: 2034, riskScore: 58, confidence: 75 }
]
```

**Visual Features:**
- **Gradient Fill:** Green (high opacity) to transparent
- **Smooth Curve:** Monotone interpolation
- **Interactive Tooltip:** Shows exact year + risk score
- **Responsive:** Adapts to container width
- **Y-Axis Range:** Fixed 0-100 for consistency

---

#### C. Climate Factors Cards

**Component:** 3 metric cards dengan mini line charts

**Structure for each factor:**
```jsx
<div className="bg-white rounded-3xl shadow-lg p-6">
  {/* Header */}
  <div className="flex items-center gap-3 mb-4">
    <div className="w-10 h-10 bg-blue-100 rounded-xl 
         flex items-center justify-center">
      <Droplets className="w-6 h-6 text-blue-600" />
    </div>
    <div className="flex-1">
      <div className="text-xs text-gray-600">Sea Level Rise</div>
      <div className="text-2xl text-gray-900">+{seaLevel.toFixed(2)}m</div>
    </div>
    <div className="text-3xl">🌊</div>
  </div>
  
  {/* Mini Chart */}
  <ResponsiveContainer width="100%" height={60}>
    <LineChart data={predictionData}>
      <Line type="monotone" dataKey="seaLevel" 
            stroke="#3b82f6" strokeWidth={2} dot={false} />
    </LineChart>
  </ResponsiveContainer>
</div>
```

**3 Factors Tracked:**

1. **Sea Level Rise**
   - Icon: 🌊 Droplets
   - Color: Blue
   - Format: +X.XXm
   - Calculation: `year * 0.3 * scenarioMultiplier`

2. **Annual Rainfall**
   - Icon: ☔ Cloud
   - Color: Teal
   - Format: XXXXmm
   - Calculation: `2400 + (year * 50 * scenarioMultiplier)`

3. **Average Temperature**
   - Icon: 🌡️ ThermometerSun
   - Color: Orange
   - Format: XX.X°C
   - Calculation: `27 + (year * 0.15 * scenarioMultiplier)`

**Chart Style:**
- Sparkline (no axes, no grid)
- 60px height for compact view
- Stroke width 2px
- No data points (smooth line only)

---

#### D. Deep Learning Predictions Summary

**Component:** 4 prediction cards dengan numbered badges

**Structure:**
```jsx
<div className="bg-white rounded-3xl shadow-lg p-6">
  <h3 className="text-base mb-4">Deep Learning Predictions</h3>
  
  <div className="space-y-3">
    {/* Card 1: Risk Evolution */}
    <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 
         rounded-2xl border-2 border-blue-200">
      <div className="flex items-start gap-3">
        <div className="w-6 h-6 bg-blue-600 text-white rounded-full 
             flex items-center justify-center text-xs">1</div>
        <div className="flex-1">
          <div className="text-sm text-gray-900 mb-1">Risk Evolution</div>
          <p className="text-xs text-gray-700 leading-relaxed">
            Risiko banjir di area ini diprediksi akan {trend} dari {currentRisk} 
            menjadi {futureRisk} dalam {timeframe} tahun (Confidence: {confidence}%)
          </p>
        </div>
      </div>
    </div>
    
    {/* Similar structure for cards 2-4 */}
    {/* Card 2: Climate Change Impact (Orange) */}
    {/* Card 3: Urban Development (Purple) */}
    {/* Card 4: AI Recommendation (Green) */}
  </div>
</div>
```

**4 Prediction Types:**

1. **Risk Evolution (Blue)**
   - Current vs Future risk comparison
   - Trend direction (meningkat/menurun)
   - Confidence percentage
   - Time horizon

2. **Climate Change Impact (Orange)**
   - Sea level rise amount
   - Rainfall increase
   - Scenario-dependent values
   - Environmental context

3. **Urban Development (Purple)**
   - Impermeability prediction (15-25%)
   - Resapan air reduction
   - Neural network analysis
   - Land use change

4. **AI Recommendation (Green)**
   - Risk-based actionable advice:
     - >70: "Consider alternative locations"
     - 50-70: "Preventive mitigation in 3-5 years"
     - <50: "Safe for long-term investment"
   - Includes checkmark/warning emoji

---

### 1.3. Additional UI/UX Details

#### Color-Coded Risk System
```javascript
// Consistent across all components
const riskThresholds = {
  low: { range: '0-25', color: '#22c55e', label: 'Rendah' },
  medium: { range: '25-50', color: '#eab308', label: 'Sedang' },
  high: { range: '50-75', color: '#f97316', label: 'Tinggi' },
  veryHigh: { range: '75-100', color: '#ef4444', label: 'Sangat Tinggi' }
};
```

#### Responsive Typography Scale
```css
/* Mobile-first font sizes */
.text-xs    → 12px  /* Labels, captions */
.text-sm    → 14px  /* Body text, descriptions */
.text-base  → 16px  /* Default, headings */
.text-lg    → 18px  /* Section titles */
.text-xl    → 20px  /* Page titles */
.text-2xl   → 24px  /* Hero numbers */
.text-3xl   → 30px  /* Large metrics */
.text-5xl   → 48px  /* Risk score display */
```

#### Touch-Friendly Spacing
```css
/* Minimum touch target: 44px × 44px */
button: min-height 44px, px-4 py-3
input: min-height 44px, px-4 py-4
card-padding: p-6 (24px all sides)
gap-between-elements: gap-3 (12px) or gap-4 (16px)
```

---

### 2. Interactive Flood Map
**File:** `/components/FloodMap.tsx`

#### Purpose
Visualisasi geografis risiko banjir Indonesia dengan data provinsi.

#### UI Components
- Layer selection (Historical/Current/Future)
- SVG-based Indonesia map
- Interactive region markers
- Region list dengan sorting by risk
- Statistics cards (4 risk levels distribution)
- AI insights panel

#### Map Data
18 regions covering major Indonesian provinces:

```javascript
const indonesiaRegions = [
  { id: 'jakarta', name: 'DKI Jakarta', risk: 78, x: 52, y: 48 },
  { id: 'jabar', name: 'Jawa Barat', risk: 65, x: 50, y: 52 },
  { id: 'jateng', name: 'Jawa Tengah', risk: 58, x: 54, y: 54 },
  { id: 'jatim', name: 'Jawa Timur', risk: 52, x: 60, y: 54 },
  { id: 'banten', name: 'Banten', risk: 68, x: 48, y: 50 },
  // ... 13 more regions
]
```

#### Visual Features
- **Simplified SVG Map:** Custom paths untuk Sumatra, Java, Kalimantan, Sulawesi, Papua
- **Animated Markers:** Pulsing circles untuk setiap region
- **Color Coding:** Region colored by risk level
- **Wave Pattern:** Background pattern untuk ocean effect
- **Hover Effects:** Opacity change pada region hover

#### Statistics
- **23%** Low Risk Areas
- **35%** Medium Risk
- **28%** High Risk
- **14%** Very High Risk

---

### 3. Future Prediction (Deep Learning)
**File:** `/components/FuturePrediction.tsx`

#### Purpose
Prediksi risiko banjir masa depan (5-20 tahun) menggunakan climate scenario modeling.

#### UI Components
- Property location display
- Timeframe selector (5y/10y/20y)
- Climate scenario selector (Optimistic/Moderate/Pessimistic)
- Risk prediction result card
- Area chart (Risk trend over time)
- Climate factors cards (Sea level, Rainfall, Temperature)
- Deep learning predictions summary

#### Prediction Algorithm
```javascript
const scenarioMultiplier = {
  optimistic: 0.7,   // Low emission scenario
  moderate: 1.0,     // Current trend continues
  pessimistic: 1.4   // High emission scenario
};

for (year = current to current + timeframe) {
  growth = (year / timeframe) * 25 * multiplier;
  variance = random(-2.5, +2.5);
  
  riskScore = min(100, max(0, baseRisk + growth + variance));
  confidence = 95 - (year * 2);  // Decreases over time
  seaLevel += year * 0.3 * multiplier;
  rainfall = 2400 + (year * 50 * multiplier);
  temperature = 27 + (year * 0.15 * multiplier);
}
```

#### Climate Factors Tracked
1. **Sea Level Rise:** +0.3m per year (scenario-dependent)
2. **Annual Rainfall:** Base 2400mm + 50mm/year increase
3. **Average Temperature:** Base 27°C + 0.15°C/year
4. **Risk Score Evolution:** Linear growth with variance
5. **AI Confidence:** 95% decreasing by 2% per year

#### Predictions Output
- 4 detailed AI prediction cards:
  1. **Risk Evolution:** Current → Future comparison
  2. **Climate Change Impact:** Sea level + rainfall data
  3. **Urban Development:** Impermeability prediction
  4. **AI Recommendation:** Action items based on final risk

---

### 4. Community Intelligence
**File:** `/components/CommunityReports.tsx`

#### Purpose
Crowdsourced flood reports dari user community untuk real-world validation.

#### UI Components
- Stats overview (4 metrics)
- Filter by severity
- Report cards dengan badge
- Add report CTA
- Like/helpful button

#### Report Structure
```typescript
interface FloodReport {
  id: string;
  location: string;
  date: string;
  severity: 'Low' | 'Medium' | 'High';
  waterDepth: number;        // in cm
  duration: number;          // in hours
  verified: boolean;
  likes: number;
  reporter: string;
  description: string;
  images?: number;
}
```

#### Sample Data (5 Reports)
1. **Jl. Sudirman, Jakarta Selatan** - High severity, 80cm depth, 6h duration
2. **Jl. Karawaci, Tangerang** - Low severity, 20cm depth, 2h duration
3. **Pantai Indah Kapuk** - High severity, 120cm depth, 8h duration
4. **BSD City** - Low severity, 15cm depth, 1h duration
5. **Jl. Gatot Subroto** - Medium severity, 50cm depth, 4h duration

#### Statistics
- **Total Reports:** 5
- **Verified:** 4/5 (80%)
- **Critical (High):** 2/5 (40%)
- **Average Duration:** 4.2 hours

---

### 5. Property Comparison
**File:** `/components/PropertyComparison.tsx`

#### Purpose
Side-by-side comparison of multiple properties untuk decision making.

#### UI Components
- Property count summary
- 3 property comparison cards
- Best value indicators (checkmarks)
- TCO calculation
- AI recommendation

#### Comparison Metrics
```typescript
interface Property {
  address: string;
  riskScore: number;
  price: number;              // in Rupiah
  elevation: number;          // in meters
  distanceToWater: number;    // in meters
  drainageScore: number;      // 0-100
  historicalFloods: number;   // count in 10 years
  insuranceCost: number;      // annual in Rupiah
}
```

#### Sample Properties
1. **The Green Residence IV, Tangerang**
   - Risk: 35, Price: Rp 1.8M, Elevation: 8.5m
   - Distance to Water: 1200m, Drainage: 75
   - Historical Floods: 1x, Insurance: Rp 12jt/year

2. **Pantai Indah Kapuk, Jakarta Utara**
   - Risk: 78, Price: Rp 3.2M, Elevation: 2.1m
   - Distance to Water: 350m, Drainage: 45
   - Historical Floods: 6x, Insurance: Rp 45jt/year

3. **BSD City, Tangerang Selatan**
   - Risk: 22, Price: Rp 2.1M, Elevation: 11.5m
   - Distance to Water: 1800m, Drainage: 88
   - Historical Floods: 0x, Insurance: Rp 8jt/year

#### Best Value Logic
```javascript
// For metrics where lower is better
getBestValue('riskScore') = min(properties.map(p => p.riskScore))

// For metrics where higher is better
getBestValue('elevation') = max(properties.map(p => p.elevation))
```

---

### 6. Alert System (BMKG Integration)
**File:** `/components/AlertSystem.tsx`

#### Purpose
Real-time weather alerts dan property watchlist untuk early warning.

#### UI Components
- Active alerts count badge
- Current weather widget (4 metrics)
- Alert cards (Warning/Watch/Advisory)
- Property watchlist dengan toggle
- BMKG integration status

#### Alert Structure
```typescript
interface Alert {
  id: string;
  location: string;
  type: 'warning' | 'watch' | 'advisory';
  severity: 'Low' | 'Medium' | 'High';
  message: string;
  timestamp: string;
  validUntil: string;
}
```

#### Weather Data
```javascript
{
  temperature: 28°C,
  humidity: 85%,
  rainfall: 45mm,
  windSpeed: 15 km/h,
  forecast: 'Heavy Rain'
}
```

#### Alert Types
- **Warning:** High priority, immediate action needed (Red)
- **Watch:** Medium priority, monitor closely (Orange)
- **Advisory:** Low priority, general information (Yellow)

#### Sample Alerts
1. **Jakarta Selatan Warning:** Heavy rainfall 150-200mm expected
2. **Tangerang Watch:** River water levels rising
3. **Jakarta Utara Warning:** Coastal flooding + high tide

#### Watchlist Features
- Add/remove properties
- Toggle alerts ON/OFF per property
- Risk score display
- Quick access to property details

---

### 7. Mitigation Recommendations
**File:** `/components/MitigationRecommendations.tsx`

#### Purpose
AI-powered mitigation strategies dengan cost estimation dan effectiveness rating.

#### UI Components
- Risk score summary
- Quick stats (Total investment, Avg effectiveness)
- 6 mitigation strategy cards
- Insurance options (2 providers)
- Report generator
- AI analysis

#### Mitigation Strategies
```typescript
interface Mitigation {
  id: string;
  title: string;
  description: string;
  estimatedCost: number;      // in Rupiah
  effectiveness: number;      // 0-100%
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timeframe: string;
  icon: string;
}
```

#### 6 Strategies Available
1. **Elevasi Bangunan** - Rp 150jt, 95% effective, Hard, 2-3 bulan
2. **Sistem Drainase Modern** - Rp 75jt, 85% effective, Medium, 3-4 minggu
3. **Waterproofing Premium** - Rp 45jt, 70% effective, Medium, 2-3 minggu
4. **Flood Barrier System** - Rp 25jt, 60% effective, Easy, 1 minggu
5. **Sump Pump Auto** - Rp 15jt, 75% effective, Easy, 1-2 minggu
6. **Landscape Grading** - Rp 35jt, 65% effective, Medium, 2-3 minggu

#### Smart Recommendation Logic
```javascript
if (riskScore < 35) {
  // Low risk - Easy solutions only
  recommend(['Sump Pump', 'Flood Barrier'])
} else if (riskScore < 65) {
  // Medium risk - Easy + Medium solutions
  recommend(['All Easy', 'All Medium'])
} else {
  // High risk - All solutions including Hard
  recommend(['All strategies'])
}
```

#### Insurance Options
1. **Asuransi Properti Prima**
   - Coverage: Comprehensive Flood
   - Premium: Rp 12jt/year
   - Claim Limit: Rp 2M
   - Features: 24/7 Emergency, Full Coverage, Fast Claim

2. **BCA Insurance**
   - Coverage: Premium Shield
   - Premium: Rp 15jt/year
   - Claim Limit: Rp 3M
   - Features: Premium Support, No Depreciation, Content Coverage

---

### 8. Financial Calculator (TCO/ROI)
**File:** `/components/FinancialCalculator.tsx`

#### Purpose
Comprehensive financial analysis untuk investment decision.

#### UI Components
- Property price input
- Projection period slider (5-20 years)
- 4 key metrics cards
- TCO bar chart
- Cost breakdown pie chart
- Property value projection
- Investment analysis
- Financial recommendation

#### Financial Calculations

##### Annual Insurance
```javascript
annualInsurance = propertyPrice * 0.005 * (1 + riskScore/100)
```

##### Mitigation Cost
```javascript
mitigationCost = propertyPrice * 0.08 * (riskScore/100)
```

##### Maintenance Cost
```javascript
maintenanceCost = propertyPrice * 0.015 * (1 + riskScore/200)
```

##### Depreciation
```javascript
depreciationRate = {
  riskScore > 70: 3% per year,
  riskScore > 50: 2% per year,
  default: 1% per year
}

futureValue = propertyPrice * (1 - depreciationRate)^years
totalDepreciation = propertyPrice - futureValue
```

##### ROI Calculation
```javascript
rentalIncome = propertyPrice * 0.06  // 6% annual rental yield
totalCosts = annualInsurance + maintenanceCost
netIncome = rentalIncome - totalCosts
roi = (netIncome / propertyPrice) * 100
```

#### Visualizations
1. **TCO Bar Chart:** Cumulative costs over 10 years (2-year intervals)
2. **Pie Chart:** 10-year cost breakdown (Property, Insurance, Maintenance, Mitigation)

#### Sample Calculation (Rp 2.5M property, Risk 50)
- Annual Insurance: **Rp 18.75jt**
- Mitigation Cost: **Rp 100jt**
- Annual Maintenance: **Rp 41.25jt**
- 10-year Depreciation: **Rp 465jt**
- ROI: **2.4%**

---

## 📊 Data Models & Mock Data

### Global State Management
```typescript
// App.tsx state
const [activeTab, setActiveTab] = useState<string>('scanner');
const [selectedProperty, setSelectedProperty] = useState<any>(null);
```

### Property Selection Flow
1. User scans property di RiskScanner
2. Result disimpan via `onPropertySelect(analysisResult)`
3. Property data tersedia di FuturePrediction, MitigationRecommendations, FinancialCalculator
4. User bisa navigate ke tab lain dengan property context

### Mock Data Philosophy
**All AI/ML predictions are simulated** menggunakan:
- Deterministic algorithms dengan controlled randomness
- Realistic data ranges based on Indonesian geography
- Variance untuk natural-looking results
- Time delays untuk UX realism (loading states)

---

## 🎯 User Flows

### Primary Flow: Property Risk Assessment
```
1. Open App → Home (Scanner) tab
2. See example addresses + stats
3. Click example address OR type custom address
4. Click "Scan" button
5. Loading animation (2.5s) dengan progress indicators
6. View risk score result (circular progress)
7. Review AI multi-factor analysis (6 factors)
8. Read deep learning insights (6 insights)
9. Click "View on Map" → Navigate to Map tab
10. Click "Future Predict" → Navigate to Prediction tab
```

### Secondary Flow: Future Planning
```
1. From Scanner result
2. Click "Future Predict" → Prediction tab
3. Select timeframe (5y/10y/20y)
4. Select scenario (Optimistic/Moderate/Pessimistic)
5. View prediction chart + climate factors
6. Read AI predictions summary
7. Decision: Need mitigation?
   YES → Navigate to Mitigation tab
   NO → Continue analysis
```

### Tertiary Flow: Financial Analysis
```
1. Access Financial Calculator from Home
2. Input property price
3. Adjust projection period slider
4. View 4 key metrics cards
5. Analyze TCO chart
6. Review cost breakdown pie chart
7. Check property value projection
8. Read financial recommendation
9. Decision: Proceed with purchase?
```

### Community Flow: Report & Verification
```
1. Navigate to Community tab
2. View community stats
3. Filter reports by severity
4. Click report card to view details
5. Mark report as "Helpful" (like)
6. View photos (if available)
7. Submit own flood report (CTA)
```

### Comparison Flow: Multi-Property Decision
```
1. Access Compare from Home
2. View 3 pre-loaded properties
3. Compare risk scores visually
4. Check best value indicators (✓)
5. Review detailed metrics grid
6. Analyze TCO (5 years)
7. Read AI recommendation
8. Select best property
```

---

## 🔧 Technical Implementation

### React Components Structure
```
/App.tsx                          # Root component, navigation logic
/components/
  RiskScanner.tsx                 # ML risk analysis UI
  FloodMap.tsx                    # SVG map visualization
  FuturePrediction.tsx            # Deep learning predictions
  CommunityReports.tsx            # Crowdsourced data
  PropertyComparison.tsx          # Side-by-side analysis
  AlertSystem.tsx                 # Real-time alerts
  MitigationRecommendations.tsx   # AI mitigation strategies
  FinancialCalculator.tsx         # TCO/ROI calculator
  /figma/
    ImageWithFallback.tsx         # Protected component
  /ui/                            # Shadcn/ui components
    (43+ reusable UI components)
/styles/
  globals.css                     # Tailwind v4, custom animations
```

### Key Libraries
- **React 18:** Component framework
- **TypeScript:** Type safety
- **Tailwind CSS v4:** Utility-first styling
- **Recharts:** Data visualization (Charts)
- **Lucide React:** Icon library
- **Motion/React:** Animations (if needed)

### Custom Styling Features
```css
/* Gradient scrollbar */
::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #16a34a, #eab308);
}

/* Tap highlight */
* {
  -webkit-tap-highlight-color: rgba(22, 163, 74, 0.1);
}

/* Smooth transitions */
button, a, input {
  transition: all 0.2s ease;
}

/* Custom animations */
@keyframes slideUp { ... }
@keyframes pulse-green { ... }
@keyframes shimmer { ... }
```

---

## 📱 Responsive Design

### Breakpoints Strategy
```
Mobile First (Default): 360px - 428px
Tablet (if needed): 768px+
Desktop (if needed): 1024px+
```

### Mobile Optimizations
1. **Touch Targets:** Minimum 44px × 44px
2. **Font Sizes:** Minimum 14px untuk readability
3. **Scrollable Areas:** Smooth scrolling dengan custom scrollbar
4. **Bottom Navigation:** Fixed, always accessible
5. **Sticky Header:** Logo + notification bell
6. **Card Spacing:** Consistent px-4 horizontal padding
7. **Loading States:** Clear visual feedback
8. **Error States:** User-friendly messages

### Performance Considerations
- SVG maps untuk lightweight graphics
- Lazy loading untuk charts (Recharts)
- Optimized re-renders dengan proper state management
- Mock data loaded synchronously (no API delays)
- Image optimization dengan figma:asset scheme

---

## 🎭 Animation & Interactions

### Loading States
```javascript
// RiskScanner loading animation
<div className="w-20 h-20 border-4 border-green-600 
     rounded-full border-t-transparent animate-spin">
</div>

// Progress indicators
[
  "Analyzing historical flood data...",
  "Processing elevation & topography...",
  "Calculating drainage system score..."
]
```

### Transitions
- **Tab Switch:** Instant content swap (no animation)
- **Button Hover:** shadow-lg → shadow-xl + scale
- **Card Hover:** border-gray-200 → border-green-300
- **Input Focus:** ring-2 ring-yellow-400
- **Chart Animations:** Built-in Recharts animations

### Micro-interactions
- Pulsing markers on map
- Animated progress bars (width transition)
- Badge hover effects
- Scroll animations (smooth scroll-behavior)
- Bottom nav icon scale on active

---

## 🔐 Data Privacy & Security

### Mock Data Usage
**Important:** Semua data adalah simulasi. No real user data, no external API calls.

### Privacy Considerations
- No PII (Personally Identifiable Information) collection
- No backend/database (pure frontend)
- No user authentication required
- No data persistence (session-only)
- Example addresses are fictional or generic

### Future Integration Notes
Jika akan integrate dengan real backend:
1. Implement HTTPS only
2. API key management (environment variables)
3. User authentication (OAuth/JWT)
4. Data encryption at rest and in transit
5. GDPR compliance untuk EU users
6. Indonesian data protection laws compliance

---

## 🚦 Feature Flags & Variants

### Current Implementation
- ✅ Full ML/DL simulation
- ✅ Complete UI/UX
- ✅ All 8 features functional
- ✅ Mobile-optimized
- ✅ Mock data realistic

### Future Enhancements (Not Implemented)
- ⏳ Real BMKG API integration
- ⏳ Google Maps integration
- ⏳ User accounts & saved properties
- ⏳ Push notifications
- ⏳ PDF report export
- ⏳ Email sharing
- ⏳ Payment gateway untuk insurance
- ⏳ Contractor marketplace
- ⏳ Real-time flood monitoring sensors

---

## 🧪 Testing Scenarios

### Recommended Test Cases

#### 1. Risk Scanner
```
✓ Search dengan 4 example addresses
✓ Custom address input
✓ Loading state tampil 2.5s
✓ Result card dengan correct risk color
✓ Factor bars animated correctly
✓ Insights generated (6 items)
✓ Quick actions navigate correctly
```

#### 2. Flood Map
```
✓ 3 layer buttons switch correctly
✓ 18 regions clickable
✓ Region selection highlights card
✓ Stats cards show correct percentages
✓ SVG map renders properly
✓ Markers animated (pulsing)
```

#### 3. Future Prediction
```
✓ Timeframe selector (5/10/20 years)
✓ Scenario selector (3 options)
✓ Chart updates dynamically
✓ Climate factors display correctly
✓ Predictions change based on inputs
✓ Confidence decreases over time
```

#### 4. Community Reports
```
✓ 5 reports displayed
✓ Filter by severity works
✓ Like button interactive
✓ Report cards show all metrics
✓ Verified badge displays
✓ Stats calculated correctly
```

#### 5. Property Comparison
```
✓ 3 properties compared
✓ Best value checkmarks correct
✓ Risk score sorted
✓ TCO calculated accurately
✓ AI recommendation logical
```

#### 6. Alert System
```
✓ 3 alerts displayed
✓ Weather widget shows 4 metrics
✓ Watchlist toggle works
✓ Remove from watchlist functional
✓ BMKG status shown
```

#### 7. Mitigation
```
✓ 6 strategies displayed
✓ Effectiveness bars correct
✓ Cost formatted properly
✓ Insurance options shown
✓ AI analysis adapts to risk
✓ Recommendations filtered by risk
```

#### 8. Financial Calculator
```
✓ Price input updates calculations
✓ Slider adjusts projection period
✓ TCO chart renders
✓ Pie chart shows breakdown
✓ ROI calculated correctly
✓ Depreciation based on risk
```

---

## 📈 Metrics & Analytics (Recommended)

### Key Performance Indicators (KPIs)
- User engagement per feature
- Average time on Scanner
- Property scans per session
- Map interactions
- Prediction scenarios explored
- Community report submissions
- Comparison usage rate

### User Behavior Tracking
- Most scanned locations
- Popular timeframes (5y/10y/20y)
- Most viewed mitigation strategies
- Alert system engagement
- Financial calculator inputs

---

## 🎓 User Education & Onboarding

### Current Implementation
- **Tooltips:** Minimal (assume informed users)
- **Labels:** Descriptive component titles
- **Stats:** Platform statistics for trust
- **AI Badges:** "Powered by Deep Learning" indicators

### Recommended Additions
1. **First-time user tour** (overlay walkthrough)
2. **Feature tooltips** (? icon with explanations)
3. **Video tutorials** untuk complex features
4. **FAQ section** about ML predictions
5. **Glossary** untuk technical terms

---

## 🌐 Internationalization (i18n)

### Current Language
**Indonesian (Bahasa Indonesia)** - Primary

### UI Text Examples
- "Cari alamat properti..." (Search property address)
- "Rendah/Sedang/Tinggi/Sangat Tinggi" (Low/Medium/High/Very High)
- "Area ini tercatat mengalami..." (This area recorded...)
- "Sistem drainase dinilai..." (Drainage system rated...)

### Future Language Support
- English (International users)
- Regional variations (Javanese, Sundanese)

---

## 🔄 Update & Maintenance

### Version Control
Current: **v1.0.0** (Initial Implementation)

### Update Cadence
- **Data Updates:** Weekly (if real data integrated)
- **Feature Updates:** Monthly
- **Bug Fixes:** As needed
- **Security Patches:** Immediate

### Changelog Structure
```markdown
## [1.0.0] - 2024-12-15
### Added
- Initial release
- 8 core features
- Mobile-first UI
- Mock ML/DL predictions
```

---

## 📞 Support & Documentation

### User Support
- **In-app:** Help icon dalam header
- **Email:** support@geoflood.id (example)
- **FAQ:** Dedicated section
- **Community:** User forum

### Developer Documentation
- **API Docs:** (When backend added)
- **Component Library:** Storybook (recommended)
- **Code Comments:** Inline JSDoc
- **README:** Setup instructions

---

## 🏆 Competitive Advantages

### vs. Traditional Property Search
1. **AI-Powered:** ML/DL predictions vs manual research
2. **Visual:** Interactive maps vs static data
3. **Forward-Looking:** 5-20 year predictions
4. **Comprehensive:** 8 integrated features
5. **Mobile-First:** On-the-go decision making

### vs. Other Flood Apps
1. **Property-Focused:** Specifically for buyers
2. **Financial Integration:** TCO/ROI calculations
3. **Community Data:** Crowdsourced verification
4. **Mitigation Actionable:** Contractor-ready recommendations
5. **Indonesian-Optimized:** Local data + language

---

## 🎯 Success Metrics

### User Acquisition
- Target: 10K users in 6 months
- CAC: < Rp 50K per user
- Organic vs Paid: 60/40

### Engagement
- Daily Active Users (DAU): 30%
- Monthly Active Users (MAU): 70%
- Session Length: > 5 minutes
- Features Used per Session: > 2

### Conversion
- Properties Scanned: > 100K in 6 months
- Mitigation Inquiries: 5% of scans
- Insurance Quotes: 3% of scans
- Premium Subscriptions: 1% (if monetized)

---

## 💰 Monetization Strategy (Future)

### Potential Revenue Streams
1. **Freemium Model:**
   - Free: 3 scans/month, basic features
   - Premium: Unlimited scans, advanced analytics - Rp 99K/month

2. **Affiliate Commission:**
   - Insurance referrals: 10-15% commission
   - Contractor referrals: 5-10% commission
   - Real estate agent partnerships

3. **B2B Solutions:**
   - API access untuk property platforms
   - White-label untuk developers
   - Enterprise reports untuk banks/lenders

4. **Data Licensing:**
   - Aggregated flood risk data
   - Research institutions
   - Government agencies

---

## 🔮 Roadmap

### Q1 2025
- [ ] Real BMKG API integration
- [ ] User authentication
- [ ] Save favorite properties
- [ ] Push notifications

### Q2 2025
- [ ] Google Maps integration
- [ ] PDF report export
- [ ] Email sharing
- [ ] iOS optimization

### Q3 2025
- [ ] Payment gateway
- [ ] Insurance partnerships
- [ ] Contractor marketplace
- [ ] Live chat support

### Q4 2025
- [ ] IoT sensor integration
- [ ] Predictive alerts (ML)
- [ ] AR flood visualization
- [ ] Voice search (Bahasa Indonesia)

---

## 📚 References & Data Sources

### Climate Data
- BMKG (Badan Meteorologi, Klimatologi, dan Geofisika)
- NASA Earth Observatory
- IPCC Climate Reports
- Indonesia National Disaster Management Agency (BNPB)

### Flood Risk Methodology
- FEMA Flood Maps (adapted for Indonesia)
- European Flood Directive
- World Bank Urban Flood Risk Assessment
- Academic research papers on Indonesian hydrology

### Machine Learning Models
- LSTM for time series prediction
- Random Forest for risk classification
- Neural Networks for multi-factor analysis
- Ensemble methods for confidence scoring

---

## ✅ Compliance & Regulations

### Indonesian Regulations
- **UU ITE:** Electronic Information and Transactions
- **Data Protection:** Kominfo guidelines
- **Property Law:** Relevant real estate regulations
- **Insurance:** OJK (Otoritas Jasa Keuangan) compliance

### International Standards
- **WCAG 2.1:** Web accessibility (AA level)
- **GDPR:** For EU users (if expanded)
- **ISO 27001:** Information security (recommended)

---

## 🎨 Brand Guidelines

### Logo
- **Format:** PNG image (imported via figma:asset)
- **Height:** 40px in header
- **Placement:** Top-left header
- **Alt Text:** "GeoFlood Logo"

### Tagline
**"AI Flood Risk Analysis for Smart Property Buyers"**

### Brand Voice
- **Tone:** Professional, trustworthy, helpful
- **Language:** Clear, jargon-free (Indonesian)
- **Personality:** Tech-savvy, caring, solution-oriented

### Visual Identity
- **Primary Color:** Green (safety, nature, growth)
- **Secondary Color:** Yellow (caution, energy, optimism)
- **Typography:** System fonts, clean sans-serif
- **Imagery:** Flood-related, properties, technology, Indonesian landscapes

---

## 🤝 Team & Roles (Recommended)

### Development Team
- **Frontend Developer:** React/TypeScript specialist
- **UI/UX Designer:** Mobile-first design expert
- **Data Scientist:** ML/DL model development
- **Backend Developer:** API + database (future)
- **QA Engineer:** Testing + automation

### Business Team
- **Product Manager:** Feature prioritization
- **Marketing Manager:** User acquisition
- **Partnership Manager:** Insurance/contractor deals
- **Customer Support:** User assistance

### Advisory
- **Climate Expert:** Validate predictions
- **Real Estate Expert:** Market insights
- **Legal Advisor:** Compliance + contracts

---

## 📝 License & Attribution

### Code License
MIT License (recommended for open-source)

### Data Attribution
- Map data: OpenStreetMap contributors
- Icons: Lucide React (ISC License)
- Charts: Recharts (MIT License)
- UI Components: Shadcn/ui (MIT License)

### Disclaimer
```
GeoFlood provides flood risk analysis for informational 
purposes only. Predictions are based on historical data 
and climate models. Always consult with local authorities, 
engineers, and insurance professionals before making 
property decisions. GeoFlood is not liable for any 
decisions made based on this information.
```

---

## 🆘 Troubleshooting Guide

### Common Issues

**Issue: Map not rendering**
- Check SVG viewBox dimensions
- Verify region coordinates
- Ensure browser supports SVG

**Issue: Charts not displaying**
- Check Recharts import
- Verify data format
- Inspect console for errors

**Issue: Mobile scrolling issues**
- Check overflow-y on containers
- Verify pb-20 on main content (bottom nav clearance)
- Test on actual device (not just browser)

**Issue: Performance lag**
- Optimize large lists (virtualization)
- Lazy load components
- Reduce re-renders (React.memo)

---

## 📖 Glossary

- **TCO:** Total Cost of Ownership
- **ROI:** Return on Investment
- **BMKG:** Badan Meteorologi, Klimatologi, dan Geofisika (Indonesian Meteorological Agency)
- **ML:** Machine Learning
- **DL:** Deep Learning
- **LSTM:** Long Short-Term Memory (neural network architecture)
- **PWA:** Progressive Web App
- **SVG:** Scalable Vector Graphics
- **API:** Application Programming Interface
- **CTA:** Call to Action
- **UX:** User Experience
- **UI:** User Interface

---

## 🎬 Conclusion

GeoFlood adalah aplikasi komprehensif yang mengintegrasikan **AI/ML predictions**, **real-time data**, **financial analysis**, dan **community intelligence** dalam satu platform mobile-first yang user-friendly.

Dengan 8 fitur utama yang saling terintegrasi, GeoFlood memberikan pembeli properti di Indonesia **confidence** dan **clarity** dalam membuat keputusan investasi yang aman dari risiko banjir.

Design terinspirasi Gojek dengan color scheme hijau-kuning menciptakan **brand identity** yang familiar, trustworthy, dan modern untuk pasar Indonesia.

Mock data yang realistic dan UI/UX yang polished menjadikan GeoFlood ready untuk **user testing**, **investor presentations**, dan **future development** dengan real ML/DL models dan API integrations.

---

**Built with ❤️ for Indonesian Property Buyers**

*Last Updated: January 17, 2026*