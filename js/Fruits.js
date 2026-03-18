
// Fruits.js //

class Fruits {
 constructor(x, y) {
  this.level = now ;
  this.r  = 20*(1.25 ** now);
  this.x     = x;
  this.y     = y;
  this.vx    = 0   ;
  this.vy    = 0   ;
  this.rot   = 0   ;
  this.angle = 0   ;
  this.hit = false;
 }
 update(){
  this.vy += gravity
  if(
  this.x <= 620  +this.r ||
  this.x >= 1300 -this.r
  ){
  this.x = Math.max(620 + this.r ,Math.min(this.x ,1300 - this.r))
  this.vx *= -0.2
  }
  if(
  this.y <= 100 +this.r &&
  this.hit
  ){
   gameover = true;
  }
  if(this.y >= 1060 -this.r){
   if (!this.hit && this === lastDropped) {
      if (!canDrop) {
        canDrop = true;
        now = next;
        next = Math.floor(Math.random()*5) +1;
      }
   }
   this.hit = true
   this.y = Math.max(0 ,Math.min(this.y ,1060 -this.r))
   this.vy *= -0.1;
   this.vx *=  0.95; 
  }
  this.y  += this.vy; 
  this.x  += this.vx;
  
  this.rot += this.vx / ((2 *this.r) * Math.PI)
  this.rot *= 0.7
  this.angle += this.rot
 }
draw(){

 let size = 40*(1.25 ** this.level)

 ctx.save()

 ctx.translate(this.x , this.y)
 ctx.rotate(this.angle)

 ctx.drawImage(
  img[this.level-1],
  -size,
  -size,
  size*2,
  size*2
 )

 ctx.restore()

}
}

const fruits = [];