var width = 1200,
    height = 400;

//Create SVG in #viz
var svg = d3.select('#viz')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .style('background', "#454954")
    .style('border', '2px solid #656d78')

//Create defs
var defs = d3.select('svg').append("svg:defs");

defs.append("svg:clipPath")
        .attr("id", "textclip")
        .append("svg:circle")
        .attr("width", 180)
        .attr("height", 180)
        .attr("x", 200)
        .attr("y", 50)
        .attr("cx", 288)
        .attr("cy", 152)
        .attr("r", 71)
        .attr("clipPathUnits","objectBoundingBox")
        .style("border", "black")

function imgPerfilAD3(imagen){

var imgs = svg.selectAll("image").data([0]);
    imgs.enter()
    .append("svg:image")
    .attr("xlink:href", imagen)
    .attr("width", 180)
    .attr("height", 180)
    .attr("x", 200)
    .attr("clip-path", "url(#textclip)")
    .attr("y",50);


}


// var width = 1200,
//     height = 400;

// //Create SVG in #viz
// var svg = d3.select('#viz')
//     .append('svg')
//     .attr('width', width)
//     .attr('height', height)
//     .style('background', "#454954")
//     .style('border', '2px solid #656d78')

// //Create defs
// d3.select('svg').append('defs')

// //Create clippath with #mask
// d3.select('defs').append('clippath')
//     .attr('id', 'mask')

// function imgPerfilAD3(imagen){

// var imgs = svg.selectAll("image").data([0]);
//     imgs.enter()
//     .append("svg:image")
//     .attr("xlink:href", imagen)
//     .attr("width", 180)
//     .attr("height", 180)
//     .attr("x", 200)
//     .attr("y",50);

// }

// //Create the circle mask
// d3.select('clippath').append('circle') 
//     .attr("width", 50)
//     .attr("height", 50)
//     .attr("cx", 200)
//     .attr("cy", 50)
//     .attr("r", 50) 
//     .style("stroke", "000000")

