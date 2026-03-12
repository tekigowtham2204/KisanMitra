// ============================================================
// KisanMitra — Real API Service Layer
// Connects to data.gov.in (Mandi Prices) & OpenWeatherMap (Weather)
// ============================================================

(function () {
    'use strict';

    // ── Configuration ──────────────────────────────────────────
    // Register FREE at https://data.gov.in and https://openweathermap.org
    // Replace the placeholder keys below with your actual keys.
    const CONFIG = {
        // data.gov.in API key (Updated: 2026-02-11)
        DATA_GOV_API_KEY: '579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b',

        // OpenWeatherMap API key (free tier — https://openweathermap.org/appid)
        // Note: New keys may take up to 2 hours to activate!
        WEATHER_API_KEY: 'e659d328326a30ee4c1dda81889de880',

        // data.gov.in resource IDs (Updated Resource ID for Mandi Prices)
        MANDI_PRICE_RESOURCE: '9ef84268-d588-465a-a308-a864a43d0070',

        // Base URLs
        DATA_GOV_BASE: 'https://api.data.gov.in/resource',
        WEATHER_BASE: 'https://api.openweathermap.org/data/2.5',

        // Cache durations
        CACHE_DURATION_MS: 15 * 60 * 1000,        // Mandi prices: 15 min
        WEATHER_CACHE_DURATION_MS: 30 * 60 * 1000, // Weather: 30 min (changes slowly)
        STALE_TTL_MS: 60 * 60 * 1000,             // Serve stale cache up to 1 hour
        MAX_RESULTS: 100,

        // Request timeouts
        TIMEOUT_MS: 5000,         // General timeout
        MANDI_TIMEOUT_MS: 4000,   // Mandi API (data.gov.in is slow)
    };

    // ── Cache Layer (sessionStorage) ───────────────────────────
    const Cache = {
        _prefix: 'km_cache_',

        /**
         * Get fresh cached data (within cacheDuration).
         * @param {string} key
         * @param {number} cacheDuration - max age in ms (default: CONFIG.CACHE_DURATION_MS)
         */
        get(key, cacheDuration = CONFIG.CACHE_DURATION_MS) {
            try {
                const raw = sessionStorage.getItem(this._prefix + key);
                if (!raw) return null;
                const { data, ts } = JSON.parse(raw);
                if (Date.now() - ts > cacheDuration) {
                    // Don't delete — getStale() may still use it
                    return null;
                }
                return data;
            } catch {
                return null;
            }
        },

        /**
         * Get stale cached data (expired but within STALE_TTL).
         * Returns data even if past cacheDuration, up to STALE_TTL.
         * Callers should refresh in background when this returns data.
         */
        getStale(key) {
            try {
                const raw = sessionStorage.getItem(this._prefix + key);
                if (!raw) return null;
                const { data, ts } = JSON.parse(raw);
                if (Date.now() - ts > CONFIG.STALE_TTL_MS) {
                    sessionStorage.removeItem(this._prefix + key);
                    return null;
                }
                return data;
            } catch {
                return null;
            }
        },

        set(key, data) {
            try {
                sessionStorage.setItem(this._prefix + key, JSON.stringify({
                    data,
                    ts: Date.now()
                }));
            } catch (e) {
                // Storage full — clear old entries
                this.clearOldEntries();
            }
        },

        clearOldEntries() {
            const keys = [];
            for (let i = 0; i < sessionStorage.length; i++) {
                const key = sessionStorage.key(i);
                if (key && key.startsWith(this._prefix)) keys.push(key);
            }
            // Remove oldest half
            keys.slice(0, Math.ceil(keys.length / 2)).forEach(k => sessionStorage.removeItem(k));
        }
    };

    // ── Fetch with timeout ─────────────────────────────────────
    async function fetchWithTimeout(url, timeoutMs = CONFIG.TIMEOUT_MS) {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), timeoutMs);
        try {
            const resp = await fetch(url, { signal: controller.signal });
            clearTimeout(timer);
            return resp;
        } catch (err) {
            clearTimeout(timer);
            if (err.name === 'AbortError') {
                throw new Error('Request timed out. Please check your internet connection.');
            }
            throw err;
        }
    }

    // ════════════════════════════════════════════════════════════
    // MANDI PRICES (data.gov.in)
    // ════════════════════════════════════════════════════════════

    /**
     * Fetch live mandi prices from data.gov.in
     * @param {Object} filters - { state, commodity, district, market }
     * @returns {Promise<{total, count, records[], updated}>}
     */
    async function fetchMandiPrices(filters = {}) {
        const { state, commodity, district, market } = filters;
        const cacheKey = `mandi_${state || ''}_${commodity || ''}_${district || ''}`;
        const cached = Cache.get(cacheKey);
        if (cached) return cached;

        const params = new URLSearchParams({
            'api-key': CONFIG.DATA_GOV_API_KEY,
            format: 'json',
            limit: String(CONFIG.MAX_RESULTS),
            offset: '0',
        });

        if (state) params.append('filters[state.keyword]', state);
        if (commodity) params.append('filters[commodity]', commodity);
        if (district) params.append('filters[district]', district);
        if (market) params.append('filters[market]', market);

        const url = `${CONFIG.DATA_GOV_BASE}/${CONFIG.MANDI_PRICE_RESOURCE}?${params}`;

        // Stale-while-revalidate: show old data instantly while refreshing
        const stale = Cache.getStale(cacheKey);
        if (stale) {
            // Fire background refresh, but return stale data now
            fetchWithTimeout(url, CONFIG.MANDI_TIMEOUT_MS)
                .then(resp => resp.ok ? resp.json() : null)
                .then(json => {
                    if (json && json.records && json.records.length > 0) {
                        const records = json.records.map(r => ({
                            state: r.state || '', district: r.district || '',
                            market: r.market || '', commodity: r.commodity || '',
                            variety: r.variety || '', grade: r.grade || '',
                            arrivalDate: r.arrival_date || '',
                            minPrice: parseFloat(r.min_price) || 0,
                            maxPrice: parseFloat(r.max_price) || 0,
                            modalPrice: parseFloat(r.modal_price) || 0,
                        }));
                        Cache.set(cacheKey, {
                            total: json.total || 0, count: json.count || records.length,
                            records, updated: json.updated_date || new Date().toISOString(),
                            isMock: false
                        });
                    }
                })
                .catch(() => { }); // Silent fail — stale data is good enough
            return stale;
        }

        try {
            const resp = await fetchWithTimeout(url, CONFIG.MANDI_TIMEOUT_MS);

            // Handle invalid API key or other server errors immediately
            if (!resp.ok) {
                const text = await resp.text().catch(() => '');
                console.warn(`API Error (${resp.status}): ${text}`);
                throw new Error(`API Error ${resp.status}`);
            }

            const json = await resp.json();

            // Process records if they exist
            const records = (json.records || []).map(r => ({
                state: r.state || '',
                district: r.district || '',
                market: r.market || '',
                commodity: r.commodity || '',
                variety: r.variety || '',
                grade: r.grade || '',
                arrivalDate: r.arrival_date || '',
                minPrice: parseFloat(r.min_price) || 0,
                maxPrice: parseFloat(r.max_price) || 0,
                modalPrice: parseFloat(r.modal_price) || 0,
            }));

            // CRITICAL FOR DEMO: If API returns 0 records (common for specific filters),
            // fallback to mock data so the user ALWAYS sees something.
            if (records.length === 0) {
                console.log('API returned 0 records, switching to simulation for demo.');
                return generateMockPrices({ state, commodity, district, market });
            }

            const result = {
                total: json.total || 0,
                count: json.count || records.length,
                records,
                updated: json.updated_date || new Date().toISOString(),
                isMock: false
            };

            Cache.set(cacheKey, result);
            return result;

        } catch (err) {
            console.warn('API Request Failed/Timed Out, falling back to simulation:', err);
            // Fallback: Generate realistic mock data
            return generateMockPrices({ state, commodity, district, market });
        }
    }

    /**
     * Generate realistic mock mandi prices when API is down
     */
    function generateMockPrices(filters) {
        const { state, commodity } = filters;
        const mockRecords = [];
        const districts = window.KisanData?.DISTRICTS[state] || ['District A', 'District B', 'District C'];

        // Determine base price from MSP or random
        const mspInfo = window.KisanData?.MSP_DATA[commodity];
        const basePrice = mspInfo?.msp || 2000 + Math.random() * 3000;

        // Generate 5-8 records
        const count = 5 + Math.floor(Math.random() * 4);

        for (let i = 0; i < count; i++) {
            const district = districts[i % districts.length];
            // Randomize price around base +/- 10%
            const variance = (Math.random() - 0.5) * 0.2 * basePrice;
            const modalPrice = Math.round(basePrice + variance);
            const minPrice = Math.round(modalPrice * 0.95);
            const maxPrice = Math.round(modalPrice * 1.05);

            mockRecords.push({
                state: state || 'Unknown State',
                district: district,
                market: `${district} Mandi`,
                commodity: commodity || 'Unknown Crop',
                variety: 'FAQ',
                grade: 'FAQ',
                arrivalDate: new Date().toLocaleDateString('en-GB'), // DD/MM/YYYY
                minPrice,
                maxPrice,
                modalPrice,
                isMock: true // Flag for UI
            });
        }

        return Promise.resolve({
            total: mockRecords.length,
            count: mockRecords.length,
            records: mockRecords,
            updated: new Date().toISOString(),
            isMock: true
        });
    }

    // ════════════════════════════════════════════════════════════
    // WEATHER (OpenWeatherMap)
    // ════════════════════════════════════════════════════════════

    /**
     * Fetch current weather for a city or coordinates
     * @param {string|Object} query - City name (string) or {lat, lon} object
     * @returns {Promise<Object>}
     */
    async function fetchWeather(query) {
        const cacheKey = typeof query === 'string' ? `weather_${query}` : `weather_${query.lat}_${query.lon}`;
        const cached = Cache.get(cacheKey, CONFIG.WEATHER_CACHE_DURATION_MS);
        if (cached) return cached;

        // Stale-while-revalidate: return stale data instantly, refresh in background
        const stale = Cache.getStale(cacheKey);
        if (stale) {
            // Fire off background refresh (don't await)
            _refreshWeather(query, cacheKey).catch(() => { });
            return stale;
        }

        return _refreshWeather(query, cacheKey);
    }

    /** Internal: fetch fresh weather from API and update cache */
    async function _refreshWeather(query, cacheKey) {
        let url;
        if (typeof query === 'string') {
            url = `${CONFIG.WEATHER_BASE}/weather?q=${encodeURIComponent(query)},IN&appid=${CONFIG.WEATHER_API_KEY}&units=metric&lang=en`;
        } else {
            url = `${CONFIG.WEATHER_BASE}/weather?lat=${query.lat}&lon=${query.lon}&appid=${CONFIG.WEATHER_API_KEY}&units=metric&lang=en`;
        }

        const resp = await fetchWithTimeout(url);
        if (!resp.ok) throw new Error(`Weather API error (${resp.status})`);
        const d = await resp.json();

        const result = {
            location: `${d.name}, India`,
            temp: Math.round(d.main.temp),
            feelsLike: Math.round(d.main.feels_like),
            tempMin: Math.round(d.main.temp_min),
            tempMax: Math.round(d.main.temp_max),
            humidity: d.main.humidity,
            pressure: d.main.pressure,
            windSpeed: Math.round(d.wind.speed * 3.6), // m/s → km/h
            windDeg: d.wind.deg || 0,
            condition: d.weather[0]?.description || '',
            icon: weatherCodeToEmoji(d.weather[0]?.id),
            rainfall: d.rain?.['1h'] || d.rain?.['3h'] || 0,
            visibility: Math.round((d.visibility || 10000) / 1000), // km
            sunrise: d.sys?.sunrise ? new Date(d.sys.sunrise * 1000).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : '',
            sunset: d.sys?.sunset ? new Date(d.sys.sunset * 1000).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : '',
        };

        Cache.set(cacheKey, result);
        return result;
    }

    /**
     * Fetch 5-day / 3-hour forecast
     * @param {string|Object} query - City name (string) or {lat, lon} object
     * @returns {Promise<Array>}
     */
    async function fetchForecast(query) {
        const cacheKey = typeof query === 'string' ? `forecast_${query}` : `forecast_${query.lat}_${query.lon}`;
        const cached = Cache.get(cacheKey, CONFIG.WEATHER_CACHE_DURATION_MS);
        if (cached) return cached;

        // Stale-while-revalidate: return stale data instantly, refresh in background
        const stale = Cache.getStale(cacheKey);
        if (stale) {
            _refreshForecast(query, cacheKey).catch(() => { });
            return stale;
        }

        return _refreshForecast(query, cacheKey);
    }

    /** Internal: fetch fresh forecast from API and update cache */
    async function _refreshForecast(query, cacheKey) {
        let url;
        if (typeof query === 'string') {
            url = `${CONFIG.WEATHER_BASE}/forecast?q=${encodeURIComponent(query)},IN&appid=${CONFIG.WEATHER_API_KEY}&units=metric&cnt=40`;
        } else {
            url = `${CONFIG.WEATHER_BASE}/forecast?lat=${query.lat}&lon=${query.lon}&appid=${CONFIG.WEATHER_API_KEY}&units=metric&cnt=40`;
        }

        const resp = await fetchWithTimeout(url);
        if (!resp.ok) throw new Error(`Forecast API error (${resp.status})`);
        const data = await resp.json();

        // Group by day — pick noon reading
        const dailyMap = {};
        let tempMaxByDay = {};
        let tempMinByDay = {};

        (data.list || []).forEach(item => {
            const date = item.dt_txt.split(' ')[0];
            const hour = parseInt(item.dt_txt.split(' ')[1]);

            if (!tempMaxByDay[date] || item.main.temp_max > tempMaxByDay[date]) {
                tempMaxByDay[date] = item.main.temp_max;
            }
            if (!tempMinByDay[date] || item.main.temp_min < tempMinByDay[date]) {
                tempMinByDay[date] = item.main.temp_min;
            }

            // Prefer noon reading
            if (!dailyMap[date] || Math.abs(hour - 12) < Math.abs(parseInt(dailyMap[date].dt_txt.split(' ')[1]) - 12)) {
                dailyMap[date] = item;
            }
        });

        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const forecast = Object.entries(dailyMap).slice(0, 5).map(([date, item]) => {
            const d = new Date(date + 'T12:00:00');
            return {
                day: dayNames[d.getDay()],
                date,
                high: Math.round(tempMaxByDay[date] || item.main.temp_max),
                low: Math.round(tempMinByDay[date] || item.main.temp_min),
                condition: item.weather[0]?.description || '',
                icon: weatherCodeToEmoji(item.weather[0]?.id),
                humidity: item.main.humidity,
                windSpeed: Math.round(item.wind.speed * 3.6),
            };
        });

        Cache.set(cacheKey, forecast);
        return forecast;
    }

    /**
     * Generate crop advisories based on real weather data
     */
    function generateAdvisories(weather, forecast, season) {
        const isHindi = window.KisanI18n && window.KisanI18n.getLanguage() === 'hi';
        const advisories = [];

        // Temperature-based
        if (weather.temp > 40) {
            advisories.push(isHindi
                ? '🔥 अत्यधिक गर्मी — नर्सरी को छाया दें, सिंचाई की आवृत्ति बढ़ाएं'
                : '🔥 Extreme heat alert — provide shade for nurseries, increase irrigation frequency');
        } else if (weather.temp > 35) {
            advisories.push(isHindi
                ? '☀️ उच्च तापमान — पर्याप्त सिंचाई सुनिश्चित करें, पीक आवर्स के दौरान कीटनाशक छिड़काव से बचें'
                : '☀️ High temperature — ensure adequate irrigation, avoid pesticide application during peak hours');
        } else if (weather.temp < 5) {
            advisories.push(isHindi
                ? '❄️ पाले की चेतावनी — रबी फसलों को सुबह हल्की सिंचाई से बचाएं'
                : '❄️ Frost alert — protect Rabi crops with light irrigation in early morning');
        } else if (weather.temp < 10) {
            advisories.push(isHindi
                ? '🥶 शीत लहर — संवेदनशील फसलों को ढकें, गर्मी की फसलों की बुवाई थोड़ा टालें'
                : '🥶 Cold wave conditions — cover sensitive crops, delay sowing of summer crops');
        }

        // Humidity-based
        if (weather.humidity > 85) {
            advisories.push(isHindi
                ? '💧 उच्च आर्द्रता — फंगल रोगों पर ध्यान दें, खेत में उचित वायु संचार सुनिश्चित करें'
                : '💧 High humidity — watch for fungal diseases, ensure proper field ventilation');
        }

        // Rainfall-based
        if (weather.rainfall > 50) {
            advisories.push(isHindi
                ? '🌧️ भारी बारिश की चेतावनी — जल निकासी सुनिश्चित करें, कीटनाशक छिड़काव स्थगित करें'
                : '🌧️ Heavy rainfall warning — ensure proper drainage, postpone pesticide spraying');
        } else if (weather.rainfall > 10) {
            advisories.push(isHindi
                ? '🌦️ बारिश की संभावना — उर्वरक आवेदन के लिए अच्छा समय, सिंचाई कम करें'
                : '🌦️ Rain expected — good time for fertilizer application, reduce irrigation');
        }

        // Wind-based
        if (weather.windSpeed > 40) {
            advisories.push(isHindi
                ? '💨 तेज हवाएं — लंबी फसलों को सहारा दें, कृषि संरचनाओं को सुरक्षित करें'
                : '💨 Strong winds — provide support to tall crops, secure farm structures');
        }

        // Season-based defaults
        const month = new Date().getMonth();
        if (month >= 9 && month <= 11) {
            advisories.push(isHindi
                ? '🌾 रबी मौसम — गेहूं, सरसों और चना बुवाई के लिए उपयुक्त समय'
                : '🌾 Rabi season — optimal time for wheat, mustard, and gram sowing');
        } else if (month >= 5 && month <= 7) {
            advisories.push(isHindi
                ? '🌱 खरीफ बुवाई मौसम — धान, कपास और सोयाबीन के लिए खेत तैयार करें'
                : '🌱 Kharif sowing season — prepare fields for paddy, cotton, and soyabean');
        } else if (month >= 2 && month <= 4) {
            advisories.push(isHindi
                ? '🌿 जायद मौसम — तरबूज, खीरा और मूंग की खेती के लिए उपयुक्त'
                : '🌿 Zaid season — suitable for watermelon, cucumber, and moong cultivation');
        }

        // Visibility-based
        if (weather.visibility < 2) {
            advisories.push(isHindi
                ? '🌫️ घना कोहरा — कीटनाशक छिड़काव से बचें, कीट गतिविधि पर नज़र रखें'
                : '🌫️ Dense fog — avoid pesticide spraying, watch for increased pest activity');
        }

        // Default advisory
        if (advisories.length === 0) {
            advisories.push(isHindi
                ? '✅ मौसम खेती के अनुकूल है'
                : '✅ Weather conditions are favorable for farming activities');
        }

        return advisories.slice(0, 4); // Max 4 advisories
    }

    // ── Weather code to emoji mapper ──
    function weatherCodeToEmoji(code) {
        if (!code) return '🌤️';
        if (code >= 200 && code < 300) return '⛈️';  // Thunderstorm
        if (code >= 300 && code < 400) return '🌦️';  // Drizzle
        if (code >= 500 && code < 510) return '🌧️';  // Rain
        if (code >= 510 && code < 520) return '🌧️';  // Freezing rain
        if (code >= 520 && code < 600) return '🌧️';  // Shower rain
        if (code >= 600 && code < 700) return '❄️';   // Snow
        if (code === 701) return '🌫️';                // Mist
        if (code === 711) return '💨';                 // Smoke
        if (code === 721) return '🌫️';                // Haze
        if (code === 741) return '🌫️';                // Fog
        if (code === 800) return '☀️';                 // Clear
        if (code === 801) return '🌤️';                // Few clouds
        if (code === 802) return '⛅';                 // Scattered clouds
        if (code >= 803) return '☁️';                  // Overcast
        return '🌤️';
    }

    // ── API Key status checkers ──
    function isMandiKeySet() {
        return CONFIG.DATA_GOV_API_KEY !== 'YOUR_DATA_GOV_IN_API_KEY';
    }

    function isWeatherKeySet() {
        return CONFIG.WEATHER_API_KEY !== 'YOUR_OPENWEATHERMAP_API_KEY';
    }

    function isFullyConfigured() {
        return isMandiKeySet() && isWeatherKeySet();
    }

    // ── Expose API globally ──
    window.KisanAPI = {
        fetchMandiPrices,
        fetchWeather,
        fetchForecast,
        generateAdvisories,
        isMandiKeySet,
        isWeatherKeySet,
        isFullyConfigured,
        CONFIG,
    };

})();
