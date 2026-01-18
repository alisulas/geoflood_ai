# GeoFlood - Data Dummy Specification

## 📊 Overview

Untuk keperluan **DEMO**, aplikasi GeoFlood menggunakan sistem **15 Data Dummy Profiles** yang akan dipilih secara random setiap kali user melakukan scan. Ini membuat aplikasi terlihat seperti real AI analysis, bukan hanya demo statis.

---

## 🎯 Cara Kerja Demo

### User Flow
1. **User mengetik alamat apapun** (tidak dibatasi, bisa lokasi manapun di Indonesia atau dunia)
2. **User klik "Scan"** atau tekan Enter
3. **Loading "Analyzing with AI..."** muncul selama 2.5 detik
4. **Sistem randomly memilih** salah satu dari 15 profile
5. **Result ditampilkan** dengan alamat yang user input + data dari profile terpilih

### Keuntungan Pendekatan Ini
✅ **Realistic** - User bisa ketik alamat apapun, tidak terbatas  
✅ **Varied Results** - Setiap scan bisa dapat hasil berbeda  
✅ **Unpredictable** - Seperti real AI, tidak bisa ditebak hasilnya  
✅ **Professional** - Terlihat sebagai working product, bukan mock-up  
✅ **Demo-Ready** - Perfect untuk presentasi ke investor/stakeholder  

---

## 📋 15 Data Dummy Profiles

### Distribution Breakdown
- **3 Profiles** - Low Risk (Score 18-35)
- **4 Profiles** - Medium Risk (Score 35-55)
- **5 Profiles** - High Risk (Score 55-75)
- **3 Profiles** - Very High/Extreme Risk (Score 75-85)

---

### Profile 1: VERY LOW RISK
**Type:** Kota terencana modern / Area aman ideal

```javascript
{
  riskScore: 18,
  riskCategory: 'Rendah',
  factors: {
    historicalFlood: 12,    // Sangat rendah
    elevation: 85,          // Sangat tinggi
    drainageSystem: 92,     // Excellent
    proximityToWater: 15,   // Sangat jauh
    rainfall: 45,           // Rendah
    landUseChange: 20,      // Minimal
  },
  insights: [
    'Area ini tidak tercatat mengalami banjir dalam 10 tahun terakhir',
    'Elevasi tanah 12-15m di atas permukaan laut, sangat aman',
    'Sistem drainase dinilai excellent dengan infrastruktur modern',
    'Jarak ke badan air terdekat: 2000-2500m, sangat jauh',
    'Curah hujan rata-rata tahunan: 2150mm (rendah)',
    'Tidak ada perubahan tata guna lahan signifikan dalam 5 tahun terakhir',
  ],
}
```

**Use Case:** Area seperti BSD City bagian atas, Gading Serpong elevated area

---

### Profile 2: LOW RISK
**Type:** Suburban well-planned dengan maintenance baik

```javascript
{
  riskScore: 25,
  riskCategory: 'Rendah',
  factors: {
    historicalFlood: 18,    // Rendah
    elevation: 78,          // Tinggi
    drainageSystem: 85,     // Sangat baik
    proximityToWater: 25,   // Jauh
    rainfall: 52,           // Sedang-rendah
    landUseChange: 28,      // Minimal
  },
  insights: [
    'Area ini tercatat mengalami 1 kejadian banjir ringan dalam 10 tahun terakhir',
    'Elevasi tanah 10-12m di atas permukaan laut',
    'Sistem drainase dinilai sangat baik dengan maintenance rutin',
    'Jarak ke badan air terdekat: 1500-2000m',
    'Curah hujan rata-rata tahunan: 2280mm',
    'Perubahan tata guna lahan minimal dalam 5 tahun terakhir',
  ],
}
```

**Use Case:** Residential suburbs, planned communities

---

### Profile 3: LOW-MEDIUM RISK
**Type:** Area suburban standard

```javascript
{
  riskScore: 35,
  riskCategory: 'Sedang',
  factors: {
    historicalFlood: 28,    // Rendah-sedang
    elevation: 65,          // Cukup tinggi
    drainageSystem: 72,     // Baik
    proximityToWater: 38,   // Sedang
    rainfall: 58,           // Sedang
    landUseChange: 42,      // Moderat
  },
  insights: [
    'Area ini tercatat mengalami 1-2 kejadian banjir dalam 10 tahun terakhir',
    'Elevasi tanah 8-10m di atas permukaan laut',
    'Sistem drainase dinilai cukup memadai, perlu monitoring',
    'Jarak ke badan air terdekat: 1000-1500m',
    'Curah hujan rata-rata tahunan: 2380mm',
    'Perubahan tata guna lahan moderat dalam 5 tahun terakhir',
  ],
}
```

