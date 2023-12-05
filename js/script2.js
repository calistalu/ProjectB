var song;
var totalnum = 100;
var fft;
var cam;
var hasPlayed = false;
var offset = 0;

function preload() {
  song = loadSound("audio/music.mp3");

}

function setup() {

  createCanvas(windowWidth, windowHeight, WEBGL)
  clear(); 
  cam = createEasyCam();
  angleMode(DEGREES);
  fft = new p5.FFT();
}

function draw() {
  noStroke();
  background(0, 0);

  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);

  fft.analyze();
  amp = fft.getEnergy(20, 200);

  var wave = fft.waveform();

  var radius = 200; 
  
  offset += 5;
  for (var t = 0; t <= 180; t += 1) {
    beginShape();
    for (var ii = 0; ii <= 360; ii += 10) {
      var i = floor(map(ii, 0, 360, 0, wave.length - 1));
      var r = map(wave[i], -1, 1, 50, 150);
      var x = r * sin(t) * cos(ii);
      var y = r * sin(t) * sin(ii);
      var z = r * cos(t);

      var r1 = map(ii, 0, 360, 0, 255 * 3)
      var g1 = 130;
      var b1 = 190;
      fill((r1 + offset) % 255, g1, b1)

     
      vertex(x, y, z);
    }
    endShape(CLOSE);
  }
  
}

function mousePressed() {
  if (!hasPlayed) {
    song.play();
    hasPlayed = true;
  }
}
