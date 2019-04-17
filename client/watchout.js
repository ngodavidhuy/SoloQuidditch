///////////////////////////////////////////////////////////////
// SETTINGS

let width = window.innerWidth;
let height = window.innerHeight - 100;

let scales = {
	bludgerScale: d3.scale.linear().domain([0, width]).range([7,20]),
	snitchXScale: d3.scale.linear().domain([0, width]).range([100, width - 100]),
	snitchYScale: d3.scale.linear().domain([0, height]).range([100, height - 100]),
	bludgerXScale: d3.scale.linear().domain([0, width]).range([5, width - 5]),
	bludgerYScale: d3.scale.linear().domain([0, height]).range([5, height - 5]),
};

let settings = {
	bludgerCount: scales.bludgerScale(width)
};

let mouse = {
	x: undefined,
	y: undefined,
};

let currentScore = 0;
let highScore = 0;
let collisions = 0;

///////////////////////////////////////////////////////////////
//VISUALS

let gameBoard = d3.select('.board')
									.append('svg')
									.attr('width', width + 30)
									.attr('height', height);						

let bludgers = gameBoard.selectAll('.bludger')
												.data(d3.range(settings.bludgerCount))
												.enter()
												.append('image')
												.attr('class', 'bludger')
												.attr('xlink:href', './img/bludger.png')
												.attr('x', function() { return scales.bludgerXScale(randNumGenerator(width)); })
                    		.attr('y', function() { return scales.bludgerYScale(randNumGenerator(height)); })
                    		.attr('width', 50)
                    		.attr('height', 50);

let snitch = gameBoard.selectAll('.snitch')
                  		.data(d3.range(1))
											.enter()
											.append('image')
											.attr('class', 'snitch')
											.attr('xlink:href', './img/snitch.png')
											.attr('x', function() { return scales.snitchXScale(randNumGenerator(width)); })
                    	.attr('y', function() { return scales.snitchYScale(randNumGenerator(height)); })
											.attr('width', 100)
		                  .attr('height', 100);

let harry = gameBoard.selectAll('.player')
									.data(d3.range(1))
									.enter()
									.append('image')
									.attr('class', 'player')
									.attr('xlink:href', './img/harry.png')
									.attr('x', (width / 2))
									.attr('y', (height / 2))
									.attr('width', 100)
                  .attr('height', 100);		                  

gameBoard.on('mousemove', function()  {
	let loc = d3.mouse(this);
	mouse['x'] = loc[0];
	mouse['y'] = loc[1];
	harry.attr('x', loc[0] - 50).attr('y', loc[1] - 30);
});



///////////////////////////////////////////////////////////////
// FUNCTIONS

function randNumGenerator(n) {
	return Math.floor(Math.random() * n);
};

function scoreUpdater() {
	currentScore++;
	highScore = Math.max(highScore, currentScore);
	d3.select('.currentScore span').text(currentScore);
	d3.select('.highScore span').text(highScore);
	d3.select('.collisions span').text(collisions);
}

function flyingBludgers(bludgers) {
	bludgers.transition()
					.duration(2000)
					.attr('x', function() { return scales.bludgerXScale(randNumGenerator(width)); })
          .attr('y', function() { return scales.bludgerYScale(randNumGenerator(height)); })
          .each('end', function() {
          	flyingBludgers(d3.select(this));
          })
}

function checkCollisions() {
	let bludgerCollision = false;
	let snitchCollision = false;

	bludgers.each(function()  {
		let bx = d3.select(this).attr('x');
		let by = d3.select(this).attr('y');
		let x = bx - mouse['x'] + 30;
		let y = by - mouse['y'] + 40;
		if (Math.sqrt(x*x + y*y) < d3.select(this).attr('width') - 10) {
			bludgerCollision = true;
		}
	});

	if (bludgerCollision) {
		currentScore = 0;
		collisions++;
	}

	snitch.each(function() {
		let sx = d3.select(this).attr('x');
		let sy = d3.select(this).attr('y');
		let x = sx - mouse['x'] + 20;
		let y = sy - mouse['y'] + 20;
		if (Math.sqrt(x*x + y*y) < d3.select(this).attr('width') - 30) {
			snitchCollision = true;
		}
	});

	if (snitchCollision) {
		currentScore += 100;
		snitch.attr('x', function() { return scales.snitchXScale(randNumGenerator(width)); })
          .attr('y', function() { return scales.snitchYScale(randNumGenerator(height)); });
	}

	bludgerCollision = false;
	snitchCollision = false;
}

flyingBludgers(bludgers);
setInterval(scoreUpdater, 100);
d3.timer(checkCollisions);