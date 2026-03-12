// ============================================================
// KisanMitra — Internationalization (i18n)
// Supports: English (en), Hindi (hi), Telugu (te), Tamil (ta), Marathi (mr), Bengali (bn), Kannada (kn), Gujarati (gu)
// ============================================================

(function () {
    'use strict';

    const STORAGE_KEY = 'km_lang';
    let currentLang = localStorage.getItem(STORAGE_KEY) || 'en';

    // ════════════════════════════════════════════════════════════
    // TRANSLATIONS
    // ════════════════════════════════════════════════════════════

    const translations = {
        // ── Navigation ──
        'nav.home': { en: 'Home', hi: 'होम', te: 'హోమ్', ta: 'முகப்பு', mr: 'होम', bn: 'হোম', kn: 'ಮುಖಪುಟ', gu: 'હોમ' },
        'nav.dashboard': { en: 'Dashboard', hi: 'डैशबोर्ड', te: 'డాష్‌బోర్డ్', ta: 'கட்டுப்பாட்டு அறை', mr: 'डॅशबोर्ड', bn: 'ড্যাশবোর্ড', kn: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್', gu: 'ડેશબોર્ડ' },
        'nav.schemes': { en: 'Schemes', hi: 'योजनाएं', te: 'పథకాలు', ta: 'திட்டங்கள்', mr: 'योजना', bn: 'প্রকল্প', kn: 'ಯೋಜನೆಗಳು', gu: 'યોજનાઓ' },
        'nav.market': { en: 'Market', hi: 'बाज़ार', te: 'మార్కెట్', ta: 'சந்தை', mr: 'बाजार', bn: 'বাজার', kn: 'ಮಾರುಕಟ್ಟೆ', gu: 'બજાર' },
        'nav.helpline': { en: '📞 1800-180-1551', hi: '📞 1800-180-1551', te: '📞 1800-180-1551', ta: '📞 1800-180-1551', mr: '📞 1800-180-1551', bn: '📞 1800-180-1551', kn: '📞 1800-180-1551', gu: '📞 1800-180-1551' },

        // ── Home Page ──
        'hero.badge': {
            en: '🇮🇳 Digital Agriculture Mission — Ministry of Agriculture & Farmers Welfare',
            hi: '🇮🇳 डिजिटल कृषि मिशन — कृषि एवं किसान कल्याण मंत्रालय',
            te: '🇮🇳 డిజిటల్ వ్యవసాయ మిషన్ — వ్యవసాయ & రైతు సంక్షేమ మంత్రిత్వ శాఖ',
            ta: '🇮🇳 டிஜிட்டல் விவசாய மிஷன் — விவசாயம் & உழவர் நல அமைச்சகம்',
            mr: '🇮🇳 डिजिटल कृषी मिशन — कृषी आणि शेतकरी कल्याण मंत्रालय',
            bn: '🇮🇳 ডিজিটাল কৃষি মিশন — কৃষি ও কৃষক কল্যাণ মন্ত্রক',
            kn: '🇮🇳 ಡಿಜಿಟಲ್ ಕೃಷಿ ಮಿಷನ್ — ಕೃಷಿ ಮತ್ತು ರೈತ ಕಲ್ಯಾಣ ಸಚಿವಾಲಯ',
            gu: '🇮🇳 ડિજિટલ કૃષિ મિશન - કૃષિ અને ખેડૂત કલ્યાણ મંત્રાલય'
        },
        'hero.title.1': { en: 'Empowering', hi: 'सशक्तिकरण', te: 'సాధికారత', ta: 'அதிகாரமளித்தல்', mr: 'सशक्तीकरण', bn: 'ক্ষমতায়ন', kn: 'ಸಬಲೀಕರಣ', gu: 'સશક્તિકરણ' },
        'hero.title.2': { en: '14.6 Crore', hi: '14.6 करोड़', te: '14.6 కోట్లు', ta: '14.6 கோடி', mr: '14.6 कोटी', bn: '১৪.৬ কোটি', kn: '14.6 ಕೋಟಿ', gu: '14.6 કરોડ' },
        'hero.title.3': {
            en: 'Farmers with Real-Time Intelligence',
            hi: 'किसानों को वास्तविक समय की जानकारी',
            te: 'రైతులకు రియల్-టైమ్ సమాచారం',
            ta: 'நிகழ்நேர தகவல்களுடன் விவசாயிகள்',
            mr: 'शेतकऱ्यांना रिअल-टाइम माहिती',
            bn: 'রিয়েল-টাইম তথ্যের সাথে কৃষকরা',
            kn: 'ನೈಜ-ಸಮಯದ ಮಾಹಿತಿಯೊಂದಿಗೆ ರೈತರು',
            gu: 'રીઅલ-ટાઇમ માહિતી સાથે ખેડૂતો'
        },
        'hero.subtitle': {
            en: 'Live mandi prices from 7,000+ markets · Weather advisories · MSP rates · Government schemes — all in one platform',
            hi: '7,000+ बाजारों से लाइव मंडी भाव · मौसम सलाह · एमएसपी दरें · सरकारी योजनाएं — एक ही मंच पर',
            te: '7,000 మార్కెట్ల నుండి లైవ్ మండి ధరలు · వాతావరణ సలహాలు · MSP రేట్లు · ప్రభుత్వ పథకాలు — అన్నీ ఒకే వేదికపై',
            ta: '7,000 சந்தைகளில் இருந்து நேரடி மண்டி விலைகள் · வானிலை ஆலோசனைகள் · எம்எஸ்பி விகிதங்கள் · அரசு திட்டங்கள் — அனைத்தும் ஒரே மேடையில்',
            mr: '7,000+ बाजारांमधून थेट मंडी दर · हवामान सल्ले · एमएसपी दर · सरकारी योजना — सर्व एकाच मंचावर',
            bn: '৭,০০০+ বাজার থেকে সরাসরি মান্ডি দর · আবহাওয়ার পরামর্শ · এমএসপি রেট · সরকারি প্রকল্প — সব এক প্ল্যাটফর্মে',
            kn: '7,000 ಮಾರ್ಕೆಟ್‌ಗಳಿಂದ ಲೈವ್ ಮಂಡಿ ಬೆಲೆಗಳು · ಹವಾಮಾನ ಸಲಹೆಗಳು · ಎಂಎಸ್‌ಪಿ ದರಗಳು · ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು — ಒಂದೇ ವೇದಿಕೆಯಲ್ಲಿ',
            gu: '7,000 બજારોમાંથી જીવંત મંડીના ભાવો · હવામાન સલાહ · એમએસપી દરો · સરકારી યોજનાઓ - બધું એક જ પ્લેટફોર્મ પર'
        },
        'hero.btn.dashboard': { en: '📊 Live Dashboard', hi: '📊 लाइव डैशबोर्ड', te: '📊 లైవ్ డాష్‌బోర్డ్', ta: '📊 நேரடி கட்டுப்பாட்டு அறை', mr: '📊 लाईव्ह डॅशबोर्ड', bn: '📊 লাইভ ড্যাশবোর্ড', kn: '📊 ಲೈವ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್', gu: '📊 લાઇવ ડેશબોર્ડ' },
        'hero.btn.schemes': { en: '🏛️ Schemes', hi: '🏛️ योजनाएं', te: '🏛️ పథకాలు', ta: '🏛️ திட்டங்கள்', mr: '🏛️ योजना', bn: '🏛️ প্রকল্প', kn: '🏛️ ಯೋಜನೆಗಳು', gu: '🏛️ યોજનાઓ' },

        // Stats
        'stat.mandis': { en: 'Mandis Tracked', hi: 'मंडी ट्रैक', te: 'మండిస్ ట్రాక్ చేయబడ్డాయి', ta: 'மண்டிகள் கண்காணிக்கப்படுகின்றன', mr: 'मंडींचा मागोवा', bn: 'ম্যান্ডিগুলি ট্র্যাক করা হচ্ছে', kn: 'ಮಂಡಿಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಲಾಗಿದೆ', gu: 'મંડીઓ ટ્રેક કરાઈ' },
        'stat.crops': { en: 'Crops Covered', hi: 'फसलें शामिल', te: 'పంటలు కవర్ చేయబడ్డాయి', ta: 'பயிர்கள் உள்ளடங்கியது', mr: 'पिके समाविष्ट', bn: 'ফসল অন্তর্ভুক্ত', kn: 'ಬೆಳೆಗಳು ಒಳಗೊಂಡಿದೆ', gu: 'પાક સામેલ' },
        'stat.states': { en: 'States', hi: 'राज्य', te: 'రాష్ట్రాలు', ta: 'மாநிலங்கள்', mr: 'राज्ये', bn: 'রাজ্যসমূহ', kn: 'ರಾಜ್ಯಗಳು', gu: 'રાજ્યો' },
        'stat.updates': { en: 'Updates', hi: 'अपडेट', te: 'నవీకరణలు', ta: 'புதுப்பிப்புகள்', mr: 'अपडेट्स', bn: 'আপডেটসমূহ', kn: 'ನವೀಕರಣಗಳು', gu: 'અપડેટ્સ' },

        // Features
        'feature.prices.title': { en: 'Live Mandi Prices', hi: 'लाइव मंडी भाव', te: 'లైవ్ మండి ధరలు', ta: 'நேரடி மண்டி விலைகள்', mr: 'थेट मंडी दर', bn: 'সরাসরি মান্ডি দর', kn: 'ಲೈವ್ ಮಂಡಿ ಬೆಲೆಗಳು', gu: 'જીવંત મંડી ભાવો' },
        'feature.prices.desc': {
            en: 'Real-time commodity prices from 7,000+ regulated mandis via data.gov.in',
            hi: 'data.gov.in के माध्यम से 7,000+ विनियमित मंडियों से वास्तविक समय में कमोडिटी की कीमतें',
            te: 'data.gov.in ద్వారా 7,000 మార్కెట్ల నుండి రియల్ టైమ్ ధరలు',
            ta: 'data.gov.in மூலம் 7,000 சந்தைகளில் இருந்து நிகழ்நேர பொருட்கள் விலைகள்',
            mr: 'data.gov.in द्वारे 7,000+ नियमित मंड्यांमधून रिअल-टाइम कमोडिटी दर',
            bn: 'data.gov.in এর মাধ্যমে ৭,০০০ নিয়ন্ত্রিত মান্ডি থেকে রিয়েল-টাইম পণ্যের দর',
            kn: 'data.gov.in ಮೂಲಕ 7,000+ ನಿಯಂತ್ರಿತ ಮಂಡಿಗಳಿಂದ ನೈಜ-ಸಮಯದ ಸರಕು ಬೆಲೆಗಳು',
            gu: 'data.gov.in દ્વારા 7,000+ નિયંત્રિત બજારોમાંથી વાસ્તવિક સમયના કોમોડિટી ભાવો'
        },
        'feature.weather.title': { en: 'Weather & Advisory', hi: 'मौसम एवं सलाह', te: 'వాతావరణం & సలహా', ta: 'வானிலை & ஆலோசனை', mr: 'हवामान आणि सल्ला', bn: 'আবহাওয়া এবং পরামর্শ', kn: 'ಹವಾಮಾನ ಮತ್ತು ಸಲಹೆ', gu: 'હવામાન અને સલાહ' },
        'feature.weather.desc': {
            en: 'Localized weather forecasts with AI-driven crop advisories for your region',
            hi: 'आपके क्षेत्र के लिए स्थानीय मौसम पूर्वानुमान और AI-आधारित फसल सलाह',
            te: 'మీ ప్రాంతం కోసం వాతావరణ అంచనాలు మరియు ఏఐ ఆధారిత పంట సలహాలు',
            ta: 'உங்கள் பிராந்தியத்திற்கான வானிலை முன்னறிவிப்புகள் மற்றும் ஏஐ அடிப்படையிலான பயிர் ஆலோசனைகள்',
            mr: 'तुमच्या क्षेत्रासाठी हवामान अंदाज आणि एआय-आधारित पीक सल्ला',
            bn: 'আপনার অঞ্চলের জন্য আবহাওয়ার পূর্বাভাস এবং এআই-চালিত ফসলের পরামর্শ',
            kn: 'ನಿಮ್ಮ ಪ್ರದೇಶಕ್ಕೆ ಹವಾಮಾನ ಮುನ್ಸೂಚನೆಗಳು ಮತ್ತು ಎಐ-ಚಾಲಿತ ಬೆಳೆ ಸಲಹೆಗಳು',
            gu: 'તમારા વિસ્તાર માટે હવામાનની આગાહીઓ અને એઆઈ-આધારિત પાક સલાહ'
        },
        'feature.msp.title': { en: 'MSP Tracker', hi: 'एमएसपी ट्रैकर', te: 'ఎంఎస్పీ ట్రాకర్', ta: 'எம்எஸ்பி டிராக்கர்', mr: 'एमएसपी ट्रॅकर', bn: 'এমএসপি ট্র্যাকার', kn: 'ಎಂಎಸ್‌ಪಿ ಟ್ರ್ಯಾಕರ್', gu: 'એમએસપી ટ્રેકર' },
        'feature.msp.desc': {
            en: 'Compare market prices against official MSP — know if you are getting a fair deal',
            hi: 'बाजार मूल्य की तुलना एमएसपी से करें — जानें कि आपको उचित मूल्य मिल रहा है या नहीं',
            te: 'మార్కెట్ ధరలను ఎంఎస్పీతో సరిపోల్చండి — మంచి ధర లభిస్తుందో లేదో తెలుసుకోండి',
            ta: 'சந்தை விலைகளை எம்எஸ்பியோடு ஒப்பிடுக — நியாயமான விலையை பெறுகின்றீர்களா என்பதை அறிக',
            mr: 'बाजार भावाची एमएसपीशी तुलना करा — योग्य भाव मिळत आहे की नाही हे जाणून घ्या',
            bn: 'বাজার দামকে এমএসপি তুলনার সাথে মিলিয়ে দেখুন — ন্যায্য দাম পাচ্ছেন কিনা তা জানুন',
            kn: 'ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳನ್ನು ಎಂಎಸ್‌ಪಿಯೊಂದಿಗೆ ಹೋಲಿಕೆ ಮಾಡಿ — ನ್ಯಾಯೋಚಿತ ಬೆಲೆ ಲಭಿಸುತ್ತಿದೆಯೇ ಎಂದು ತಿಳಿಯಿರಿ',
            gu: 'બજાર ભાવોની એમએસપી સાથે તુલના કરો — તમને યોગ્ય ભાવ મળી રહ્યા છે કે નહીં તે જાણો'
        },
        'feature.schemes.title': { en: 'Government Schemes', hi: 'सरकारी योजनाएं', te: 'ప్రభుత్వ పథకాలు', ta: 'அரசு திட்டங்கள்', mr: 'सरकारी योजना', bn: 'সরকারি প্রকল্প', kn: 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು', gu: 'સરકારી યોજનાઓ' },
        'feature.schemes.desc': {
            en: 'PM-KISAN, PMFBY, KCC and 10+ schemes — check eligibility & apply directly',
            hi: 'PM-KISAN, PMFBY, KCC और 10+ योजनाएं — पात्रता जांचें और सीधे आवेदन करें',
            te: 'PM-KISAN, PMFBY, KCC, మరియు 10+ పథకాలు — అర్హతను తనిఖీ చేసి నేరుగా దరఖాస్తు చేసుకోండి',
            ta: 'PM-KISAN, PMFBY, KCC மற்றும் 10+ திட்டங்கள் — தகுதியை சரிபார்த்து நேரடியாக விண்ணப்பிக்கவும்',
            mr: 'पी एम किसान (PM-KISAN), प्रधानमंत्री पीक विमा योजना (PMFBY), केसीसी (KCC) आणि १०+ योजना — पात्रता तपासा आणि थेट अर्ज करा',
            bn: 'পিএম কিষান, পিএমএফবিওয়াই, কেসিসি এবং ১০+ প্রকল্প — যোগ্যতা যাচাই করুন এবং সরাসরি আবেদন করুন',
            kn: 'ಪಿಎಂ-ಕಿಸಾನ್, ಪಿಎಂಎಫ್‌ಬಿವೈ, ಕೆಸಿಸಿ ಮತ್ತು 10+ ಯೋಜನೆಗಳು — ಅರ್ಹತೆಯನ್ನು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ನೇರವಾಗಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ',
            gu: 'પીએમ-કિસાન, પીએમએફબીવાય, કેસીસી અને ૧૦+ યોજનાઓ — પાત્રતા તપાસો અને સીધી અરજી કરો'
        },
        'feature.market.title': { en: 'Direct Market Access', hi: 'सीधा बाज़ार पहुँच', te: 'ప్రత్యక్ష మార్కెట్ యాక్సెస్', ta: 'நேரடி சந்தை அணுகல்', mr: 'थेट बाजार प्रवेश', bn: 'সরাসরি বাজার অ্যাক্সেস', kn: 'ನೇರ ಮಾರುಕಟ್ಟೆ ಪ್ರವೇಶ', gu: 'સીધો બજાર પ્રવેશ' },
        'feature.market.desc': {
            en: 'Connect with verified buyers — sell at best prices without middlemen',
            hi: 'सत्यापित खरीदारों से जुड़ें — बिचौलियों के बिना सर्वोत्तम मूल्य पर बेचें',
            te: 'ధృవీకరించబడిన కొనుగోలుదారులతో కనెక్ట్ అవ్వండి — మధ్యవర్తులు లేకుండా మంచి ధరకు అమ్మండి',
            ta: 'சரிபார்க்கப்பட்ட வாங்குபவர்களுடன் இணைக்கவும் — இடைத்தரகர்கள் இல்லாமல் சிறந்த விலையில் விற்கவும்',
            mr: 'सत्यापित खरेदीदारांशी संपर्क साधा — मध्यस्थांशिवाय उत्तम दरात विक्री करा',
            bn: 'যাচাই করা ক্রেতাদের সাথে সংযুক্ত হন — মধ্যস্থতাকারী ছাড়াই সেরা দামে বিক্রি করুন',
            kn: 'ಪರಿಶೀಲಿಸಿದ ಖರೀದಿದಾರರೊಂದಿಗೆ ಸಂಪರ್ಕ ಸಾಧಿಸಿ — ಮಧ್ಯವರ್ತಿಗಳಿಲ್ಲದೆ ಉತ್ತಮ ಬೆಲೆಗೆ ಮಾರಾಟ ಮಾಡಿ',
            gu: 'વેરિફાય થયેલા ખરીદદારો સાથે જોડાવો — મધ્યસ્થીઓ વિના શ્રેષ્ઠ ભાવે વેચો'
        },
        'feature.offline.title': { en: 'Works Offline', hi: 'ऑफ़लाइन काम करता है', te: 'ఆఫ్‌లైన్‌లో పనిచేస్తుంది', ta: 'ஆஃப்லைனில் வேலை செய்யும்', mr: 'ऑफलाइन काम करते', bn: 'অফলাইনে কাজ করে', kn: 'ಆಫ್‌ಲೈನ್‌ನಲ್ಲಿ ಕೆಲಸ ಮಾಡುತ್ತದೆ', gu: 'ઑફલાઇન કામ કરે છે' },
        'feature.offline.desc': {
            en: 'Key data cached locally — access MSP rates and scheme info without internet',
            hi: 'मुख्य डेटा स्थानीय रूप से कैश — बिना इंटरनेट के एमएसपी दरें और योजना जानकारी देखें',
            te: 'కీలక డేటా లోకల్లీ భద్రపరచబడింది — ఇంటర్నెట్ లేకుండా ఎంఎస్పీ రేట్లు చూడండి',
            ta: 'முக்கிய தரவுகள் உள்ளூரில் சேமிக்கப்பட்டுள்ளன — இணையம் இல்லாமல் எம்எஸ்பி விகிதங்களை சரிபார்த்துக் கொள்ளுங்கள்',
            mr: 'मुख्य डेटा ऑफलाइन जतन केलेला — इंटरनेटशिवाय एमएसपी दर तपासा',
            bn: 'মূল ডেটা স্থানীয়ভাবে ক্যাশে করা হয়েছে — ইন্টারনেট ছাড়াই এমএসপি রেট অ্যাক্সেস করুন',
            kn: 'ಪ್ರಮುಖ ಡೇಟಾವನ್ನು ಸ್ಥಳೀಯವಾಗಿ ಉಳಿಸಲಾಗಿದೆ — ಇಂಟರ್ನೆಟ್ ಇಲ್ಲದೆ ಎಂಎಸ್‌ಪಿ ದರಗಳನ್ನು ಪಡೆಯಿರಿ',
            gu: 'મુખ્ય ડેટા સ્થાનિક રૂપે સાચવેલો છે — ઇન્ટરનેટ વિના એમએસપી દરો તપાસો'
        },

        // MSP Section
        'msp.tagline': { en: '💰 MSP Reference 2024-25', hi: '💰 एमएसपी संदर्भ 2024-25', te: '💰 ఎంఎస్పీ రిఫరెన్స్ 2024-25', ta: '💰 எம்எஸ்பி குறிப்பு 2024-25', mr: '💰 एमएसपी संदर्भ 2024-25', bn: '💰 এমএসপি রেফারেন্স ২০২৪-২৫', kn: '💰 ಎಂಎಸ್‌ಪಿ ಉಲ್ಲೇಖ 2024-25', gu: '💰 એમએસપી સંદર્ભ 2024-25' },
        'msp.title': { en: 'Minimum Support Prices — Government of India', hi: 'न्यूनतम समर्थन मूल्य — भारत सरकार', te: 'కనీస మద్దతు ధరలు — భారత ప్రభుత్వం', ta: 'குறைந்தபட்ச ஆதரவு விலைகள் — இந்திய அரசு', mr: 'किमान आधारभूत किंमत — भारत सरकार', bn: 'ন্যূনতম সমৰ্থন মূল্য — ভারত সরকার', kn: 'ಕನಿಷ್ಠ ಬೆಂಬಲ ಬೆಲೆಗಳು — ಭಾರತ ಸರ್ಕಾರ', gu: 'લઘુત્તમ ટેકાના ભાવો - ભારત સરકાર' },
        'msp.subtitle': {
            en: 'Official MSP rates approved by Cabinet Committee on Economic Affairs (CCEA) for 23 crops',
            hi: 'आर्थिक मामलों की कैबिनेट समिति (CCEA) द्वारा 23 फसलों के लिए अनुमोदित आधिकारिक एमएसपी दरें',
            te: 'ఆర్థిక వ్యవహారాల క్యాబినెట్ కమిటీ ఆమోదించిన అధికారిక ఎంఎస్పీ రేట్లు',
            ta: 'பொருளாதார விவகாரங்களுக்கான அமைச்சரவைக் குழுவால் அங்கீகரிக்கப்பட்ட அதிகாரப்பூர்வ எம்எஸ்பி விகிதங்கள்',
            mr: 'आर्थिक घडामोडींच्या मंत्रिमंडळ समितीने २३ पिकांसाठी मंजूर केलेले अधिकृत एमएसपी दर',
            bn: 'অর্থনৈতিক বিষয়ক মন্ত্রিসভা কমিটি দ্বারা ২৩টি ফসলের জন্য অনুমোদিত সরকারি এমএসপি রেট',
            kn: 'ಆರ್ಥಿಕ ವ್ಯವಹಾರಗಳ ಕ್ಯಾಬಿನೆಟ್ ಸಮಿತಿಯು ಅನುಮೋದಿಸಿದ ಅಧಿಕೃತ ಎಂಎಸ್‌ಪಿ ದರಗಳು',
            gu: 'આર્થિક બાબતોની કેબિનેટ સમિતિ દ્વારા ૨૩ પાકો માટે માન્ય કરાયેલ સત્તાવાર એમએસપી દર'
        },

        // Table Headers
        'th.commodity': { en: 'Commodity', hi: 'कमोडिटी', te: 'సరుకు', ta: 'பொருள்', mr: 'वस्तू', bn: 'পণ্য', kn: 'ಸರಕು', gu: 'કોમોડિટી' },
        'th.season': { en: 'Season / Year', hi: 'मौसम / वर्ष', te: 'సీజన్ / సంవత్సరం', ta: 'பருவம் / ஆண்டு', mr: 'हंगाम / वर्ष', bn: 'মৌসুম / বছর', kn: 'ಋತು / ವರ್ಷ', gu: 'સીઝન / વર્ષ' },
        'th.msp': { en: 'MSP (₹/Qt)', hi: 'एमएसपी (₹/क्विंटल)', te: 'ఎంఎస్పీ (₹/క్వింటాల్)', ta: 'எம்எஸ்பி (₹/குயின்டால்)', mr: 'एमएसपी (₹/क्विंटल)', bn: 'এমএসপি (₹/কুইন্টাল)', kn: 'ಎಂಎಸ್‌ಪಿ (₹/ಕ್ವಿಂಟಾಲ್)', gu: 'એમએસપી (₹/ક્વિન્ટલ)' },
        'th.cost': { en: 'Cost A2+FL', hi: 'लागत A2+FL', te: 'ఖర్చు A2+FL', ta: 'செலவு A2+FL', mr: 'खर्च A2+FL', bn: 'খরচ A2+FL', kn: 'ವೆಚ್ಚ A2+FL', gu: 'ખર્ચ A2+FL' },
        'th.margin': { en: 'MSP over Cost', hi: 'लागत पर एमएसपी', te: 'ఖర్చుపై ఎంఎస్పీ', ta: 'செலவின் மீதான எம்எஸ்பி', mr: 'खर्चापेक्षा एमएसपी', bn: 'খরচের উপর এমএসপি', kn: 'ವೆಚ್ಚದ ಮೇಲಿನ ಎಂಎಸ್‌ಪಿ', gu: 'ખર્ચ પર એમએસપી' },
        'th.action': { en: 'Action', hi: 'कार्रवाई', te: 'చర్య', ta: 'செயல்முறை', mr: 'कृती', bn: 'পদক্ষেপ', kn: 'ಕ್ರಿಯೆ', gu: 'કાર્યવાહી' },

        // ── Dashboard ──
        'dash.title': { en: 'Agricultural Commodity Dashboard', hi: 'कृषि कमोडिटी डैशबोर्ड', te: 'వ్యవసాయ సరుకు డాష్‌బోర్డ్', ta: 'விவசாயப் பொருள் கட்டுப்பாட்டு அறை', mr: 'कृषी कमोडिटी डॅशबोर्ड', bn: 'কৃষি পণ্য ড্যাশবোর্ড', kn: 'ಕೃಷಿ ಸರಕು ಡ್ಯಾಶ್‌ಬೋರ್ಡ್', gu: 'કૃષિ કોમોડિટી ડેશબોર્ડ' },
        'dash.subtitle': { en: 'Real-time mandi prices, weather, and market intelligence', hi: 'वास्तविक समय मंडी भाव, मौसम और बाज़ार जानकारी', te: 'రియల్ టైమ్ మండి ధరలు, వాతావరణం', ta: 'நிகழ்நேர மண்டி விலைகள், வானிலை', mr: 'रिअल-टाइम मंडी भाव, हवामान आणि बाजार माहिती', bn: 'রিয়েল-টাইম মান্ডি দর, আবহাওয়া', kn: 'ನೈಜ ಸಮಯದ ಮಂಡಿ ಬೆಲೆಗಳು, ಹವಾಮಾನ', gu: 'વાસ્તવિક સમયના મંડી ભાવો, હવામાન' },
        'dash.state': { en: '📍 State:', hi: '📍 राज्य:', te: '📍 రాష్ట్రం:', ta: '📍 மாநிலம்:', mr: '📍 राज्य:', bn: '📍 রাজ্য:', kn: '📍 ರಾಜ್ಯ:', gu: '📍 રાજ્ય:' },
        'dash.commodity': { en: '🌾 Commodity:', hi: '🌾 कमोडिटी:', te: '🌾 సరుకు:', ta: '🌾 பொருள்:', mr: '🌾 वस्तू:', bn: '🌾 পণ্য:', kn: '🌾 ಸರಕು:', gu: '🌾 કોમોડિટી:' },
        'dash.category': { en: '📂 Category:', hi: '📂 श्रेणी:', te: '📂 వర్గం:', ta: '📂 வகை:', mr: '📂 श्रेणी:', bn: '📂 বিভাগ:', kn: '📂 ವರ್ಗ:', gu: '📂 શ્રેણી:' },
        'dash.search': { en: '🔍 Search', hi: '🔍 खोजें', te: '🔍 వెతుకు', ta: '🔍 தேடல்', mr: '🔍 शोधा', bn: '🔍 অনুসন্ধান', kn: '🔍 ಹುಡುಕು', gu: '🔍 શોધો' },
        'dash.reset': { en: '↻ Reset', hi: '↻ रीसेट', te: '↻ రీసెట్', ta: '↻ மீட்டமை', mr: '↻ रीसेट', bn: '↻ রিসেট', kn: '↻ ಮರುಹೊಂದಿಸಿ', gu: '↻ રીસેટ' },
        'dash.mandi.title': { en: '🏪 Mandi-wise Price Comparison', hi: '🏪 मंडी-वार मूल्य तुलना', te: '🏪 మండి వారీ ధరల పోలిక', ta: '🏪 மண்டி வாரியான விலை ஒப்பீடு', mr: '🏪 मंडी नुसार किंमत तुलना', bn: '🏪 বাজার অনুসারে দাম তুলনা', kn: '🏪 ಮಂಡಿವಾರು ಬೆಲೆ ಹೋಲಿಕೆ', gu: '🏪 મંડી મુજબ ભાવોની તુલના' },
        'dash.weather': { en: '🌤️ Weather Today', hi: '🌤️ आज का मौसम', te: '🌤️ ఈరోజు వాతావరణం', ta: '🌤️ இன்று வானிலை', mr: '🌤️ आजचे हवामान', bn: '🌤️ আজকের আবহাওয়া', kn: '🌤️ ಇಂದಿನ ಹವಾಮಾನ', gu: '🌤️ આજનું હવામાન' },
        'dash.advisory': { en: '🌾 Crop Advisory', hi: '🌾 फसल सलाह', te: '🌾 పంట సలహా', ta: '🌾 பயிர் ஆலோசனை', mr: '🌾 पीक सल्ला', bn: '🌾 ফসল পরামর্শ', kn: '🌾 ಬೆಳೆ ಸಲಹೆ', gu: '🌾 પાક સલાહ' },
        'dash.topMSP': { en: '📈 Highest MSP Crops', hi: '📈 सर्वोच्च एमएसपी फसलें', te: '📈 అత్యుత్తమ ఎంఎస్పీ పంటలు', ta: '📈 உயர்ந்த எம்எஸ்பி பயிர்கள்', mr: '📈 सर्वाधिक एमएसपी पिके', bn: '📈 সর্বোচ্চ এমএসপি ফসল', kn: '📈 ಉನ್ನತ ಎಂಎಸ್‌ಪಿ ಬೆಳೆಗಳು', gu: '📈 સર્વોચ્ચ એમએસપી પાકો' },
        'dash.mspRef': { en: '💰 MSP Quick Reference', hi: '💰 एमएसपी त्वरित संदर्भ', te: '💰 ఎంఎస్పీ త్వరిత రిఫరెన్స్', ta: '💰 எம்எஸ்பி விரைவு குறிப்பு', mr: '💰 एमएसपी त्वरित संदर्भ', bn: '💰 এমএসপি দ্রুত রেফারেন্স', kn: '💰 ಎಂಎಸ್‌ಪಿ ತ್ವರಿತ ಉಲ್ಲೇಖ', gu: '💰 એમએસપી ઝડપી સંદર્ભ' },
        'dash.helpline': { en: 'Kisan Helpline', hi: 'किसान हेल्पलाइन', te: 'కిసాన్ హెల్ప్‌లైన్', ta: 'கிசான் ஹெல்ப்லைன்', mr: 'किसान हेल्पलाइन', bn: 'কিসান হেল্পলাইন', kn: 'ಕಿಸಾನ್ ಸಹಾಯವಾಣಿ', gu: 'કિસાન હેલ્પલાઇન' },
        'dash.selectState': { en: 'All States', hi: 'सभी राज्य', te: 'అన్ని రాష్ట్రాలు', ta: 'அனைத்து மாநிலங்கள்', mr: 'सर्व राज्ये', bn: 'সমস্ত রাজ্য', kn: 'ಎಲ್ಲಾ ರಾಜ್ಯಗಳು', gu: 'તમામ રાજ્યો' },
        'dash.selectCommodity': { en: 'Select Commodity', hi: 'कमोडिटी चुनें', te: 'సరుకు ఎంచుకోండి', ta: 'பொருள் தேர்ந்தெடுக்கவும்', mr: 'वस्तू निवडा', bn: 'পণ্য নির্বাচন করুন', kn: 'ಸರಕು ಆಯ್ಕೆ ಮಾಡಿ', gu: 'કોમોડિટી પસંદ કરો' },
        'dash.allCategories': { en: 'All Categories', hi: 'सभी श्रेणियां', te: 'అన్ని వర్గాలు', ta: 'அனைத்து பிரிவுகள்', mr: 'सर्व श्रेणी', bn: 'সমস্ত বিভাগ', kn: 'ಎಲ್ಲಾ ವರ್ಗಗಳು', gu: 'બધી શ્રેણીઓ' },
        'dash.voiceSearch': { en: 'Voice Search', hi: 'आवाज़ से खोजें', te: 'వాయిస్ సెర్చ్', ta: 'குரல் தேடல்', mr: 'आवाजने शोधा', bn: 'ভয়েস অনুসন্ধান', kn: 'ಧ್ವನಿ ಹುಡುಕಾಟ', gu: 'વૉઇસ શોધ' },

        // ── Schemes ──
        'schemes.title': { en: 'Government Schemes for Farmers', hi: 'किसानों के लिए सरकारी योजनाएं', te: 'రైతుల కోసం ప్రభుత్వ పథకాలు', ta: 'விவசாயிகளுக்கான அரசு திட்டங்கள்', mr: 'शेतकऱ्यांसाठी सरकारी योजना', bn: 'কৃষকদের জন্য সরকারি প্রকল্প', kn: 'ರೈತರಿಗಾಗಿ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು', gu: 'ખેડૂતો માટે સરકારી યોજનાઓ' },
        'schemes.subtitle': { en: 'Complete information on all central schemes', hi: 'सभी केंद्रीय योजनाओं की पूरी जानकारी', te: 'అన్ని కేంద్ర పథకాలకు సంబంధించిన పూర్తి సమాచారం', ta: 'அனைத்து மத்திய திட்டங்கள் குறித்த முழுத் தகவல்கள்', mr: 'सर्व केंद्रीय योजनांची संपूर्ण माहिती', bn: 'সমস্ত কেন্দ্রীয় প্রকল্পের সম্পূর্ণ তথ্য', kn: 'ಎಲ್ಲಾ ಕೇಂದ್ರ ಯೋಜನೆಗಳ ಬಗ್ಗೆ ಸಂಪೂರ್ಣ ಮಾಹಿತಿ', gu: 'બધી કેન્દ્રીય યોજનાઓની સંપૂર્ણ માહિતી' },
        'schemes.eligibility': { en: 'Check Your Eligibility', hi: 'अपनी पात्रता जांचें', te: 'మీ అర్హతను తనిఖీ చేయండి', ta: 'உங்கள் தகுதியை சரிபார்த்துக் கொள்ளுங்கள்', mr: 'तुमची वयोमर्यादा व पात्रता तपासा', bn: 'আপনার যোগ্যতা যাচাই করুন', kn: 'ನಿಮ್ಮ ಅರ್ಹತೆಯನ್ನು ಪರಿಶೀಲಿಸಿ', gu: 'તમારી પાત્રતા તપાસો' },

        // ── Market ──
        'market.title': { en: 'Agricultural Market Connect', hi: 'कृषि बाज़ार कनेक्ट', te: 'వ్యవసాయ మార్కెట్ కనెక్ట్', ta: 'விவசாய சந்தை இணைப்பு', mr: 'कृषी बाजार कनेक्ट', bn: 'কৃষি বাজার সংযোগ', kn: 'ಕೃಷಿ ಮಾರುಕಟ್ಟೆ ಸಂಪರ್ಕ', gu: 'કૃષિ બજાર જોડાણ' },
        'market.subtitle': { en: 'Direct buyer-seller marketplace for agricultural produce', hi: 'कृषि उपज के लिए सीधा खरीदार-विक्रेता बाज़ार', te: 'వ్యవసాయ ఉత్పత్తుల కోసం ప్రత్యక్ష కొనుగోలుదారు-విక్రేత మార్కెట్ ప్లేస్', ta: 'விவசாயப் பொருட்களுக்கான நேரடி வாங்குபவர்-விற்பனையாளர் சந்தை', mr: 'कृषी उत्पादनांसाठी थेट खरेदीदार-विक्रेता बाजारपीठ', bn: 'কৃষি পণ্যের জন্য সরাসরি ক্রেতা-বিক্রেতা বাজার', kn: 'ಕೃಷಿ ಉತ್ಪನ್ನಗಳಿಗೆ ನೇರ ಕೊಳ್ಳುವ-ಮಾರುವ ಮಾರುಕಟ್ಟೆ', gu: 'કૃષિ પેદાશો માટે સીધું ખરીદનાર-વેચનાર બજાર' },
        'market.tab.buy': { en: '🛒 Buy', hi: '🛒 खरीदें', te: '🛒 కొనండి', ta: '🛒 வாங்கு', mr: '🛒 खरेदी करा', bn: '🛒 কিনুন', kn: '🛒 ಖರೀದಿಸಿ', gu: '🛒 ખરીદો' },
        'market.tab.sell': { en: '📦 Sell', hi: '📦 बेचें', te: '📦 అమ్మండి', ta: '📦 விற்க', mr: '📦 विक्री करा', bn: '📦 বিক্রি করুন', kn: '📦 ಮಾರಿ', gu: '📦 વેચો' },
        'market.tab.contracts': { en: '📋 Contracts', hi: '📋 अनुबंध', te: '📋 ఒప్పందాలు', ta: '📋 ஒப்பந்தங்கள்', mr: '📋 करार', bn: '📋 চুক্তি', kn: '📋 ಒಪ್ಪಂದಗಳು', gu: '📋 કરાર' },

        // ── Common ──
        'common.viewPrices': { en: 'View Prices →', hi: 'भाव देखें →', te: 'ధరలను చూడండి →', ta: 'விலைகளை காண்க →', mr: 'दर पहा →', bn: 'দাম দেখুন →', kn: 'ಬೆಲೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ →', gu: 'ભાવો જુઓ →' },
        'common.visitPortal': { en: 'Visit Official Portal →', hi: 'आधिकारिक पोर्टल देखें →', te: 'అధికారిక పోర్టల్‌ను సందర్శించండి →', ta: 'அதிகாரப்பூர்வ வலைதளத்தை பார்வையிடுக →', mr: 'अधिकृत पोर्टलला भेट द्या →', bn: 'অফিসিয়াল পোর্টাল পরিদর্শন করুন →', kn: 'ಅಧಿಕೃತ ಪೋರ್ಟಲ್‌ಗೆ ಭೇಟಿ ನೀಡಿ →', gu: 'સત્તાવાર પોર્ટલની મુલાકાત લો →' },
        'common.contact': { en: '📞 Contact', hi: '📞 संपर्क', te: '📞 సంప్రదించండి', ta: '📞 தொடர்பு கொள்ள', mr: '📞 संपर्क', bn: '📞 যোগাযোগ', kn: '📞 ಸಂಪರ್ಕ', gu: '📞 સંપર્ક' },
        'common.share': { en: 'Share', hi: 'शेयर करें', te: 'షేర్ చేయండి', ta: 'பகிர', mr: 'शेअर करा', bn: 'শেয়ার করুন', kn: 'ಶೇರ್ ಮಾಡಿ', gu: 'શેર કરો' },
        'common.loading': { en: 'Loading data...', hi: 'डेटा लोड हो रहा है...', te: 'డేటా లోడ్ అవుతోంది...', ta: 'தரவு ஏற்றப்படுகிறது...', mr: 'डेटा लोड होत आहे...', bn: 'ডেটা লোড হচ্ছে...', kn: 'ಡೇಟಾ ಲೋಡ್ ಆಗುತ್ತಿದೆ...', gu: 'માહિતી લોડ થઈ રહી છે...' },
        'common.error': { en: 'Something went wrong', hi: 'कुछ गलत हो गया', te: 'ఏదో తప్పు జరిగింది', ta: 'ஏதோ பிழை ஏற்பட்டுள்ளது', mr: 'काहीतरी चूक झाली', bn: 'কিছু একটা ভুল হয়েছে', kn: 'ಏನೋ ತಪ್ಪಾಗಿದೆ', gu: 'કંઈક ખોટું થયું' },
        'common.retry': { en: '🔄 Retry', hi: '🔄 पुनः प्रयास', te: '🔄 మళ్ళీ ప్రయత్నించండి', ta: '🔄 மீண்டும் முயற்சிக்கவும்', mr: '🔄 पुन्हा प्रयत्न करा', bn: '🔄 পুনরায় চেষ্টা করুন', kn: '🔄 ಮರುಪ್ರಯತ್ನಿಸಿ', gu: '🔄 પુનઃપ્રયાસ કરો' },
        'common.offline': { en: 'You are offline', hi: 'आप ऑफ़लाइन हैं', te: 'మీరు ఆఫ్‌లైన్‌లో ఉన్నారు', ta: 'நீங்கள் ஆஃப்லைனில் இருக்கிறீர்கள்', mr: 'तुम्ही ऑफलाइन आहात', bn: 'আপনি অফলাইনে আছেন', kn: 'ನೀವು ಆಫ್‌ಲೈನ್‌ನಲ್ಲಿದ್ದೀರಿ', gu: 'તમે ઑફલાઇન છો' },
        'common.viewDashboard': { en: 'View Complete Dashboard →', hi: 'पूरा डैशबोर्ड देखें →', te: 'పూర్తి డాష్‌బోర్డ్ చూడండి →', ta: 'முழு கட்டுப்பாட்டு அறையை காண்க →', mr: 'संपूर्ण डॅशबोर्ड पहा →', bn: 'সম্পূর্ণ ড্যাশবোর্ড দেখুন →', kn: 'ಸಂಪೂರ್ಣ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ವೀಕ್ಷಿಸಿ →', gu: 'સંપૂર્ણ ડેશબોર્ડ જુઓ →' },
        'common.livePrices': {
            en: 'Data Source: data.gov.in — Ministry of Agriculture & Farmers Welfare',
            hi: 'डेटा स्रोत: data.gov.in — कृषि एवं किसान कल्याण मंत्रालय',
            te: 'డేటా మూలం: data.gov.in — వ్యవసాయ & రైతు సంక్షేమ మంత్రిత్వ శాఖ',
            ta: 'தரவு மூலங்கள்: data.gov.in — விவசாயம் & உழவர் நல அமைச்சகம்',
            mr: 'डेटा स्त्रोत: data.gov.in — कृषी आणि शेतकरी कल्याण मंत्रालय',
            bn: 'ডেটা সূত্র: data.gov.in — কৃষি ও কৃষক কল্যাণ মন্ত্রক',
            kn: 'ಡೇಟಾ ಮೂಲ: data.gov.in — ಕೃಷಿ ಮತ್ತು ರೈತ ಕಲ್ಯಾಣ ಸಚಿವಾಲಯ',
            gu: 'ડેટા સ્રોત: data.gov.in - કૃષિ અને ખેડૂત કલ્યાણ મંત્રાલય'
        },

        // ── Footer ──
        'footer.disclaimer': {
            en: 'KisanMitra is not affiliated with the Government of India. This platform aggregates publicly available data from data.gov.in for informational purposes.',
            hi: 'KisanMitra भारत सरकार से संबद्ध नहीं है। यह मंच सूचनात्मक उद्देश्यों के लिए data.gov.in से सार्वजनिक रूप से उपलब्ध डेटा एकत्र करता है।',
            te: 'కిసాన్ మిత్ర భారత ప్రభుత్వంతో అనుబంధించబడలేదు. ఇది కేవలం సమాచారం కోసం.',
            ta: 'கிசான் மித்ரா இந்திய அரசுடன் இணைக்கப்படவில்லை. இது தகவலுக்காக மட்டுமே.',
            mr: 'किसान मित्र भारत सरकारशी संलग्न नाही. हे केवळ माहितीच्या उद्देशाने आहे.',
            bn: 'কিসান মিত্র ভারত সরকারের সাথে যুক্ত নয়। এটি শুধুমাত্র তথ্যের উদ্দেশ্যে।',
            kn: 'ಕಿಸಾನ್ ಮಿತ್ರ ಭಾರತ ಸರ್ಕಾರದೊಂದಿಗೆ ಸಂಯೋಜಿತವಾಗಿಲ್ಲ. ಇದು ಮಾಹಿತಿಗಾಗಿ ಮಾತ್ರ.',
            gu: 'કિસાન મિત્ર ભારત સરકાર સાથે જોડાયેલ નથી. તે માત્ર માહિતીના હેતુ માટે છે.'
        },
        'footer.madeIn': { en: 'Made in India 🇮🇳', hi: 'भारत में निर्मित 🇮🇳', te: 'మేడ్ ఇన్ ఇండియా 🇮🇳', ta: 'இந்தியாவில் தயாரிக்கப்பட்டது 🇮🇳', mr: 'मेड इन इंडिया 🇮🇳', bn: 'ভারতে তৈরি 🇮🇳', kn: 'ಭಾರತದಲ್ಲಿ ತಯಾರಿಸಲಾಗಿದೆ 🇮🇳', gu: 'મેડ ઇન ઇન્ડિયા 🇮🇳' },

        // ── New Feature Translations (Round 2) ──
        'dash.district': { en: 'All Districts', hi: 'सभी जिले', te: 'అన్ని జిల్లాలు', ta: 'அனைத்து மாவட்டங்கள்', mr: 'सर्व जिल्हे', bn: 'সব জেলা', kn: 'ಎಲ್ಲಾ ಜಿಲ್ಲೆಗಳು', gu: 'બધા જિલ્લાઓ' },
        'dash.exportCsv': { en: '📥 Export CSV', hi: '📥 CSV डाउनलोड', te: '📥 డౌన్‌లోడ్ CSV', ta: '📥 பதிவிறக்க CSV', mr: '📥 CSV डाउनलोड', bn: '📥 ডাউনলোড CSV', kn: '📥 ಡೌನ್‌ಲೋಡ್ CSV', gu: '📥 ડાઉનલોડ CSV' },
        'dash.csvSuccess': { en: '📥 CSV downloaded successfully', hi: '📥 CSV सफलतापूर्वक डाउनलोड हुई', te: '📥 దిగుమతి విజయవంతమైంది', ta: '📥 வெற்றிகரமாக பதிவிறக்கப்பட்டது', mr: '📥 डाउनलोड यशस्वी', bn: '📥 সফলভাবে ডাউনলোড হয়েছে', kn: '📥 ಯಶಸ್ವಿಯಾಗಿ ಡೌನ್‌ಲೋಡ್ ಆಗಿದೆ', gu: '📥 સફળતાપૂર્વક ડાઉનલોડ કર્યું' },
        'dash.searchMandi': { en: 'Search Mandi...', hi: 'मंडी खोजें...', te: 'మండీని వెతకండి...', ta: 'மண்டியைத் தேடு...', mr: 'मंडी शोधा...', bn: 'মান্ডি খুঁজুন...', kn: 'ಮಂಡಿಯ ಹುಡುಕಾಟ...', gu: 'મંડી શોધો...' },
        'dash.trendPlaceholder': { en: 'Search for a commodity to view price trend', hi: 'मूल्य प्रवृत्ति देखने के लिए कमोडिटी खोजें', te: 'ధరల ట్రెండ్‌ను చూడటానికి వస్తువును వెతకండి', ta: 'விலைப் போக்கைக் காண பொருளைத் தேடவும்', mr: 'किंमत कल पाहण्यासाठी वस्तू शोधा', bn: 'দামের প্রবণতা দেখতে পণ্য অনুসন্ধান করুন', kn: 'ಬೆಲೆಯ ಪ್ರವೃತ್ತಿಯನ್ನು ನೋಡಲು ಸರಕು ಹುಡುಕಿ', gu: 'ભાવ વલણ જોવા માટે કોમોડિટી શોધો' },
        'dash.noData': { en: 'Search for a commodity first', hi: 'पहले कमोडिटी खोजें', te: 'ముందుగా సరుకును వెతుకు', ta: 'முதலில் பொருளைத் தேடவும்', mr: 'प्रथम वस्तू शोधा', bn: 'আগে পণ্য খুঁজুন', kn: 'ಮೊದಲು ಸರಕು ಹುಡುಕಿ', gu: 'પહેલા કોમોડિટી શોધો' },
        'common.shareWhatsApp': { en: 'Share via WhatsApp', hi: 'WhatsApp पर शेयर करें', te: 'వాట్సాప్ ద్వారా పంచుకోండి', ta: 'வாட்ஸாப் மூலம் பகிர்க', mr: 'व्हॉट्सॲपवर शेअर करा', bn: 'হোয়াটসঅ্যাপের মাধ্যমে শেয়ার করুন', kn: 'ವಾಟ್ಸಾಪ್ ಮೂಲಕ ಶೇರ್ ಮಾಡಿ', gu: 'વોટ્સએપ દ્વારા શેર કરો' },
        'eligibility.basedOn': { en: 'Based on', hi: 'आधार', te: 'ఆధారంగా', ta: 'அடிப்படையில்', mr: 'आधारित', bn: 'ভিত্তি করে', kn: 'ಆಧಾರದಲ್ಲಿ', gu: 'આધારિત' },
        'eligibility.visitPortal': { en: 'Visit →', hi: 'देखें →', te: 'వెళ్ళు →', ta: 'செல்ல →', mr: 'भेट द्या →', bn: 'ভিজিট করুন →', kn: 'ಭೇಟಿ ನೀಡಿ →', gu: 'મુલાકાત લો →' },
        'market.noListings': { en: 'No Listings Found', hi: 'कोई परिणाम नहीं मिला', te: 'ఫలితాలు లేవు', ta: 'முடிவுகள் இல்லை', mr: 'कोणतेही परिणाम आढळले नाहीत', bn: 'কোন ফলাফল নেই', kn: 'ಯಾವುದೇ ಫಲಿತಾಂಶಗಳಿಲ್ಲ', gu: 'કોઈ પરિણામ મળ્યા નથી' },
        'market.deliveryDate': { en: 'Delivery', hi: 'डिलीवरी', te: 'డెలివరీ', ta: 'வழங்கல்', mr: 'डिलिव्हरी', bn: 'সরবরাহ', kn: 'ವಿತರಣೆ', gu: 'ડિલિવરી' },
        'form.allRequired': { en: 'Please fill all required fields', hi: 'कृपया सभी आवश्यक फ़ील्ड भरें', te: 'దయచేసి అన్ని వివరాలు నింపండి', ta: 'அனைத்து விவரங்களையும் நிரப்பவும்', mr: 'कृपया सर्व माहिती भरा', bn: 'অনুগ্রহ করে সব তথ্য দিন', kn: 'ದಯವಿಟ್ಟು ಎಲ್ಲಾ ವಿವರಗಳನ್ನು ಭರ್ತಿಮಾಡಿ', gu: 'કૃપા કરીને બધી માહિતી ભરો' },
        'form.invalidPhone': { en: 'Please enter a valid 10-digit phone number', hi: 'कृपया सही फ़ोन नंबर दर्ज करें', te: 'దయచేసి సరైన ఫోన్ నంబర్‌ను నమోదు చేయండి', ta: 'சரியான தொலைபேசி எண்ணை உள்ளிடுக', mr: 'कृपया योग्य फोन नंबर प्रविष्ट करा', bn: 'সঠিক ফোন নম্বর দিন', kn: 'ಸರಿಯಾದ ಫೋನ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ', gu: 'કૃપા કરીને સાચો ફોન નંબર દાખલ કરો' },
        'form.success': { en: '✅ Your produce has been listed!', hi: '✅ आपकी फसल सफलतापूर्वक लिस्ट हुई!', te: '✅ మీ పంట విజయవంతంగా జాబితా చేయబడింది!', ta: '✅ உங்கள் பயிர் வெற்றிகரமாக பட்டியலிடப்பட்டது!', mr: '✅ तुमचे पीक यशस्वीरित्या सूचीबद्ध झाले आहे!', bn: '✅ আপনার ফসল সফলভাবে তালিকাভুক্ত হয়েছে!', kn: '✅ ನಿಮ್ಮ ಬೆಳೆ ಯಶಸ್ವಿಯಾಗಿ ಪಟ್ಟಿ ಮಾಡಲಾಗಿದೆ!', gu: '✅ તમારો પાક સફળતાપૂર્વક સૂચિબદ્ધ થયો છે!' },
    };

    // ════════════════════════════════════════════════════════════
    // TRANSLATION ENGINE
    // ════════════════════════════════════════════════════════════

    function t(key) {
        const entry = translations[key];
        if (!entry) return key;
        return entry[currentLang] || entry['en'] || key;
    }

    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem(STORAGE_KEY, lang);

        let localeCode = 'en-IN';
        if (lang === 'hi') localeCode = 'hi-IN';
        else if (lang === 'te') localeCode = 'te-IN';
        else if (lang === 'ta') localeCode = 'ta-IN';
        else if (lang === 'mr') localeCode = 'mr-IN';
        else if (lang === 'bn') localeCode = 'bn-IN';
        else if (lang === 'kn') localeCode = 'kn-IN';
        else if (lang === 'gu') localeCode = 'gu-IN';

        document.documentElement.lang = localeCode;

        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = t(key);
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translation;
            } else {
                el.textContent = translation;
            }
        });

        // Update all elements with data-i18n-html attribute (allows HTML)
        document.querySelectorAll('[data-i18n-html]').forEach(el => {
            const key = el.getAttribute('data-i18n-html');
            el.innerHTML = t(key);
        });

        // Update language selector dropdown if exists
        const langSelect = document.getElementById('langSelect');
        if (langSelect) {
            langSelect.value = lang;
        }

        // Dispatch event for dynamic content
        document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
    }

    function getLanguage() {
        return currentLang;
    }

    function toggleLanguage() {
        // Fallback for simple toggles
        setLanguage(currentLang === 'en' ? 'hi' : 'en');
    }

    // ════════════════════════════════════════════════════════════
    // VOICE SEARCH (Web Speech API)
    // ════════════════════════════════════════════════════════════

    let recognition = null;
    let isListening = false;

    function initVoiceSearch() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) return false;

        recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.maxAlternatives = 3;

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript.trim();
            console.log('[Voice] Transcript:', transcript);
            handleVoiceCommand(transcript);
        };

        recognition.onerror = (event) => {
            console.error('[Voice] Error:', event.error);
            isListening = false;
            updateVoiceButton(false);
        };

        recognition.onend = () => {
            isListening = false;
            updateVoiceButton(false);
        };

        return true;
    }

    function startVoiceSearch() {
        if (!recognition && !initVoiceSearch()) {
            alert(
                currentLang === 'hi' ? 'आपका ब्राउज़र वॉइस सर्च को सपोर्ट नहीं करता' :
                    currentLang === 'te' ? 'మీ బ్రౌజర్ వాయిస్ సెర్చ్‌కు మద్దతు ఇవ్వదు' :
                        currentLang === 'ta' ? 'உங்கள் உலாவி குரல் தேடலை ஆதரிக்காது' :
                            'Your browser does not support voice search'
            );
            return;
        }

        let localeCode = 'en-IN';
        if (currentLang === 'hi') localeCode = 'hi-IN';
        else if (currentLang === 'te') localeCode = 'te-IN';
        else if (currentLang === 'ta') localeCode = 'ta-IN';
        else if (currentLang === 'mr') localeCode = 'mr-IN';
        else if (currentLang === 'bn') localeCode = 'bn-IN';
        else if (currentLang === 'kn') localeCode = 'kn-IN';
        else if (currentLang === 'gu') localeCode = 'gu-IN';

        recognition.lang = localeCode;

        if (isListening) {
            recognition.stop();
            isListening = false;
            updateVoiceButton(false);
        } else {
            recognition.start();
            isListening = true;
            updateVoiceButton(true);
        }
    }

    function updateVoiceButton(listening) {
        const btn = document.getElementById('voiceSearchBtn');
        if (!btn) return;
        btn.classList.toggle('listening', listening);
        btn.textContent = listening ? '🔴' : '🎤';
        btn.title = listening
            ? (currentLang === 'en' ? 'Listening...' : 'सुन रहा है...')
            : (currentLang === 'en' ? 'Voice Search' : 'आवाज़ से खोजें');
    }

    function handleVoiceCommand(text) {
        const lower = text.toLowerCase();

        // Commodity mapping (Hindi/Other → English)
        const commodityMap = {
            'गेहूं': 'Wheat', 'गेहु': 'Wheat', 'wheat': 'Wheat',
            'धान': 'Paddy (Rice)', 'चावल': 'Paddy (Rice)', 'rice': 'Paddy (Rice)', 'paddy': 'Paddy (Rice)',
            'मक्का': 'Maize', 'maize': 'Maize', 'corn': 'Maize',
            'चना': 'Gram (Chana)', 'gram': 'Gram (Chana)', 'chana': 'Gram (Chana)',
            'सरसों': 'Mustard', 'mustard': 'Mustard',
            'अरहर': 'Arhar (Tur)', 'तूर': 'Arhar (Tur)', 'tur': 'Arhar (Tur)', 'arhar': 'Arhar (Tur)',
            'मूंग': 'Moong (Green Gram)', 'moong': 'Moong (Green Gram)',
            'उड़द': 'Urad (Black Gram)', 'urad': 'Urad (Black Gram)',
            'सोयाबीन': 'Soyabean', 'soyabean': 'Soyabean', 'soybean': 'Soyabean',
            'मूंगफली': 'Groundnut', 'groundnut': 'Groundnut', 'peanut': 'Groundnut',
            'कपास': 'Cotton', 'cotton': 'Cotton',
            'प्याज': 'Onion', 'onion': 'Onion',
            'आलू': 'Potato', 'potato': 'Potato',
            'टमाटर': 'Tomato', 'tomato': 'Tomato',
            'हल्दी': 'Turmeric', 'turmeric': 'Turmeric',
            'जीरा': 'Cumin (Jeera)', 'jeera': 'Cumin (Jeera)', 'cumin': 'Cumin (Jeera)',
            'मसूर': 'Masoor (Lentil)', 'masoor': 'Masoor (Lentil)', 'lentil': 'Masoor (Lentil)',
            'बाजरा': 'Bajra (Pearl Millet)', 'bajra': 'Bajra (Pearl Millet)',
            'रागी': 'Ragi (Finger Millet)', 'ragi': 'Ragi (Finger Millet)',
            'ज्वार': 'Jowar (Sorghum)', 'jowar': 'Jowar (Sorghum)',
            'सूरजमुखी': 'Sunflower', 'sunflower': 'Sunflower',
            'तिल': 'Sesamum (Til)', 'sesamum': 'Sesamum (Til)',
            'जूट': 'Jute', 'jute': 'Jute',
            'जौ': 'Barley', 'barley': 'Barley',
        };

        // State mapping (Hindi/Other → English)
        const stateMap = {
            'उत्तर प्रदेश': 'Uttar Pradesh', 'uttar pradesh': 'Uttar Pradesh', 'up': 'Uttar Pradesh',
            'मध्य प्रदेश': 'Madhya Pradesh', 'madhya pradesh': 'Madhya Pradesh', 'mp': 'Madhya Pradesh',
            'महाराष्ट्र': 'Maharashtra', 'maharashtra': 'Maharashtra',
            'पंजाब': 'Punjab', 'punjab': 'Punjab',
            'हरियाणा': 'Haryana', 'haryana': 'Haryana',
            'राजस्थान': 'Rajasthan', 'rajasthan': 'Rajasthan',
            'गुजरात': 'Gujarat', 'gujarat': 'Gujarat',
            'कर्नाटक': 'Karnataka', 'karnataka': 'Karnataka',
            'तमिलनाडु': 'Tamil Nadu', 'tamil nadu': 'Tamil Nadu',
            'तेलंगाना': 'Telangana', 'telangana': 'Telangana',
            'आंध्र प्रदेश': 'Andhra Pradesh', 'andhra pradesh': 'Andhra Pradesh',
            'बिहार': 'Bihar', 'bihar': 'Bihar',
            'पश्चिम बंगाल': 'West Bengal', 'west bengal': 'West Bengal',
            'ओडिशा': 'Odisha', 'odisha': 'Odisha',
            'छत्तीसगढ़': 'Chhattisgarh', 'chhattisgarh': 'Chhattisgarh',
            'केरल': 'Kerala', 'kerala': 'Kerala',
        };

        let detectedCommodity = null;
        let detectedState = null;

        // Find commodity in voice text
        for (const [keyword, value] of Object.entries(commodityMap)) {
            if (lower.includes(keyword)) {
                detectedCommodity = value;
                break;
            }
        }

        // Find state in voice text
        for (const [keyword, value] of Object.entries(stateMap)) {
            if (lower.includes(keyword)) {
                detectedState = value;
                break;
            }
        }

        // Update form fields
        const stateSelect = document.getElementById('stateSelect');
        const commoditySelect = document.getElementById('commoditySelect');

        if (detectedState && stateSelect) {
            stateSelect.value = detectedState;
            stateSelect.dispatchEvent(new Event('change'));
        }
        if (detectedCommodity && commoditySelect) {
            commoditySelect.value = detectedCommodity;
        }

        // Auto-search if commodity was detected
        if (detectedCommodity && typeof window.searchPrices === 'function') {
            // If no state selected, default to a major state
            if (!stateSelect?.value && stateSelect) {
                stateSelect.value = detectedState || 'Uttar Pradesh';
                stateSelect.dispatchEvent(new Event('change'));
            }
            window.searchPrices();
        }

        // Show feedback
        const feedback = detectedCommodity
            ? `🎤 "${text}" → ${detectedCommodity}${detectedState ? ' in ' + detectedState : ''}`
            : `🎤 "${text}" — could not identify a commodity`;

        console.log('[Voice]', feedback);
    }

    // ════════════════════════════════════════════════════════════
    // SHARE FUNCTIONS
    // ════════════════════════════════════════════════════════════

    function shareViaWhatsApp(text) {
        const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    }

    function sharePriceData(commodity, state, price) {
        let msg;
        if (currentLang === 'hi') {
            msg = `🌾 KisanMitra — मंडी भाव\n\n📊 ${commodity}\n📍 ${state}\n💰 मोडल मूल्य: ₹${price}/क्विंटल\n\n🔗 kisanmitra.in पर और देखें`;
        } else if (currentLang === 'te') {
            msg = `🌾 కిసాన్‌మిత్ర — మండి ధర\n\n📊 ${commodity}\n📍 ${state}\n💰 మోడల్ ధర: ₹${price}/క్వింటాల్\n\n🔗 kisanmitra.in లో చూడండి`;
        } else if (currentLang === 'ta') {
            msg = `🌾 கிசான்மித்ரா — மண்டி விலை\n\n📊 ${commodity}\n📍 ${state}\n💰 மோடல் விலை: ₹${price}/குவிண்டால்\n\n🔗 kisanmitra.in இல் பார்க்கவும்`;
        } else {
            msg = `🌾 KisanMitra — Mandi Price\n\n📊 ${commodity}\n📍 ${state}\n💰 Modal Price: ₹${price}/Quintal\n\nCheck more at kisanmitra.in`;
        }

        if (navigator.share) {
            navigator.share({ title: 'KisanMitra Price', text: msg }).catch(() => { });
        } else {
            shareViaWhatsApp(msg);
        }
    }

    // ════════════════════════════════════════════════════════════
    // EXPOSE GLOBALLY
    // ════════════════════════════════════════════════════════════

    window.KisanI18n = {
        t,
        setLanguage,
        getLanguage,
        toggleLanguage,
        startVoiceSearch,
        shareViaWhatsApp,
        sharePriceData,
        translations,
    };

    // Auto-apply language on load
    document.addEventListener('DOMContentLoaded', () => {
        setLanguage(currentLang);

        // Setup langSelect listener if it exists
        const langSelect = document.getElementById('langSelect');
        if (langSelect) {
            langSelect.addEventListener('change', (e) => {
                setLanguage(e.target.value);
            });
        }
    });

})();
