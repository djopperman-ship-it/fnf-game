const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 1200;
canvas.height = 600;

const LANE_WIDTH = canvas.width / 4;
const LANE_HEIGHT = canvas.height;
const NOTE_SIZE = 40;
const NOTE_SPEED = 4;
const HIT_ZONE_Y = LANE_HEIGHT - 100;
const HIT_ZONE_HEIGHT = 80;

let gameState = 'MENU'; // MENU, PLAYING, GAMEOVER
let score = 0;
let combo = 0;
let health = 100;
let notes = [];
let noteId = 0;
let gameTime = 0;
let spawnRate = 60; // Spawn a note every 60 frames

const keys = {};
const keyMap = {
    'ArrowLeft': 0,
    'a': 0,
    'ArrowDown': 1,
    's': 1,
    'ArrowRight': 2,
    'd': 2,
    'ArrowUp': 3,
    'w': 3
};

window.addEventListener('keydown', (e) => {
    keys[e.key.toLowerCase()] = true;
});

window.addEventListener('keyup', (e) => {
    keys[e.key.toLowerCase()] = false;
});

class Note {
    constructor(lane) {
        this.lane = lane;
        this.x = lane * LANE_WIDTH + LANE_WIDTH / 2 - NOTE_SIZE / 2;
        this.y = -NOTE_SIZE;
        this.id = noteId++;
        this.hit = false;
    }

    draw() {
        ctx.fillStyle = this.getColorForLane();
        ctx.fillRect(this.x, this.y, NOTE_SIZE, NOTE_SIZE);
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y, NOTE_SIZE, NOTE_SIZE);
    }

    update() {
        this.y += NOTE_SPEED;
    }

    getColorForLane() {
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00'];
        return colors[this.lane];
    }

    isInHitZone() {
        return this.y >= HIT_ZONE_Y - NOTE_SIZE && this.y <= HIT_ZONE_Y + HIT_ZONE_HEIGHT;
    }

    isMissed() {
        return this.y > HIT_ZONE_Y + HIT_ZONE_HEIGHT;
    }
}

function spawnNote() {
    const lane = Math.floor(Math.random() * 4);
    notes.push(new Note(lane));
}

function checkHit(lane) {
    for (let note of notes) {
        if (!note.hit && note.lane === lane && note.isInHitZone()) {
            note.hit = true;
            score += 10;
            combo += 1;
            return true;
        }
    }
    return false;
}

function handleInput() {
    for (let key in keys) {
        if (keys[key] && keyMap[key] !== undefined) {
            const lane = keyMap[key];
            if (checkHit(lane)) {
                // Note was hit
            }
            keys[key] = false; // Consume the input
        }
    }

    if (keys['escape'] || keys['escape']) {
        gameState = 'MENU';
        resetGame();
    }
}

function resetGame() {
    score = 0;
    combo = 0;
    health = 100;
    notes = [];
    gameTime = 0;
}

function updateGame() {
    gameTime++;

    // Spawn notes
    if (gameTime % spawnRate === 0) {
        spawnNote();
    }

    // Update notes
    for (let i = notes.length - 1; i >= 0; i--) {
        notes[i].update();

        // Check if note is missed
        if (notes[i].isMissed() && !notes[i].hit) {
            combo = 0;
            health -= 10;
            notes.splice(i, 1);
        }
        // Remove notes that are off screen
        else if (notes[i].y > LANE_HEIGHT) {
            notes.splice(i, 1);
        }
    }

    // Game over if health reaches 0
    if (health <= 0) {
        gameState = 'GAMEOVER';
    }
}

function drawMenu() {
    // Background
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Title
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 60px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Friday Night Funkin\'', canvas.width / 2, canvas.height / 2 - 50);

    // Subtitle
    ctx.font = '24px Arial';
    ctx.fillStyle = '#aaa';
    ctx.fillText('Press SPACE to Start', canvas.width / 2, canvas.height / 2 + 50);

    // Controls
    ctx.font = '16px Arial';
    ctx.fillStyle = '#777';
    ctx.fillText('Arrow Keys or WASD to play', canvas.width / 2, canvas.height / 2 + 100);
}

function drawGame() {
    // Draw lanes
    ctx.fillStyle = '#222';
    for (let i = 0; i < 4; i++) {
        ctx.fillRect(i * LANE_WIDTH, 0, LANE_WIDTH, LANE_HEIGHT);
        ctx.strokeStyle = '#444';
        ctx.lineWidth = 2;
        ctx.strokeRect(i * LANE_WIDTH, 0, LANE_WIDTH, LANE_HEIGHT);
    }

    // Draw hit zone
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fillRect(0, HIT_ZONE_Y, canvas.width, HIT_ZONE_HEIGHT);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, HIT_ZONE_Y, canvas.width, HIT_ZONE_HEIGHT);

    // Draw notes
    for (let note of notes) {
        note.draw();
    }

    // Draw UI
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Score: ' + score, 20, 40);
    ctx.fillText('Combo: ' + combo, 20, 80);
    ctx.fillText('Health: ' + health, 20, 120);
}

function drawGameOver() {
    // Overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Game Over text
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 60px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2 - 50);

    // Score
    ctx.font = '36px Arial';
    ctx.fillStyle = '#aaa';
    ctx.fillText('Final Score: ' + score, canvas.width / 2, canvas.height / 2 + 50);

    // Restart
    ctx.font = '24px Arial';
    ctx.fillStyle = '#777';
    ctx.fillText('Press SPACE to return to menu', canvas.width / 2, canvas.height / 2 + 120);
}

function draw() {
    // Clear canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (gameState === 'MENU') {
        drawMenu();
    } else if (gameState === 'PLAYING') {
        drawGame();
    } else if (gameState === 'GAMEOVER') {
        drawGame();
        drawGameOver();
    }
}

function update() {
    handleInput();

    if (gameState === 'MENU') {
        if (keys[' '] || keys['space']) {
            gameState = 'PLAYING';
            resetGame();
            keys[' '] = false;
            keys['space'] = false;
        }
    } else if (gameState === 'PLAYING') {
        updateGame();
    } else if (gameState === 'GAMEOVER') {
        if (keys[' '] || keys['space']) {
            gameState = 'MENU';
            keys[' '] = false;
            keys['space'] = false;
        }
    }
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
