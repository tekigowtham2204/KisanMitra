/**
 * KisanMitra — State Management
 * Handles application state, user preferences, and simple event bus.
 */

class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(event, listener) {
        if (!this.events[event]) this.events[event] = [];
        this.events[event].push(listener);
    }

    emit(event, data) {
        if (this.events[event]) this.events[event].forEach(l => l(data));
    }
}

export const AppState = {
    events: new EventEmitter(),

    // Core state
    language: localStorage.getItem('km_lang') || 'en',
    currentLocation: null,
    favorites: JSON.parse(localStorage.getItem('km_favorites') || '[]'),

    // Methods
    setLanguage(lang) {
        this.language = lang;
        localStorage.setItem('km_lang', lang);

        const locales = {
            'en': 'en-IN', 'hi': 'hi-IN', 'te': 'te-IN',
            'ta': 'ta-IN', 'mr': 'mr-IN', 'bn': 'bn-IN',
            'kn': 'kn-IN', 'gu': 'gu-IN'
        };
        document.documentElement.lang = locales[lang] || 'en-IN';

        this.events.emit('languageChanged', lang);
    },

    getLanguage() {
        return this.language;
    },

    isFavorite(market, commodity) {
        return this.favorites.some(f => f.market === market && f.commodity === commodity);
    },

    toggleFavorite(item) {
        const index = this.favorites.findIndex(f => f.market === item.market && f.commodity === item.commodity);
        if (index === -1) {
            this.favorites.push(item);
        } else {
            this.favorites.splice(index, 1);
        }
        this.persistFavorites();
        this.events.emit('favoritesUpdated', this.favorites);
        return index === -1; // true if added
    },

    persistFavorites() {
        localStorage.setItem('km_favorites', JSON.stringify(this.favorites));
    }
};
