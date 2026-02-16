#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Load daily surprises
const surprises = JSON.parse(fs.readFileSync('daily-surprises.json', 'utf8')).surprises;

// Pick a surprise based on day of year (so it's consistent for the day)
const now = new Date();
const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
const surpriseIndex = dayOfYear % surprises.length;
const todaysSurprise = surprises[surpriseIndex];

console.log(`Today's surprise (day ${dayOfYear}): ${todaysSurprise.title}`);

// Read the HTML template
let html = fs.readFileSync('index.html', 'utf8');

// Create the daily surprise HTML
const dailySurpriseHTML = `
        <div class="daily-surprise">
            <div class="surprise-emoji">${todaysSurprise.emoji}</div>
            <h2 class="surprise-title">${todaysSurprise.title}</h2>
            <p class="surprise-message">${todaysSurprise.message}</p>
            <div class="fun-fact">
                <span class="fact-label">🎯 Fun Fact:</span>
                <p>${todaysSurprise.funFact}</p>
            </div>
        </div>
`;

// Replace the daily surprise section or insert it if it doesn't exist
if (html.includes('<!-- DAILY_SURPRISE_START -->')) {
    // Replace existing
    html = html.replace(
        /<!-- DAILY_SURPRISE_START -->[\s\S]*?<!-- DAILY_SURPRISE_END -->/,
        `<!-- DAILY_SURPRISE_START -->${dailySurpriseHTML}        <!-- DAILY_SURPRISE_END -->`
    );
} else {
    // Insert before subtitle
    html = html.replace(
        '<p class="subtitle">',
        `<!-- DAILY_SURPRISE_START -->${dailySurpriseHTML}        <!-- DAILY_SURPRISE_END -->\n        \n        <p class="subtitle">`
    );
}

// Add CSS for daily surprise if not already present
if (!html.includes('.daily-surprise')) {
    const dailySurpriseCSS = `
        .daily-surprise {
            background: rgba(255, 255, 255, 0.15);
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-radius: 20px;
            padding: 1.5rem;
            margin-bottom: 2rem;
            backdrop-filter: blur(10px);
            animation: slideIn 0.5s ease-out;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        }
        
        .surprise-emoji {
            font-size: clamp(3rem, 10vw, 5rem);
            margin-bottom: 0.5rem;
            animation: spin 3s ease-in-out infinite;
        }
        
        .surprise-title {
            font-size: clamp(1.2rem, 5vw, 2rem);
            margin-bottom: 1rem;
            color: #ffd700;
            text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
        }
        
        .surprise-message {
            font-size: clamp(0.9rem, 3vw, 1.2rem);
            line-height: 1.6;
            margin-bottom: 1rem;
        }
        
        .fun-fact {
            background: rgba(255, 215, 0, 0.2);
            border-left: 4px solid #ffd700;
            padding: 1rem;
            border-radius: 10px;
            text-align: left;
        }
        
        .fact-label {
            font-weight: bold;
            color: #ffd700;
            display: block;
            margin-bottom: 0.5rem;
        }
        
        .fun-fact p {
            margin: 0;
            font-size: clamp(0.8rem, 2.5vw, 1rem);
        }
        
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes spin {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(-10deg); }
            75% { transform: rotate(10deg); }
        }
`;
    
    // Insert CSS before the closing </style> tag
    html = html.replace('</style>', `${dailySurpriseCSS}    </style>`);
}

// Write the updated HTML
fs.writeFileSync('index.html', html, 'utf8');
console.log('✅ index.html updated with today\'s surprise!');
