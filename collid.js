const canvas = document.querySelector('canvas');
// Add after canvas setup
canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;



window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles(); // Reinitialize particles with new dimensions
});
const ball = canvas.getContext('2d');

let mouse = { x: 100, y: 100 };

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

function resolveCollision(particle, otherParticle) {
    const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
    const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

    const xDist = otherParticle.x - particle.x;
    const yDist = otherParticle.y - particle.y;

    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
        const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

        const m1 = particle.mass;
        const m2 = otherParticle.mass;

        const u1 = rotate(particle.velocity, angle);
        const u2 = rotate(otherParticle.velocity, angle);

        const v1 = { x: (u1.x * (m1 - m2) + 2 * m2 * u2.x) / (m1 + m2), y: u1.y };
        const v2 = { x: (u2.x * (m2 - m1) + 2 * m1 * u1.x) / (m1 + m2), y: u2.y };

        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        particle.velocity.x = vFinal1.x;
        particle.velocity.y = vFinal1.y;

        otherParticle.velocity.x = vFinal2.x;
        otherParticle.velocity.y = vFinal2.y;
    }
}

function rotate(velocity, angle) {
    return {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };
}

// Function to generate a random color
function getRandomColor() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgb(${r}, ${g}, ${b})`;
}

function Particle(x, y, radius, fill) {
    this.x = x;
    this.mass = 1;
    this.y = y;
    this.radius = radius;
    this.fill = fill;
    this.borderColor = getRandomColor(); // Assign a random color for the border
    this.velocity = {
        x: (Math.random() - 0.5) * 5,
        y: (Math.random() - 0.5) * 5
    };

    this.update = (ballArray) => {
        for (let i = 0; i < ballArray.length; i++) {
            if (this === ballArray[i]) continue;

            if (getDistance(this.x, this.y, ballArray[i].x, ballArray[i].y) - this.radius * 2 < 0) {
                resolveCollision(this, ballArray[i]);
            }
        }

        this.x += this.velocity.x;
        this.y += this.velocity.y;

        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.velocity.x = -this.velocity.x;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.velocity.y = -this.velocity.y;
        }

        this.draw();
    };

    this.draw = () => {
        ball.beginPath();
        ball.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ball.strokeStyle = this.borderColor; // Use the borderColor for the circle's border
        ball.lineWidth = 3; // Make the border more visible
        ball.stroke();
        ball.closePath();
    };
}

let ballArray = [];
const radius = 20;


for (let i = 0; i < 200; i++) {
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let y = Math.random() * (innerHeight - radius * 2) + radius;

    if (i !== 0) {
        for (let j = 0; j < ballArray.length; j++) {
            if (getDistance(x, y, ballArray[j].x, ballArray[j].y) - radius * 2 < 0) {
                x = Math.random() * (innerWidth - radius * 2) + radius;
                y = Math.random() * (innerHeight - radius * 2) + radius;
                j = -1;
            }
        }
    }

    ballArray.push(new Particle(x, y, radius, 'blue'));
}

function getDistance(x1, y1, x2, y2) {
    const xDistance = x2 - x1;
    const yDistance = y2 - y1;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

function animation() {
    requestAnimationFrame(animation);
    ball.clearRect(0, 0, innerWidth, innerHeight);

    ballArray.forEach((particle) => {
        particle.update(ballArray);
    });
}

animation();

initParticles();