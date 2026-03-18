
// Player.js //

class Player {
 constructor() {
  this.x     = 960 ;
  this.y     = 100 ;
  this.speed = 5  ;
 }
 update(){
  if(key.Right   ) this.x += this.speed ;
  if(key.Left    ) this.x -= this.speed ;
  this.x = Math.max(620 +20*(1.25 ** now) , Math.min(this.x, 1300 -20*(1.25 ** now)));
  if(key.Enter ){
  key.Enter = false; // 連続発火を防ぐため消費する
  if(canDrop){
  canDrop = false;
  let f = new Fruits(this.x + Math.random() *2 -1, this.y);
  fruits.push(f);
  lastDropped = f; // 最後に落としたフルーツを記録
  // now と next はフルーツが着地・衝突・合体した時に更新する
  }
  }
 }
 draw(){
  ctx.drawImage(img[11], this.x, this.y, 12, 960);
  // canDrop が true（次を落とせる状態）の時だけ持ち手フルーツを表示
  if(canDrop){
   ctx.drawImage(img[now-1], this.x -40*(1.25 ** now), this.y -40*(1.25 ** now), 40*(1.25 ** now) *2, 40*(1.25 ** now) *2);
  }
 }
}

const player = new Player();