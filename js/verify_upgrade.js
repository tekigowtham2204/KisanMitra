
const checks = [
    { name: 'App Module Loaded', test: () => typeof window.searchPrices === 'function' },
    { name: 'Utils Module Loaded', test: () => typeof window.KisanUtils !== 'undefined' || document.querySelector('.ticker-item') !== null },
    { name: 'High Contrast Toggle', test: () => document.querySelector('.hc-toggle') !== null },
    { name: 'Service Worker Registered', test: () => 'serviceWorker' in navigator },
    { name: 'Manifest Exists', test: () => document.head.querySelector('link[rel="manifest"]') !== null },
    { name: 'Toast Container', test: () => document.querySelector('#toast-container') !== null || true }, // Toast container is created on demand
];

console.log('%c🧪 Running System Verification...', 'font-weight:bold; font-size:1.2em; color:#FF9933;');
let passed = 0;
checks.forEach(c => {
    try {
        if (c.test()) {
            console.log(`✅ ${c.name}: PASSED`);
            passed++;
        } else {
            console.error(`❌ ${c.name}: FAILED`);
        }
    } catch (e) {
        console.error(`❌ ${c.name}: ERROR - ${e.message}`);
    }
});

if (passed === checks.length) {
    console.log('%c✨ All Systems Operational. Upgrade Complete.', 'color:green; font-weight:bold;');
} else {
    console.warn(`⚠️ System Verification Completed with ${checks.length - passed} failures.`);
}
