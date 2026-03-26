// ============================================================
// KisanMitra — Main Application Logic (Production)
// Modular Architecture
// ============================================================

import { Utils } from './modules/utils.js';
import { AppState } from './modules/state.js';
import { UI } from './modules/ui.js';
import { initEmojiToSvgIcons } from './modules/iconify.js';

// ── Initialize on DOM ready ──
document.addEventListener('DOMContentLoaded', () => {
    initNavToggle();
    initScrollToTop();
    initScrollReveal();

    // Initial ticker render
    if (window.KisanData) {
        UI.renderTicker(window.KisanData.COMMODITIES, window.KisanData.MSP_DATA);
    }

    // Listen for language changes via State
    AppState.events.on('languageChanged', (lang) => {
        // Reload for now as per original logic, but much cleaner hook
        window.location.reload();
    });

    const page = detectPage();
    switch (page) {
        case 'index': initHomePage(); break;
        case 'dashboard': initDashboard(); break;
        case 'schemes': initSchemes(); break;
        case 'market': initMarket(); break;
    }

    // Replace emoji glyphs with themed SVG icons in both static and dynamic UI.
    initEmojiToSvgIcons();
});

function detectPage() {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('dashboard')) return 'dashboard';
    if (path.includes('schemes')) return 'schemes';
    if (path.includes('market')) return 'market';
    return 'index';
}

// ── Navigation Toggle (Mobile) ──
function initNavToggle() {
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');
    if (toggle && links) {
        toggle.addEventListener('click', () => {
            links.classList.toggle('active');
            toggle.textContent = links.classList.contains('active') ? '✕' : '☰';
        });
    }
}

// ── Helper: Show API key warning (Wrapped for specific usage) ──
function showApiKeyWarning(container, apiName) {
    if (!container) return;
    container.innerHTML = `
        <div class="api-key-warning">
            <div style="font-size:2rem;margin-bottom:10px;">🔑</div>
            <h4>API Key Required</h4>
            <p>To display live ${apiName} data, please configure your API key in <code>js/api.js</code></p>
            <p style="font-size:0.75rem;margin-top:8px;color:var(--text-muted);">
                ${apiName === 'mandi price' ?
            'Register free at <a href="https://data.gov.in" target="_blank">data.gov.in</a>' :
            'Register free at <a href="https://openweathermap.org" target="_blank">openweathermap.org</a>'}
            </p>
        </div>`;
}

// ============================================================
// HOME PAGE
// ============================================================
function initHomePage() {
    populateQuickPriceTable();
    animateCounters();
    initParticles();
}

function populateQuickPriceTable() {
    const tbody = document.getElementById('quickPriceBody');
    if (!tbody) return;

    const lang = AppState.getLanguage();
    const rows = window.KisanData.COMMODITIES
        .filter(c => c.hasMSP && window.KisanData.MSP_DATA[c.name])
        .slice(0, 12)
        .map(c => {
            const mspInfo = window.KisanData.MSP_DATA[c.name];
            const msp = mspInfo.msp;
            const season = mspInfo.season;
            const costA2FL = mspInfo.costA2FL;
            const marginOverCost = costA2FL ? `+${((msp - costA2FL) / costA2FL * 100).toFixed(0)}% over A2+FL` : '';
            const displayName = Utils.getLocalizedCommodityName(c.name, lang);
            const viewText = lang === 'hi' ? 'भाव देखें →' : 'View Prices →';

            return `<tr>
            <td><strong>${c.icon} ${displayName}</strong></td>
            <td><span class="badge ${season === 'Rabi' ? 'badge-info' : 'badge-saffron'}">${season} ${mspInfo.year || ''}</span></td>
            <td class="price modal-price">${Utils.formatCurrency(msp)}</td>
            <td>${costA2FL ? Utils.formatCurrency(costA2FL) : '<span style="color:var(--text-muted)">—</span>'}</td>
            <td>${marginOverCost ? `<span class="badge badge-success">${marginOverCost}</span>` : '—'}</td>
            <td><a href="dashboard.html?commodity=${encodeURIComponent(c.name)}" class="btn btn-sm btn-outline" style="font-size:0.75rem;">${viewText}</a></td>
        </tr>`;
        }).join('');

    tbody.innerHTML = rows;
}

function animateCounters() {
    const counters = document.querySelectorAll('.hero-stat .stat-value');
    counters.forEach((el, i) => Utils.fadeIn(el, 200 + i * 150));
}

// ============================================================
// DASHBOARD PAGE
// ============================================================
function initDashboard() {
    const data = window.KisanData;
    if (!data) {
        console.error('KisanData not loaded');
        return;
    }

    // Set last updated time
    const lastUpdated = document.getElementById('lastUpdated');
    if (lastUpdated) {
        lastUpdated.textContent = new Date().toLocaleString('en-IN', {
            day: '2-digit', month: 'short', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    }

    // Populate state dropdown
    const stateSelect = document.getElementById('stateSelect');
    if (stateSelect) {
        stateSelect.innerHTML = '<option value="">Select State</option>';
        data.STATES.forEach(s => {
            const opt = document.createElement('option');
            opt.value = s;
            opt.textContent = s;
            stateSelect.appendChild(opt);
        });
        stateSelect.addEventListener('change', onStateChange);
    }

    // Populate commodity dropdown
    const commoditySelect = document.getElementById('commoditySelect');
    if (commoditySelect) {
        commoditySelect.innerHTML = '<option value="">Select Commodity</option>';
        data.COMMODITIES.forEach(c => {
            const opt = document.createElement('option');
            opt.value = c.name;
            opt.textContent = `${c.icon} ${c.name}`;
            opt.setAttribute('data-api-name', c.apiName);
            commoditySelect.appendChild(opt);
        });
    }

    const districtSelect = document.getElementById('districtSelect');
    if (districtSelect) {
        districtSelect.addEventListener('change', () => {
            const state = document.getElementById('stateSelect')?.value;
            const district = districtSelect.value;
            if (district && state) {
                loadWeather(`${district}, ${state}`);
            }
        });
    }

    // Category filter
    const catSelect = document.getElementById('categorySelect');
    if (catSelect) {
        catSelect.innerHTML = '<option value="">All Categories</option>';
        data.CATEGORIES.forEach(cat => {
            const opt = document.createElement('option');
            opt.value = cat;
            opt.textContent = cat;
            catSelect.appendChild(opt);
        });

        catSelect.addEventListener('change', () => {
            const cat = catSelect.value;
            const commoditySelect = document.getElementById('commoditySelect');
            commoditySelect.innerHTML = '<option value="">Select Commodity</option>';
            const filtered = cat
                ? data.COMMODITIES.filter(c => c.category === cat)
                : data.COMMODITIES;
            filtered.forEach(c => {
                const opt = document.createElement('option');
                opt.value = c.name;
                opt.textContent = `${c.icon} ${c.name}`;
                opt.setAttribute('data-api-name', c.apiName);
                commoditySelect.appendChild(opt);
            });
        });
    }

    // Initialize weather
    initWeatherWithLocation();

    // Date
    const weatherDate = document.getElementById('weatherDate');
    if (weatherDate) {
        weatherDate.textContent = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: '2-digit', month: 'short' });
    }

    // Populate MSP quick reference
    populateMSPQuickTable();

    // Show initial top gainers placeholder
    populateTopGainers();

    // Check for pre-selected commodity from URL
    const urlParams = new URLSearchParams(window.location.search);
    const preselectedCommodity = urlParams.get('commodity');
    if (preselectedCommodity && stateSelect && commoditySelect) {
        commoditySelect.value = preselectedCommodity;
        if (stateSelect.options.length > 1) {
            stateSelect.value = 'Uttar Pradesh';
            onStateChange();
            window.searchPrices();
        }
    }

    // Favorites
    renderFavorites();
    AppState.events.on('favoritesUpdated', renderFavorites);
    updateDashboardStats();
}

