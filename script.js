// ============================================
// COINCRAFTER - BASIC INTERACTIONS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Accordion functionality
    initAccordion();
    
    // Button interactions
    initButtons();
    
    // Smooth scroll for navigation
    initSmoothScroll();
});

// ============================================
// ACCORDION
// ============================================

function initAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.closest('.accordion-item');
            const isActive = accordionItem.classList.contains('active');
            
            // Close all other accordion items
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                accordionItem.classList.add('active');
            }
        });
    });
}

// ============================================
// BUTTON INTERACTIONS
// ============================================

function initButtons() {
    // Copy buttons
    const copyButtons = {
        'btn-copy-name': 'token-name',
        'btn-copy-ticker': 'ticker',
        'btn-copy-description': 'description',
        'btn-copy-tweet': 'tweet-content',
        'btn-copy-tweet-card': 'tweet-content',
        'btn-copy-bio': 'bio-content',
        'btn-copy-hashtags': 'hashtag-content'
    };
    
    Object.entries(copyButtons).forEach(([btnId, contentId]) => {
        const btn = document.getElementById(btnId);
        if (btn) {
            btn.addEventListener('click', function() {
                copyToClipboard(contentId);
            });
        }
    });
    
    // Generate Again button
    const generateAgainBtn = document.getElementById('btn-generate-again');
    if (generateAgainBtn) {
        generateAgainBtn.addEventListener('click', function() {
            generateNewCoin();
        });
    }
    
    // Generate Coin from Hero
    const generateHeroBtn = document.getElementById('btn-generate-hero');
    if (generateHeroBtn) {
        generateHeroBtn.addEventListener('click', function() {
            const generatorSection = document.getElementById('generator');
            generatorSection.scrollIntoView({ behavior: 'smooth' });
            generateNewCoin();
        });
    }
    
    // Launch App buttons
    const launchBtns = document.querySelectorAll('.btn-launch');
    launchBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            showToast('App is launching... 🚀');
        });
    });
    
    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactSubmit();
        });
    }
}

// ============================================
// COPY TO CLIPBOARD
// ============================================

function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    let text = element.innerText || element.textContent;
    
    // Remove emojis and extra spaces for cleaner copy
    text = text.trim();
    
    navigator.clipboard.writeText(text).then(() => {
        showToast('✅ Copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy:', err);
        showToast('❌ Failed to copy');
    });
}

// ============================================
// GENERATE NEW COIN
// ============================================

const coinNames = [
    'Moon Dawg', 'Rocket Cat', 'Diamond Hands', 'Hodl Monkey',
    'Lunar Llama', 'Stellar Sloth', 'Cosmic Corgi', 'Galaxy Giraffe'
];

const tickers = [
    'MOONDAWG', 'ROCKETCAT', 'DIAMONDHANDS', 'HODLMONKEY',
    'LUNARLLAMA', 'STELLARSLOTH', 'COSMICCORGI', 'GALAXYGIRAFFE'
];

const themes = [
    'Space & Nature', 'Blockchain & Tech', 'Meme Culture', 'Crypto Community',
    'Future & Innovation', 'Gaming & NFT', 'Social Movement', 'Web3 Revolution'
];

const narratives = [
    'A playful meme coin celebrating our digital community. Let\'s reach for the stars together!',
    'Community-driven token with a focus on fun engagement and lunar energy.',
    'Join the movement where every holder is a believer in the future of crypto.',
    'This is more than a token—it\'s a lifestyle for digital natives.',
    'Building a community around shared values of innovation and inclusivity.',
    'Where fun meets finance and memes become movements.',
    'A token by the people, for the people, powered by AI.',
    'Creating the next viral moment in cryptocurrency history.'
];

