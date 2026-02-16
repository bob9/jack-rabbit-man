#!/usr/bin/env node
const fs = require('fs');

// Emoji pools for variety
const emojis = ['🌈', '⭐', '🎨', '🚀', '🎵', '🌸', '❄️', '🎪', '🔮', '🌙', '☀️', '🦋', '🎭', '🏆', '💫', '🎯', '🌻', '🎁', '🔥', '💎', '🎲', '🌺'];
const rabbitEmojis = ['🐰', '🐇', '🥕', '🌿', '🌱'];

// Generate a unique seed based on date
const now = new Date();
const seed = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();

// Seeded random function
function seededRandom(seed) {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

// Pick random items based on seed
function pickRandom(arr, seedVal) {
    const idx = Math.floor(seededRandom(seedVal) * arr.length);
    return arr[idx];
}

// Generate creative rabbit-themed titles
const titleTemplates = [
    "Super Speed Bunny Day",
    "Magical Rabbit Adventure",
    "Turbo Hop Festival",
    "Cosmic Bunny Journey",
    "Rainbow Rabbit Rally",
    "Amazing Rabbit Discovery",
    "Epic Bunny Hop Challenge",
    "Bunny Power Hour",
    "Spectacular Rabbit Show",
    "Wonder Rabbit Day",
    "Incredible Bunny Hop Fest",
    "Fantastic Rabbit Time",
    "Legendary Bunny Quest",
    "Awesome Rabbit Hop Party",
    "Brilliant Bunny Moment",
    "Jack Rabbit's Daily Adventure",
    "Bunny Speed Challenge",
    "Rabbit Superhero Day",
    "Fluffy Bunny Festival",
    "Hoppy Rabbit Discovery"
];

// Fun messages about rabbits
const messages = [
    "Rabbits can jump up to 3 feet high and 10 feet long in a single hop!",
    "A rabbit's teeth never stop growing - they grow about 5 inches per year!",
    "Baby rabbits are called kittens or kits, just like baby cats!",
    "Rabbits can see almost 360 degrees around them without moving their heads!",
    "When rabbits are happy, they do a fun jump-and-twist called a 'binky'!",
    "Rabbits can run at speeds up to 35 miles per hour!",
    "A group of rabbits is called a 'fluffle' - isn't that adorable?",
    "Rabbits purr when they're happy, similar to cats!",
    "Wild rabbits live in underground homes called warrens with lots of tunnels!",
    "Rabbits have 28 teeth and love to chew on things!",
    "Rabbits are crepuscular - most active at sunrise and sunset!",
    "A rabbit's ears can rotate 270 degrees to detect sounds!",
    "Rabbits can see behind themselves without turning around!",
    "Rabbits sleep with their eyes open to watch for danger!",
    "A rabbit's powerful back legs help them jump over 3 feet high!"
];

// Fun facts
const funFacts = [
    "Rabbits can't vomit, so they have to be careful about what they eat!",
    "A rabbit's nose can wiggle up to 120 times per minute!",
    "Rabbits have a 360-degree field of vision with a small blind spot in front!",
    "Wild rabbits can dig tunnels up to 10 feet deep!",
    "Rabbits are very clean animals and groom themselves like cats!",
    "A rabbit's fur is so soft because they have over 60 million hair follicles!",
    "Rabbits can live 8-12 years with proper care and love!",
    "Rabbits thump their back feet to warn other rabbits of danger!",
    "A rabbit's ears help them cool down on hot days!",
    "Rabbits have excellent memories and can remember their friends!",
    "Baby rabbits open their eyes after about 10 days!",
    "Rabbits can recognize their own names when you call them!",
    "A rabbit's heart beats about 130-325 times per minute!",
    "Rabbits love to play with toys and explore new things!",
    "Wild rabbits can have up to 7 baby bunnies in one litter!"
];

// Generate today's content
const todayEmoji = pickRandom(emojis, seed);
const todayTitle = pickRandom(titleTemplates, seed + 100);
const todayMessage = pickRandom(messages, seed + 200);
const todayFact = pickRandom(funFacts, seed + 300);

const surprise = {
    emoji: todayEmoji,
    title: todayTitle,
    message: todayMessage,
    funFact: todayFact
};

console.log(`Generated for ${now.toDateString()}:`);
console.log(`${surprise.emoji} ${surprise.title}`);

// Read the HTML template
let html = fs.readFileSync('index.html', 'utf8');

// Create the daily surprise HTML
const dailySurpriseHTML = `
        <div class="daily-surprise">
            <div class="surprise-emoji">${surprise.emoji}</div>
            <h2 class="surprise-title">${surprise.title}</h2>
            <p class="surprise-message">${surprise.message}</p>
            <div class="fun-fact">
                <span class="fact-label">🎯 Fun Fact:</span>
                <p>${surprise.funFact}</p>
            </div>
        </div>
`;

// Replace the daily surprise section
if (html.includes('<!-- DAILY_SURPRISE_START -->')) {
    html = html.replace(
        /<!-- DAILY_SURPRISE_START -->[\s\S]*?<!-- DAILY_SURPRISE_END -->/,
        `<!-- DAILY_SURPRISE_START -->${dailySurpriseHTML}        <!-- DAILY_SURPRISE_END -->`
    );
}

// Write the updated HTML
fs.writeFileSync('index.html', html, 'utf8');
console.log('✅ index.html updated with fresh daily surprise!');