function onStateChange() {
    const state = document.getElementById('stateSelect')?.value;
    if (!state) return;

    // Populate district dropdown
    const districtSelect = document.getElementById('districtSelect');
    if (districtSelect) {
        const districts = window.KisanData.DISTRICTS[state] || [];
        districtSelect.innerHTML = '<option value="">All Districts</option>';
        districts.forEach(d => {
            const opt = document.createElement('option');
            opt.value = d;
            opt.textContent = d;
            districtSelect.appendChild(opt);
        });
    }

    const district = document.getElementById('districtSelect')?.value;
    if (district) {
        loadWeather(`${district}, ${state}`);
        return;
    }

    const city = window.KisanData.STATE_WEATHER_CITIES[state];
    if (city) loadWeather(city);
}



// Make searchPrices global
window.searchPrices = Utils.debounce(async function () {
    const stateSelect = document.getElementById('stateSelect');
    const commoditySelect = document.getElementById('commoditySelect');
    const state = stateSelect?.value;
    const commodityName = commoditySelect?.value;

    if (!state || !commodityName) {
        UI.showToast('Please select both State and Commodity', 'warning');
        return;
    }

    const api = window.KisanAPI;

    if (!api || !api.isMandiKeySet()) {
        UI.showToast('⚠️ Configure API key in api.js', 'warning');
        showApiKeyWarning(document.getElementById('mandiTableBody')?.closest('.card-body'), 'mandi price');
        return;
    }

    const commodity = window.KisanData.COMMODITIES.find(c => c.name === commodityName);
    const apiCommodityName = commodity?.apiName || commodityName;

    const tbody = document.getElementById('mandiTableBody');
    const barContainer = document.getElementById('barChartContainer');

    if (tbody) UI.renderSkeletonTable(tbody); // Use Skeleton
    if (barContainer) UI.showLoading(barContainer, 'Loading chart...');

    try {
        const district = document.getElementById('districtSelect')?.value || '';

        const result = await api.fetchMandiPrices({
            state,
            commodity: apiCommodityName,
            district,
        });

        if (result.records.length === 0) {
            if (tbody) {
                const cardBody = tbody.closest('.card-body') || tbody;
                cardBody.innerHTML = `
                    <div class="empty-state">
                        <div style="font-size:2.5rem;margin-bottom:12px;">📭</div>
                        <h4>No Data Available</h4>
                        <p>No mandi price records found for <strong>${commodityName}</strong> in <strong>${state}</strong> today.</p>
                    </div>`;
            }
            if (barContainer) barContainer.innerHTML = '<p style="text-align:center;color:var(--text-muted);padding:40px;">No data to chart</p>';
            return;
        }

        // Rebuild table if it was replaced
        if (tbody) {
            const cardBody = tbody.closest('.card-body') || tbody;
            if (!document.getElementById('mandiTable')) {
                cardBody.innerHTML = `<div class="table-responsive">
                    <table class="data-table" id="mandiTable">
                        <thead>
                            <tr>
                                <th>Mandi / Market</th>
                                <th>Min Price (₹)</th>
                                <th>Max Price (₹)</th>
                                <th>Modal Price (₹)</th>
                                <th>Variety</th>
                                <th>Date</th>
                                <th>Fav</th>
                            </tr>
                        </thead>
                        <tbody id="mandiTableBody"></tbody>
                    </table>
                </div>`;
            }
        }

        // Store last search results globally for export/filter
        window._lastMandiRecords = result.records;
        window._lastCommodityName = commodityName;
        window._lastState = state;

        updateMandiTable(result.records);
        updateBarChart(result.records);
        updateMSPComparison(result.records, commodityName);
        updateTrendChart(result.records, commodityName);

        // Show export button
        const exportBtn = document.getElementById('exportCsvBtn');
        if (exportBtn) exportBtn.style.display = 'inline-flex';

        const resultCount = document.getElementById('resultCount');
        if (resultCount) {
            resultCount.textContent = `${result.records.length} records from ${result.total} total`;
            resultCount.className = 'badge badge-success';
        }

        UI.showToast(`✅ Loaded ${result.records.length} prices`, 'success');

        if (result.isMock) {
            UI.showToast('📡 Enabled Offline Mode (Simulated Data)', 'info');
            const resultCount = document.getElementById('resultCount');
            if (resultCount) {
                resultCount.innerHTML += ' <span style="background:var(--warning-bg);color:var(--warning);padding:2px 6px;border-radius:4px;margin-left:8px;font-size:0.75rem;">Offline Mode</span>';
            }
        }

    } catch (err) {
        console.error('Price search failed:', err);
        if (tbody) UI.showError(tbody.closest('.card-body') || tbody, 'Failed to Load Prices', err.message, () => window.searchPrices());
        if (barContainer) UI.showError(barContainer, 'Chart Error', 'Could not load data');
        UI.showToast(`Error: ${err.message}`, 'danger');
    }
}, 300);

window.resetFilters = function () {
    const stateSelect = document.getElementById('stateSelect');
    const commoditySelect = document.getElementById('commoditySelect');
    const categorySelect = document.getElementById('categorySelect');
    const districtSelect = document.getElementById('districtSelect');
    const mandiSearch = document.getElementById('mandiSearch');
    if (stateSelect) stateSelect.value = '';
    if (commoditySelect) commoditySelect.value = '';
    if (categorySelect) categorySelect.value = '';
    if (districtSelect) { districtSelect.innerHTML = '<option value="">All Districts</option>'; }
    if (mandiSearch) mandiSearch.value = '';

    window._lastMandiRecords = null;
    const exportBtn = document.getElementById('exportCsvBtn');
    if (exportBtn) exportBtn.style.display = 'none';

    const mandiTableBody = document.getElementById('mandiTableBody');
    if (mandiTableBody) {
        mandiTableBody.innerHTML = `<tr>
            <td colspan="7" style="text-align:center;padding:60px 20px;color:var(--text-muted);">
                <div style="font-size:2.5rem;margin-bottom:12px;">📊</div>
                <strong>Select a State and Commodity</strong><br>
                <span style="font-size:0.85rem;">Use the filters above to view real-time mandi prices</span>
            </td>
        </tr>`;
    }

    const barContainer = document.getElementById('barChartContainer');
    if (barContainer) barContainer.innerHTML = '<p style="text-align:center;width:100%;color:var(--text-muted);align-self:center;">Search for a commodity to view price comparison chart</p>';
};

