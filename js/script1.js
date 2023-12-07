var song;
var star;
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
let w1;
let w2;
let w3;
let w4;
let end;

let amplitude;
let snowflakes = [];
let start = false;

var increasing = false
var previousAmp;
let randomIndex1
let randomIndex2
let randomIndex3
let currentImage = "child";
let displayText = "Click to start. Press right arrow to move on";
let count1 = 0
let count2 = 0
let count3 = 0
let count4 = 0

function preload() {
    song = loadSound("audio/music.mp3");
    star = loadImage("image/star.jpg")
    img = loadImage('image/background.jpg');
    child = loadImage('image/child-unscreen.gif')
    teen = loadImage('image/teen-unscreen.gif')
    adult = loadImage('image/adult-unscreen.gif')
    old = loadImage('image/old-unscreen.gif')
    w1 = loadImage('image/w1.gif')
    w2 = loadImage('image/w2.gif')
    w3 = loadImage('image/w3.gif')
    w4 = loadImage('image/w4.gif')
    end = loadImage('image/end.jpeg')
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    fft = new p5.FFT();
    amplitude = new p5.Amplitude();

    let button = createButton('RAIN');
    button.position(width - 130, height - 80);
    button.mousePressed(changeMode);
    button.size(100, 50)

    let button2 = createButton('SNOW');
    button2.position(width - 230, height - 80);
    button2.mousePressed(changeMode2);
    button2.size(100, 50)

    amplitude = new p5.Amplitude();
}

function draw() {
    angleMode(DEGREES);

    //background
    imageMode(CORNER);
    image(img, 0, 0, width, height);
    background(0, 100)

    //four stages + end
    imageMode(CENTER);
    if (currentImage === "child") {
        if (start) {
            count1++;
            if (count1 < 150) {
                image(w1, map(count1, 0, 150, 0, width / 4), height - 100, 90, 120)
                stroke(255, 150)
                strokeWeight(10)
                line(0, height - 90, map(count1, 0, 150, 0, width / 4), height - 90)
            } else {
                count1 = 201
                stroke(255, 150)
                strokeWeight(10)
                image(w1, width / 4, height - 100, 90, 120)
                line(0, height - 90, width / 4, height - 90)
            }
            image(child, width / 2, height / 2 - 100 - 150, 150, 200);
        }
        textAlign(CENTER, CENTER);
        textSize(20);
        fill(255);
        strokeWeight(1)
        text(displayText, width / 2, height - 50);
    } else if (currentImage === "teen") {
        count2++;
        if (count2 < 150) {
            image(w2, map(count2, 0, 150, width / 4, width / 2), height - 100, 90, 120)
            stroke(255, 150)
            strokeWeight(10)
            line(0, height - 90, map(count2, 0, 150, width / 4, width / 2), height - 90)
        } else {
            count2 = 201
            stroke(255, 150)
            strokeWeight(10)
            image(w2, width / 2, height - 100, 90, 120)
            line(0, height - 90, width / 2, height - 90)
        }
        image(teen, width / 2, height / 2 - 100 - 150, 150, 200);
    } else if (currentImage === "adult") {
        count3++;
        if (count3 < 150) {
            image(w3, map(count3, 0, 150, width / 2, 3 * width / 4), height - 100, 90, 120)
            stroke(255, 150)
            strokeWeight(10)
            line(0, height - 90, map(count3, 0, 150, width / 2, 3 * width / 4), height - 90)
        } else {
            count3 = 201
            stroke(255, 150)
            strokeWeight(10)
            image(w3, 3 * width / 4, height - 100, 90, 120)
            line(0, height - 90, 3 * width / 4, height - 90)
        }
        image(adult, width / 2, height / 2 - 100 - 150, 150, 200);
    } else if (currentImage === "old") {
        count4++;
        if (count4 < 150) {
            image(w4, map(count4, 0, 150, 3 * width / 4, width), height - 100, 90, 120)
            stroke(255, 150)
            strokeWeight(10)
            line(0, height - 90, map(count4, 0, 150, 3 * width / 4, width), height - 90)
        } else {
            count4 = 201
            stroke(255, 150)
            strokeWeight(10)
            image(w4, width, height - 100, 90, 120)
            line(0, height - 90, width, height - 90)
        }
        image(old, width / 2, height / 2 - 100 - 150, 150, 200);
    } else if (currentImage === "end") {
        push()
        translate(width / 2, height / 2)
        image(end, 0, 0, width, height)
        pop()
    }

    //music visualizer
    fft.analyze();
    var amp = fft.getEnergy(20, 200);
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

    //draw particles
    if (start == true) {
        push()
        translate(width / 2, height / 2 + 100)
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
    }

    //particles turn into star 
    let Amp = amplitude.getLevel();
    if (Amp - previousAmp > 0.05) {
        increasing = true
    } else {
        increasing = false
    }
    previousAmp = Amp;

    if (increasing) {
        randomIndex1 = floor(random(particles.length));
        randomIndex2 = floor(random(particles.length));
        randomIndex3 = floor(random(particles.length));
    }

    if (particles[randomIndex1]) {
        push()
        translate(width / 2, height / 2 + 100)
        translate(particles[randomIndex1].x, particles[randomIndex1].y)
        rotate(frameCount)
        image(star, 0, 0, 30, 30);
        pop()
    }

    if (particles[randomIndex2]) {
        push()
        translate(width / 2, height / 2 + 100)
        translate(particles[randomIndex2].x, particles[randomIndex2].y)
        rotate(frameCount)
        image(star, 0, 0, 40, 40);
        pop()
    }

    if (particles[randomIndex3]) {
        push()
        translate(width / 2, height / 2 + 100)
        translate(particles[randomIndex3].x, particles[randomIndex3].y)
        rotate(frameCount)
        image(star, 0, 0, 50, 50);
        pop()
    }

    //raindrops
    if (Mode == 1) {
        drops.push(new Drop(random(windowWidth), 0, 0))
        for (let i = 0; i < drops.length; i++) {
            drops[i].show();
            drops[i].update();
        }
    }

    //snowflakes
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
    start = true
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
        } else if (currentImage === "old") {
            currentImage = "end";
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

    showImage(img) {
        this.count++
        push();
        translate(width / 2, height / 2 + 100);
        rotate(frameCount);
        image(img, this.x, this.y, 50, 50);
        pop();
    }

}

class Drop {
    constructor(x, y) {
        this.pos = createVector(x, y)
        this.vel = createVector(0, map(mouseX, 0, width, random(1, 5), random(7, 11)))
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

class snowflake {
    constructor() {

        this.posX = 0;
        this.posY = random(-50, 0);
        angleMode(RADIANS)
        this.initialangle = random(0, 2 * PI);
        this.size = random(3, 10);
        this.a = random(0, 255)
        this.radius = random(0, width);

    }

    update(time) {
        let angle = map(mouseX, 0, width, 0.2, 0.25) * time + this.initialangle;
        this.posX = width / 2 + this.radius * sin(angle);

        if (this.posY > height) {
            let index = snowflakes.indexOf(this);
            snowflakes.splice(index, 1);
        }
        this.posY += pow(this.size, 0.5);
    }

    display() {
        noStroke();
        fill(255, this.a)
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