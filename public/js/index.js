(()=>{"use strict";function t(t,e,i,s,a,n){t.fillStyle=n,t.fillRect(e,i,s,a)}var e,i=function(){function e(t,e,i){this.canvasContext=t,this.canvas=e,this.size=i,this.size=this.size,this.x=Math.floor(Math.random()*this.canvas.width/this.size)*this.size,this.y=Math.floor(Math.random()*this.canvas.height/this.size)*this.size,this.color="red"}return e.prototype.update=function(){},e.prototype.draw=function(){t(this.canvasContext,this.x,this.y,this.size,this.size,this.color)},e}(),s=function(){function e(t,e,i,s,a){this.die=!1,this.canvasContext=t,this.canvas=e,this.x=i,this.y=s,this.size=a,this.tail=[{x:this.x,y:this.y}],this.rotateX=0,this.rotateY=1}return e.prototype.update=function(){this.move(),this.checkHitWall(),this.checkHitSnake()},e.prototype.draw=function(){for(var e=0;e<this.tail.length;e++)t(this.canvasContext,this.tail[e].x+2.5,this.tail[e].y+2.5,this.size-5,this.size-5,"white")},e.prototype.move=function(){var t;1==this.rotateX?t={x:this.tail[this.tail.length-1].x+this.size,y:this.tail[this.tail.length-1].y}:-1==this.rotateX?t={x:this.tail[this.tail.length-1].x-this.size,y:this.tail[this.tail.length-1].y}:1==this.rotateY?t={x:this.tail[this.tail.length-1].x,y:this.tail[this.tail.length-1].y+this.size}:-1==this.rotateY&&(t={x:this.tail[this.tail.length-1].x,y:this.tail[this.tail.length-1].y-this.size}),this.tail.shift(),this.tail.push(t)},e.prototype.checkHitWall=function(){var t=this.tail[this.tail.length-1];t.x==-this.size?t.x=this.canvas.width-this.size:t.x==this.canvas.width?t.x=0:t.y==-this.size?t.y=this.canvas.height-this.size:t.y==this.canvas.height&&(t.y=0)},e.prototype.checkHitSnake=function(){var t=this.tail[this.tail.length-1];this.tail.filter((function(e){return e.x==t.x&&e.y==t.y})).length>1&&(this.die=!0)},e}(),a=function(){function e(t,a,n){this.canvas=t,this.score=n,this.canvasContext=a,e.snake=new s(this.canvasContext,this.canvas,20,20,20),this.apple=new i(this.canvasContext,this.canvas,e.snake.size)}return e.prototype.gameLoop=function(t){var i=this,s=this.canvas.width*this.canvas.height/(e.snake.size*e.snake.size);this.GameID=setInterval((function(){if(e.snake.die){i.stopGame();var a={won:!1,message:"Dead",score:parseInt(i.score.innerHTML)};t(a)}else e.snake.tail.length>=s?(i.stopGame(),a={won:!0,message:"You won the game",score:parseInt(i.score.innerHTML)},t(a)):(i.update(),i.draw())}),100)},e.prototype.stopGame=function(){clearInterval(this.GameID)},e.prototype.movementEvents=function(t){"ArrowLeft"==t.key&&1!=e.snake.rotateX?(e.snake.rotateX=-1,e.snake.rotateY=0):"ArrowUp"==t.key&&1!=e.snake.rotateY?(e.snake.rotateX=0,e.snake.rotateY=-1):"ArrowRight"==t.key&&-1!=e.snake.rotateX?(e.snake.rotateX=1,e.snake.rotateY=0):"ArrowDown"==t.key&&-1!=e.snake.rotateY&&(e.snake.rotateX=0,e.snake.rotateY=1)},e.prototype.draw=function(){t(this.canvasContext,0,0,this.canvas.width,this.canvas.height,"black"),t(this.canvasContext,0,0,this.canvas.width,this.canvas.height,""),e.snake.draw(),this.apple.draw()},e.prototype.update=function(){this.canvasContext.clearRect(0,0,this.canvas.width,this.canvas.height),e.snake.update(),this.eatApple()},e.prototype.eatApple=function(){e.snake.tail[e.snake.tail.length-1].x==this.apple.x&&e.snake.tail[e.snake.tail.length-1].y==this.apple.y&&(e.snake.tail[e.snake.tail.length]={x:this.apple.x,y:this.apple.y},this.apple=new i(this.canvasContext,this.canvas,e.snake.size),this.score.innerHTML="".concat(e.snake.tail.length-1))},e}(),n=document.getElementById("canvas"),h=document.getElementById("btn"),o=n.getContext("2d"),l=document.getElementById("score"),r=document.getElementById("scoreMax");function c(t,e){o.save(),o.font="48px Arial",o.textBaseline="top",o.fillStyle=e;var i=o.measureText(t).width,s=n.width/2-i/2;o.fillRect(s,100,i,parseInt("48px Arial",10)),o.fillStyle="#fff",o.fillText(t,s,100),o.restore()}window.onload=function(){window.addEventListener("keydown",(function(t){e.movementEvents(t)}))},h.addEventListener("click",(function(t){null!=e&&(e.stopGame(),e=null),h.innerText="Reset",(e=new a(n,o,l)).gameLoop((function(t){t.score>parseInt(r.innerHTML)&&(r.innerHTML="".concat(t.score)),t.won?c(t.message,"green"):c(t.message,"red")}))}))})();