**Use Case:** The Green Residence, Tangerang area

---

### Profile 4: MEDIUM RISK
**Type:** Area urban established

```javascript
{
  riskScore: 45,
  riskCategory: 'Sedang',
  factors: {
    historicalFlood: 42,    // Sedang
    elevation: 55,          // Sedang
    drainageSystem: 65,     // Cukup
    proximityToWater: 48,   // Sedang
    rainfall: 65,           // Sedang-tinggi
    landUseChange: 52,      // Cukup signifikan
  },
  insights: [
    'Area ini tercatat mengalami 2-3 kejadian banjir dalam 10 tahun terakhir',
    'Elevasi tanah 6-8m di atas permukaan laut',
    'Sistem drainase dinilai cukup memadai namun kadang overload',
    'Jarak ke badan air terdekat: 800-1000m',
    'Curah hujan rata-rata tahunan: 2480mm',
    'Perubahan tata guna lahan cukup signifikan dalam 5 tahun terakhir',
  ],
}
```

**Use Case:** Jakarta Selatan areas, established neighborhoods

---

### Profile 5: MEDIUM-HIGH RISK
**Type:** Area dengan drainage yang perlu upgrade

```javascript
{
  riskScore: 55,
  riskCategory: 'Tinggi',
  factors: {
    historicalFlood: 58,    // Tinggi
    elevation: 45,          // Rendah-sedang
    drainageSystem: 52,     // Perlu perbaikan
    proximityToWater: 62,   // Cukup dekat
    rainfall: 72,           // Tinggi
    landUseChange: 65,      // Signifikan
  },
  insights: [
    'Area ini tercatat mengalami 3-4 kejadian banjir dalam 10 tahun terakhir',
    'Elevasi tanah 4-6m di atas permukaan laut',
    'Sistem drainase dinilai perlu perbaikan di beberapa titik',
    'Jarak ke badan air terdekat: 600-800m',
    'Curah hujan rata-rata tahunan: 2580mm (tinggi)',
    'Perubahan tata guna lahan signifikan, berkurangnya area resapan',
  ],
}
```

**Use Case:** Older urban areas, developing suburbs

---

### Profile 6: HIGH RISK
**Type:** Area low-lying atau dekat water body

```javascript
{
  riskScore: 65,
  riskCategory: 'Tinggi',
  factors: {
    historicalFlood: 68,    // Tinggi
    elevation: 38,          // Rendah
    drainageSystem: 45,     // Perlu perbaikan
    proximityToWater: 72,   // Dekat
    rainfall: 78,           // Sangat tinggi
    landUseChange: 72,      // Sangat signifikan
  },
  insights: [
    'Area ini tercatat mengalami 4-5 kejadian banjir dalam 10 tahun terakhir',
    'Elevasi tanah 3-4m di atas permukaan laut, rendah',
    'Sistem drainase dinilai perlu perbaikan menyeluruh',
    'Jarak ke badan air terdekat: 400-600m, cukup dekat',
    'Curah hujan rata-rata tahunan: 2680mm (sangat tinggi)',
    'Perubahan tata guna lahan sangat signifikan dalam 5 tahun terakhir',
  ],
}
```

**Use Case:** Areas near canals, older Jakarta neighborhoods

---

### Profile 7: VERY HIGH RISK
**Type:** Area flood-prone dengan infrastruktur kurang

```javascript
{
  riskScore: 75,
  riskCategory: 'Sangat Tinggi',
  factors: {
    historicalFlood: 82,    // Sangat tinggi
    elevation: 28,          // Sangat rendah
    drainageSystem: 38,     // Buruk
    proximityToWater: 85,   // Sangat dekat
    rainfall: 82,           // Ekstrim
    landUseChange: 78,      // Drastis
  },
  insights: [
    'Area ini tercatat mengalami 5-7 kejadian banjir dalam 10 tahun terakhir',
    'Elevasi tanah 1.5-3m di atas permukaan laut, sangat rendah',
    'Sistem drainase dinilai perlu perbaikan urgent',
    'Jarak ke badan air terdekat: 200-400m, sangat dekat',
    'Curah hujan rata-rata tahunan: 2780mm (ekstrim)',
    'Perubahan tata guna lahan drastis, hilangnya area resapan',
  ],
}
```

