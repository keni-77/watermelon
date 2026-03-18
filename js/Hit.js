function Hit(a,b,c){

 let r = a.r + b.r
 let e = 0.3; // 反発係数（0.3 = 少し弾む、元の-2だとほぼ弾まない）
 let massA = 1.1 ** a.level + 1
 let massB = 1.1 ** b.level + 1
 let dx = a.x - b.x;
 let dy = a.y - b.y;
 let dist = Math.sqrt(dx ** 2 + dy ** 2);
 if(dist === 0) return; // ゼロ除算防止
 let nx = dx / dist;
 let ny = dy / dist;
 let vx = a.vx - b.vx;
 let vy = a.vy - b.vy;
 let dot = nx * vx + ny * vy;
 let over = r - dist;
 if(dist <= r){
  // 最後に落としたフルーツが何かに衝突したら次を落とせるようにする
  if (a === lastDropped || b === lastDropped) {
     if (!canDrop) {
       canDrop = true;
       now = next;
       next = Math.floor(Math.random()*5) +1;
     }
  }
  
  if(a.level === b.level){
   score += 2 ** (a.level - 1)
   console.log(score);
   a.level += 1;
   a.r = 20 * (1.25 ** a.level);
   let mx = (a.x + b.x)/2;
   let my = (a.y + b.y)/2;
   a.x = mx;
   a.y = my;
   a.vx = 0;
   a.vy = 0;
   a.hit = false; // 合体直後は「未接触」扱い
   fruits.splice(c ,1);

   // 合体時にも次を落とせるようにする
   if (!canDrop) {
     canDrop = true;
     now = next;
     next = Math.floor(Math.random()*5) +1;
   }

   // 合体後のフルーツと重なっているフルーツを処理
   let chainMerge = true;
   while(chainMerge){
    chainMerge = false;
    for(let i = 0; i < fruits.length; i++){
     let f = fruits[i];
     if(f === a) continue;
     let pdx = f.x - a.x;
     let pdy = f.y - a.y;
     let pdist = Math.sqrt(pdx * pdx + pdy * pdy);
     let overlap = (a.r + f.r) - pdist;
     if(overlap > 0 && pdist > 0){
      if(f.level === a.level){
       // 同じレベルなら連鎖合体
       score += 2 ** (a.level - 1);
       console.log(score);
       a.level += 1;
       a.r = 20 * (1.25 ** a.level);
       a.x = (a.x + f.x)/2;
       a.y = (a.y + f.y)/2;
       a.vx = 0;
       a.vy = 0;
       fruits.splice(i, 1);
       chainMerge = true; // もう一度チェック
       break;
      }else{
       // 違う種類なら押し出す
       let pnx = pdx / pdist;
       let pny = pdy / pdist;
       f.x += pnx * overlap;
       f.y += pny * overlap;
       f.vx += pnx * 2;
       f.vy += pny * 2;
      }
     }
    }
   }
  }else{
   a.hit = true ;
   b.hit = true ;

   // めり込み補正（完全に押し出す）
   a.x += over * nx * (massB / (massA + massB))
   b.x -= over * nx * (massA / (massA + massB))
   a.y += over * ny * (massB / (massA + massB))
   b.y -= over * ny * (massA / (massA + massB))

   // 近づいている場合のみ衝突応答
   if(dot < 0){
    let impulse = (-(1 + e) * dot) / (1/massA + 1/massB)
    a.vx += (impulse / massA) * nx
    a.vy += (impulse / massA) * ny
    b.vx -= (impulse / massB) * nx
    b.vy -= (impulse / massB) * ny
   }

  }
 }
}