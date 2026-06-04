// ============================================================
// KisanMitra — Emoji → SVG icon swapper
// The sprite is fetched once and INLINED into the document, so
// <use href="#id"> uses same-document references. This works in
// every browser including iOS Safari/WebKit (external <use href=
// "file.svg#id"> does NOT load in Safari).
// ============================================================

const ICON_SPRITE_PATH = 'assets/icons/sprite.svg?v=9';

// Map of emoji (and a few text glyphs) → sprite symbol id.
// Multi-codepoint sequences (ZWJ) are matched first via length sort.
const EMOJI_TO_ICON = {
    // Multi-codepoint / ZWJ sequences
    '👨‍🌾': 'km-farmer',
    '👁️‍🗨️': 'km-eye',
    '🇮🇳': 'km-flag-in',

    // Domain
    '🌾': 'km-wheat', '💰': 'km-rupee', '📊': 'km-chart', '📈': 'km-trend',
    '🏪': 'km-store', '🏛️': 'km-temple', '🏛': 'km-temple', '🏦': 'km-bank',
    '🤝': 'km-handshake', '📦': 'km-box', '🛒': 'km-cart', '📝': 'km-edit',
    '🏢': 'km-building', '🏬': 'km-building', '🏭': 'km-factory',
    '🛡️': 'km-shield', '🛡': 'km-shield', '🚛': 'km-truck', '🧴': 'km-bottle',
    '📋': 'km-clipboard', '🆘': 'km-help', '❓': 'km-help', '💳': 'km-rupee',
    '🏗️': 'km-building', '🏗': 'km-building', '🧓': 'km-farmer', '👨': 'km-farmer',
    '🧪': 'km-flask',

    // Navigation / UI
    '→': 'km-arrow-right', '↑': 'km-arrow-up', '🔄': 'km-refresh', '↻': 'km-refresh',
    '☰': 'km-menu', '✕': 'km-close', '🔍': 'km-search', '📥': 'km-download', '📤': 'km-share',
    '📍': 'km-location', '📂': 'km-folder', '🔗': 'km-link', '🎤': 'km-mic', '⭐': 'km-star', '★': 'km-star',
    '💬': 'km-chat', '📖': 'km-book', '🗂️': 'km-archive', '🗂': 'km-archive',
    '✅': 'km-check-circle', '✓': 'km-check', '❌': 'km-x-circle',
    '⚠️': 'km-alert', '⚠': 'km-alert', 'ℹ️': 'km-info', 'ℹ': 'km-info',
    '📅': 'km-calendar', '⏰': 'km-clock', '🌐': 'km-globe', '🔑': 'km-key',
    '📭': 'km-inbox', '💡': 'km-bulb', '⚡': 'km-bolt',
    '👁️': 'km-eye', '👁': 'km-eye', '🗨️': 'km-eye', '🗨': 'km-eye',
    '❤️': 'km-heart', '❤': 'km-heart', '📞': 'km-phone', '📧': 'km-mail',
    '📱': 'km-device', '📡': 'km-wifi-off', '🔴': 'km-dot',

    // Weather
    '☀️': 'km-sun', '☀': 'km-sun',
    '🌤️': 'km-cloud-sun', '🌤': 'km-cloud-sun', '🌦️': 'km-cloud-sun', '🌦': 'km-cloud-sun', '⛅': 'km-cloud-sun',
    '☁️': 'km-cloud', '☁': 'km-cloud',
    '🌧️': 'km-rain', '🌧': 'km-rain', '⛈️': 'km-rain', '⛈': 'km-rain',
    '❄️': 'km-snow', '❄': 'km-snow', '🥶': 'km-snow',
    '🔥': 'km-fire', '🌫️': 'km-fog', '🌫': 'km-fog', '💧': 'km-droplet', '💨': 'km-wind',

    // Crops / commodities → category icons
    '🍚': 'km-wheat', '🌽': 'km-wheat',
    '🫘': 'km-legume', '🫛': 'km-legume', '🟤': 'km-legume', '⚫': 'km-legume',
    '🫙': 'km-legume', '🟢': 'km-legume',
    '🥜': 'km-seed', '🌻': 'km-seed', '🫒': 'km-seed', '🐝': 'km-seed', '🟡': 'km-seed',
    '🫚': 'km-spice', '🌶️': 'km-spice', '🌶': 'km-spice', '🏵️': 'km-spice', '🏵': 'km-spice',
    '🧅': 'km-leaf', '🥔': 'km-leaf', '🍅': 'km-leaf', '🍆': 'km-leaf',
    '🥦': 'km-leaf', '🥬': 'km-leaf', '🧄': 'km-leaf', '🌿': 'km-leaf',
    '🍌': 'km-fruit', '🥭': 'km-fruit', '🍎': 'km-fruit', '🍇': 'km-fruit',
    '🎋': 'km-cotton', '🧵': 'km-cotton', '🧶': 'km-cotton',
    '🌱': 'km-sprout',
};

