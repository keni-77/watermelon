
// Fruits.js //

class Fruits {
 constructor(x, y) {
  this.level = now ;
  this.r  = (20 * layout.fruitScale) * (1.25 ** now);
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
  
  let leftWall = layout.boxLeft + 20;
  let rightWall = layout.boxRight - 20;
  
  if(
  this.x <= leftWall  +this.r ||
  this.x >= rightWall -this.r
  ){
  this.x = Math.max(leftWall + this.r ,Math.min(this.x ,rightWall - this.r))
  this.vx *= -0.2
  }
  
  if(this.y <= layout.spawnY + this.r && this.hit){
    if(!this.dangerTimer) this.dangerTimer = 0;
    this.dangerTimer += 1/60; 
    if(this.dangerTimer >= 3.0){ 
      gameover = true;
    }
  } else {
    this.dangerTimer = 0;
  }

  let floor = layout.boxBottom;
  if(this.y >= floor -this.r){
   if (!this.hit && this === lastDropped) {
      if (!canDrop) {
        canDrop = true;
        now = next;
        next = Math.floor(Math.random()*5) +1;
      }
   }
   this.hit = true
   this.y = Math.min(this.y ,floor -this.r)
   this.vy *= -0.1;
   this.vx *=  0.98;
  }
  this.y  += this.vy; 
  this.x  += this.vx;
  
  this.rot += this.vx / ((2 *this.r) * Math.PI)
  this.rot *= 0.85
  this.angle += this.rot
 }
 draw(){
  let size = (40 * layout.fruitScale) * (1.25 ** this.level)
  ctx.save()
  ctx.translate(this.x , this.y)
  ctx.rotate(this.angle)

  if(this.dangerTimer > 0 && Math.floor(Date.now() / 200) % 2 === 0){
    ctx.globalCompositeOperation = "source-atop";
    ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
    ctx.fillRect(-size, -size, size*2, size*2);
    ctx.globalCompositeOperation = "source-over";
  }

  ctx.drawImage(img[this.level-1], -size, -size, size*2, size*2)
  ctx.restore()
 }
}

const fruits = [];