const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

// --- PARTICLE SETTINGS ---
// You can tweak these to change the visual effect
const DOT_RADIUS = 1;
const DOT_COLOR = 'rgba(255, 255, 255, 0.7)';
const DOT_SPACING = 30; // The gap between dots in the grid
const ATTRACTION_RADIUS = 3000; // How close the mouse needs to be to affect dots
const ATTRACTION_FORCE = 0.005; // How strongly dots are pulled to the cursor
const RESTORING_FORCE = 0.1; // How strongly dots return to their origin
const FRICTION = 0.9; // Slows down dot movement (value between 0 and 1)
// -------------------------

let dots = [];
let mouse = {
    x: -1000,
    y: -1000,
};

// This class represents a single dot
class Dot {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.originX = x; // Its original position
        this.originY = y;
        this.vx = 0; // Velocity x
        this.vy = 0; // Velocity y
        this.radius = DOT_RADIUS;
        this.color = DOT_COLOR;
    }

    // Draws the dot on the canvas
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    // Updates the dot's position based on mouse interaction
    update() {
        // Calculate distance from mouse
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Force is stronger closer to the mouse
        const force = -ATTRACTION_RADIUS / (distance * 0.5);

        // If mouse is within the attraction radius
        if (distance < ATTRACTION_RADIUS) {
            const angle = Math.atan2(dy, dx);
            // Accelerate towards the mouse
            this.vx += force * Math.cos(angle) * ATTRACTION_FORCE;
            this.vy += force * Math.sin(angle) * ATTRACTION_FORCE;
        }

        // Apply restoring force to pull dots back to their origin
        this.vx += (this.originX - this.x) * RESTORING_FORCE;
        this.vy += (this.originY - this.y) * RESTORING_FORCE;

        // Apply friction to slow down the movement
        this.vx *= FRICTION;
        this.vy *= FRICTION;
        
        // Update position with velocity
        this.x += this.vx;
        this.y += this.vy;
    }
}

// Sets up the canvas and creates the dot grid
function init() {
    // Set canvas size to match the window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    dots = [];

    // Create a grid of dots
    for (let x = 0; x < canvas.width; x += DOT_SPACING) {
        for (let y = 0; y < canvas.height; y += DOT_SPACING) {
            dots.push(new Dot(x, y));
        }
    }
}

// The main animation loop
function animate() {
    // Request the next frame
    requestAnimationFrame(animate);
    
    // Clear the canvas for the new frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw each dot
    dots.forEach(dot => {
        dot.update();
        dot.draw();
    });
}

// --- EVENT LISTENERS ---
// Track mouse movement
window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

// When the mouse leaves the window, move the attractor away
window.addEventListener('mouseout', () => {
    mouse.x = -1000;
    mouse.y = -1000;
});

// Recalculate grid if window is resized
let resizeTimeout;
window.addEventListener('resize', () => {
    // Use a timeout to avoid calling init() too frequently during resize
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(init, 250);
});

// --- START THE ANIMATION ---
init();
animate();

// --- SPOTIFY PLAYLIST AUTOMATOR ---
// This script now automatically loads a random playlist from the list below.

const spotifyPlayer = document.getElementById('spotify-player');

// IMPORTANT: You must replace these placeholder URLs with the real "Embed" URLs for your playlists.
const myPlaylists = [
    'https://open.spotify.com/embed/playlist/3qdonEAUvLyn94B8tx68JD?utm_source=generator&theme=0',
    'https://open.spotify.com/embed/playlist/3q4LgADzfMhHol8jmCo2eV?utm_source=generator',
    'https://open.spotify.com/embed/playlist/2KLs11xdyrGkbwDuCZTgFE?utm_source=generator',
    'https://open.spotify.com/embed/playlist/2ghs7z7G68NExBSuwvxNM4?utm_source=generator'
    // Add more of your playlist embed URLs here
];

if (spotifyPlayer && myPlaylists.length > 0) {
    // Pick a random URL from the array
    const randomIndex = Math.floor(Math.random() * myPlaylists.length);
    const randomSrc = myPlaylists[randomIndex];
    
    // Set the iframe's src to the random playlist
    spotifyPlayer.src = randomSrc;
}


// --- CLICKABLE PICTURE LOGIC ---
// Add this new section at the end of your file.

// IMPORTANT: Replace these with the URLs of your actual pictures.
const myPictures = [
    'images/skull.jpg', // Second picture
    'images/firefly.jpg', 
    'images/marchseventh.webp',
    'images/yunli.jpg',
    'images/bruh.jpg',
    'images/idk.jpg',
    'images/bocchi1.jpg',
    'images/nagisa.webp'
    // You can add more image URLs here!
];

const profilePicElement = document.getElementById('profile-picture');
let currentPicIndex = 0;

profilePicElement.addEventListener('click', () => {
    // Move to the next picture in the array
    currentPicIndex = (currentPicIndex + 1) % myPictures.length;
    
    // Update the image source to the new picture
    profilePicElement.src = myPictures[currentPicIndex];
});