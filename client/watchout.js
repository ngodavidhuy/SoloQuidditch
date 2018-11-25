// start slingin' some d3 here.

///////////////////////////////////////////////////////////////
// SETTINGS

let width = window.innerWidth;
let height = window.innerHeight;

let scales = {
	bludgerScale: d3.scale.linear().domain([0, width]).range([7,12]),
};

let settings = {
	bludgerCount: scales.bludgerScale(width)
};

let mouse = {
	x: undefined,
	y: undefined,
};

let currentScore = 0;
let bestScore = 0;

///////////////////////////////////////////////////////////////

let gameBoard = d3.select('.board')
									.append('svg')
									.attr('width', width)
									.attr('height', height);						

let bludgers = gameBoard.selectAll('.bludger')
												.data(d3.range(settings.bludgerCount))
												.enter()
												.append('image')
												.attr('class', 'bludger')
												.attr('xlink:href', 'bludger.png')
												.attr('x', function() { return randNumGenerator(width); })
                    		.attr('y', function() { return randNumGenerator(height); })
                    		.attr('width', 50)
                    		.attr('height', 50);

let snitch = gameBoard.selectAll('.snitch')
                  		.data(d3.range(1))
											.enter()
											.append('image')
											.attr('class', 'snitch')
											.attr('xlink:href', 'snitch.png')
											.attr('x', function() { return randNumGenerator(width); })
                    	.attr('y', function() { return randNumGenerator(height); })
											.attr('width', 100)
		                  .attr('height', 100);

let harry = gameBoard.selectAll('.player')
									.data(d3.range(1))
									.enter()
									.append('image')
									.attr('class', 'player')
									.attr('xlink:href', 'harry.png')
									.attr('x', (width / 2))
									.attr('y', (height / 2))
									.attr('width', 100)
                  .attr('height', 100);			                  

gameBoard.on('mousemove', function()  {
	let loc = d3.mouse(this);
	mouse['x'] = loc[0];
	mouse['y'] = loc[1];
	harry.attr('x', loc[0] - 50).attr('y', loc[1] - 50);
});



///////////////////////////////////////////////////////////////
// FUNCTIONS

function randNumGenerator(n) {
	return Math.floor(Math.random() * n);
};

function flyingBludgers(bludgers) {
	bludgers.transition()
					.duration(2000)
					.attr('x', function() { return randNumGenerator(width); })
          .attr('y', function() { return randNumGenerator(height); })
          .each('end', function() {
          	flyingBludgers(d3.select(this));
          })
}

function interaction() {
	
}

flyingBludgers(bludgers);
















































// let harry = gameBoard.selectAll('.player')
// 									.data(d3.range(1))
// 									.enter()
// 									.append('circle')
// 									.attr('class', 'player')
// 									.attr('fill', 'black')
// 									.attr('cx', (width / 2))
// 									.attr('cy', (height / 2))
// 									.attr('r', settings.playerOneRadius);




// let bludgers = gameBoard.selectAll('.bludger')
//                     .data(d3.range(settings.bludgerCount))
//                     .enter().append('embed').attr('class', 'bludger')
//                     .attr('src', 'bludger.png')
//                     .attr('x', function() { return randNumGenerator(width); })
//                     .attr('y', function() { return randNumGenerator(height); })
//                     // .attr('r', settings.bludgerRadius )




