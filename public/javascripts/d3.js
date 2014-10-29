var width = 1200,
    height = 400;

var negativo = '#d34055',
  neutro = '#ffce55',
  positivo = '#a0d468';

//Create SVG in #viz
var svg = d3.select('#viz')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .style('background', "#454954")
  .style('border', '2px solid #656d78')

//Create defs (mascara)
var defs = d3.select('svg').append("svg:defs");

defs.append("svg:clipPath")
  .attr("id", "textclip")
  .append("svg:circle")
  .attr("width", 140)
  .attr("height", 140)
  .attr("cx", 270)
  .attr("cy", 126)
  .attr("r", 64)

 //Traigo la imagen y le creo los circulos 
function imgPerfilAD3(imagen){

  //círculo principal   
  d3.select('svg').append('circle') 
    .attr("cx", 270)
    .attr("cy", 126)
    .attr("r", 74) 
    .style("fill", "#ed5564")


  var circle = svg.selectAll("circle")
    .data([84, 94, 104], function(d) { return d; });

  circle.enter().append("circle")
    .attr("cx", 270)
    .attr("cy", 126)
    .attr("stroke-width", 1)
    .attr("stroke", negativo)
    .style("fill", "none")
    .attr("r", function(d) { return (d); });

  var imgs = svg.selectAll("image").data([0]);

  imgs.enter()
    .append("svg:image")
    .attr("xlink:href", imagen)
    .attr("width", 140)
    .attr("height", 140)
    .attr("x", 200)
    .attr("clip-path", "url(#textclip)")
    .attr("y",50);

} //Fin imgPerfilAD3


//Creo circulos positivos
function circPos(){

 d3.select('svg').append('circle') 
    .attr("cx", Math.floor(Math.random() * 2000))
    .attr("cy", Math.floor(Math.random() * 1000))
    .attr("r", 14) 
    .style("fill", positivo);
}

//Creo circulos negativos
function circNeg(){

 d3.select('svg').append('circle') 
    .attr("cx", Math.floor(Math.random() * 2000))
    .attr("cy", Math.floor(Math.random() * 1000))
    .attr("r", 14) 
    .style("fill", negativo);
}

//Creo circulos neutros
function circNeu(){

 d3.select('svg').append('circle') 
    .attr("cx", Math.floor(Math.random() * 2000))
    .attr("cy", Math.floor(Math.random() * 1000))
    .attr("r", 14) 
    .style("fill", neutro);
}
