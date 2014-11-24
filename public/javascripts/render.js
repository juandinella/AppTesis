//Creo una clase singleton/objeto
var Renderizador = new function(){
  /*
   * Defino las variables de configuración
   */
  this.width = 1200; //Ancho del SVG
  this.height = 650; //Alto del SVG
  this.t0 = Date.now();
  this.emocionesOrbitando = false;

  /*
   * Creo el SVG, los 4 layers y el placeholder para defs
   */
  this.svg = d3.select('#viz')
    .append('svg')
    .attr('width', this.width)
    .attr('height', this.height)
    // .style('background', '#454954')
    .style('border', '2px solid #656d78');
    this.gLineasEmociones = d3.select('svg').append('g');
    this.gEmociones = d3.select('svg').append('g');
    this.gFondo     = d3.select('svg').append('g');
    this.gFoto      = d3.select('svg').append('g');
    this.defs = this.svg.append('svg:defs');

  //Placeholder para guardar IDs y sus ubicaciones
  this.usuarios = {};

  /*
   ******************************
   * Aca empieza la Magic Johnson
   ******************************
   */

  /*
   * Creo el borde de la foto(circulos del fondo)
   */
  this.renderBordeFoto = function (usuario) {
    var cx = Renderizador.usuarios[usuario].cx,
        cy = Renderizador.usuarios[usuario].cy,
        radio = Renderizador.usuarios[usuario].radio,
        circulosExteriores = [radio+20,radio+30,radio+40];

    //Círculo relleno
    Renderizador.usuarios[usuario].bordeFoto = Renderizador.gFondo.append('circle')
      .attr('data-usuario', usuario)
      .attr('cx', cx)
      .attr('cy', cy)
      .attr('r', radio+10)
      .style('fill', '#aab2bd');

    //Circulos exteriores (solo borde)
    for (var i = 0;  i < circulosExteriores.length; i++) {  
      Renderizador.gFondo.append('circle')
        .attr('data-usuario', usuario)
        .attr('cx', cx)
        .attr('cy', cy)
        .attr('stroke-width', 1)
        .attr('stroke', '#aab2bd')
        .style('fill', 'none')
        .attr('r', circulosExteriores[i]);
    };

  } //Fin renderBordeFoto

  /*
   * Calculo los rands y hago espacio para un nuevo usuario
   */
  this.nuevoUsuario = function(usuario){
    var radio = Renderizador.randomNumero(30,60);
    var cx, cy;

    var encontrePosicion = false;
    while(encontrePosicion == false){
      encontrePosicion = true;

      cx = Renderizador.randomNumero(radio+10, Renderizador.width -radio-40);
      cy = Renderizador.randomNumero(radio+10, Renderizador.height-radio-40);

      $.each(Renderizador.usuarios, function( index, value ) {
        if(value.visible){
          var x0 = cx;
          var y0 = cy;
          var x1 = value.cx;
          var y1 = value.cy;

          var distanciaEntreCentros = Math.sqrt((x0 -= x1) * x0 + (y0 -= y1) * y0);
          console.log("distancia: " + distanciaEntreCentros);
          if(distanciaEntreCentros < radio*2 + value.radio*2 ){
            encontrePosicion = false;
          }
        }
      });
    }

    Renderizador.usuarios[usuario] = {
      'cx': cx,
      'cy': cy,
      'radio': radio,
      'cantNegativos' : 0,
      'cantNeutrales' : 0,
      'cantPositivos' : 0
    };
  }
  /*
   * Muestro la imagen del perfil
   */
  this.renderFoto = function(imagen, usuario){
    var cx = Renderizador.usuarios[usuario].cx;
    var cy = Renderizador.usuarios[usuario].cy;
    var radio = Renderizador.usuarios[usuario].radio;

    //Creo la mascara
    Renderizador.defs.append('svg:clipPath')
      .attr('id', 'mascara' + usuario)
      .append('svg:circle')
      .attr('data-usuario', usuario)
      .attr('width', radio*2+20)
      .attr('height', radio*2+20)
      .attr('cx', cx)
      .attr('cy', cy)
      .attr('r', radio)

    Renderizador.gFoto
      .append('svg:image')
      .attr('data-usuario', usuario)
      .attr('xlink:href', imagen)
      .attr('width', radio*2+20)
      .attr('height', radio*2+20)
      .attr('x', cx - radio-10)
      .attr('y', cy - radio-10)
      .attr('clip-path', 'url(#mascara' + usuario +')'); //Aplico la mascara

      Renderizador.usuarios[usuario].visible = true;
      Renderizador.renderBordeFoto(usuario);
      Renderizador.orbitarEmociones();
  } //Fin renderFoto

  /*
   * Dibujo todos los circulos
   */
  this.renderCirculos = function(scores, usuario){

    if(typeof Renderizador.usuarios[usuario].gEmociones == 'undefined'){
      Renderizador.usuarios[usuario].gEmociones = Renderizador.gEmociones.append('g').attr('class','gUsuarioEmociones').attr('data-usuario', usuario);
      Renderizador.usuarios[usuario].gLineasEmociones = Renderizador.gLineasEmociones.append('g').attr('class','gUsuarioLineasEmociones').attr('data-usuario', usuario);
    }

    //Para cada circulo
    for (i = 0; i < scores.length; ++i) {
      var score = scores[i];
      var cx = Renderizador.usuarios[usuario].cx,
          cy = Renderizador.usuarios[usuario].cy,
          radio = Renderizador.usuarios[usuario].radio;

      var random = Renderizador.randomCirculo(cx,cy,radio);
      if(score > 0){
        Renderizador.usuarios[usuario].cantPositivos++;
        Renderizador.usuarios[usuario].gEmociones.append('svg:image')
            .attr('data-usuario', usuario)
            .attr('xlink:href', '../images/corazon.svg')
            .attr('width', 16)
            .attr('height', 14)
            .attr('x', random.X)
            .attr('y', random.Y)

        var colorLinea = '#8cc051';
        var modifPos = 10;
      } else if(score < 0){
        Renderizador.usuarios[usuario].cantNegativos++;
        Renderizador.usuarios[usuario].gEmociones.append('svg:image')
          .attr('data-usuario', usuario)
          .attr('xlink:href', '../images/cruz.svg')
          .attr('width', 16)
          .attr('height', 14)
          .attr('x', random.X)
          .attr('y', random.Y);

        var colorLinea = '#db4453';
        var modifPos = 10;
      } else {
        Renderizador.usuarios[usuario].cantNeutrales++;
        Renderizador.usuarios[usuario].gEmociones.append('circle')
          .attr('data-usuario', usuario)
          .attr('cx', random.X)
          .attr('cy', random.Y)
          .attr('r', 8) 
          .style('fill', '#ffce55')
          .attr('stroke-width', 1)
          .attr('stroke', '#f7b94a');

        var colorLinea = '#f9dfa5';
        var modifPos = 0;
      }

      Renderizador.usuarios[usuario].gLineasEmociones.append('line')
        .attr('data-usuario', usuario)
        .attr('x1', cx)
        .attr('y1', cy)
        .attr('x2', random.X + modifPos)
        .attr('y2', random.Y + modifPos)
        .attr('stroke-width', 1)
        .attr('stroke', colorLinea); 

    }//Fin For scores
    Renderizador.colorBordeFoto(usuario);
  }

  /*
   * Ajusto el color del borde de la foto de un usuario dependiendo de sus emociones
   */
  this.colorBordeFoto = function(usuario){
    var dU = Renderizador.usuarios[usuario];
    var bordeFoto = dU.bordeFoto;


    var pct = ((dU.cantNegativos * -1 + dU.cantPositivos) / (dU.cantNeutrales + dU.cantPositivos+ dU.cantNegativos))/2+0.5;

    var coloresSegunPorcentaje = [
      { pct: 0.0, color: { r: 0xff, g: 0x00, b: 0 } },
      { pct: 0.5, color: { r: 255, g: 206, b: 85 } },
      { pct: 1.0, color: { r: 0x00, g: 0xff, b: 0 } } 
    ];

    for (var i = 1; i < coloresSegunPorcentaje.length - 1; i++) {
        if (pct < coloresSegunPorcentaje[i].pct) {
            break;
        }
    }
    var menor = coloresSegunPorcentaje[i - 1];
    var mayor = coloresSegunPorcentaje[i];
    var rango = mayor.pct - menor.pct;
    var rangoPct = (pct - menor.pct) / rango;
    var pctMenor = 1 - rangoPct;
    var pctMayor = rangoPct;
    var color = {
        r: Math.floor(menor.color.r * pctMenor + mayor.color.r * pctMayor),
        g: Math.floor(menor.color.g * pctMenor + mayor.color.g * pctMayor),
        b: Math.floor(menor.color.b * pctMenor + mayor.color.b * pctMayor)
    };
    bordeFoto.style('fill','rgb(' + [color.r, color.g, color.b].join(',') + ')');
    // or output as hex if preferred
  }

  /*
   * Hago girar las emociones alrededor de las fotos
   */
  this.orbitarEmociones = function(){
    if (Renderizador.emocionesOrbitando == false){
      setInterval(function(){
          var delta = (Date.now() - Renderizador.t0);
          var gUsuarios = d3.selectAll("g.gUsuarioEmociones, g.gUsuarioLineasEmociones");
          gUsuarios.each( function(d, i){
              var usuario = d3.select(this).attr("data-usuario"),
                cx = Renderizador.usuarios[usuario].cx,
                cy = Renderizador.usuarios[usuario].cy;

              d3.select(this).attr("transform", "rotate(" + (delta *.01)%360 + "," + cx + "," + cy + ")");
          });
      }, 41);
      Renderizador.emocionesOrbitando = true;
    }

  }
  /*
   * Borro circulo, borde y emociones para un usuario
   */
  this.borrarUsuario = function(usuario){
    $("[data-usuario='" +usuario+"']").fadeOut();
    Renderizador.usuarios[usuario].visible = false;
  };

  /*
   * Funcion helper para generar un numero random que quede cerca del circulo, 
   * pero no dentro del mismo
   */
  this.randomCirculo = function(cx,cy, radio){
    var r1 = radio+40; //Radio del circulo externo, limite hasta donde debe haber fotos
    var r2 = radio+20; //Radio del circulo interno, donde NO debe haber puntos (la foto)

    //Primero genero un punto random en un cuadrado que inscriba al circulo mayor
    do{
      randCx= Math.floor(Math.random() * (2*r1 + 1)) - r1;
      randCy= Math.floor(Math.random() * (2*r1 + 1)) - r1;
      distToCenter = Math.sqrt( Math.pow(randCx,2) + Math.pow(randCy,2) );
    }
    while( distToCenter > r1 || distToCenter < r2);

    var respuesta = {'X': cx+randCx, 'Y': cy+randCy};
    return respuesta;
  }
  /*
   * Funcion helper para generar un numero random entre dos numeros
   */
  this.randomNumero = function(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
  }

}