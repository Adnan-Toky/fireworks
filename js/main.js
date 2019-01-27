var c,w,h;
window.onload=function(){
  w = window.innerWidth;
  h = window.innerHeight;
  if(w < 100 || h < 100){
    w = 360;
    h = 560;
  }

  c = document.getElementById("myCanvas");
  c.height = h;
  c.width = w;
  var ctx = c.getContext("2d");

  var particle = {
    number: 80,
    radius: 2,
    velocity: 6,
    acceleration: .04,
    time: 1,
    angle: Math.PI/this.number
  }

  var rocket = {
    number: 5,
    x: w/2,
    y: h/2,
    h: w/2,
    max: 4,
  }

  var rockets = [];

  var z = 1;
  if(z > (rocket.max-1)){
    z = 0;
  }

  var countTouch = 0;
  var maxCountTouch = 3;

  var bdColors = ["225,27,28","0,107,79"];


  function rocketBuilder(p,q,r){
    rockets[p] = [];
    for(n = 0;n < particle.number;n++){
      rockets[p][n] = {
        x: q,
        y: r,
        dx: particle.velocity*Math.cos(particle.number*n)*Math.random()/1.2,
        dy: particle.velocity*Math.sin(particle.number*n)*Math.random(),
        red: Math.floor(Math.random()*255),
        green: Math.floor(Math.random()*255),
        blue: Math.floor(Math.random()*255)
      }
      if(z%2 == 0){
        rockets[p][n].color = bdColors[Math.floor(Math.random()*2)]
      }
    }
    rockets[p][particle.number+1] = 1;
  }

  rocketBuilder(0,rocket.x,rocket.y);


  function clearCanvas(){
    ctx.beginPath();
    ctx.rect(0,0,w,h);
    ctx.fillStyle = "rgba(0,0,0,.06)";
    ctx.fill();
    ctx.closePath();
  }

  function fade(i){
    rockets[i][particle.number+1] -= .007;
  }

  function draw(i,interval){
    clearCanvas();
    for(n = 0;n<particle.number;n++){
      ctx.beginPath();
      ctx.arc(rockets[i][n].x,h-rockets[i][n].y,particle.radius,0,Math.PI*2);
      if(rockets[i][n].color){
          ctx.fillStyle = "rgba("+rockets[i][n].color+","+rockets[i][particle.number+1]+")";
      }
      else{
          ctx.fillStyle = "rgba("+rockets[i][n].red+","+rockets[i][n].green+","+rockets[i][n].blue+","+rockets[i][particle.number+1]+")";
      }
      ctx.fill();
      ctx.closePath();
      rockets[i][n].x += rockets[i][n].dx;
      rockets[i][n].y += rockets[i][n].dy;
      rockets[i][n].dy -= particle.acceleration*particle.time;
    }
    if(rockets[i][particle.number-1].y < 200){
      fade(i);
      if(rockets[i][particle.number+1] < 0){
        clearInterval(interval)
        randomUpdate();
      }
    }
  }

  function update(k){
    setTimeout(function(){
    var intv = setInterval(function(){
        draw(k,intv);
      },15)
    },1000)
  }

  function randomUpdate(){
    rocketBuilder(z,Math.floor(Math.random()*w),Math.floor(Math.random()*h));
    update(z);
    z++;
  }


  update(0);

  c.addEventListener("mousedown",function(e){
    if(countTouch < maxCountTouch){
      var pointX = parseInt(e.clientX);
      var pointY = parseInt(e.clientY);
      rocketBuilder(z,pointX,h-pointY);
      update(z);
      z++;
      countTouch++;
    }
  })
}

window.onresize = function(){
    w = window.innerWidth;
    h = window.innerHeight;
    c.height = h;
    c.width = w;
}
