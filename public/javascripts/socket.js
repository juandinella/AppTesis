var socket = io.connect('http://juancito.com:8079');

socket.on('news', function (data) {
  console.log(data);
});
      
socket.on('devolverDatos', function (data) {
  var datos = document.getElementById("datos");
  datos.innerHTML = "";
  var mensajes = data.mensajes;
  var score = data.score;
  
  for(var i = 0; i < mensajes.length; i++){
    console.log(score[i]);
    // datos.innerHTML +=  "<p>" + mensajes[i] + "<span>" + "  score:" + " " +score[i]+ "</span>"+"</p>";
  }

 
var height = 400,
    width = 600,
    barWidth = 50,
    barOffset = 5;

var tempColor;

var colors = d3.scale.linear()
.domain([0, score.length*.33, score.length*.66, score.length])
.range(['#B58929','#C61C6F', '#268BD2', '#85992C'])

var yScale = d3.scale.linear()
        .domain([0, d3.max(score)])
        .range([0, height]);

var xScale = d3.scale.ordinal()
        .domain(d3.range(0, score.length))
        .rangeBands([0, width])

var tooltip = d3.select('body').append('div')
        .style('position', 'absolute')
        .style('padding', '0 10px')
        .style('background', 'white')
        .style('opacity', 0)

var myChart = d3.select('#chart').append('svg')
    .attr('width', width)
    .attr('height', height)
    .selectAll('rect').data(score)
    .enter().append('rect')
        .style('fill', function(d,i) {
            return colors(i);
        })
        .attr('width', xScale.rangeBand())
        .attr('x', function(d,i) {
            return xScale(i);
        })
        .attr('height', 0)
        .attr('y', height)

    .on('mouseover', function(d) {

        tooltip.transition()
            .style('opacity', .9)

        tooltip.html(d)
            .style('left', (d3.event.pageX - 35) + 'px')
            .style('top',  (d3.event.pageY - 30) + 'px')


        tempColor = this.style.fill;
        d3.select(this)
            .style('opacity', .5)
            .style('fill', 'yellow')
    })

    .on('mouseout', function(d) {
        d3.select(this)
            .style('opacity', 1)
            .style('fill', tempColor)
    })

myChart.transition()
    .attr('height', function(d) {
        return yScale(d);
    })
    .attr('y', function(d) {
        return height - yScale(d);
    })
    .delay(function(d, i) {
        return i * 20;
    })
    .duration(1000)
    .ease('elastic')



});





