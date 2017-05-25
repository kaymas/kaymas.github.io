var rows, cols;
var scl = 20;

function setup(){
  createCanvas(
    window.innerWidth,
    window.innerHeight);

  var w = window.innerWidth;
  var h = window.innerHeight;
  cols = w / scl;
  rows = h / scl;

}

function draw(){
  background(51);
  stroke(255);
  noFill();
  //fill(0, 0, 0);

  //translate(width/2, height/2);
  //rotateX(PI/3);

  for(var y = 0; y < rows; y++){
    beginShape(TRIANGLE_STRIP);
    for(var x = 0; x < cols; x++){
      vertex(x * scl, y * scl);
      vertex(x * scl, (y + 1) * scl);
    }
    endShape();
  }
}