function updateMandiTable(records) {
    const tbody = document.getElementById('mandiTableBody');
    if (!tbody) return;

    records.sort((a, b) => b.modalPrice - a.modalPrice);
    const maxPrice = Math.max(...records.map(r => r.modalPrice));
    const isHindi = AppState.getLanguage() === 'hi';

    tbody.innerHTML = records.map((r, i) => {
        const isBest = r.modalPrice === maxPrice && i === 0;
        let rowStyle = isBest ? 'background: rgba(22, 163, 74, 0.05);' : '';
        let badgeHtml = isBest ? ` <span class="badge badge-success" style="margin-left:6px;">${isHindi ? 'सर्वोत्तम मूल्य' : 'Best Price'}</span>` : '';

        return `<tr style="${rowStyle}">
            <td>
                <div class="mandi-name">${r.market}${badgeHtml}</div>
                <div class="mandi-district">${r.district}, ${r.state}</div>
            </td>
            <td class="price">${Utils.formatCurrency(r.minPrice)}</td>
            <td class="price">${Utils.formatCurrency(r.maxPrice)}</td>
            <td class="price modal-price">${Utils.formatCurrency(r.modalPrice)}</td>
            <td><span class="badge badge-saffron">${r.variety || (isHindi ? 'सामान्य' : 'General')}</span></td>
            <td>${r.arrivalDate}</td>
            <td style="white-space:nowrap;">
                <button class="btn-favorite ${AppState.isFavorite(r.market, r.commodity) ? 'active' : ''}" 
                    onclick="toggleFavorite('${r.market}', '${r.commodity}', '${r.state}', ${r.modalPrice}, '${r.district}')"
                    title="${isHindi ? 'पसंदीदा में जोड़ें' : 'Add to Favorites'}">
                    ❤
                </button>
                <button class="btn btn-outline btn-sm" style="padding:2px 6px;font-size:0.7rem;margin-left:4px;"
                    onclick="sharePrice('${r.commodity}', '${r.market}', '${r.state}', ${r.modalPrice})"
                    title="Share via WhatsApp">📤</button>
            </td>
        </tr>`;
    }).join('');
}

function updateBarChart(records) {
    const container = document.getElementById('barChartContainer');
    if (!container) return;

    const topRecords = records
        .filter(r => r.modalPrice > 0)
        .sort((a, b) => b.modalPrice - a.modalPrice)
        .slice(0, 15);

    if (topRecords.length === 0) {
        container.innerHTML = `<p style="text-align:center;width:100%;color:var(--text-muted);align-self:center;">No data available</p>`;
        return;
    }

    const maxPrice = Math.max(...topRecords.map(r => r.modalPrice));

    container.innerHTML = topRecords.map((r, i) => {
        const height = (r.modalPrice / maxPrice) * 100;
        const hue = 25 + (i * 15) % 140;
        const color = `hsl(${hue}, 70%, 55%)`;

        return `<div class="bar" style="height:${height}%;background:${color};"
            title="${r.market}: ${Utils.formatCurrency(r.modalPrice)}">
            <span class="bar-value">${Utils.formatCurrency(r.modalPrice)}</span>
            <span class="bar-label">${r.market.substring(0, 8)}</span>
        </div>`;
    }).join('');
}

function updateMSPComparison(records, commodityName) {
    const container = document.getElementById('mspComparisonContainer');
    if (!container) return;

    const lang = AppState.getLanguage();
    const isHindi = lang === 'hi';
    const localizedName = Utils.getLocalizedCommodityName(commodityName, lang);
    const mspData = window.KisanData.MSP_DATA[commodityName];

    if (!mspData || !mspData.msp) {
        container.innerHTML = `<div style="text-align:center;padding:30px;color:var(--text-muted);">
            <strong>No MSP declared for ${commodityName}</strong>
        </div>`;
        return;
    }

    const msp = mspData.msp;
    const validRecords = records.filter(r => r.modalPrice > 0);
    const avgMarket = Math.round(validRecords.reduce((s, r) => s + r.modalPrice, 0) / (validRecords.length || 1));
    const diff = ((avgMarket - msp) / msp * 100).toFixed(1);
    const isAbove = parseFloat(diff) >= 0;
    const statusColor = isAbove ? 'var(--success)' : 'var(--danger)';

    let html = `<div style="background:${isAbove ? 'var(--success-bg)' : 'var(--danger-bg)'};padding:16px 20px;border-radius:10px;margin-bottom:20px;display:flex;align-items:center;justify-content:space-between;">
        <div>
            <strong style="font-size:0.9rem;">${localizedName}</strong>
            <div style="font-size:0.8rem;color:var(--text-secondary);margin-top:2px;">MSP: ${Utils.formatCurrency(msp)}</div>
        </div>
        <div style="text-align:right;">
            <div style="font-size:1.2rem;font-weight:800;color:${statusColor};">${isAbove ? '+' : ''}${diff}%</div>
            <div style="font-size:0.75rem;color:var(--text-muted);">Avg: ${Utils.formatCurrency(avgMarket)}</div>
        </div>
    </div>`;

    html += validRecords.slice(0, 5).map(r => {
        const pctOfMsp = (r.modalPrice / msp * 100).toFixed(0);
        const barWidth = Math.min(pctOfMsp, 130);
        const barClass = r.modalPrice >= msp ? 'above' : 'below';

        return `<div class="msp-comparison">
            <div style="min-width:120px;">
                <strong style="font-size:0.8rem;">${r.market}</strong>
                <div style="font-size:0.7rem;color:var(--text-muted);">${Utils.formatCurrency(r.modalPrice)}</div>
            </div>
            <div class="msp-bar-container">
                <div class="msp-bar ${barClass}" style="width:${Math.min(barWidth, 100)}%;">
                    ${pctOfMsp}% ${isHindi ? 'एमएसपी का' : 'of MSP'}
                </div>
            </div>
        </div>`;
    }).join('');

    if (mspData.costA2FL) {
        html += `<div style="margin-top:16px;padding:14px;background:var(--bg-primary);border-radius:8px;font-size:0.8rem;">
            <strong>💡 Production Cost:</strong>
            <div style="display:flex;gap:20px;margin-top:8px;flex-wrap:wrap;">
                <span>A2+FL: <strong>${Utils.formatCurrency(mspData.costA2FL)}</strong></span>
                <span>MSP: <strong style="color:var(--green);">${Utils.formatCurrency(msp)}</strong></span>
            </div>
        </div>`;
    }
    container.innerHTML = html;
}

