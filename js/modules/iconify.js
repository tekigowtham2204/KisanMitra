const ICON_SPRITE_PATH = 'assets/icons/sprite.svg';

const EMOJI_TO_ICON = {
    '🌾': 'km-wheat',
    '🍚': 'km-wheat',
    '🌽': 'km-wheat',
    '🫘': 'km-wheat',
    '🟤': 'km-wheat',
    '🥜': 'km-wheat',
    '🟡': 'km-wheat',
    '📊': 'km-chart',
    '🏛️': 'km-temple',
    '🏛': 'km-temple',
    '🏪': 'km-store',
    '💰': 'km-rupee',
    '🌤️': 'km-weather',
    '🌤': 'km-weather',
    '🆘': 'km-help',
    '📞': 'km-phone',
    '🇮🇳': 'km-flag-in',
    '👨‍🌾': 'km-farmer',
    '📈': 'km-trend',
    '🏦': 'km-bank',
    '🔍': 'km-search',
    '🔄': 'km-handshake',
    '📍': 'km-location',
    '🤝': 'km-handshake',
    '👁️‍🗨️': 'km-eye',
    '👁': 'km-eye',
    '❤️': 'km-heart',
    '❓': 'km-help',
    '📋': 'km-feedback',
    '📧': 'km-mail',
    '📱': 'km-install',
    '⚡': 'km-chart',
};

const EMOJI_PATTERN = new RegExp(
    Object.keys(EMOJI_TO_ICON)
        .sort((a, b) => b.length - a.length)
        .map((emoji) => emoji.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
        .join('|'),
    'g'
);

function createSvgIcon(iconId) {
    const span = document.createElement('span');
    span.className = 'km-icon-inline';
    span.setAttribute('aria-hidden', 'true');

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'km-icon');
    svg.setAttribute('focusable', 'false');

    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttribute('href', `${ICON_SPRITE_PATH}#${iconId}`);

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
        const iconId = EMOJI_TO_ICON[match] || 'km-chart';
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
        parent.classList.contains('km-icon-inline')
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
    walkAndReplace(document.body);

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.TEXT_NODE) {
                    if (!shouldSkipNode(node)) replaceEmojiInTextNode(node);
                    return;
                }
                if (node.nodeType === Node.ELEMENT_NODE) {
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
}
