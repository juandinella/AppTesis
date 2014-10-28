//Creo el 'canvas'
var width = 1200,
    height = 400;

var svg = d3.select('#viz').append('svg')
    .attr('width', width)
    .attr('height', height)
    .style('background', "#454954")
    .style('border', '2px solid #656d78')


function imgPerfilAD3(imagen){

var imgs = svg.selectAll("image").data([0]);
    imgs.enter()
    .append("svg:image")
    .attr("xlink:href", imagen)
    .attr("width", 180)
    .attr("height", 180)
    .attr("x", 200)
    .attr("y",50);

// var defs = img.selectAll("defs")
    
}



  // var g = svg.append("g");

  // var img = g.append("svg:image")
  //   .attr("xlink:href", imagen)
  //   .attr("width", 180)
  //   .attr("height", 180)
  //   .attr("x", 200)
  //   .attr("y",50)  
  //   .attr('clip-path', 'url(#mask)'); 