
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
  // 1. 古い雲の棒（クレーン）の描画（一番背面）
  ctx.drawImage(img[11], this.x, this.y, 12, 960);
  
  // 2. 雲の画像(Cloud.png)をキャンバス上に描画（棒の少し左、少し上に大きめに配置）
  // 以前のy-65から y-110 まで上に引き上げる（フルーツより背面になるよう先に描画）
  if(img[25]) {
    ctx.drawImage(img[25], this.x - 210, this.y - 110, 200, 140);
  }

  // 3. 持ち手フルーツを描画（雲の後から描画することで前面に表示される）
  let radius = 40*(1.25 ** now);
  if(canDrop){
   ctx.drawImage(img[now-1], this.x -radius, this.y -radius, radius *2, radius *2);
  }

  // ポーズ用の透明なdiv（#pauseToggleBtn）の位置も、画像に合わせて上にずらす
  const pauseBtn = document.getElementById('pauseToggleBtn');
  if(pauseBtn) {
    pauseBtn.style.left = (this.x - 210) + 'px'; 
    pauseBtn.style.top = (this.y - 110) + 'px';
    pauseBtn.style.width = '200px';
    pauseBtn.style.height = '140px';
  }
 }
}

const player = new Player();