const EMOJI_PATTERN = new RegExp(
    Object.keys(EMOJI_TO_ICON)
        .sort((a, b) => b.length - a.length)
        .map((emoji) => emoji.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
        .join('|'),
    'g'
);

// ── Inline the sprite once (so same-document <use> works everywhere) ──
let spritePromise = null;
function ensureSpriteInlined() {
    if (spritePromise) return spritePromise;
    if (document.getElementById('km-sprite-host')) {
        spritePromise = Promise.resolve();
        return spritePromise;
    }
    spritePromise = fetch(ICON_SPRITE_PATH)
        .then((res) => (res.ok ? res.text() : ''))
        .then((markup) => {
            if (!markup) return;
            const host = document.createElement('div');
            host.id = 'km-sprite-host';
            host.setAttribute('aria-hidden', 'true');
            host.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
            host.innerHTML = markup;
            document.body.insertBefore(host, document.body.firstChild);
        })
        .catch(() => { /* fall back to emoji if the sprite can't load */ });
    return spritePromise;
}

function createSvgIcon(iconId) {
    const span = document.createElement('span');
    span.className = 'km-icon-inline';
    span.setAttribute('aria-hidden', 'true');

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'km-icon');
    svg.setAttribute('focusable', 'false');
    svg.setAttribute('viewBox', '0 0 24 24');

    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    // Same-document reference — works in every browser including Safari.
    use.setAttribute('href', `#${iconId}`);
    use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `#${iconId}`);

    svg.appendChild(use);
    span.appendChild(svg);
    return span;
}

function replaceEmojiInTextNode(textNode) {
    const original = textNode.nodeValue;
    if (!original || !EMOJI_PATTERN.test(original)) {
        EMOJI_PATTERN.lastIndex = 0;
        return;
    }

    EMOJI_PATTERN.lastIndex = 0;
    const fragment = document.createDocumentFragment();
    let lastIndex = 0;

    original.replace(EMOJI_PATTERN, (match, offset) => {
        if (offset > lastIndex) {
            fragment.appendChild(document.createTextNode(original.slice(lastIndex, offset)));
        }
        const iconId = EMOJI_TO_ICON[match] || EMOJI_TO_ICON[match.replace(/️/g, '')] || 'km-dot';
        fragment.appendChild(createSvgIcon(iconId));
        lastIndex = offset + match.length;
        return match;
    });

    if (lastIndex < original.length) {
        fragment.appendChild(document.createTextNode(original.slice(lastIndex)));
    }

    if (textNode.parentNode) {
        textNode.parentNode.replaceChild(fragment, textNode);
    }
}

function shouldSkipNode(textNode) {
    const parent = textNode.parentElement;
    if (!parent) return true;
    const tag = parent.tagName;
    return (
        tag === 'SCRIPT' ||
        tag === 'STYLE' ||
        tag === 'CODE' ||
        tag === 'PRE' ||
        tag === 'TEXTAREA' ||
        parent.classList.contains('km-icon-inline') ||
        parent.id === 'km-sprite-host'
    );
}

function walkAndReplace(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const candidates = [];
    while (walker.nextNode()) {
        const textNode = walker.currentNode;
        if (!shouldSkipNode(textNode)) candidates.push(textNode);
    }
    candidates.forEach(replaceEmojiInTextNode);
}

export function initEmojiToSvgIcons() {
    ensureSpriteInlined().then(() => {
        walkAndReplace(document.body);

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.TEXT_NODE) {
                        if (!shouldSkipNode(node)) replaceEmojiInTextNode(node);
                        return;
                    }
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        if (node.id === 'km-sprite-host') return;
                        walkAndReplace(node);
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            characterData: true,
        });
    });
}
