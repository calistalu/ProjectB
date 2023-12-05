var song;
var img;
var backgroundImage;
var totalnum = 100;
var fft;
var particles = [];
var ang = 0;
var imgIndex = 1;
var Mode = 0;
var drops = [];
var hasPlayed = false;
var child;
var teen;
var adult;
var old;
let amplitude;
let snowflakes = [];

let currentImage = "child";
let displayText = "Press right arrow to move on";

function preload() {
    song = loadSound("audio/music.mp3");

    img = loadImage('image/background.jpg');
    child = loadImage('image/child-unscreen.gif')
    teen = loadImage('image/teen-unscreen.gif')
    adult = loadImage('image/adult-unscreen.gif')
    old = loadImage('image/old-unscreen.gif')
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    
    fft = new p5.FFT();

    let button = createButton('RAIN');
    button.position(width - 70, height - 30);
    button.mousePressed(changeMode);

    let button2 = createButton('SNOW');
    button2.position(width - 170, height - 30);
    button2.mousePressed(changeMode2);

    amplitude = new p5.Amplitude();
}

function draw() {
    angleMode(DEGREES);
    imageMode(CORNER);
    image(img, 0, 0, width, height);

   

    background(0, 100)

    
    imageMode(CENTER);
    if (currentImage === "child") {
        image(child, width/2, height/2-100-150, 150, 200);
        textAlign(CENTER, CENTER);
        textSize(20);
        fill(255);
        text(displayText, width/2, height - 50);
    } else if (currentImage === "teen") {
        image(teen, width/2, height/2-100-150, 150, 200);
    } else if (currentImage === "adult") {
        image(adult, width/2, height/2-100-150, 150, 200);
    } else if (currentImage === "old") {
        image(old, width/2, height/2-100-150, 150, 200);
    }


    fft.analyze();
    var amp =  fft.getEnergy(20, 200);

    stroke(amp / 1.5, 100, 150);
    strokeWeight(3);
    noFill();

    var wave = fft.waveform();


    push()
    translate(width / 2, height / 2);
    translate(0, 100)

    for (var t = -1; t <= 1; t += 2) {
        beginShape();
        for (var ii = 0; ii <= 180; ii += 0.5) {
            var index = floor(map(ii, 0, 180, 0, wave.length - 1));
            var r = map(wave[index], -1, 1, 150, 350);
            var x = r * sin(ii) * t;
            var y = r * cos(ii);
            vertex(x, y);
            fill(0, 100)
        }
        endShape();

    }
    pop()

    push()
    translate(0, 100)
    translate(width / 2, height / 2)
    rotate(-ang)
    ang += amp / 250

    var p = new Particle();
    if (frameCount % 20 == 0) {
        particles.push(p);
    }


    for (var i = particles.length - 1; i >= 0; i--) {

        particles[i].update();
        particles[i].show();

    }
    pop()
    if (Mode == 1) {

        drops.push(new Drop(random(windowWidth), 0, 0))

        for (let i = 0; i < drops.length; i++) {
            drops[i].show();
            drops[i].update();
        }

    }

    if (Mode == 2) {

        let t = frameCount / 60;
        snowflakes.push(new snowflake());
      
        for (let flake of snowflakes) {
          flake.update(t);
          flake.display();
        }
    }

    

}
function mousePressed() {
    if (!hasPlayed) {
        song.play();
        hasPlayed = true;
    }
}

function keyPressed() {
    if (keyCode === RIGHT_ARROW) {
        if (currentImage === "child") {
            currentImage = "teen";
        } else if (currentImage === "teen") {
            currentImage = "adult";
        } else if (currentImage === "adult") {
            currentImage = "old";
        }
    }
}


class Particle {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.r = 0;
        this.a = random(360);
        this.spd = 0.5;
        this.acc = random(0.01, 0.02);
        this.size = random(10, 20)
    }

    update(cond) {
        this.x = this.r * sin(this.a);
        this.y = this.r * cos(this.a);
        this.r += this.spd;
        if (cond) {
            this.spd += this.acc;
        }
        if (this.x < -width / 2 || this.x > width / 2 || this.y < -width / 2 || this.y > width / 2) {
            let index = particles.indexOf(this);
            particles.splice(index, 1);
        }
    }

    show() {

        noStroke();
        this.x = this.r * sin(this.a);
        this.y = this.r * cos(this.a);
        for (let i = 0; i < this.size; i += 0.4) {
            fill(250, 248, 215, 6);
            circle(this.x, this.y, i);
        }
    }

    turn(){

    }
}

class Drop {
    constructor(x, y) {
        this.pos = createVector(x, y)
        this.vel = createVector(0, map(mouseX,0,width,random(1, 5),random(7, 11)))
        this.length = random(10, 20)
        this.strength = random(255)
    }
    show() {
        stroke(255, this.strength)
        line(this.pos.x, this.pos.y, this.pos.x, this.pos.y - this.length)
    }

    update() {
        this.pos.add(this.vel)

        if (this.pos.y > height + 100) {
            drops.shift()
        }
    }
}

class snowflake{
    constructor(){
    
    this.posX = 0;
    this.posY = random(-50, 0);
    angleMode(RADIANS)
    this.initialangle = random(0, 2 * PI);
    this.size = random(3, 10);
    this.a=random(0,255)
    this.radius = random(0, width);
  
    }
    
    update(time) {
        let angle = map(mouseX,0,width,0.2,0.25) * time + this.initialangle;
        this.posX = width / 2 + this.radius * sin(angle);
    
        if (this.posY > height) {
          let index = snowflakes.indexOf(this);
          snowflakes.splice(index, 1);
        }
        this.posY += pow(this.size, 0.5);
      }
  
    display() {
        noStroke();
      fill(255,this.a)
      ellipse(this.posX, this.posY, this.size);
    }
  }
  

function changeMode() {
    Mode = (Mode + 1) % 2;
}

function changeMode2() {
    if (Mode === 0) {
      Mode = 2; 
    } else {
      Mode = 0; 
    }
  }