
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
  
  // ゲームオーバー判定の緩和（猶予期間）
  if(this.y <= 100 + this.r && this.hit){
    if(!this.dangerTimer) this.dangerTimer = 0;
    this.dangerTimer += 1/60; // 60fpsと想定
    if(this.dangerTimer >= 3.0){ // 3秒経過でゲームオーバー
      gameover = true;
    }
  } else {
    this.dangerTimer = 0;
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
   this.vx *=  0.98; // 摩擦を少なく (0.95 -> 0.98)
  }
  this.y  += this.vy; 
  this.x  += this.vx;
  
  this.rot += this.vx / ((2 *this.r) * Math.PI)
  this.rot *= 0.85 // 回転の減衰を少なく (0.7 -> 0.85)
  this.angle += this.rot
 }
draw(){

 let size = 40*(1.25 ** this.level)

 ctx.save()

 ctx.translate(this.x , this.y)
 ctx.rotate(this.angle)

  // 危険な状態(dangerTimer > 0)のときに赤く点滅させる
  if(this.dangerTimer > 0 && Math.floor(Date.now() / 200) % 2 === 0){
    ctx.globalCompositeOperation = "source-atop";
    ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
    ctx.fillRect(-size, -size, size*2, size*2);
    ctx.globalCompositeOperation = "source-over";
  }

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