/**
 * KisanMitra — Utility Functions
 * Common helpers for formatting, validation, and data processing.
 */

export const Utils = {
    /**
     * Format currency to Indian Rupee
     * @param {number} amount 
     * @returns {string} Formatted string (e.g., "₹2,300")
     */
    formatCurrency(amount) {
        if (amount === undefined || amount === null) return '—';
        return '₹' + Number(amount).toLocaleString('en-IN');
    },

    /**
     * Get localized name for a commodity
     * @param {string} name - English name
     * @param {string} lang - 'en' or 'hi'
     * @returns {string} Localized name
     */
    getLocalizedCommodityName(name, lang = 'en') {
        if (lang === 'en') return name;

        const COMMODITIES = {
            'Wheat': { hi: 'गेहूं', te: 'గోధుమ', ta: 'கோதுமை', mr: 'गहू', bn: 'গম', kn: 'ಗೋಧಿ', gu: 'ઘઉં' },
            'Paddy (Common)': { hi: 'धान (सामान्य)', te: 'వరి (సాధారణ)', ta: 'நெல்லு (பொது)', mr: 'धान (सामान्य)', bn: 'ধান (সাধারণ)', kn: 'ಭತ್ತ (ಸಾಮಾನ್ಯ)', gu: 'ડાંગર (સામાન્ય)' },
            'Paddy (Grade A)': { hi: 'धान (ग्रेड ए)', te: 'వరి (గ్రేడ్ ఎ)', ta: 'நெல்லு (கிரேடு ஏ)', mr: 'धान (ग्रेड ए)', bn: 'ধান (গ্রেড এ)', kn: 'ಭತ್ತ (ಗ್ರೇಡ್ ಎ)', gu: 'ડાંગર (ગ્રેડ એ)' },
            'Paddy (Rice)': { hi: 'धान', te: 'వరి', ta: 'அரிசி', mr: 'तांदूळ', bn: 'চাল', kn: 'ಅಕ್ಕಿ', gu: 'ચોખા' },
            'Maize': { hi: 'मक्का', te: 'మొక్కజొన్న', ta: 'மக்காச்சோளம்', mr: 'मका', bn: 'ভুট্টা', kn: 'ಮೆಕ್ಕೆಜೋಳ', gu: 'મકાઈ' },
            'Gram (Chana)': { hi: 'चना', te: 'శనగలు', ta: 'கொண்டைக்கடலை', mr: 'हरभरा', bn: 'ছোলা', kn: 'ಕಡಲೆ', gu: 'ચણા' },
            'Mustard': { hi: 'सरसों', te: 'ఆవాలు', ta: 'கடுகு', mr: 'मोहरी', bn: 'সরিষা', kn: 'ಸಾಸಿವೆ', gu: 'સરસવ' },
            'Arhar (Tur)': { hi: 'अरहर (तूर)', te: 'కందిపప్పు (తూర్)', ta: 'துவரம் பருப்பு', mr: 'तूर', bn: 'অড়হর (তুর)', kn: 'ತೊಗರಿ (ತೂರ್)', gu: 'તુવેર (તૂર)' },
            'Groundnut': { hi: 'मूंगफली', te: 'వేరుశెనగ', ta: 'நிலக்கடலை', mr: 'भुईमूग', bn: 'চিনাবাদাম', kn: 'ಕಡಲೆಕಾಯಿ', gu: 'મગફળી' },
            'Cotton': { hi: 'कपास', te: 'పత్తి', ta: 'பருத்தி', mr: 'कापूस', bn: 'তুলা', kn: 'ಹತ್ತಿ', gu: 'કપાસ' },
            'Soyabean': { hi: 'सोयाबीन', te: 'సోయాబీన్', ta: 'சோயாபீன்', mr: 'सोयाबीन', bn: 'সয়াবিন', kn: 'ಸೋಯಾಬೀನ್', gu: 'સોયાબીન' },
            'Barley': { hi: 'जौ', te: 'బార్లీ', ta: 'பார்லி', mr: 'जवस', bn: 'যব', kn: 'ಬಾರ್ಲಿ', gu: 'જવ' },
            'Jowar (Sorghum)': { hi: 'ज्वार', te: 'జొన్న', ta: 'சோளம்', mr: 'ज्वारी', bn: 'জোয়ার', kn: 'ಜೋಳ', gu: 'જુવાર' },
            'Bajra (Pearl Millet)': { hi: 'बाजरा', te: 'సజ్జలు', ta: 'கம்பு', mr: 'बाजरी', bn: 'বাজরা', kn: 'ಸಜ್ಜೆ', gu: 'બાજરી' },
            'Ragi (Finger Millet)': { hi: 'रागी', te: 'రాగులు', ta: 'கேழ்வரகு', mr: 'नाचणी', bn: 'রাগী', kn: 'ರಾಗಿ', gu: 'રાગી' },
            'Masoor (Lentil)': { hi: 'मसूर', te: 'మసూర్', ta: 'மைசூர் பருப்பு', mr: 'मसूर', bn: 'মসুর', kn: 'ಮಸೂರ್', gu: 'મસૂર' },
            'Moong (Green Gram)': { hi: 'मूंग', te: 'పెసలు', ta: 'பச்சைப்பயிறு', mr: 'मूग', bn: 'মুগ', kn: 'ಹೆಸರುಬೇಳೆ', gu: 'મગ' },
            'Urad (Black Gram)': { hi: 'उड़द', te: 'మినుములు', ta: 'உளுந்து', mr: 'उडीद', bn: 'কলাই', kn: 'ಉದ್ದು', gu: 'અડદ' },
            'Sunflower': { hi: 'सूरजमुखी', te: 'పొద్దుతిరుగుడు', ta: 'சூரியகாந்தி', mr: 'सूर्यफूल', bn: 'সূর্যমুখী', kn: 'ಸೂರ್ಯಕಾಂತಿ', gu: 'સૂર્યમુખી' },
            'Sesamum (Til)': { hi: 'तिल', te: 'నువ్వులు', ta: 'எள்', mr: 'तीळ', bn: 'তিল', kn: 'ಎಳ್ಳು', gu: 'તલ' },
            'Nigerseed': { hi: 'रामतिल', te: 'రామ్‌తిల్', ta: 'நைஜர் விதை', mr: 'कारळे', bn: 'গুঁজি তিল', kn: 'ಹುಚ್ಚೆಳ್ಳು', gu: 'રામતિલ' },
            'Safflower': { hi: 'कुसुम', te: 'కుసుమ', ta: 'குசும்பா', mr: 'करडई', bn: 'কুসুম', kn: 'ಕುಸುಬೆ', gu: 'કુસુમ' },
            'Copra': { hi: 'खोपरा', te: 'కొబ్బరి', ta: 'கொப்பரை', mr: 'खोबरं', bn: 'কোপরা', kn: 'ಕೊಬ್ಬರಿ', gu: 'કોપરા' },
            'Jute': { hi: 'जूट', te: 'జనపనార', ta: 'சணல்', mr: 'ताग', bn: 'পাট', kn: 'ಸೆಣಬು', gu: 'શણ' },
            'Sugarcane': { hi: 'गन्ना', te: 'చెరకు', ta: 'கரும்பு', mr: 'ऊस', bn: 'আখ', kn: 'ಕಬ್ಬು', gu: 'શેરડી' },
            'Onion': { hi: 'प्याज़', te: 'ఉల్లిపాయ', ta: 'வெங்காயம்', mr: 'कांदा', bn: 'পেঁয়াজ', kn: 'ಈರುಳ್ಳಿ', gu: 'ડુંગળી' },
            'Potato': { hi: 'आलू', te: 'బంగాళదుంప', ta: 'உருளைக்கிழங்கு', mr: 'बटाटा', bn: 'আলু', kn: 'ಆಲೂಗಡ್ಡೆ', gu: 'બટાકા' },
            'Tomato': { hi: 'टमाटर', te: 'టమోటా', ta: 'தக்காளி', mr: 'टोमॅटो', bn: 'টমেটো', kn: 'ಟೊಮೇಟೊ', gu: 'ટામેટા' },
            'Green Chilli': { hi: 'हरी मिर्च', te: 'పచ్చిమిర్చి', ta: 'பச்சை மிளகாய்', mr: 'हिरवी मिरची', bn: 'কাঁচা লঙ্কা', kn: 'ಹಸಿ ಮೆಣಸಿನಕಾಯಿ', gu: 'લીલા મરચાં' },
            'Brinjal': { hi: 'बैंगन', te: 'వంకాయ', ta: 'கத்தரிக்காய்', mr: 'वांगी', bn: 'বেগুন', kn: 'ಬದನೆಕಾಯಿ', gu: 'રીંગણ' },
            'Cauliflower': { hi: 'फूलगोभी', te: 'క్యాలీఫ్లవర్', ta: 'காலிபிளவர்', mr: 'फ्लॉवर', bn: 'ফুলকপি', kn: 'ಹೂಕೋಸು', gu: 'ફૂલગોભી' },
            'Cabbage': { hi: 'पत्ता गोभी', te: 'క్యాబేజీ', ta: 'முட்டைக்கோஸ்', mr: 'कोबी', bn: 'বাঁধাকপি', kn: 'ಎಲೆಕೋಸು', gu: 'કોબી' },
            'Lady Finger (Bhindi)': { hi: 'भिंडी', te: 'బెండకాయ', ta: 'வெண்டைக்காய்', mr: 'भेंडी', bn: 'ঢ্যাঁড়শ', kn: 'ಬೆಂಡೆಕಾಯಿ', gu: 'ભીંડા' },
            'Turmeric': { hi: 'हल्दी', te: 'పసుపు', ta: 'மஞ்சள்', mr: 'हळद', bn: 'হলুদ', kn: 'ಅರಿಶಿನ', gu: 'હળદર' },
            'Cumin (Jeera)': { hi: 'जीरा', te: 'జీలకర్ర', ta: 'சீரகம்', mr: 'जिरे', bn: 'জিরা', kn: 'ಜೀರಿಗೆ', gu: 'જીરું' },
            'Coriander': { hi: 'धनिया', te: 'కొత్తిమీర', ta: 'கொத்தமல்லி', mr: 'कोथिंबीर', bn: 'ধনে', kn: 'ಕೊತ್ತಂಬರಿ', gu: 'ધાણા' },
            'Black Pepper': { hi: 'काली मिर्च', te: 'నల్ల మిరియాలు', ta: 'மிளகு', mr: 'काळी मिरी', bn: 'গোলমরিচ', kn: 'ಕಪ್ಪು ಮೆಣಸು', gu: 'કાળા મરી' },
            'Garlic': { hi: 'लहसुन', te: 'వెల్లుల్లి', ta: 'பூண்டு', mr: 'लसूण', bn: 'রসুন', kn: 'ಬೆಳ್ಳುಳ್ಳಿ', gu: 'લસણ' },
            'Ginger': { hi: 'अदरक', te: 'అల్లం', ta: 'இஞ்சி', mr: 'आले', bn: 'আদা', kn: 'ಶುಂಠಿ', gu: 'આદુ' },
            'Banana': { hi: 'केला', te: 'అరటి', ta: 'வாழைப்பழம்', mr: 'केळी', bn: 'কলা', kn: 'ಬಾಳೆಹಣ್ಣು', gu: 'કેળા' },
            'Mango': { hi: 'आम', te: 'మామిడి', ta: 'மாம்பழம்', mr: 'आंबा', bn: 'আম', kn: 'ಮಾವಿನಹಣ್ಣು', gu: 'કેરી' },
            'Apple': { hi: 'सेब', te: 'ఆపిల్', ta: 'ஆப்பிள்', mr: 'सफरचंद', bn: 'আপেল', kn: 'ಸೇಬು', gu: 'સફરજન' },
            'Grapes': { hi: 'अंगूर', te: 'ద్రాక్ష', ta: 'திராட்சை', mr: 'द्राक्षे', bn: 'আঙুর', kn: 'ದ್ರಾಕ್ಷಿ', gu: 'દ્રાક્ષ' }
        };

        const item = COMMODITIES[name];
        return (item && item[lang]) ? item[lang] : name;
    },

    /**
     * Generate HTML for star ratings
     * @param {number} rating - 0 to 5
     * @returns {string} HTML string
     */
    getStarRatingHtml(rating) {
        return '★'.repeat(Math.floor(rating)) + (rating % 1 >= 0.5 ? '½' : '');
    },

    /**
     * Debounce a function
     * @param {Function} func 
     * @param {number} wait 
     * @returns {Function}
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Add simple fade-in animation to an element
     * @param {HTMLElement} element 
     * @param {number} delay 
     */
    fadeIn(element, delay = 0) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(10px)';
        element.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, delay);
    }
};
