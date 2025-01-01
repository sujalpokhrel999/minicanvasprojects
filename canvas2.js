const canvas = document.querySelector('canvas')

const pen = canvas.getContext('2d');


let maxRadius=40;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var mouse ={
    x:undefined,
    y:undefined
}

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
    pen.fillRect(mouse.x, mouse.y, 50, 50);
  });
  




function Circle(x, y,  radius) {
    this.x = x;
    this.y = y;
    this.radius=radius;
   
  


   

    this.draw = () => {
        pen.beginPath();
        pen.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        pen.fillStyle = "#FFF";
        pen.fill();
        pen.strokeStyle="#FFF";
        pen.stroke(); // Outline the circle
    }


    this.update = () => {

   

      

        if(mouse.x-this.x<80 && 
           mouse.x-this.x >-80 &&
           mouse.y-this.y<80 && 
           mouse.y-this.y >-80){

                if(this.x < mouse.x){
                    pen.beginPath()
                    pen.moveTo(this.x,this.y);
                    pen.lineTo(mouse.x,mouse.y);
                    pen.stroke();
                    pen.strokeStyle="#FFF"
                }else if (this.x > mouse.x){
                    pen.beginPath()
                    pen.moveTo(this.x,this.y);
                    pen.lineTo(mouse.x,mouse.y);
                    pen.stroke();
                    pen.strokeStyle="#FFF"
                }


                
                if(this.y < mouse.y){
                    pen.beginPath()
                    pen.moveTo(this.x,this.y);
                    pen.lineTo(mouse.x,mouse.y);
                    pen.stroke();
                    pen.strokeStyle="#FFF"
                }else if (this.y > mouse.y){
                     pen.beginPath()
                    pen.moveTo(this.x,this.y);
                    pen.lineTo(mouse.x,mouse.y);
                    pen.stroke();
                    pen.strokeStyle="#FFF"
                }


        }
    

        this.draw();
    }
}
circleArray = [];
const startX = 50;
const startY = 50;
const spacing = 50;

for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 19; j++) {
        let radius = 1;
        let x = startX + j * (spacing + 2 * 10);
        let y = startY + i * (spacing + 2 * 10);
        circleArray.push(new Circle(x, y, radius));
    }
}

// Add after canvas setup
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Reinitialize the grid
    circleArray = [];
    const startX = 50;
    const startY = 50;
    const spacing = 50;

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 19; j++) {
            let radius = 1;
            let x = startX + j * (spacing + 2 * 10);
            let y = startY + i * (spacing + 2 * 10);
            circleArray.push(new Circle(x, y, radius));
        }
    }
});

function animate() {
    requestAnimationFrame(animate);


    pen.clearRect(0, 0, canvas.width, canvas.height);


    for (let i = 0; i < circleArray.length; i++) {

        circleArray[i].update();


    }



}

animate();