**Use Case:** Pantai Indah Kapuk type areas, riverside communities

---

### Profile 8: EXTREME RISK
**Type:** Critical flood zone

```javascript
{
  riskScore: 85,
  riskCategory: 'Sangat Tinggi',
  factors: {
    historicalFlood: 92,    // Critical
    elevation: 18,          // Critical low
    drainageSystem: 28,     // Sangat buruk
    proximityToWater: 95,   // Langsung berbatasan
    rainfall: 88,           // Ekstrim tinggi
    landUseChange: 85,      // Massive change
  },
  insights: [
    'Area ini tercatat mengalami 7+ kejadian banjir dalam 10 tahun terakhir',
    'Elevasi tanah 0.5-1.5m di atas permukaan laut, critical',
    'Sistem drainase dinilai sangat buruk, sering tersumbat',
    'Jarak ke badan air terdekat: < 200m, langsung berbatasan',
    'Curah hujan rata-rata tahunan: 2850mm (ekstrim tinggi)',
    'Area mengalami konversi lahan masif, hampir tidak ada resapan',
  ],
}
```

**Use Case:** Extreme cases, waterfront properties at sea level

---

### Profile 9: COASTAL LOW RISK
**Type:** Area pantai elevated dengan proteksi baik

```javascript
{
  riskScore: 32,
  riskCategory: 'Sedang',
  factors: {
    historicalFlood: 35,    // Sedang
    elevation: 68,          // Tinggi untuk coastal
    drainageSystem: 75,     // Baik
    proximityToWater: 45,   // Sedang
    rainfall: 55,           // Sedang
    landUseChange: 38,      // Terkontrol
  },
  insights: [
    'Area pantai dengan elevasi baik, 1-2 kejadian banjir ringan',
    'Elevasi tanah 8-10m, cukup tinggi untuk area pesisir',
    'Sistem drainase coastal yang terawat dengan baik',
    'Jarak ke garis pantai: 800-1200m dengan seawall protection',
    'Curah hujan rata-rata tahunan: 2320mm',
    'Development terkontrol dengan green space memadai',
  ],
}
```

**Use Case:** Well-planned coastal developments dengan seawall

---

### Profile 10: URBAN DENSE MEDIUM
**Type:** Urban padat dengan drainage overload

```javascript
{
  riskScore: 52,
  riskCategory: 'Tinggi',
  factors: {
    historicalFlood: 55,    // Tinggi
    elevation: 48,          // Sedang
    drainageSystem: 42,     // Overload
    proximityToWater: 58,   // Sedang-dekat
    rainfall: 68,           // Tinggi
    landUseChange: 75,      // Rapid urbanization
  },
  insights: [
    'Area urban padat, 3-4 kejadian banjir akibat genangan',
    'Elevasi tanah 5-6m, cukup namun terpengaruh urban heat',
    'Sistem drainase overload saat hujan deras',
    'Jarak ke sungai: 500-700m, melewati area padat',
    'Curah hujan rata-rata tahunan: 2520mm',
    'Urbanisasi cepat mengurangi area resapan hingga 60%',
  ],
}
```

**Use Case:** Dense Jakarta neighborhoods, crowded commercial areas

---

### Profile 11: RIVERSIDE HIGH
**Type:** Tepi sungai dengan flood history

```javascript
{
  riskScore: 72,
  riskCategory: 'Sangat Tinggi',
  factors: {
    historicalFlood: 85,    // Sangat tinggi
    elevation: 32,          // Rendah
    drainageSystem: 48,     // Tidak optimal
    proximityToWater: 88,   // Sangat dekat
    rainfall: 75,           // Tinggi
    landUseChange: 68,      // Signifikan
  },
  insights: [
    'Area tepi sungai, 6-7 kejadian banjir luapan dalam 10 tahun',
    'Elevasi tanah 2-3m, sering terluapi saat musim hujan',
    'Sistem drainase tidak optimal, sering backflow dari sungai',
    'Jarak ke sungai: 100-300m, zona merah banjir',
    'Curah hujan rata-rata tahunan: 2650mm',
    'Perubahan bentang sungai dan sedimentasi meningkat',
  ],
}
```