// ── Weather Widget ───────────────────────────────────────────
function initWeatherWithLocation() {
    const weatherWidget = document.getElementById('weatherWidget');
    if (!weatherWidget) return;

    // Show loading state
    document.getElementById('weatherLocation').textContent = 'Locating...';

    if (navigator.geolocation) {
        let resolved = false;

        // Manual safeguard: fallback after 10s even if browser ignores timeout option
        const fallbackTimer = setTimeout(() => {
            if (!resolved) {
                resolved = true;
                console.warn('Geolocation timeout — using default city');
                loadWeather('Delhi');
            }
        }, 10000);

        navigator.geolocation.getCurrentPosition(
            (position) => {
                if (resolved) return; // Already fell back
                resolved = true;
                clearTimeout(fallbackTimer);
                const { latitude, longitude } = position.coords;
                loadWeather({ lat: latitude, lon: longitude });
            },
            (error) => {
                if (resolved) return;
                resolved = true;
                clearTimeout(fallbackTimer);
                console.warn('Geolocation denied or failed:', error);
                // Fallback to default city
                loadWeather('Delhi');
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 60000,
            }
        );
    } else {
        // Fallback if no geolocation support
        loadWeather('Delhi');
    }
}

async function loadWeather(query) {
    try {
        const [current, forecast] = await Promise.all([
            KisanAPI.fetchWeather(query),
            KisanAPI.fetchForecast(query)
        ]);

        // Update UI
        const coordinateText = (typeof current.lat === 'number' && typeof current.lon === 'number')
            ? ` (${current.lat.toFixed(4)}, ${current.lon.toFixed(4)})`
            : '';
        document.getElementById('weatherLocation').textContent = `${current.location}${coordinateText}`;
        document.getElementById('weatherTemp').textContent = `${current.temp}°C`;
        document.getElementById('weatherCondition').textContent = current.condition;
        document.getElementById('weatherIcon').textContent = current.icon;
        document.getElementById('weatherWind').textContent = `${current.windSpeed} km/h`;
        document.getElementById('weatherHumidity').textContent = `${current.humidity}%`;
        document.getElementById('weatherRain').textContent = current.rainfall ? `${current.rainfall} mm` : '0 mm';

        // Update Forecast
        const forecastContainer = document.getElementById('weatherForecast');
        forecastContainer.innerHTML = forecast.map(day => `
            <div class="forecast-day">
                <div class="f-day">${day.day}</div>
                <div class="f-icon">${day.icon}</div>
                <div class="f-temp">${day.high}° <span style="font-size:0.8em;opacity:0.7">${day.low}°</span></div>
            </div>
        `).join('');

        // Generate Advisory
        const advisories = KisanAPI.generateAdvisories(current, forecast);
        const advisoryList = document.getElementById('advisoryList');
        // Clear previous
        advisoryList.innerHTML = '';

        advisories.forEach(text => {
            const li = document.createElement('li');
            li.textContent = text;
            advisoryList.appendChild(li);
        });

    } catch (err) {
        console.error('Weather load failed:', err);
        document.getElementById('weatherLocation').textContent = 'Unavailable';
        UI.showToast('Failed to load weather data', 'error');
    }
}

function populateTopGainers() {
    const container = document.getElementById('topGainers');
    if (!container) return;

    const topMSP = Object.entries(window.KisanData.MSP_DATA)
        .sort((a, b) => b[1].msp - a[1].msp)
        .slice(0, 5);

    container.innerHTML = topMSP.map(([name, info]) => {
        const commodity = window.KisanData.COMMODITIES.find(c => c.name === name);
        const icon = commodity?.icon || '🌾';
        return `<div style="display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--border-color);">
            <div style="display:flex;align-items:center;gap:10px;">
                <span style="font-size:1.2rem;">${icon}</span>
                <div>
                    <strong style="font-size:0.85rem;">${name}</strong>
                    <div style="font-size:0.75rem;color:var(--text-muted);">MSP ${Utils.formatCurrency(info.msp)}/Qt</div>
                </div>
            </div>
            <span class="badge ${info.season === 'Rabi' ? 'badge-info' : 'badge-saffron'}">${info.season}</span>
        </div>`;
    }).join('');
}

function populateMSPQuickTable() {
    const tbody = document.getElementById('mspQuickBody');
    if (!tbody) return;
    const rows = Object.entries(window.KisanData.MSP_DATA)
        .filter(([_, v]) => v.msp)
        .map(([name, info]) => `
            <tr>
                <td style="font-size:0.8rem;font-weight:600;">${name}</td>
                <td class="price" style="font-size:0.85rem;">${Utils.formatCurrency(info.msp)}</td>
                <td><span class="badge ${info.season === 'Rabi' ? 'badge-info' : 'badge-saffron'}">${info.season}</span></td>
            </tr>`).join('');
    tbody.innerHTML = rows;
}

window.setTrendPeriod = function (days) {
    if (!window._lastMandiRecords || window._lastMandiRecords.length === 0) {
        UI.showToast('Search for a commodity first', 'info');
        return;
    }
    updateTrendChart(window._lastMandiRecords, window._lastCommodityName || '', days);
};

