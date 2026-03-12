// ============================================================
// KisanMitra — Production Data Layer
// Contains verified, accurate static data for Indian agriculture
// MSP rates: 2024-25 (Government of India, CACP approved)
// Schemes: As of January 2025 (official portal data)
// ============================================================

(function () {
  'use strict';

  // ════════════════════════════════════════════════════════════
  // STATES & DISTRICTS (Major agricultural states)
  // ════════════════════════════════════════════════════════════

  const STATES = [
    'Andhra Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Gujarat',
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Odisha',
    'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  const DISTRICTS = {
    'Andhra Pradesh': ['Anantapur', 'Chittoor', 'East Godavari', 'Guntur', 'Krishna', 'Kurnool', 'Nellore', 'Prakasam', 'Srikakulam', 'Visakhapatnam', 'West Godavari', 'YSR Kadapa'],
    'Assam': ['Barpeta', 'Darrang', 'Dibrugarh', 'Jorhat', 'Kamrup', 'Nagaon', 'Sivasagar', 'Sonitpur', 'Tinsukia'],
    'Bihar': ['Araria', 'Bhagalpur', 'Buxar', 'Darbhanga', 'Gaya', 'Muzaffarpur', 'Nalanda', 'Patna', 'Purnia', 'Rohtas', 'Samastipur', 'Vaishali'],
    'Chhattisgarh': ['Bilaspur', 'Dhamtari', 'Durg', 'Janjgir-Champa', 'Korba', 'Raigarh', 'Raipur', 'Rajnandgaon'],
    'Gujarat': ['Ahmedabad', 'Amreli', 'Banaskantha', 'Bhavnagar', 'Junagadh', 'Kutch', 'Mehsana', 'Rajkot', 'Sabarkantha', 'Surat', 'Surendranagar'],
    'Haryana': ['Ambala', 'Bhiwani', 'Fatehabad', 'Gurugram', 'Hisar', 'Jhajjar', 'Jind', 'Kaithal', 'Karnal', 'Kurukshetra', 'Panipat', 'Rohtak', 'Sirsa', 'Sonipat', 'Yamunanagar'],
    'Himachal Pradesh': ['Bilaspur', 'Chamba', 'Kangra', 'Kullu', 'Mandi', 'Shimla', 'Solan', 'Una'],
    'Jharkhand': ['Bokaro', 'Deoghar', 'Dhanbad', 'Dumka', 'Giridih', 'Hazaribagh', 'Ranchi'],
    'Karnataka': ['Bagalkot', 'Ballari', 'Belgaum', 'Bidar', 'Davangere', 'Dharwad', 'Gulbarga', 'Hassan', 'Haveri', 'Mandya', 'Mysuru', 'Raichur', 'Shimoga', 'Tumkur'],
    'Kerala': ['Alappuzha', 'Ernakulam', 'Idukki', 'Kozhikode', 'Palakkad', 'Thiruvananthapuram', 'Thrissur', 'Wayanad'],
    'Madhya Pradesh': ['Bhopal', 'Dewas', 'Gwalior', 'Hoshangabad', 'Indore', 'Jabalpur', 'Morena', 'Neemuch', 'Ratlam', 'Sagar', 'Satna', 'Sehore', 'Shajapur', 'Ujjain', 'Vidisha'],
    'Maharashtra': ['Ahmednagar', 'Akola', 'Amravati', 'Aurangabad', 'Jalgaon', 'Kolhapur', 'Latur', 'Nagpur', 'Nashik', 'Osmanabad', 'Pune', 'Sangli', 'Satara', 'Solapur', 'Wardha'],
    'Odisha': ['Balasore', 'Bargarh', 'Bolangir', 'Cuttack', 'Ganjam', 'Kalahandi', 'Kendrapara', 'Khordha', 'Koraput', 'Mayurbhanj', 'Puri', 'Sambalpur'],
    'Punjab': ['Amritsar', 'Bathinda', 'Faridkot', 'Fatehgarh Sahib', 'Fazilka', 'Firozpur', 'Gurdaspur', 'Jalandhar', 'Kapurthala', 'Ludhiana', 'Mansa', 'Moga', 'Muktsar', 'Patiala', 'Sangrur'],
    'Rajasthan': ['Ajmer', 'Alwar', 'Banswara', 'Barmer', 'Bharatpur', 'Bhilwara', 'Bikaner', 'Chittorgarh', 'Churu', 'Jaipur', 'Jalore', 'Jhunjhunu', 'Jodhpur', 'Kota', 'Nagaur', 'Pali', 'Sikar', 'Udaipur'],
    'Tamil Nadu': ['Chennai', 'Coimbatore', 'Cuddalore', 'Dindigul', 'Erode', 'Kancheepuram', 'Madurai', 'Nagapattinam', 'Salem', 'Thanjavur', 'Tiruchirappalli', 'Tirunelveli', 'Tiruvannamalai', 'Vellore', 'Villupuram'],
    'Telangana': ['Adilabad', 'Hyderabad', 'Karimnagar', 'Khammam', 'Mahabubnagar', 'Medak', 'Nalgonda', 'Nizamabad', 'Rangareddy', 'Warangal'],
    'Uttar Pradesh': ['Agra', 'Aligarh', 'Allahabad', 'Azamgarh', 'Bareilly', 'Bulandshahr', 'Deoria', 'Etawah', 'Faizabad', 'Gorakhpur', 'Hardoi', 'Jhansi', 'Kanpur', 'Lucknow', 'Mathura', 'Meerut', 'Moradabad', 'Muzaffarnagar', 'Shahjahanpur', 'Varanasi'],
    'Uttarakhand': ['Dehradun', 'Haridwar', 'Nainital', 'Udham Singh Nagar'],
    'West Bengal': ['Burdwan', 'Hooghly', 'Howrah', 'Jalpaiguri', 'Kolkata', 'Malda', 'Murshidabad', 'Nadia', 'North 24 Parganas', 'Paschim Medinipur', 'Purba Medinipur', 'South 24 Parganas'],
  };

  // City for weather lookup per state (capital / major agricultural hub)
  const STATE_WEATHER_CITIES = {
    'Andhra Pradesh': 'Vijayawada',
    'Assam': 'Guwahati',
    'Bihar': 'Patna',
    'Chhattisgarh': 'Raipur',
    'Gujarat': 'Ahmedabad',
    'Haryana': 'Karnal',
    'Himachal Pradesh': 'Shimla',
    'Jharkhand': 'Ranchi',
    'Karnataka': 'Bengaluru',
    'Kerala': 'Thiruvananthapuram',
    'Madhya Pradesh': 'Bhopal',
    'Maharashtra': 'Pune',
    'Odisha': 'Bhubaneswar',
    'Punjab': 'Ludhiana',
    'Rajasthan': 'Jaipur',
    'Tamil Nadu': 'Chennai',
    'Telangana': 'Hyderabad',
    'Uttar Pradesh': 'Lucknow',
    'Uttarakhand': 'Dehradun',
    'West Bengal': 'Kolkata',
  };

  // ════════════════════════════════════════════════════════════
  // COMMODITIES — Names match data.gov.in API filter values
  // ════════════════════════════════════════════════════════════

  const COMMODITIES = [
    // Cereals
    { name: 'Wheat', apiName: 'Wheat', category: 'Cereals', icon: '🌾', hasMSP: true },
    { name: 'Paddy (Rice)', apiName: 'Paddy(Dhan)(Common)', category: 'Cereals', icon: '🍚', hasMSP: true },
    { name: 'Maize', apiName: 'Maize', category: 'Cereals', icon: '🌽', hasMSP: true },
    { name: 'Jowar (Sorghum)', apiName: 'Jowar(Sorghum)', category: 'Cereals', icon: '🌾', hasMSP: true },
    { name: 'Bajra (Pearl Millet)', apiName: 'Bajra(Pearl Millet)', category: 'Cereals', icon: '🌾', hasMSP: true },
    { name: 'Ragi (Finger Millet)', apiName: 'Ragi (Finger Millet)', category: 'Cereals', icon: '🌾', hasMSP: true },
    { name: 'Barley', apiName: 'Barley (Jau)', category: 'Cereals', icon: '🌾', hasMSP: true },

    // Pulses
    { name: 'Arhar (Tur)', apiName: 'Arhar (Tur/Red Gram)(Whole)', category: 'Pulses', icon: '🫘', hasMSP: true },
    { name: 'Moong (Green Gram)', apiName: 'Moong(Green Gram)(Whole)', category: 'Pulses', icon: '🫛', hasMSP: true },
    { name: 'Urad (Black Gram)', apiName: 'Urad (Black Gram)(Whole)', category: 'Pulses', icon: '🫘', hasMSP: true },
    { name: 'Gram (Chana)', apiName: 'Gram Raw(Chhola)', category: 'Pulses', icon: '🫘', hasMSP: true },
    { name: 'Masoor (Lentil)', apiName: 'Masoor Dal', category: 'Pulses', icon: '🟤', hasMSP: true },

    // Oilseeds
    { name: 'Groundnut', apiName: 'Groundnut', category: 'Oilseeds', icon: '🥜', hasMSP: true },
    { name: 'Mustard', apiName: 'Mustard', category: 'Oilseeds', icon: '🟡', hasMSP: true },
    { name: 'Soyabean', apiName: 'Soyabean', category: 'Oilseeds', icon: '🫘', hasMSP: true },
    { name: 'Sunflower', apiName: 'Sunflower', category: 'Oilseeds', icon: '🌻', hasMSP: true },
    { name: 'Sesamum (Til)', apiName: 'Sesamum(Sesame,Gingelly,Til)', category: 'Oilseeds', icon: '🌿', hasMSP: true },

    // Cash Crops
    { name: 'Cotton', apiName: 'Cotton', category: 'Cash Crops', icon: '🏵️', hasMSP: true },
    { name: 'Sugarcane', apiName: 'Sugarcane', category: 'Cash Crops', icon: '🎋', hasMSP: false },
    { name: 'Jute', apiName: 'Jute', category: 'Cash Crops', icon: '🧵', hasMSP: true },

    // Vegetables
    { name: 'Onion', apiName: 'Onion', category: 'Vegetables', icon: '🧅', hasMSP: false },
    { name: 'Potato', apiName: 'Potato', category: 'Vegetables', icon: '🥔', hasMSP: false },
    { name: 'Tomato', apiName: 'Tomato', category: 'Vegetables', icon: '🍅', hasMSP: false },
    { name: 'Green Chilli', apiName: 'Green Chilli', category: 'Vegetables', icon: '🌶️', hasMSP: false },
    { name: 'Brinjal', apiName: 'Brinjal', category: 'Vegetables', icon: '🍆', hasMSP: false },
    { name: 'Cauliflower', apiName: 'Cauliflower', category: 'Vegetables', icon: '🥦', hasMSP: false },
    { name: 'Cabbage', apiName: 'Cabbage', category: 'Vegetables', icon: '🥬', hasMSP: false },
    { name: 'Lady Finger (Bhindi)', apiName: 'Ladies Finger', category: 'Vegetables', icon: '🟢', hasMSP: false },

    // Spices
    { name: 'Turmeric', apiName: 'Turmeric', category: 'Spices', icon: '🟡', hasMSP: false },
    { name: 'Cumin (Jeera)', apiName: 'Cumin Seed(Jeera)', category: 'Spices', icon: '🫙', hasMSP: false },
    { name: 'Coriander', apiName: 'Coriander(Dhania)(Whole)', category: 'Spices', icon: '🌿', hasMSP: false },
    { name: 'Black Pepper', apiName: 'Black Pepper', category: 'Spices', icon: '⚫', hasMSP: false },
    { name: 'Garlic', apiName: 'Garlic', category: 'Spices', icon: '🧄', hasMSP: false },
    { name: 'Ginger', apiName: 'Ginger(Green)', category: 'Spices', icon: '🫚', hasMSP: false },

    // Fruits
    { name: 'Banana', apiName: 'Banana', category: 'Fruits', icon: '🍌', hasMSP: false },
    { name: 'Mango', apiName: 'Mango (Raw-Loss)', category: 'Fruits', icon: '🥭', hasMSP: false },
    { name: 'Apple', apiName: 'Apple', category: 'Fruits', icon: '🍎', hasMSP: false },
    { name: 'Grapes', apiName: 'Grapes', category: 'Fruits', icon: '🍇', hasMSP: false },
  ];

  // ════════════════════════════════════════════════════════════
  // MSP DATA — Government of India, 2024-25
  // Source: Commission for Agricultural Costs and Prices (CACP)
  // Ministry of Agriculture & Farmers Welfare
  // ════════════════════════════════════════════════════════════

  const MSP_DATA = {
    // ── KHARIF 2024-25 (Monsoon Crops) ──
    'Paddy (Rice)': {
      msp: 2300,
      season: 'Kharif',
      costA2FL: 1455,
      costC2: 2072,
      year: '2024-25',
      note: 'Common variety; Grade A ₹2,320',
    },
    'Jowar (Sorghum)': {
      msp: 3371,
      season: 'Kharif',
      costA2FL: 2165,
      costC2: 3343,
      year: '2024-25',
      note: 'Hybrid; Maldandi variety ₹3,421',
    },
    'Bajra (Pearl Millet)': {
      msp: 2625,
      season: 'Kharif',
      costA2FL: 1499,
      costC2: 2280,
      year: '2024-25',
    },
    'Maize': {
      msp: 2225,
      season: 'Kharif',
      costA2FL: 1394,
      costC2: 2074,
      year: '2024-25',
    },
    'Ragi (Finger Millet)': {
      msp: 4290,
      season: 'Kharif',
      costA2FL: 2751,
      costC2: 3846,
      year: '2024-25',
    },
    'Arhar (Tur)': {
      msp: 7550,
      season: 'Kharif',
      costA2FL: 4326,
      costC2: 7110,
      year: '2024-25',
    },
    'Moong (Green Gram)': {
      msp: 8682,
      season: 'Kharif',
      costA2FL: 5598,
      costC2: 8558,
      year: '2024-25',
    },
    'Urad (Black Gram)': {
      msp: 7400,
      season: 'Kharif',
      costA2FL: 4116,
      costC2: 6830,
      year: '2024-25',
    },
    'Groundnut': {
      msp: 6783,
      season: 'Kharif',
      costA2FL: 4261,
      costC2: 6471,
      year: '2024-25',
    },
    'Sunflower': {
      msp: 7280,
      season: 'Kharif',
      costA2FL: 4536,
      costC2: 7363,
      year: '2024-25',
    },
    'Soyabean': {
      msp: 4892,
      season: 'Kharif',
      costA2FL: 3010,
      costC2: 4766,
      year: '2024-25',
    },
    'Sesamum (Til)': {
      msp: 9267,
      season: 'Kharif',
      costA2FL: 5765,
      costC2: 9517,
      year: '2024-25',
    },
    'Cotton': {
      msp: 7121,
      season: 'Kharif',
      costA2FL: 4476,
      costC2: 6904,
      year: '2024-25',
      note: 'Medium staple; Long staple ₹7,521',
    },
    'Jute': {
      msp: 5335,
      season: 'Kharif',
      costA2FL: 3456,
      costC2: 5386,
      year: '2024-25',
    },

    // ── RABI 2024-25 (Winter Crops) ──
    'Wheat': {
      msp: 2275,
      season: 'Rabi',
      costA2FL: 1128,
      costC2: 1695,
      year: '2024-25',
    },
    'Barley': {
      msp: 1850,
      season: 'Rabi',
      costA2FL: 1082,
      costC2: 1582,
      year: '2024-25',
    },
    'Gram (Chana)': {
      msp: 5650,
      season: 'Rabi',
      costA2FL: 3460,
      costC2: 5534,
      year: '2024-25',
    },
    'Masoor (Lentil)': {
      msp: 6425,
      season: 'Rabi',
      costA2FL: 3506,
      costC2: 5765,
      year: '2024-25',
    },
    'Mustard': {
      msp: 5950,
      season: 'Rabi',
      costA2FL: 3082,
      costC2: 4992,
      year: '2024-25',
    },
  };

  // ════════════════════════════════════════════════════════════
  // GOVERNMENT SCHEMES — Verified official data
  // Source: Respective scheme portals, PIB, MoAFW
  // ════════════════════════════════════════════════════════════

  const GOV_SCHEMES = [
    {
      name: 'PM-KISAN Samman Nidhi',
      nameHi: 'प्रधानमंत्री किसान सम्मान निधि',
      icon: '💰',
      category: 'Income Support',
      description: 'Direct income support of ₹6,000 per year to all landholding farmer families across the country, paid in three equal instalments of ₹2,000 every four months via Direct Benefit Transfer (DBT).',
      benefit: '₹6,000/year in 3 instalments of ₹2,000',
      eligibility: ['All landholding farmer families', 'Aadhaar-linked bank account required', 'Subject to exclusion criteria for higher income categories'],
      launched: 'February 2019',
      ministry: 'Ministry of Agriculture & Farmers Welfare',
      link: 'https://pmkisan.gov.in',
      beneficiaries: '11.8+ Crore',
      totalDisbursed: '₹3.04+ Lakh Crore',
    },
    {
      name: 'PM Fasal Bima Yojana (PMFBY)',
      nameHi: 'प्रधानमंत्री फसल बीमा योजना',
      icon: '🛡️',
      category: 'Insurance',
      description: 'Comprehensive crop insurance at subsidized premiums. Covers yield losses due to natural calamities, pests, and diseases. Premium: 2% Kharif, 1.5% Rabi, 5% commercial/horticultural crops.',
      benefit: 'Crop insurance at 2% (Kharif) / 1.5% (Rabi) premium',
      eligibility: ['All farmers growing notified crops', 'Voluntary for loanee and non-loanee farmers', 'Enrolment before sowing season cutoff dates'],
      launched: 'April 2016',
      ministry: 'Ministry of Agriculture & Farmers Welfare',
      link: 'https://pmfby.gov.in',
      beneficiaries: '4+ Crore farmers/season',
      totalDisbursed: '₹1.5+ Lakh Crore claims settled',
    },
    {
      name: 'Kisan Credit Card (KCC)',
      nameHi: 'किसान क्रेडिट कार्ड',
      icon: '💳',
      category: 'Credit',
      description: 'Institutional credit facility for farmers at subsidized interest rates. Loan up to ₹3 lakh at 4% p.a. (with interest subvention). Covers crop cultivation, post-harvest, farm maintenance, and allied activities.',
      benefit: 'Credit up to ₹3 lakh at 4% p.a. interest',
      eligibility: ['All farmers — individual/joint borrowers', 'Owner cultivators, tenant farmers, sharecroppers, SHGs', 'Fisheries and animal husbandry farmers also eligible'],
      launched: '1998 (revamped 2019)',
      ministry: 'Ministry of Finance / NABARD',
      link: 'https://eseva.csccloud.in/kcc',
      beneficiaries: '7.5+ Crore cards issued',
    },
    {
      name: 'eNAM — National Agriculture Market',
      nameHi: 'राष्ट्रीय कृषि बाज़ार',
      icon: '🏪',
      category: 'Market Access',
      description: 'Pan-India electronic trading portal linking 1,361 APMC mandis across 23 states. Enables transparent price discovery, online bidding, and seamless inter-state trade of agricultural commodities.',
      benefit: 'Transparent online trading across 1,361+ mandis',
      eligibility: ['All farmers (registration required via mandi)', 'Traders, commission agents, FPOs', 'States that have reformed APMC Act'],
      launched: 'April 2016',
      ministry: 'Ministry of Agriculture & Farmers Welfare',
      link: 'https://enam.gov.in',
      beneficiaries: '1.76+ Crore farmers registered',
    },
    {
      name: 'Soil Health Card Scheme',
      nameHi: 'मृदा स्वास्थ्य कार्ड योजना',
      icon: '🧪',
      category: 'Soil & Crop',
      description: 'Free soil testing and personalized Soil Health Cards providing crop-wise fertilizer recommendations. Issued every 2 years after testing 12 key parameters including NPK, pH, EC, and micronutrients.',
      benefit: 'Free soil testing + personalized fertilizer recommendations',
      eligibility: ['All farmers across India', 'Soil samples collected from farmer fields', 'Cards issued through State Agriculture departments'],
      launched: 'February 2015',
      ministry: 'Ministry of Agriculture & Farmers Welfare',
      link: 'https://soilhealth.dac.gov.in',
      beneficiaries: '23+ Crore cards issued',
    },
    {
      name: 'PM Krishi Sinchayee Yojana (PMKSY)',
      nameHi: 'प्रधानमंत्री कृषि सिंचाई योजना',
      icon: '💧',
      category: 'Irrigation',
      description: 'Har Khet Ko Pani — ensures water access for agriculture through micro-irrigation (drip, sprinkler), watershed development, and Per Drop More Crop. 55% subsidy for micro-irrigation systems.',
      benefit: '55% subsidy on micro-irrigation (drip/sprinkler)',
      eligibility: ['All farmers (priority to small/marginal)', 'Farmers adopting micro-irrigation', 'Higher subsidy for SC/ST and NE state farmers'],
      launched: 'July 2015',
      ministry: 'Ministry of Agriculture & Farmers Welfare',
      link: 'https://pmksy.gov.in',
    },
    {
      name: 'PM Kisan Maandhan Yojana',
      nameHi: 'प्रधानमंत्री किसान मानधन योजना',
      icon: '🧓',
      category: 'Pension',
      description: 'Voluntary pension scheme for small and marginal farmers (land holding up to 2 hectares). Monthly pension of ₹3,000 after age 60. Monthly contribution of ₹55-200 depending on entry age.',
      benefit: '₹3,000/month pension after age 60',
      eligibility: ['Small & marginal farmers (land ≤ 2 hectares)', 'Entry age: 18-40 years', 'Not covered under NPS/ESIC/EPFO'],
      launched: 'September 2019',
      ministry: 'Ministry of Agriculture & Farmers Welfare',
      link: 'https://maandhan.in',
      beneficiaries: '23+ Lakh enrolled',
    },
    {
      name: 'Agriculture Infrastructure Fund (AIF)',
      nameHi: 'कृषि अवसंरचना कोष',
      icon: '🏗️',
      category: 'Infrastructure',
      description: 'Medium-long term financing for post-harvest management and community farming assets. ₹1 Lakh Crore credit facility with 3% interest subvention and CGTMSE credit guarantee.',
      benefit: '3% interest subvention on infrastructure loans',
      eligibility: ['Farmers, FPOs, PACS, agri-entrepreneurs', 'State agencies, APMCs, startups', 'For projects like warehouses, cold chains, processing units'],
      launched: 'August 2020',
      ministry: 'Ministry of Agriculture & Farmers Welfare',
      link: 'https://agriinfra.dac.gov.in',
    },
    {
      name: 'PM Kisan Sampada Yojana',
      nameHi: 'प्रधानमंत्री किसान संपदा योजना',
      icon: '🏭',
      category: 'Infrastructure',
      description: 'Comprehensive scheme for creation of modern food processing infrastructure, from farm gate to retail outlet. Includes Mega Food Parks, Cold Chain, food processing, and backward/forward linkages.',
      benefit: 'Grants up to 50-75% for food processing units',
      eligibility: ['Entrepreneurs, cooperatives, SHGs, FPOs', 'State/Central PSUs', 'Projects in food processing and value addition'],
      launched: '2017 (restructured)',
      ministry: 'Ministry of Food Processing Industries',
      link: 'https://mofpi.nic.in',
    },
    {
      name: 'Paramparagat Krishi Vikas Yojana',
      nameHi: 'परम्परागत कृषि विकास योजना',
      icon: '🌿',
      category: 'Soil & Crop',
      description: 'Promotes organic farming through cluster approach. ₹50,000/hectare assistance over 3 years for organic inputs, certification, and value addition. PGS-India certification supported.',
      benefit: '₹50,000/hectare for organic farming over 3 years',
      eligibility: ['Farmer groups of 50+ in a cluster of 20+ hectares', 'Adopting organic farming practices', 'Through State Agriculture departments'],
      launched: '2015',
      ministry: 'Ministry of Agriculture & Farmers Welfare',
      link: 'https://pgsindia-ncof.gov.in',
    },
    {
      name: 'National Mission on Edible Oils (NMEO)',
      nameHi: 'राष्ट्रीय खाद्य तेल मिशन',
      icon: '🫒',
      category: 'Soil & Crop',
      description: 'Aims to increase domestic production of edible oils — focuses on oil palm, soybean, rapeseed-mustard, groundnut, sunflower, and rice bran oil. Includes Oil Palm Area Expansion under NMEO-OP.',
      benefit: 'Subsidies for oil crop cultivation and palm plantations',
      eligibility: ['Farmers in identified districts', 'Oil palm cultivation in NE and A&N Islands', 'Through State Horticulture departments'],
      launched: '2021',
      ministry: 'Ministry of Agriculture & Farmers Welfare',
      link: 'https://nmeo.dac.gov.in',
    },
    {
      name: 'National Beekeeping & Honey Mission',
      nameHi: 'राष्ट्रीय मधुमक्खी पालन एवं शहद मिशन',
      icon: '🐝',
      category: 'Soil & Crop',
      description: 'Promotes scientific beekeeping for additional income to farmers. Provides bee colonies, equipment, training, and post-harvest infrastructure with up to 65% subsidy.',
      benefit: 'Up to 65% subsidy on beekeeping equipment',
      eligibility: ['All farmers and rural entrepreneurs', 'Priority to SC/ST/women', 'Training provided at KVKs'],
      launched: '2020',
      ministry: 'Ministry of Agriculture & Farmers Welfare',
      link: 'https://nbb.gov.in',
    },
  ];

  // ════════════════════════════════════════════════════════════
  // NATIONAL STATISTICS (Official data — PIB, MoAFW)
  // ════════════════════════════════════════════════════════════

  const NATIONAL_STATS = {
    totalFarmers: '14.6 Crore',
    registeredKisanFarmers: '11.8 Crore',
    activeMandis: '7,062',
    enamMandis: '1,361',
    commoditiesTracked: '300+',
    pmKisanDisbursed: '₹3.04 Lakh Crore',
    pmfbyClaimsSettled: '₹1.56 Lakh Crore',
    mspCropsCount: 23,
    avgMSPIncrease: '5.4% (2024-25 over 2023-24)',
  };

  // ════════════════════════════════════════════════════════════
  // COMMODITY CATEGORIES
  // ════════════════════════════════════════════════════════════

  const CATEGORIES = ['Cereals', 'Pulses', 'Oilseeds', 'Cash Crops', 'Vegetables', 'Spices', 'Fruits'];

  // ════════════════════════════════════════════════════════════
  // MARKET LISTINGS (Sample — needs backend for real deployment)
  // These serve as feature demonstration until backend is ready
  // ════════════════════════════════════════════════════════════

  const MARKET_LISTINGS = [
    { buyerName: 'National Cooperative (NAFED)', type: 'Government Agency', commodity: 'Wheat', location: 'Pan India', quantity: '10,000+ Qt', priceOffered: 2275, rating: 4.8, verified: true, deliveryDate: 'As per procurement season', contact: 'nafed.in' },
    { buyerName: 'Mother Dairy — Safal', type: 'Cooperative', commodity: 'Onion', location: 'Delhi NCR', quantity: '500 Qt/week', priceOffered: 1800, rating: 4.6, verified: true, deliveryDate: 'Ongoing', contact: 'safal.com' },
    { buyerName: 'ITC e-Choupal', type: 'Corporate Buyer', commodity: 'Soyabean', location: 'Madhya Pradesh', quantity: '2,000 Qt', priceOffered: 4950, rating: 4.5, verified: true, deliveryDate: 'Nov-Feb', contact: 'itcportal.com' },
    { buyerName: 'Amul Dairy Cooperative', type: 'Cooperative', commodity: 'Groundnut', location: 'Gujarat', quantity: '1,500 Qt', priceOffered: 6800, rating: 4.9, verified: true, deliveryDate: 'Ongoing', contact: 'amul.com' },
    { buyerName: 'BigBasket Direct', type: 'E-Commerce', commodity: 'Tomato', location: 'South India', quantity: '200 Qt/week', priceOffered: 2200, rating: 4.3, verified: true, deliveryDate: 'Ongoing supply', contact: 'bigbasket.com' },
    { buyerName: 'Cargill India', type: 'Corporate Buyer', commodity: 'Mustard', location: 'Rajasthan, Haryana', quantity: '5,000 Qt', priceOffered: 6000, rating: 4.4, verified: true, deliveryDate: 'Mar-May', contact: 'cargill.co.in' },
  ];

  // ════════════════════════════════════════════════════════════
  // EXPOSE DATA GLOBALLY
  // ════════════════════════════════════════════════════════════

  window.KisanData = {
    STATES,
    DISTRICTS,
    STATE_WEATHER_CITIES,
    COMMODITIES,
    CATEGORIES,
    MSP_DATA,
    GOV_SCHEMES,
    NATIONAL_STATS,
    MARKET_LISTINGS,
  };

})();
