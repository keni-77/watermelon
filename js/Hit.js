function Hit(a,b,c){

  let r = a.r + b.r
  let e = 0.45; // 反発係数（0.3 -> 0.45 に強化）
  let massA = 1.05 ** a.level + 0.5 // 質量を軽く調整 (1.1 -> 1.05)
  let massB = 1.05 ** b.level + 0.5
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
    // スイカ（レベル11）同士の合体
    if(a.level === 11){
      score += 1000;
      // 両方のスイカを削除する
      // b(インデックスc)を先に削除
      fruits.splice(c, 1);
      // aも削除する必要がある。aは呼び出し側のループのインデックスiに対応する
      // aを削除可能にするために、特殊なフラグを立てるか、直接fruitsから探して削除する
      let aIndex = fruits.indexOf(a);
      if(aIndex !== -1) fruits.splice(aIndex, 1);
      
      // 合体エフェクトとしての衝撃波（周囲を強く吹き飛ばす）
      let mx = (a.x + b.x) / 2;
      let my = (a.y + b.y) / 2;
      for(let f of fruits){
        let pdx = f.x - mx;
        let pdy = f.y - my;
        let pdist = Math.sqrt(pdx * pdx + pdy * pdy);
        if(pdist < 300 && pdist > 0){
          let pushPower = (1 - pdist / 300) * 20;
          f.vx += (pdx / pdist) * pushPower;
          f.vy += (pdy / pdist) * pushPower;
        }
      }
      return; // 合体完了
    }

    score += 2 ** (a.level - 1)
    a.level += 1;
    a.r = (20 * layout.fruitScale) * (1.25 ** a.level);
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

    // 合体時の「バースト」効果：周囲のフルーツを少しだけ弾き飛ばす
    for(let f of fruits){
      if(f === a) continue;
      let pdx = f.x - a.x;
      let pdy = f.y - a.y;
      let pdist = Math.sqrt(pdx * pdx + pdy * pdy);
      // 合体後のフルーツの半径の2倍以内の距離にあるものを対象
      let range = a.r * 2.5;
      if(pdist < range && pdist > 0){
        let overlap = (a.r + f.r) - pdist;
        let pnx = pdx / pdist;
        let pny = pdy / pdist;
        
        // 押し出し強度
        let pushPower = (overlap > 0) ? (overlap / a.r) * 15 : (1 - pdist/range) * 5;
        f.vx += pnx * pushPower;
        f.vy += pny * pushPower;

        // 壁や他フルーツに挟まれている場合の反動
        if (overlap > 0) {
          f.x += pnx * overlap * 0.5;
          f.y += pny * overlap * 0.5;
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
    impulse *= 1.1; // 反応を少し抑えめに (1.2 -> 1.1)
    a.vx += (impulse / massA) * nx
    a.vy += (impulse / massA) * ny
    b.vx -= (impulse / massB) * nx
    b.vy -= (impulse / massB) * ny
   }

  }
 }
}