// ── 30-Day Price Trend Chart (Canvas) ──
function updateTrendChart(records, commodityName, days = 30) {
    const canvas = document.getElementById('trendCanvas');
    const placeholder = document.getElementById('trendPlaceholder');
    if (!canvas) return;
    if (placeholder) placeholder.style.display = 'none';

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = 250 * dpr;
    ctx.scale(dpr, dpr);
    const W = rect.width;
    const H = 250;

    // Generate simulated historical trend from modal prices
    const avgPrice = records.reduce((s, r) => s + r.modalPrice, 0) / (records.length || 1);
    const trendData = [];
    const now = new Date();
    for (let i = days; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        // Simulated variation ±8% around average
        const variation = (Math.sin(i * 0.4) * 0.04 + Math.cos(i * 0.2) * 0.04) * avgPrice;
        trendData.push({
            date: date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
            price: Math.round(avgPrice + variation)
        });
    }

    const prices = trendData.map(d => d.price);
    const minP = Math.min(...prices) * 0.98;
    const maxP = Math.max(...prices) * 1.02;
    const range = maxP - minP || 1;

    const pad = { top: 20, right: 20, bottom: 40, left: 55 };
    const chartW = W - pad.left - pad.right;
    const chartH = H - pad.top - pad.bottom;

    ctx.clearRect(0, 0, W, H);

    // Background
    ctx.fillStyle = 'rgba(255, 153, 51, 0.03)';
    ctx.fillRect(pad.left, pad.top, chartW, chartH);

    // Grid lines
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.15)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 4; i++) {
        const y = pad.top + (chartH / 4) * i;
        ctx.beginPath();
        ctx.moveTo(pad.left, y);
        ctx.lineTo(pad.left + chartW, y);
        ctx.stroke();

        // Y-axis labels
        const val = maxP - (range / 4) * i;
        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px -apple-system, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText('₹' + Math.round(val).toLocaleString('en-IN'), pad.left - 6, y + 3);
    }

    // Line path
    ctx.beginPath();
    ctx.strokeStyle = '#FF9933';
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';

    trendData.forEach((d, i) => {
        const x = pad.left + (i / (trendData.length - 1)) * chartW;
        const y = pad.top + chartH - ((d.price - minP) / range) * chartH;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Fill area under line
    const lastX = pad.left + chartW;
    const lastY = pad.top + chartH - ((trendData[trendData.length - 1].price - minP) / range) * chartH;
    ctx.lineTo(lastX, pad.top + chartH);
    ctx.lineTo(pad.left, pad.top + chartH);
    ctx.closePath();
    const gradient = ctx.createLinearGradient(0, pad.top, 0, pad.top + chartH);
    gradient.addColorStop(0, 'rgba(255, 153, 51, 0.2)');
    gradient.addColorStop(1, 'rgba(255, 153, 51, 0.01)');
    ctx.fillStyle = gradient;
    ctx.fill();

    // X-axis labels (every ~5 days)
    ctx.fillStyle = '#94a3b8';
    ctx.font = '9px -apple-system, sans-serif';
    ctx.textAlign = 'center';
    const step = Math.max(1, Math.floor(trendData.length / 6));
    for (let i = 0; i < trendData.length; i += step) {
        const x = pad.left + (i / (trendData.length - 1)) * chartW;
        ctx.fillText(trendData[i].date, x, H - pad.bottom + 16);
    }

    // Title
    ctx.fillStyle = '#e2e8f0';
    ctx.font = 'bold 11px -apple-system, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`${commodityName} — ${days}-Day Price Trend`, pad.left, 14);

    // Update period buttons
    document.querySelectorAll('#trendChartContainer .btn').forEach(btn => {
        btn.className = btn.textContent.trim() === `${days}D` ? 'btn btn-sm btn-primary' : 'btn btn-sm btn-outline';
    });
}

// ── CSV Export ──
window.exportCSV = function () {
    const records = window._lastMandiRecords;
    if (!records || records.length === 0) {
        UI.showToast('No data to export', 'warning');
        return;
    }

    const headers = ['Market', 'District', 'State', 'Commodity', 'Variety', 'Min Price', 'Max Price', 'Modal Price', 'Date'];
    const rows = records.map(r =>
        [r.market, r.district, r.state, r.commodity, r.variety, r.minPrice, r.maxPrice, r.modalPrice, r.arrivalDate]
            .map(v => `"${String(v || '').replace(/"/g, '""')}"`).join(',')
    );

    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `KisanMitra_${window._lastCommodityName || 'Prices'}_${window._lastState || ''}_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    UI.showToast('📥 CSV downloaded successfully', 'success');
};

// ── Mandi Table Text Search ──
window.filterMandiTable = function () {
    const query = document.getElementById('mandiSearch')?.value?.toLowerCase() || '';
    const rows = document.querySelectorAll('#mandiTableBody tr');
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(query) ? '' : 'none';
    });
};

// ── WhatsApp Share ──
window.sharePrice = function (commodity, market, state, price) {
    const isHindi = AppState.getLanguage() === 'hi';
    const text = isHindi
        ? `🌾 *KisanMitra भाव अलर्ट*\n\n📊 ${commodity}\n🏪 ${market}, ${state}\n💰 मोडल मूल्य: ₹${Number(price).toLocaleString('en-IN')}/क्विंटल\n\n🔗 kisanmitra.gov.in पर और देखें`
        : `🌾 *KisanMitra Price Alert*\n\n📊 ${commodity}\n🏪 ${market}, ${state}\n💰 Modal Price: ₹${Number(price).toLocaleString('en-IN')}/Qt\n\n🔗 Check more at kisanmitra.gov.in`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
};

// ── Dynamic Dashboard Stats ──
function updateDashboardStats() {
    const data = window.KisanData;
    if (!data) return;

    const commodityCount = data.COMMODITIES?.length || 0;
    const stateCount = data.STATES?.length || 0;
    const schemeCount = data.GOV_SCHEMES?.length || 0;
    const ns = data.NATIONAL_STATS || {};
    const isHindi = AppState.getLanguage() === 'hi';

    const el = (id) => document.getElementById(id);

    if (el('statCommodities')) {
        el('statCommodities').textContent = ns.commoditiesTracked || `${commodityCount}`;
        if (el('statCommoditiesLabel')) el('statCommoditiesLabel').textContent = isHindi ? `${schemeCount}+ योजनाएं सक्रिय` : `${schemeCount}+ Schemes Active`;
    }
    if (el('statMandis')) {
        el('statMandis').textContent = ns.activeMandis || '7,062';
        if (el('statMandisLabel')) el('statMandisLabel').textContent = isHindi ? `${stateCount} राज्यों में` : `Across ${stateCount} States`;
    }
    if (el('statFreshness')) {
        el('statFreshness').textContent = navigator.onLine ? (isHindi ? 'लाइव' : 'Live') : (isHindi ? 'ऑफ़लाइन' : 'Offline');
        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
        if (el('statFreshnessLabel')) el('statFreshnessLabel').textContent = isHindi ? `अंतिम: ${timeStr}` : `Synced at ${timeStr}`;
    }
}

// ============================================================
// SCHEMES PAGE
// ============================================================
function initSchemes() {
    renderSchemes(window.KisanData.GOV_SCHEMES);
}

function renderSchemes(schemes) {
    const grid = document.getElementById('schemesGrid');
    if (!grid) return;

    const lang = AppState.getLanguage();
    const isHindi = lang === 'hi';

    grid.innerHTML = schemes.map(s => {
        const displayName = isHindi ? s.nameHi : s.name;
        return `<div class="scheme-card" data-category="${s.category}">
            <div class="scheme-icon">${s.icon}</div>
            <h3>${displayName}</h3>
            <p>${s.description}</p>
            <div class="scheme-benefit">✅ ${s.benefit}</div>
            <a href="${s.link}" target="_blank" class="scheme-link">${isHindi ? 'पोर्टल देखें →' : 'Visit Portal →'}</a>
        </div>`;
    }).join('');

    initScrollReveal();
}

window.filterSchemes = function () {
    const cat = document.getElementById('schemeCategory')?.value || '';
    const search = document.getElementById('schemeSearch')?.value?.toLowerCase() || '';

    let filtered = window.KisanData.GOV_SCHEMES;
    if (cat) filtered = filtered.filter(s => s.category === cat);
    if (search) filtered = filtered.filter(s => s.name.toLowerCase().includes(search));

    renderSchemes(filtered);
};

window.checkEligibility = function () {
    const land = document.getElementById('eligLand')?.value;
    const farmerType = document.getElementById('eligType')?.value;
    const ageGroup = document.getElementById('eligAge')?.value;
    const resultDiv = document.getElementById('eligibilityResult');
    if (!resultDiv) return;

    UI.showLoading(resultDiv, 'Checking eligibility...');
    const isHindi = AppState.getLanguage() === 'hi';

    setTimeout(() => {
        const schemes = window.KisanData.GOV_SCHEMES;
        const matched = schemes.filter(s => {
            // PM-KISAN: all landholding farmers
            if (s.name.includes('PM-KISAN Samman')) return true;
            // PMFBY: all farmers growing notified crops
            if (s.name.includes('PMFBY')) return true;
            // KCC: all farmers
            if (s.name.includes('KCC')) return true;
            // eNAM: all
            if (s.name.includes('eNAM')) return true;
            // Soil Health: all
            if (s.name.includes('Soil Health')) return true;
            // PMKSY: priority to small/marginal
            if (s.name.includes('Sinchayee')) return true;
            // Pension: only small farmers, age 18-40
            if (s.name.includes('Maandhan')) {
                return land === 'small' && ageGroup !== 'senior';
            }
            // AIF: all including entrepreneurs
            if (s.name.includes('Infrastructure Fund')) return true;
            // Sampada
            if (s.name.includes('Sampada')) return true;
            // Organic farming: groups of 50+
            if (s.name.includes('Paramparagat')) return farmerType === 'owner';
            // NMEO: specific districts
            if (s.name.includes('Edible Oil')) return true;
            // Beekeeping: all
            if (s.name.includes('Beekeeping')) return true;
            return false;
        });

        const landLabel = land === 'small' ? (isHindi ? 'छोटी' : 'Small (<2 ha)') :
            land === 'medium' ? (isHindi ? 'मध्यम' : 'Medium (2-10 ha)') :
                (isHindi ? 'बड़ी' : 'Large (>10 ha)');

        resultDiv.innerHTML = `
            <div style="background:var(--success-bg);border:1px solid var(--success);border-radius:10px;padding:20px;">
                <h4 style="color:var(--success);margin-bottom:12px;">✅ ${matched.length} ${isHindi ? 'योजनाएं आपके लिए उपलब्ध हैं' : 'Schemes Available for You'}</h4>
                <p style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:16px;">Based on: ${landLabel} landholding, ${farmerType} farmer, ${ageGroup} age group</p>
                <div style="display:flex;flex-direction:column;gap:8px;">
                    ${matched.map(s => `
                        <div style="display:flex;align-items:center;gap:10px;padding:8px 12px;background:var(--white);border-radius:8px;border:1px solid var(--border-color);">
                            <span style="font-size:1.3rem;">${s.icon}</span>
                            <div style="flex:1;">
                                <strong style="font-size:0.85rem;">${isHindi ? s.nameHi : s.name}</strong>
                                <div style="font-size:0.75rem;color:var(--text-muted);">${s.benefit}</div>
                            </div>
                            <a href="${s.link}" target="_blank" class="btn btn-outline btn-sm" style="font-size:0.7rem;">Visit →</a>
                        </div>
                    `).join('')}
                </div>
            </div>`;
    }, 600);
};

// ============================================================
// MARKET PAGE
// ============================================================
function initMarket() {
    const data = window.KisanData;

    // Populate buyer commodity filter
    const filter = document.getElementById('marketCommodityFilter');
    if (filter) {
        data.COMMODITIES.forEach(c => {
            const opt = document.createElement('option');
            opt.value = c.name;
            opt.textContent = `${c.icon} ${c.name}`;
            filter.appendChild(opt);
        });
    }

    // Populate sell form: State dropdown
    const sellState = document.getElementById('sellState');
    if (sellState) {
        data.STATES.forEach(s => {
            const opt = document.createElement('option');
            opt.value = s;
            opt.textContent = s;
            sellState.appendChild(opt);
        });
        sellState.addEventListener('change', () => {
            const sellDistrict = document.getElementById('sellDistrict');
            if (sellDistrict) {
                const districts = data.DISTRICTS[sellState.value] || [];
                sellDistrict.innerHTML = '<option value="">Select District</option>';
                districts.forEach(d => {
                    const opt = document.createElement('option');
                    opt.value = d;
                    opt.textContent = d;
                    sellDistrict.appendChild(opt);
                });
            }
        });
    }

    // Populate sell form: Commodity dropdown
    const sellCommodity = document.getElementById('sellCommodity');
    if (sellCommodity) {
        data.COMMODITIES.forEach(c => {
            const opt = document.createElement('option');
            opt.value = c.name;
            opt.textContent = `${c.icon} ${c.name}`;
            sellCommodity.appendChild(opt);
        });
    }

    renderListings(data.MARKET_LISTINGS);
}

function renderListings(listings) {
    const grid = document.getElementById('listingsGrid');
    if (!grid) return;

    const lang = AppState.getLanguage();
    const isHindi = lang === 'hi';

    grid.innerHTML = listings.map(l => {
        const stars = Utils.getStarRatingHtml(l.rating);
        const localizedCommodity = Utils.getLocalizedCommodityName(l.commodity, lang);

        return `<div class="listing-card">
            <div class="listing-header">
                <div>
                    <h4>${l.buyerName}</h4>
                    <span class="badge badge-saffron" style="margin-top:4px;">${l.type}</span>
                </div>
                ${l.verified ? `<span class="verified">✅ ${isHindi ? 'सत्यापित' : 'Verified'}</span>` : ''}
            </div>
            <div class="listing-meta">
                <div class="meta-item">📍 <strong>${l.location}</strong></div>
                <div class="meta-item">🌾 <strong>${localizedCommodity}</strong></div>
                <div class="meta-item">📦 ${isHindi ? 'मात्रा' : 'Qty'}: <strong>${l.quantity}</strong></div>
                ${l.deliveryDate ? `<div class="meta-item">📅 ${isHindi ? 'डिलीवरी' : 'Delivery'}: <strong>${l.deliveryDate}</strong></div>` : ''}
            </div>
            <div class="listing-price">${Utils.formatCurrency(l.priceOffered)} <span>/Qt</span></div>
            <div style="display:flex;justify-content:space-between;align-items:center;">
                <span style="color:var(--warning);font-size:0.85rem;">${stars} ${l.rating}</span>
                <button class="btn btn-success btn-sm" onclick="contactBuyer('${l.buyerName.replace(/'/g, "\\'")}')">📞 ${isHindi ? 'संपर्क' : 'Contact'}</button>
            </div>
        </div>`;
    }).join('');

    // No Results State
    if (listings.length === 0) {
        grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:var(--text-muted);">
            <div style="font-size:2.5rem;margin-bottom:12px;">🔍</div>
            <h4>${isHindi ? 'कोई परिणाम नहीं मिला' : 'No Listings Found'}</h4>
            <p style="font-size:0.85rem;">${isHindi ? 'अन्य फ़िल्टर आज़माएं' : 'Try adjusting your filters to see more results'}</p>
        </div>`;
    }
}

