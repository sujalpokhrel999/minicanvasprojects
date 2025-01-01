const canvas = document.querySelector('canvas')

const pen = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let maxRadius=40;


let colorArray=[
    "#FFBCB3",  // Soft Peach
    "#D4A5A5",  // Dusty Pink
    "#B9AEDC",  // Muted Lavender
    "#A7C7E7",  // Powder Blue
    "#A8E6CF"   // Pale Mint
];

window.addEventListener('resize',()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

})

var mouse ={
    x:undefined,
    y:undefined
}

window.addEventListener('mousemove',(e)=>{
    mouse.x = e.x;
    mouse.y =e.y;
    pen.fillRect(mouse.x,mouse.y,50,50);
   
})



function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.color=colorArray[ Math.floor(Math.random()* colorArray.length)];
    this.radius = radius;
    this.minRadius = radius;



    this.draw = () => {
        pen.beginPath();
        pen.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        pen.fillStyle = this.color
        pen.fill();
        pen.strokeStyle="#FFF";
        pen.stroke(); // Outline the circle


    }

    this.update = () => {

        this.dx = (this.x + this.radius > innerWidth || this.x - this.radius < 0) ? -this.dx : this.dx;
        this.dy = (this.y + this.radius > innerHeight || this.y - this.radius < 0) ? -this.dy : this.dy;
        this.x += this.dx;
        this.y += this.dy;

        if(mouse.x-this.x<80 && mouse.x-this.x >-80
            &&
            mouse.y-this.y<80 && mouse.y-this.y >-80){

                if(this.x < mouse.x){
                    this.x +=1;
                }else if (this.x > mouse.x){
                    this.x -=1;
                }


                
                if(this.y < mouse.y){
                    this.y +=1;
                }else if (this.y > mouse.y){
                    this.y -=1;
                }


                if(this.radius< maxRadius){
                    this.radius +=1;
                }
        }else if(this.radius > this.minRadius ){
            this.radius -= 1;
        }

        this.draw();
    }
}



let circleArray = [];

for (let i = 0; i <= 500; i++) {
    let radius = Math.random()*20+1;
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = (Math.random() - 0.5)*5 ;
    var dy = (Math.random() - 0.5) *5 ;


    circleArray.push(new Circle(x, y, dx, dy, radius));
}



function animate() {
    requestAnimationFrame(animate);


    pen.clearRect(0, 0, canvas.width, canvas.height);


    for (let i = 0; i < circleArray.length; i++) {

        circleArray[i].update();


    }



}

animate();