const slogans = [
    'To the Moon with Our Best Friend 🚀',
    'More Than a Coin, It\'s a Movement 💎',
    'Join the Future of Meme Finance 🌟',
    'Powered by AI, Driven by Community ⚡',
    'The Next Big Thing in Crypto 🎯',
    'Memes, Dreams, and Blockchain Schemes 🌙',
    'Hodl Strong, Moon Hard, Laugh Loud 🚀',
    'Building the Web3 Tomorrow, Today ✨'
];

const emojis = [
    '🌙🐕🚀', '🎨💎✨', '🐱🚀🌟', '🦍💪🌕',
    '🦙🌙⭐', '🦥💤🌌', '🐕‍🦺🌌🎆', '🦒🌠✨'
];

function generateNewCoin() {
    const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
    
    const tokenName = random(coinNames);
    const ticker = random(tickers);
    const theme = random(themes);
    const narrative = random(narratives);
    const slogan = random(slogans);
    const emojiSet = random(emojis);
    
    // Update generator card
    updateGeneratorCard({
        tokenName,
        ticker,
        narrative,
        slogan,
        theme,
        emojiSet
    });
    
    // Generate random scores
    const memeScore = (Math.random() * 2 + 8).toFixed(1);
    const moonChance = (Math.random() * 2 + 8).toFixed(1);
    const communityVibes = (Math.random() * 2 + 8).toFixed(1);
    const launchRating = (Math.random() * 2 + 8).toFixed(1);
    
    updateMetrics({
        memeScore,
        moonChance,
        communityVibes,
        launchRating
    });
    
    showToast('🎨 New coin generated!');
}

function updateGeneratorCard(data) {
    document.getElementById('token-name').textContent = data.tokenName;
    document.getElementById('ticker').textContent = '$' + data.ticker;
    document.getElementById('narrative').textContent = data.narrative;
    document.getElementById('slogan').textContent = data.slogan;
    document.getElementById('theme').textContent = data.theme;
    document.getElementById('emoji').textContent = data.emojiSet;
    
    // Update tweet
    const tweet = `✨ Introducing ${data.tokenName} 🎨 - ${data.slogan} Join our community! $${data.ticker} #MemeLife #Web3 🚀`;
    document.getElementById('tweet-content').textContent = tweet;
    
    // Update bio
    const bio = `🚀 ${data.tokenName} Community | ${data.slogan.split(' ')[0]} | $${data.ticker} | Web3 Native`;
    document.getElementById('bio-content').textContent = bio;
}

function updateMetrics(data) {
    document.getElementById('meme-score').textContent = data.memeScore + '/10';
    document.getElementById('meme-score-bar').querySelector('.progress-fill').style.width = (data.memeScore * 10) + '%';
    
    document.getElementById('moon-chance').textContent = data.moonChance + '/10';
    document.getElementById('moon-chance-bar').querySelector('.progress-fill').style.width = (data.moonChance * 10) + '%';
    
    document.getElementById('community-vibes').textContent = data.communityVibes + '/10';
    document.getElementById('community-vibes-bar').querySelector('.progress-fill').style.width = (data.communityVibes * 10) + '%';
    
    document.getElementById('launch-rating').textContent = data.launchRating + '/10';
    document.getElementById('launch-rating-bar').querySelector('.progress-fill').style.width = (data.launchRating * 10) + '%';
}

// ============================================
// CONTACT FORM
// ============================================

function handleContactSubmit() {
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const subject = document.getElementById('contact-subject').value;
    const message = document.getElementById('contact-message').value;
    
    if (name && email && subject && message) {
        showToast('📧 Message sent successfully!');
        document.getElementById('contact-form').reset();
    }
}

// ============================================
// TOAST NOTIFICATIONS
// ============================================

function showToast(message) {
    const toastContainer = document.getElementById('toast-container');
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        background: #000;
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        margin-bottom: 10px;
        font-size: 14px;
        font-weight: 500;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    `;
    
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ============================================
// SMOOTH SCROLL
// ============================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ============================================
// ANIMATIONS
// ============================================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
