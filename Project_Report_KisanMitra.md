# Project Report: KisanMitra (किसानमित्र)
**Course:** CSE326 - Internet Programming Lab
**Project Title:** KisanMitra - Farmer's Digital Companion
**Date:** 12-03-2026

---

## 1. Project Overview
**KisanMitra** is a unified digital platform built to empower Indian farmers by bridging the information gap between the farm and the market. The application provides farmers with real-time access to crucial agricultural data, helping them make informed decisions regarding their crops and sales. It is designed to be accessible, responsive, and available offline as a Progressive Web App (PWA).

## 2. Key Features
- **Real-time Mandi Prices:** Live commodity prices from over 7,000 mandis across India, allowing farmers to compare prices and find the best markets.
- **Weather Alerts & Advisories:** Location-specific 7-day weather forecasts integrated with crop-specific advisories to help mitigate weather-related risks.
- **MSP (Minimum Support Price) Tracker:** Up-to-date tracking of government-mandated MSPs for 23+ essential crops.
- **Government Schemes Directory:** A comprehensive, easily navigable list of over 50 central and state government agricultural schemes (e.g., PM-KISAN, PMFBY).
- **Direct Market Access:** A platform feature to connect farmers directly with buyers, cooperatives, and exporters to bypass middlemen.
- **Multilingual Support:** Interface support for various Indian languages (English, Hindi, Telugu, Tamil, Marathi, Bengali, Kannada, Gujarati).
- **High Contrast & Accessibility Mode:** Built-in accessibility features to ensure usability for all farmers.
- **Offline Support (PWA):** The application utilizes a service worker to function even with intermittent or no internet connectivity.

## 3. Technologies Used
- **Frontend Structure:** HTML5 (Semantic structuring, Accessibility features)
- **Styling:** Custom CSS3 with CSS Variables for theme management, Flexbox and Grid for responsive layout design. No external CSS frameworks were used to ensure a lightweight footprint.
- **Logic & Functionality:** Vanilla JavaScript (ES6 Modules)
    - `app.js`: Main application logic and routing.
    - `api.js`: Handles asynchronous data fetching (simulated API calls for weather and mandi data).
    - `i18n.js`: Manages multilingual translations and localization.
    - `db.js`, `state.js`: Modular state management and local data persistence.
- **Progressive Web App (PWA):** `manifest.json` and `service-worker.js` for installability and offline caching.

## 4. Architecture & Design
The application follows a modular monolith architecture on the frontend:
- **Responsive Design:** The UI is completely responsive, adapting seamlessly from mobile devices (critical for farmers) to desktop dashboards.
- **Component-Based Styling:** CSS is organized modularly (e.g., cards, navigation, tables) using BEM-like conventions.
- **State Management:** A centralized state object manages user preferences (language, location) and application data.

## 5. Deployment
The project is version-controlled using Git and is deployed live using GitHub Pages.
- **Live URL:** [https://tekigowtham2204.github.io/KisanMitra/](https://tekigowtham2204.github.io/KisanMitra/)
- **GitHub Repository:** [https://github.com/tekigowtham2204/KisanMitra/](https://github.com/tekigowtham2204/KisanMitra/)

## 6. Conclusion
KisanMitra successfully demonstrates the application of core Internet Programming concepts (HTML, CSS, JS, APIs, PWAs) to solve a real-world problem. By providing farmers with transparent market data and access to schemes, it aims to reduce dependency on middlemen and improve agricultural livelihoods.
