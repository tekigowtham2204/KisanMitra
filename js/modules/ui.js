/**
 * KisanMitra — UI Module
 * Handles DOM manipulation and rendering.
 */

import { Utils } from './utils.js';
import { AppState } from './state.js';

export const UI = {
    init() {
        // Assuming renderToastContainer will be defined elsewhere or is a placeholder
        // this.renderToastContainer(); 
        this.initHighContrast();
    },

    initHighContrast() {
        const isHighContrast = localStorage.getItem('kisanHighContrast') === 'true';
        if (isHighContrast) {
            document.body.classList.add('high-contrast');
        }

        // Bind to all toggle buttons (mobile + desktop)
        document.querySelectorAll('.hc-toggle').forEach(btn => {
            btn.addEventListener('click', () => this.toggleHighContrast());
            btn.setAttribute('aria-pressed', isHighContrast);
        });
    },

    toggleHighContrast() {
        const isHC = document.body.classList.toggle('high-contrast');
        localStorage.setItem('kisanHighContrast', isHC);
        this.showToast(isHC ? 'High Contrast Mode Enabled' : 'High Contrast Mode Disabled', 'info');

        document.querySelectorAll('.hc-toggle').forEach(btn => {
            btn.setAttribute('aria-pressed', isHC);
        });
    },

    /**
     * Show a standardized loading spinner
     * @param {HTMLElement} container 
     * @param {string} message 
     */
    showLoading(container, message = 'Loading...') {
        if (!container) return;
        container.innerHTML = `
            <div class="loading-state">
                <div class="loader"></div>
                <p>${message}</p>
            </div>`;
    },

    /**
     * Show error message with retry button
     * @param {HTMLElement} container 
     * @param {string} title 
     * @param {string} message 
     * @param {Function} retryFn 
     */
    showError(container, title, message, retryFn) {
        if (!container) return;
        container.innerHTML = `
            <div class="error-state">
                <div class="error-icon">⚠️</div>
                <h4>${title}</h4>
                <p>${message}</p>
                ${retryFn ? '<button class="btn btn-primary btn-sm retry-btn">🔄 Retry</button>' : ''}
            </div>`;

        if (retryFn) {
            container.querySelector('.retry-btn').addEventListener('click', retryFn);
        }
    },

    /**
     * Create and show a toast notification
     * @param {string} message 
     * @param {string} type 'success', 'danger', 'info'
     */
    showToast(message, type = 'info') {
        const colors = {
            success: { bg: 'var(--success-bg)', border: 'var(--success)', text: 'var(--success)' },
            danger: { bg: 'var(--danger-bg)', border: 'var(--danger)', text: 'var(--danger)' },
            info: { bg: 'var(--info-bg)', border: 'var(--info)', text: 'var(--info)' },
            warning: { bg: 'var(--warning-bg)', border: 'var(--warning)', text: 'var(--warning)' }
        };
        const c = colors[type] || colors.info;

        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.style.cssText = `
            position: fixed; top: 90px; right: 20px; z-index: 10000;
            background: ${c.bg}; border: 1px solid ${c.border}; color: ${c.text};
            padding: 14px 24px; border-radius: 10px; font-size: 0.9rem; font-weight: 600;
            box-shadow: 0 8px 30px rgba(0,0,0,0.15); max-width: 420px;
            animation: slideInRight 0.3s ease; cursor: pointer; display: flex; align-items: center; gap: 10px;
        `;

        const icon = type === 'success' ? '✅' : type === 'danger' ? '❌' : 'ℹ️';
        toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;

        toast.addEventListener('click', () => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        });

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(-20px)';
            setTimeout(() => toast.remove(), 500);
        }, 5000);
    },

    /**
     * Render the ticker items
     * @param {Array} commodities 
     * @param {Object} mspData 
     */
    renderTicker(commodities, mspData) {
        const container = document.getElementById('tickerContent');
        if (!container) return;

        const isHindi = AppState.getLanguage() === 'hi';

        const items = commodities
            .filter(c => c.hasMSP && mspData[c.name])
            .slice(0, 14)
            .map(c => {
                const msp = mspData[c.name].msp;
                const season = mspData[c.name].season;
                const displayName = Utils.getLocalizedCommodityName(c.name, AppState.getLanguage());

                return `<span class="ticker-item">
                    ${c.icon} <span class="ticker-name">${displayName}</span>
                    <span class="ticker-price">MSP ${Utils.formatCurrency(msp)}</span>
                    <span style="color:rgba(255,255,255,0.5);font-size:0.7rem;">${season}</span>
                </span>`;
            }).join('');

        container.innerHTML = items + items; // Duplicate for smooth loop
    },

    /**
     * Generic skeletons for loading states
     */
    renderSkeletonTable(tbody, rows = 5, cols = 4) {
        if (!tbody) return;
        let html = '';
        for (let i = 0; i < rows; i++) {
            html += '<tr>' + Array(cols).fill('<td><div class="skeleton-text"></div></td>').join('') + '</tr>';
        }
        tbody.innerHTML = html;
    }
};


