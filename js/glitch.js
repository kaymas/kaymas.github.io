'use strict';

var canvas = undefined;
var message = undefined;

var caseFunctions = ['toUpperCase', 'toUpperCase', 'toUpperCase', 'toUpperCase', 'toUpperCase', 'toLowerCase'];
var leetReplacement = {
	A: [4, '@'],
	C: ['¢'],
	E: [3, '€', '£'],
	G: [6],
	H: ['#'],
	I: [1],
	O: [0],
	S: [5, '$'],
	T: [7],
	X: ['×'],
	Y: ['¥']
};
var accentReplacement = {
	A: ['Ă', 'Â', 'ă', 'â'],
	C: ['Ć', 'Č', 'č', 'ć'],
	D: ['đ'],
	E: ['Ê', 'ê'],
	O: ['Ô', 'Ơ', 'ô', 'ơ'],
	U: ['Ư', 'ư'],
	S: ['Š', 'š'],
	Z: ['Ž', 'ž']
};

function setup() {
	canvas = createCanvas(600, 400);
  canvas.parent('glitch-holder');
	textFont('VT323');
  textSize(80);
  //strokeWeight(4);//here remove this to get the canvas back.
	textAlign(CENTER, CENTER);
  message = '$ Hello, I am Kaymas';
}

function draw() {
	blendMode(BLEND);
  // background(8, 24, 64);
	// Add to that scanline look, allows some frames to combine.
	fill(32, 24, 64, 900 + cos(frameCount / 10) * 100);
	rect(0, 0, width, height);
  message = document.getElementById("typed").innerHTML;

	// Text prep
	// var life = random() > 0.6 ? 'Kaymas' : 'Kaymas'.split('').sort(function () {
	// 	return round(random(-1, 1));
	// }).join('');
	var txt = (message).toUpperCase().split('').map(function (n) {
		return n[random(caseFunctions)]();
	}).join('').replace(/\w/g, function (match, p1, offset, string) {
		if (match === 'g') {
			return 'G';
		}
		var possibleMatchCount = round(random(16, 26));
		var possibleMatches = new Array(possibleMatchCount).fill(match);
		var leet = leetReplacement[match] || [match];
		var accents = accentReplacement[match] || [match];
		var rando = random();
		return random([].concat(possibleMatches, rando > 0.7 ? [' ', '_'] : [], rando > 0.5 ? leet : [], rando > 0.92 ? accents : []));
	});
	var dotCount = 3;
	var dotTime = (dotCount + 1) * 30;
	var dotTimeSpan = (dotCount + 2) * 30;
	var repeat = map(frameCount % dotTimeSpan, 0, dotTime, 0, dotCount + 1);
	txt += ('.'.repeat(abs(floor(repeat))) + '   ').slice(0, 3);

	var h = textSize();
	var w = textWidth(txt);

	var count = 20;
	var part = h / count;
	var xOffset = 0;
	var yOffset = height / 2 - h / 2;

	fill(255, 0.99);

	// Scanline
	var barHeight = part * 0.995;
	var barCount = round(height / barHeight);
	for (var i = 0; i < barCount; i++) {
		rect(0, i / barCount, width, barHeight * i);
	}

	blendMode(ADD);

	fill(255);

	translate(round(cos(sin(frameCount / 10) * TAU - cos(tan(frameCount / 4) / 10) * TAU)) * 8, round(sin(frameCount) * 16 / 8) * 0.4);

	text(txt, width / 2, height / 2);
	// Scanline misses (The main effect)
	for (var i = 0; i < count; i++) {
		canvas.drawingContext.save();

		var y = i * part + yOffset;
		var xShift = cos(-frameCount * 0.9375 + i) * 100;

		canvas.drawingContext.beginPath();
		canvas.drawingContext.rect(0, y, width, part);
		canvas.drawingContext.closePath();
		canvas.drawingContext.clip();

		fill(0, 135);
		text(txt, width / 2 + xShift, height / 2);
		fill(255, 50);
		text(txt, width / 2 + xShift, height / 2);

		fill(255, 60);
		text(txt, width / 2 + round(xShift / 32) * 16, height / 2);

		canvas.drawingContext.restore();
	}

	fill(255, 2);
	for (var i = 0; i < 4; i++) {
		rect(0, frameCount * (30 + i) % height / 6 * 7, width, height / 9);
	}
	fill(255, random(8, 12));
	var rounding = part * 1.2;
	var travelingBarHeight = height / 6;
	var travelingBarSpeed = frameCount * 1/20;
	rect(0, round(travelingBarSpeed % travelingBarHeight * 8 / rounding) * rounding - travelingBarHeight, width, travelingBarHeight);
	var travelingBarY2 = round((travelingBarSpeed + 6) % travelingBarHeight * 8 / rounding) * rounding - travelingBarHeight;
	var travelingBar2Opacity = map.apply(undefined, [travelingBarY2].concat(travelingBarY2 < height / 2 ? [0, height / 2] : [height / 2, height], [0, 1]));
	fill(255, random(8, 12) * travelingBar2Opacity);
	rect(0, travelingBarY2, width, travelingBarHeight);
}

// function windowResized() {
// 	resizeCanvas(windowWidth, windowHeight);
// }
