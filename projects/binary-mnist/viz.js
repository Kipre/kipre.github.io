const margin = {
    top: 20,
    right: 20,
    bottom: 40,
    left: 40
};

const size = 20;

const fullHeight = 500;
const height = fullHeight - margin.top - margin.bottom;
const width = fullHeight - margin.left - margin.right;
var latestX;
var latestY;

// const workspace = d3.select('#workspace-canvas').node();
// const wctx = workspace.getContext('2d');

// function paintImg2(context, img, label, x, y) {
//     const imgData = context.createImageData(20, 20);
//     for (let i = 0; i < img.length; i++) {
//         imgData.data[4 * i + 3] = (img[i]) ? 150 : 0;
//     }
//     wctx.clearRect(0, 0, 20, 20);
//     wctx.putImageData(imgData, 0, 0);
//     context.drawImage(workspace, x(label[0]) - 10, y(label[1]) - 10);
// }

function paintImg(context, img, label, x, y) {
    for (let i = 0; i < img.length; i++) {
        if (img[i]) {
            context.globalAlpha = 0.5;
            context.fillRect(x(label[0]) - 10 + i % size, y(label[1]) - 10 + Math.floor(i / size), 1, 1)
        }
    }
}

function paintCanvas(canvas, examples, labels, x, y) {
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    // draw image for each point 
    for (let i = 0; i < examples.length; i++) {
        paintImg(context, examples[i], labels[i], x, y)
    }
}

// Make a container div for our graph elements to position themselves against
const graphDiv = d3.select('#visualization').style('position', 'relative').style('min-width', '500px');

// Make a canvas for the points
const canvas = graphDiv.append('canvas').attr('height', height).attr('width', width).style('position', 'absolute').style('top', margin.top + 'px').style('left', margin.left + 'px');

const svg = graphDiv.append('svg').style('position', 'absolute').attr('height', height + margin.top + margin.bottom).attr('width', width + margin.left + margin.right);

// Create groups for axes
const xAxisG = svg.append('g').attr('class', 'x').attr('transform', 'translate(' + margin.left + ', ' + (margin.top + height) + ')');

const yAxisG = svg.append('g').attr('class', 'y').attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

function rescale(labels) {
    // Create scales
    const x = d3.scaleLinear().domain(d3.extent(labels.map(e=>e[0]))).range([0, width]);
    const y = d3.scaleLinear().domain(d3.extent(labels.map(e=>e[1]))).range([height, 0]);
    // Create axes
    const xAxis = d3.axisBottom().scale(x);

    const yAxis = d3.axisLeft().scale(y);

    xAxisG.call(xAxis);
    yAxisG.call(yAxis);
    return [x, y];
}

export function plot(examples, labels) {
    [latestX,latestY] = rescale(labels);
    paintCanvas(canvas.node(), examples, labels, latestX, latestY);
}

export function addExampleToPlot(example, coordinates) {
    if (latestX != undefined) {
        const context = canvas.node().getContext("2d");
        context.fillStyle = 'red'
        context.globalAlpha = 1;
        paintImg(context, example, coordinates, latestX, latestY)
        context.fillStyle = 'black'
        context.globalAlpha = 0.5;
    } else {
        throw new Error('Scales are not yet initialized')
    }
}