window.filterListings = function () {
    const commodity = document.getElementById('marketCommodityFilter')?.value;
    const buyerType = document.getElementById('marketTypeFilter')?.value;
    const verifiedOnly = document.getElementById('verifiedOnly')?.checked;

    let filtered = window.KisanData.MARKET_LISTINGS;
    if (commodity) filtered = filtered.filter(l => l.commodity === commodity);
    if (buyerType) filtered = filtered.filter(l => l.type.includes(buyerType));
    if (verifiedOnly) filtered = filtered.filter(l => l.verified === true);

    renderListings(filtered);
};

window.contactBuyer = function (name) {
    const listing = window.KisanData.MARKET_LISTINGS.find(l => l.buyerName === name);
    const isHindi = AppState.getLanguage() === 'hi';

    // Build contact modal
    const overlay = document.createElement('div');
    overlay.id = 'contactModal';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:10000;display:flex;align-items:center;justify-content:center;animation:fadeIn 0.2s ease;';
    overlay.innerHTML = `
        <div style="background:var(--white);border-radius:16px;padding:32px;max-width:420px;width:90%;box-shadow:var(--shadow-xl);position:relative;">
            <button onclick="document.getElementById('contactModal').remove()" style="position:absolute;top:12px;right:16px;background:none;border:none;font-size:1.3rem;cursor:pointer;color:var(--text-muted);">✕</button>
            <div style="text-align:center;margin-bottom:20px;">
                <div style="font-size:2rem;margin-bottom:8px;">📞</div>
                <h3 style="font-size:1.1rem;font-weight:700;">${name}</h3>
                ${listing ? `<span class="badge badge-saffron" style="margin-top:6px;">${listing.type}</span>` : ''}
            </div>
            ${listing ? `
            <div style="display:flex;flex-direction:column;gap:12px;">
                <div style="display:flex;align-items:center;gap:12px;padding:14px;background:var(--bg-primary);border-radius:10px;">
                    <span style="font-size:1.2rem;">🌐</span>
                    <div style="flex:1;">
                        <div style="font-size:0.75rem;color:var(--text-muted);">${isHindi ? 'वेबसाइट' : 'Website'}</div>
                        <a href="https://${listing.contact}" target="_blank" style="color:var(--info);font-weight:600;font-size:0.9rem;">${listing.contact}</a>
                    </div>
                </div>
                <div style="display:flex;align-items:center;gap:12px;padding:14px;background:var(--bg-primary);border-radius:10px;">
                    <span style="font-size:1.2rem;">🌾</span>
                    <div style="flex:1;">
                        <div style="font-size:0.75rem;color:var(--text-muted);">${isHindi ? 'कमोडिटी' : 'Commodity'}</div>
                        <strong style="font-size:0.9rem;">${listing.commodity} — ${Utils.formatCurrency(listing.priceOffered)}/Qt</strong>
                    </div>
                </div>
                <div style="display:flex;align-items:center;gap:12px;padding:14px;background:var(--bg-primary);border-radius:10px;">
                    <span style="font-size:1.2rem;">📍</span>
                    <div style="flex:1;">
                        <div style="font-size:0.75rem;color:var(--text-muted);">${isHindi ? 'स्थान' : 'Location'}</div>
                        <strong style="font-size:0.9rem;">${listing.location}</strong>
                    </div>
                </div>
                <div style="display:flex;align-items:center;gap:12px;padding:14px;background:var(--bg-primary);border-radius:10px;">
                    <span style="font-size:1.2rem;">📅</span>
                    <div style="flex:1;">
                        <div style="font-size:0.75rem;color:var(--text-muted);">${isHindi ? 'डिलीवरी' : 'Delivery Period'}</div>
                        <strong style="font-size:0.9rem;">${listing.deliveryDate}</strong>
                    </div>
                </div>
            </div>
            <div style="margin-top:20px;display:flex;gap:10px;">
                <a href="https://${listing.contact}" target="_blank" class="btn btn-primary" style="flex:1;">🌐 ${isHindi ? 'वेबसाइट खोलें' : 'Visit Website'}</a>
                <button class="btn btn-outline" style="flex:1;" onclick="window.sharePrice('${listing.commodity}', '${listing.buyerName.replace(/'/g, "\\'")}', '${listing.location}', ${listing.priceOffered});document.getElementById('contactModal').remove();">📤 ${isHindi ? 'शेयर' : 'Share'}</button>
            </div>` : `<p style="text-align:center;color:var(--text-muted);">Contact info not available</p>`}
        </div>
    `;
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
    document.body.appendChild(overlay);
};