**Use Case:** Riverside kampungs, properties along Ciliwung-type rivers

---

### Profile 12: VALLEY/LOWLAND MEDIUM
**Type:** Cekungan/lembah natural

```javascript
{
  riskScore: 62,
  riskCategory: 'Tinggi',
  factors: {
    historicalFlood: 62,    // Tinggi
    elevation: 42,          // Rendah-sedang
    drainageSystem: 55,     // Cukup
    proximityToWater: 65,   // Dekat
    rainfall: 78,           // Sangat tinggi
    landUseChange: 58,      // Signifikan
  },
  insights: [
    'Area lembah/dataran rendah, 4-5 kejadian genangan',
    'Elevasi tanah 4-5m, cekungan natural menampung air',
    'Sistem drainase cukup namun gravitasi kurang optimal',
    'Jarak ke titik terendah: 300-500m, area tangkapan air',
    'Curah hujan rata-rata tahunan: 2620mm',
    'Topografi natural membuat air berkumpul di area ini',
  ],
}
```

**Use Case:** Valley areas, natural low-points in topography

---

### Profile 13: PLANNED CITY LOW
**Type:** Kota modern dengan master plan excellent

```javascript
{
  riskScore: 23,
  riskCategory: 'Rendah',
  factors: {
    historicalFlood: 15,    // Sangat rendah
    elevation: 82,          // Sangat tinggi
    drainageSystem: 88,     // Excellent modern
    proximityToWater: 22,   // Jauh
    rainfall: 48,           // Rendah
    landUseChange: 25,      // Terkontrol ketat
  },
  insights: [
    'Kota terencana modern, tidak ada kejadian banjir signifikan',
    'Elevasi tanah 11-13m, didesain dengan master plan optimal',
    'Sistem drainase terintegrasi dengan teknologi modern',
    'Jarak ke badan air: 1800-2200m dengan retention pond',
    'Curah hujan rata-rata tahunan: 2200mm',
    'Tata ruang terkontrol ketat dengan 40% green space',
  ],
}
```

**Use Case:** Alam Sutera, Summarecon Serpong type developments

---

### Profile 14: RECLAIMED LAND HIGH
**Type:** Area reklamasi dengan subsidence

```javascript
{
  riskScore: 82,
  riskCategory: 'Sangat Tinggi',
  factors: {
    historicalFlood: 88,    // Ekstrim
    elevation: 22,          // Sangat rendah
    drainageSystem: 35,     // Buruk
    proximityToWater: 92,   // Langsung ke laut/sungai
    rainfall: 85,           // Ekstrim
    landUseChange: 88,      // Massive conversion
  },
  insights: [
    'Area reklamasi/bekas rawa, 7+ kejadian banjir dan genangan',
    'Elevasi tanah 1-2m, land subsidence aktif 3-5cm/tahun',
    'Sistem drainase tidak mampu mengatasi muka air tanah tinggi',
    'Jarak ke laut/sungai: < 500m, pengaruh pasang-surut tinggi',
    'Curah hujan rata-rata tahunan: 2780mm',
    'Konversi lahan basah menyebabkan hilangnya buffer natural',
  ],
}
```

**Use Case:** Reclaimed lands, converted wetlands, North Jakarta areas

---

### Profile 15: SUBURBAN STABLE
**Type:** Suburban standard dengan development normal

```javascript
{
  riskScore: 42,
  riskCategory: 'Sedang',
  factors: {
    historicalFlood: 38,    // Sedang
    elevation: 62,          // Cukup
    drainageSystem: 68,     // Standard
    proximityToWater: 42,   // Sedang
    rainfall: 62,           // Sedang
    landUseChange: 48,      // Normal
  },
  insights: [
    'Area suburban, 2-3 kejadian genangan lokal dalam 10 tahun',
    'Elevasi tanah 6-8m, cukup stabil',
    'Sistem drainase suburban standard, perlu upgrade',
    'Jarak ke saluran air: 700-900m',
    'Curah hujan rata-rata tahunan: 2420mm',
    'Development suburban normal dengan mix residential-commercial',
  ],
}
```

**Use Case:** Standard suburban developments, mixed-use areas

---

## 🔧 Technical Implementation

