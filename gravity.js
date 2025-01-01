const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ball = canvas.getContext('2d');

// Create the Ball constructor
function Balls(x, y, radius,dy, gravity, bounce, lineStartY) {
    this.x = x; // x-coordinate of the ball
    this.y = y; // y-coordinate of the ball
    this.radius = radius; // Radius of the ball
    this.dy = dy; // Initial vertical velocity
    this.gravity = gravity; // Gravity strength
    this.bounce = bounce; // Bounce factor
    this.lineStartY = lineStartY; // Ground line's Y-coordinate

    // Draw the ball
    this.draw = function () {
        ball.beginPath();
        ball.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ball.fill(); // Fill the circle
        ball.stroke(); // Add stroke
    };

    // Update the ball's position and apply physics
    this.update = () => {
        // Apply gravity
        this.dy += this.gravity;

        // Update position
        this.y += this.dy;

        // Check collision with the ground
        if (this.y + this.radius >= this.lineStartY) {
            this.y = this.lineStartY - this.radius; // Prevent the ball from going below the line
            this.dy *= -this.bounce; // Reverse velocity and apply bounce
        }

        // Draw the ball
        this.draw();
    };
}

let circleArray = [];

// Create multiple balls with random properties
for (let i = 0; i <= 100; i++) {
    let radius = Math.random() * 5 + 1; // Radius between 10 and 30
    let x = Math.random() * (innerWidth - radius * 2) + radius; // Random x within canvas bounds
    let y = Math.random() * (innerHeight / 2); // Random y in the upper half of the canvas
    let dy = Math.random() * 2 - 1; // Random initial velocity
    let gravity = 0.5; // Gravity strength
    let bounce = 0.7; // Bounce factor
    let lineStartY = canvas.height - 100; // Ground line 100px above the bottom

    circleArray.push(new Balls(x, y, radius,  dy, gravity, bounce, lineStartY));
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Clear the canvas
    ball.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the ground line
    ball.beginPath();
    ball.moveTo(0, canvas.height - 100);
    ball.lineTo(canvas.width, canvas.height - 100);
    ball.stroke();

    // Update and draw each ball
    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}

animate();
