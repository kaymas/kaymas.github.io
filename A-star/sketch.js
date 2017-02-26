function removeFromArray(arr, elt){
  for(var i = arr.length - 1; i >= 0; i--){
    if(arr[i] == elt){
      arr.splice(i, 1);
    }
  }
}

function heuristic(a, b){
  //calculating just the euclidian distance between 2 points a and b
  //var d = dist(a.i, a.j, b.i, b.j);

  //using manhattan distance
  var d = abs(a.i - b.i) + abs(a.j - b.j);
  return d;
}

var cols = 50;
var rows = 50;
var grid = new Array(cols);

//set of nodes that needs evaluation
var openSet = [];
//set of nodes that have finished evaluation
var closedSet = [];
var start;
var end;
var w, h;
var path = [];

function Spot(i,j){
  this.i = i;
  this.j = j;
  this.f = 0;
  this.g = 0;
  this.h = 0;
  this.neighbors = [];
  this.previous = undefined;
  this.wall = false;

  if(random(1) < 0.3){
    this.wall = true;
  }

  this.show = function(col){
    fill(col);
    if(this.wall){
      fill(0);
    }
    noStroke();
    rect(this.i * w, this.j * h, w - 1, h - 1);
  }

  this.addNeighbors = function(grid){
    var i = this.i;
    var j = this.j;
    if(i < cols - 1){
      this.neighbors.push(grid[i + 1][j]);
    }
    if(i > 0){
      this.neighbors.push(grid[i - 1][j]);
    }
    if(j < rows - 1){
      this.neighbors.push(grid[i][j + 1]);
    }
    if(j > 0){
      this.neighbors.push(grid[i][j - 1]);
    }
    if(i > 0 && j > 0){
      this.neighbors.push(grid[i - 1][j - 1]);
    }
    if(i < cols - 1 && j > 0){
      this.neighbors.push(grid[i + 1][j - 1]);
    }
    if(i > 0 && j < rows - 1){
      this.neighbors.push(grid[i - 1][j + 1]);
    }
    if(i < cols - 1 && j < rows - 1){
      this.neighbors.push(grid[i + 1][j + 1]);
    }
  }
}

function setup(){
  createCanvas(600,600);
  console.log('A*');

  w = width / cols;
  h = height / rows;

  // making a 2D array
  for (var i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }
  console.log(grid);

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Spot(i,j);
    }
  }
  //creating list of neighbors for a node
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].addNeighbors(grid);
    }
  }

  start = grid[0][0];
  end = grid[cols - 1][rows - 1];
  start.wall = false;
  end.wall = false;

  openSet.push(start);
}

function draw() {

    if(openSet.length > 0){

      //winner is the current node that we will be testing
      var winner = 0;
      for(var i = 0; i < openSet.length; i++){
        if(openSet[i].f < openSet[winner].f){
          winner = i;
        }
      }
      var current = openSet[winner];

      //if the current node is the end then finished
      if(current === end){
        noLoop();
        console.log("DONE!");
      }

      //remove current from openSet and then add it to closedSet
      removeFromArray(openSet, current);
      closedSet.push(current);

      var neighbors = current.neighbors;
      for(var i = 0; i < neighbors.length ; i++){
        var neighbor = neighbors[i];

        //only if neighbor is not in the cloesdSet and also is not a wall
        if(!closedSet.includes(neighbor) && !neighbor.wall){

          //here 1 is the distance between current and neighbor
          //here tempG is the tentative g value
          var tempG = current.g + 1;

          var newPath = false;
          //if neighbor was in openSet then we need to check its previous g value
          //and only update it if it greater than the tentative g value.
          if(openSet.includes(neighbor)){
            if(tempG < neighbor.g){
              neighbor.g = tempG;
              newPath = true;
            }
          }else {
            //if neighbor not in openSet then give update its g value and push it to openSet
            neighbor.g = tempG;
            newPath = true;
            openSet.push(neighbor);
          }
          if(newPath){
            //calculate the h value for neighbor
            neighbor.h = heuristic(neighbor, end);
            //calculate f value for neighbor f = g + h
            neighbor.f = neighbor.g + neighbor.h;
            //previous is where the neighbour came from
            neighbor.previous = current;
          }
        }
      }

    }else {
      //no solution
      console.log('no solution!');
      noLoop();
      return;
    }

    background(0);

    for(var i = 0; i < cols; i++){
      for(var j = 0; j < cols; j++){
        grid[i][j].show(color(255));
      }
    }
    //ClosedSet elements are red
    for(var i = 0; i < closedSet.length; i ++){
        closedSet[i].show(color(255,0,0));
    }
    //openSet elements are green
    for(var i = 0; i < openSet.length; i ++){
        openSet[i].show(color(0, 255, 0));
    }

    //find the path
    path = [];
    var temp = current;
    path.push(temp);
    while(temp.previous){
      path.push(temp.previous);
      temp = temp.previous;
    }


    //path set elements are blue
    for(var i = 0; i < path.length; i++){
      path[i].show(color(0,0,255));
    }
    noFill();
    stroke(255);
    beginShape();
    for(var i = 0; i < path.length; i++){
      vertex(path[i].i * w + w / 2, path[i].j * h + h / 2);
    }
    endShape();


}