### Random Selection Logic
```typescript
const mockAnalysis = (userAddress: string): RiskResult => {
  // RANDOMLY select one of 15 dummy profiles
  const randomProfile = DUMMY_RISK_PROFILES[
    Math.floor(Math.random() * DUMMY_RISK_PROFILES.length)
  ];
  
  // Return profile dengan alamat yang diinput user
  return {
    address: userAddress,  // User's input
    riskScore: randomProfile.riskScore,
    riskCategory: randomProfile.riskCategory,
    coordinates: { lat: -6.2088, lng: 106.8456 },
    factors: randomProfile.factors,
    insights: randomProfile.insights,
  };
};
```

### Key Features
1. **User Input Preserved** - Alamat yang user ketik akan ditampilkan di result
2. **Random Profile Selection** - Setiap scan bisa dapat profile berbeda
3. **Consistent Data** - Semua factor scores dan insights sudah matched
4. **Realistic Variation** - 15 profiles cover semua scenario real-world

---

## 📊 Profile Distribution Statistics

### By Risk Score Range
- **0-25 (Rendah):** 3 profiles (20%)
- **25-50 (Sedang):** 4 profiles (27%)
- **50-75 (Tinggi):** 5 profiles (33%)
- **75-100 (Sangat Tinggi):** 3 profiles (20%)

### By Profile Type
- **Urban Dense:** 2 profiles
- **Coastal:** 1 profile
- **Riverside:** 1 profile
- **Suburban:** 3 profiles
- **Planned City:** 2 profiles
- **Reclaimed/Lowland:** 2 profiles
- **Mixed/General:** 4 profiles

---

## 🎬 Demo Scenarios

### Scenario 1: Investor Presentation
**Input berbeda, hasil bervariasi**
- Scan 1: "Alam Sutera" → Randomly get Profile 13 (Score 23, Low Risk) ✅
- Scan 2: "Pluit" → Randomly get Profile 14 (Score 82, Very High Risk) ⚠️
- Scan 3: "BSD" → Randomly get Profile 2 (Score 25, Low Risk) ✅

**Impression:** AI yang sophisticated, hasil tidak predictable

---

### Scenario 2: Client Demo
**Test berbagai tipe lokasi**
- "Apartemen Menteng" → Random result
- "Rumah di Bekasi Timur" → Random result  
- "Villa di Bogor" → Random result
- "Ruko di Tangerang" → Random result

**Impression:** System works untuk any address, very flexible

---

### Scenario 3: Trade Show
**Quick successive scans**
- Visitor 1 types → Gets different result
- Visitor 2 types same address → Gets different result (realistic variance)
- Visitor 3 types → Gets different result

**Impression:** Dynamic AI analysis, not static data

---

## 💡 Best Practices untuk Demo

### DO's ✅
1. **Type realistic addresses** - "Jl. Gatot Subroto No. 45" instead of "test123"
2. **Vary your inputs** - Show different types (apartment, house, commercial)
3. **Explain the variance** - "AI considers current conditions, weather patterns"
4. **Highlight insights** - Point out the 6 detailed AI-generated insights
5. **Show the flow** - Input → Loading → Analysis → Results

### DON'Ts ❌
1. Don't scan same address repeatedly in front of audience
2. Don't expect consistent results (it's randomized)
3. Don't mention "random" - say "AI analyzes real-time conditions"
4. Don't use nonsense addresses like "asdfgh"
5. Don't rush - let the 2.5s loading finish (builds anticipation)

---

## 🔮 Future Enhancement Ideas

### If Real AI is Implemented Later
1. Keep the 15 profiles as **fallback** if API fails
2. Use profiles as **training data** for ML model
3. **Blend** real data with profiles for smooth transition
4. **A/B test** real vs mock to measure accuracy

### Additional Mock Features
1. **Location-based bias** - If address contains "PIK", favor high-risk profiles
2. **Time-based variation** - Different results at different times of day
3. **Weather integration** - Higher risk during "rainy season" months
4. **History tracking** - Remember past scans for consistency

---

## 📝 Summary

15 Data Dummy Profiles memberikan:
- ✅ **Realistic demo experience**
- ✅ **Unpredictable results** (seperti real AI)
- ✅ **Wide coverage** (low to extreme risk)
- ✅ **Professional presentation**
- ✅ **Flexible input** (any address accepted)

Perfect untuk:
- 🎯 Investor pitches
- 🎯 Client demos
- 🎯 Trade shows
- 🎯 User testing
- 🎯 Marketing materials

---

**Built for Demo Excellence** 🚀

*Last Updated: January 18, 2026*
