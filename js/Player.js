
// Player.js //

class Player{
 constructor(){
  this.x = 960; 
  this.y = 100; 
  this.speed = 7; // 速度を少し抑制 (10 -> 7)
  this.targetX = 960; // スムーズな移動のための目標座標
 }
 update(){
  this.y = layout.spawnY;

  // キーボード移動
  if(key.Right) this.targetX += this.speed ;
  if(key.Left)  this.targetX -= this.speed ;
  
  // マウス/タッチ移動
  if(key.isDragging){
    this.targetX = pointerX;
  }

  // 目標座標へ滑らかに近づける (Lerp)
  // PCでのマウス操作でも「吸い付く」ような心地よい動きにします
  this.x += (this.targetX - this.x) * 0.2;

  // 範囲制限
  let margin = 20 * (1.25 ** now);
  this.x = Math.max(layout.boxLeft + margin , Math.min(this.x, layout.boxRight - margin));
  
  // targetXも制限内に収めておく
  this.targetX = Math.max(layout.boxLeft + margin , Math.min(this.targetX, layout.boxRight - margin));

  if(key.Enter ){
    key.Enter = false;
    if(canDrop){
      canDrop = false;
      let f = new Fruits(this.x, this.y); // 微妙なランダム性は一旦除去して精密操作を優先
      fruits.push(f);
      lastDropped = f;
    }
  }
 }
 draw(){
  // 棒の長さもレイアウトに合わせる
  ctx.drawImage(img[11], this.x, this.y, 12, layout.boxBottom - layout.boxTop);
  
  if(img[25]) {
    ctx.drawImage(img[25], this.x - 210, this.y - 110, 200, 140);
  }

  let radius = (40 * layout.fruitScale) * (1.25 ** now);
  if(canDrop){
   ctx.drawImage(img[now-1], this.x -radius, this.y -radius, radius *2, radius *2);
  }
 }
}