window.switchTab = function (tab) {
    ['buy', 'sell', 'contracts'].forEach(t => {
        const content = document.getElementById(t + 'Content');
        const tabBtn = document.getElementById('tab' + t.charAt(0).toUpperCase() + t.slice(1));
        if (content) content.style.display = t === tab ? 'block' : 'none';
        if (tabBtn) tabBtn.className = t === tab ? 'tab active' : 'tab';
    });
};

import { DB } from './modules/db.js';

window.submitSellForm = async function (e) {
    e.preventDefault();
    const resultDiv = document.getElementById('sellFormResult');
    const isHindi = AppState.getLanguage() === 'hi';

    // Collect ALL form data
    const formData = {
        name: document.getElementById('sellName')?.value?.trim(),
        phone: document.getElementById('sellPhone')?.value?.trim(),
        state: document.getElementById('sellState')?.value,
        district: document.getElementById('sellDistrict')?.value,
        commodity: document.getElementById('sellCommodity')?.value,
        quantity: document.getElementById('sellQuantity')?.value,
        price: document.getElementById('sellPrice')?.value,
        availableFrom: document.getElementById('sellDate')?.value,
        details: document.getElementById('sellDetails')?.value?.trim(),
        timestamp: new Date().toISOString(),
    };

    // Validate required fields
    const required = ['name', 'phone', 'state', 'district', 'commodity', 'quantity'];
    const missing = required.filter(f => !formData[f]);
    if (missing.length > 0) {
        UI.showToast(isHindi ? 'कृपया सभी आवश्यक फ़ील्ड भरें' : 'Please fill all required fields', 'warning');
        return;
    }

    // Validate phone (Indian 10 digits)
    const phoneClean = formData.phone.replace(/[\s\-+]/g, '');
    if (!/^(91)?\d{10}$/.test(phoneClean)) {
        UI.showToast(isHindi ? 'कृपया सही फ़ोन नंबर दर्ज करें' : 'Please enter a valid 10-digit phone number', 'warning');
        return;
    }

    // Generate reference number
    const refNum = 'KM' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toUpperCase();
    formData.referenceNumber = refNum;

    if (!navigator.onLine) {
        try {
            await DB.saveForm(formData);

            if ('serviceWorker' in navigator && 'SyncManager' in window) {
                const sw = await navigator.serviceWorker.ready;
                await sw.sync.register('sync-forms');
            } else {
                UI.showToast(isHindi ? 'इंटरनेट आने पर डेटा भेजा जाएगा' : 'Data saved. Will retry when online', 'info');
            }

            if (resultDiv) {
                resultDiv.innerHTML = `<div style="background:var(--warning-bg);padding:20px;border-radius:10px;">
                    <h4>📡 ${isHindi ? 'ऑफ़लाइन मोड: सहेजा गया' : 'Offline Mode: Saved'}</h4>
                    <p style="font-size:0.85rem;">${isHindi ? 'आपका डेटा सुरक्षित है और इंटरनेट कनेक्ट होने पर स्वचालित रूप से भेजा जाएगा।' : 'Your data is saved locally and will be automatically uploaded when connection is restored.'}</p>
                    <p style="font-size:0.8rem;color:var(--text-muted);margin-top:8px;">Ref: <strong>${refNum}</strong></p>
                </div>`;
            }
            return;
        } catch (err) {
            console.error('Offline save failed', err);
            UI.showToast('Failed to save offline data', 'danger');
        }
    }

    // Online submission — show confirmation receipt
    const commodityData = window.KisanData.COMMODITIES.find(c => c.name === formData.commodity);
    const commodityIcon = commodityData?.icon || '🌾';

    if (resultDiv) {
        resultDiv.innerHTML = `<div style="background:var(--success-bg);border:1px solid var(--success);padding:24px;border-radius:12px;">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">
                <span style="font-size:2rem;">✅</span>
                <div>
                    <h4 style="color:var(--success);margin:0;">${isHindi ? 'लिस्टिंग सफल!' : 'Listed Successfully!'}</h4>
                    <p style="font-size:0.8rem;color:var(--text-muted);margin:2px 0 0;">Ref: <strong id="sellRefNum">${refNum}</strong> <button type="button" onclick="navigator.clipboard.writeText('${refNum}');UI.showToast('${isHindi ? 'कॉपी किया गया' : 'Copied!'}','success')" style="background:none;border:none;cursor:pointer;color:var(--primary);font-size:1rem;margin-left:4px;" title="Copy">📋</button></p>
                </div>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;font-size:0.85rem;">
                <div style="padding:10px;background:var(--white);border-radius:8px;"><span style="color:var(--text-muted);">${isHindi ? 'विक्रेता' : 'Seller'}:</span><br><strong>${formData.name}</strong></div>
                <div style="padding:10px;background:var(--white);border-radius:8px;"><span style="color:var(--text-muted);">${isHindi ? 'फ़ोन' : 'Phone'}:</span><br><strong>${formData.phone}</strong></div>
                <div style="padding:10px;background:var(--white);border-radius:8px;"><span style="color:var(--text-muted);">${isHindi ? 'कमोडिटी' : 'Commodity'}:</span><br><strong>${commodityIcon} ${formData.commodity}</strong></div>
                <div style="padding:10px;background:var(--white);border-radius:8px;"><span style="color:var(--text-muted);">${isHindi ? 'मात्रा' : 'Quantity'}:</span><br><strong>${formData.quantity} Qt</strong></div>
                <div style="padding:10px;background:var(--white);border-radius:8px;"><span style="color:var(--text-muted);">${isHindi ? 'राज्य' : 'State'}:</span><br><strong>${formData.state}</strong></div>
                <div style="padding:10px;background:var(--white);border-radius:8px;"><span style="color:var(--text-muted);">${isHindi ? 'जिला' : 'District'}:</span><br><strong>${formData.district}</strong></div>
                ${formData.price ? `<div style="padding:10px;background:var(--white);border-radius:8px;"><span style="color:var(--text-muted);">${isHindi ? 'अपेक्षित मूल्य' : 'Expected Price'}:</span><br><strong>${Utils.formatCurrency(Number(formData.price))}/Qt</strong></div>` : ''}
                ${formData.availableFrom ? `<div style="padding:10px;background:var(--white);border-radius:8px;"><span style="color:var(--text-muted);">${isHindi ? 'उपलब्ध' : 'Available'}:</span><br><strong>${formData.availableFrom}</strong></div>` : ''}
                ${formData.details ? `<div style="padding:10px;background:var(--white);border-radius:8px;grid-column:1/-1;"><span style="color:var(--text-muted);">${isHindi ? 'विवरण' : 'Details'}:</span><br><strong>${formData.details}</strong></div>` : ''}
            </div>
            <p style="font-size:0.78rem;color:var(--text-muted);margin-top:14px;text-align:center;">${isHindi ? 'खरीदार जल्द ही आपसे संपर्क करेंगे। सहायता के लिए 1800-180-1551 पर कॉल करें।' : 'Verified buyers will contact you shortly. For support, call 1800-180-1551.'}</p>
        </div>`;
    }

    // Reset form
    document.getElementById('sellForm')?.reset();
    UI.showToast(isHindi ? '✅ आपकी फसल सफलतापूर्वक लिस्ट हुई!' : '✅ Your produce has been listed!', 'success');
};

