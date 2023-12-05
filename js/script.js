
function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent("canvasContainer");
    noStroke();
 
}

function draw(){
       let gradient = drawingContext.createRadialGradient(
        width/2, height/2, 20, windowWidth/2, windowWidth/2, 800
    )
    let apink = color(255,229,229)
    let ayellow = color(255,251,235)
    let ablue = color(236,249,255)
    gradient.addColorStop(0,apink)
    gradient.addColorStop(map(abs(mouseX-windowWidth/2),0,windowWidth/2,0.7,0.1),ayellow)
    gradient.addColorStop(1,ablue)
  
  drawingContext.fillStyle = gradient
  rect(0,0,width,height) 
  
}