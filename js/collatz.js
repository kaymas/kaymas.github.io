var nBranch = 200;
var w;
var h;
var len = 50;
var strokeW = 3;
var alphaW = 100;

var collatzSeq = new Array();
for (var i = 0; i < nBranch; i++) {
    collatzSeq.push(new collatzObj());
}

function collatzObj() {
    this.seq = [];

    this.addVal = function(i, val) {
        this.seq[i] = val;
    }

    this.outputVals = function() {
        console.log(this.seq);
        //stri += JSON.stringify(this.seq[0], null, 4);
    }

    this.createBranch = function() {
        //translate(width / 2, height);
        for (var i = this.seq.length - 1; i >= 0; i--) {
            if (this.seq[i] % 2 == 0) {
                rotate((log(2) / log(6)));
                //  rotate(PI / 20);
            } else {
                rotate((log(2) / log(6) - (this.seq[i] % 2)));
                //  rotate(- PI / 20);
            }
            //len = this.seq[0] / (1 + pow(this.seq[0], 1)) * 3;
            //len *= pow(0.9, log(this.seq[0])) * 2.2;
            len *= 0.95;
            strokeW *= 0.94;
            alphaW *= 0.9999;
            stroke(33, 150, 243, alphaW);
            strokeWeight(strokeW);
            //strokeW += pow((this.seq.length / this.seq[i]), 1 / 2.73);
            line(0, 0, 0, -len);
            translate(0, -len);
            //rotate(PI / 6);
        }
    }
}

function setup() {
    var canvas = createCanvas(800, 700);
    console.log('collatz');
    canvas.parent('sketch-holder');

    w = width;
    h = height;
    var num = 1;
    var j = 0;
    for (var i = 0; i < nBranch; i++) {
        j = 0;
        num = floor(random(2, 100000));
        //num += 1;
        //temp = num;
        collatzSeq[i].addVal(j, num);
        while (num != 1) {
            if (num % 2 == 0) {
                num /= 2;
            } else {
                num = (3 * num) + 1;
            }
            j++
            collatzSeq[i].addVal(j, num);
        }
        //num = temp;
    }

    // for(var i = 0; i < nBranch; i++){
    //   collatzSeq[i].outputVals();
    //
    // }
}

function draw() {
    background(51);
    //stroke(25,10,243);
    stroke(33, 150, 243);
    //angle = PI / 3;
    //branch(100);

    // translate(width / 2, height / 2);
    // collatzSeq[0].createBranch();

    for (var i = 0; i < nBranch; i++) {
        stroke(33, 150, 243);
        strokeW = 4;
        alphaW = 1000;
        len = 50;
        push();
        translate(w / 4, h - h / 3 - h / 8);
        collatzSeq[i].createBranch();
        pop();
    }
}