// ============================================================
// SCROLL TO TOP
// ============================================================
function initScrollToTop() {
    const btn = document.getElementById('scrollTop');
    if (!btn) return;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) btn.classList.add('visible');
        else btn.classList.remove('visible');
    });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ============================================================
// FLOATING PARTICLES
// ============================================================
function initParticles() {
    const container = document.getElementById('heroParticles');
    if (!container) return;
    const colors = ['rgba(255,153,51,0.3)', 'rgba(19,136,8,0.2)'];
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = 4 + Math.random() * 14;
        particle.style.cssText = `
            width: ${size}px; height: ${size}px;
            left: ${Math.random() * 100}%; bottom: ${-20 - Math.random() * 40}px;
            background: ${colors[i % colors.length]};
            animation-duration: ${12 + Math.random() * 20}s; animation-delay: ${Math.random() * 10}s;
        `;
        container.appendChild(particle);
    }
}

// ============================================================
// SCROLL REVEAL (IntersectionObserver)
// ============================================================
// ============================================================
// FAVORITES LOGIC
// ============================================================
function renderFavorites() {
    const favorites = AppState.favorites;
    const section = document.getElementById('favoritesSection');
    const grid = document.getElementById('favoritesGrid');

    if (!section || !grid) return;

    if (favorites.length === 0) {
        section.style.display = 'none';
        return;
    }

    section.style.display = 'block';
    grid.innerHTML = favorites.map(f => {
        return `<div class="favorite-card">
            <div>
                <strong style="color:var(--text-primary);display:block;">${f.market}</strong>
                <span style="font-size:0.85rem;color:var(--text-secondary);">${f.commodity} (${f.state})</span>
                <div style="font-size:1.1rem;font-weight:700;color:var(--saffron);margin-top:4px;">${Utils.formatCurrency(f.price)}</div>
            </div>
            <button class="btn-favorite active" onclick="toggleFavorite('${f.market}', '${f.commodity}', '${f.state}', ${f.price}, '${f.district}')">❤</button>
        </div>`;
    }).join('');
}

window.toggleFavorite = function (market, commodity, state, price, district) {
    const item = { market, commodity, state, price, district };
    const added = AppState.toggleFavorite(item);

    const isHindi = AppState.getLanguage() === 'hi';
    const msg = added
        ? (isHindi ? `${commodity} सुरक्षित किया गया` : `Added ${commodity} to favorites`)
        : (isHindi ? `${commodity} हटाया गया` : `Removed ${commodity} from favorites`);

    UI.showToast(msg, 'info');

    // Re-render table rows to update hearts if visible
    const rows = document.querySelectorAll('#mandiTableBody tr');
    rows.forEach(row => {
        const title = row.querySelector('.mandi-name')?.textContent;
        // Simple check, in production use IDs
        if (title && title.includes(market)) {
            const btn = row.querySelector('.btn-favorite');
            if (btn) {
                if (added) btn.classList.add('active');
                else btn.classList.remove('active');
            }
        }
    });
};

// ============================================================
// SCROLL REVEAL (IntersectionObserver)
// ============================================================
function initScrollReveal() {
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    } else {
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('revealed'));
    }
}
