
// Main.js // 

let isPlaying = false;
let isGameOverScreenShown = false; 
let isPaused = false;

const homeScreen = document.getElementById('homeScreen');
const gameOverScreen = document.getElementById('gameOverScreen');
const scoreText = document.getElementById('scoreText');

const startBtn = document.getElementById('startBtn');
const howToPlayBtn = document.getElementById('howToPlayBtn');
const closeHowToPlayBtn = document.getElementById('closeHowToPlayBtn');
const howToPlayScreen = document.getElementById('howToPlayScreen');
const retryBtn = document.getElementById('retryBtn');
const homeBtn = document.getElementById('homeBtn');

const pauseScreen = document.getElementById('pauseScreen');
const resumeBtn = document.getElementById('resumeBtn');
const pauseHomeBtn = document.getElementById('pauseHomeBtn');
const pauseToggleBtn = document.getElementById('pauseToggleBtn');

// プレイヤーオブジェクトの生成
const player = new Player();

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isPlaying && !gameover) {
        if (!isPaused) {
            isPaused = true;
            pauseScreen.style.display = 'flex';
        } else {
            isPaused = false;
            pauseScreen.style.display = 'none';
        }
    }
});

resumeBtn.addEventListener('click', (e) => {
    isPaused = false;
    pauseScreen.style.display = 'none';
    
    // 入力フラグをリセット（再開時の誤発火防止）
    key.Enter = false;
    key.isDragging = false;
});

pauseHomeBtn.addEventListener('click', () => {
    location.reload(); 
});

startBtn.addEventListener('click', () => {
    isPlaying = true;
    homeScreen.style.display = 'none';
    pauseToggleBtn.style.display = 'flex'; // blockではなくflexで中央揃えに対応
});

pauseToggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isPlaying && !gameover) {
        if (!isPaused) {
            isPaused = true;
            pauseScreen.style.display = 'flex';
        }
    }
});

howToPlayBtn.addEventListener('click', () => {
    howToPlayScreen.style.display = 'flex';
});

closeHowToPlayBtn.addEventListener('click', () => {
    howToPlayScreen.style.display = 'none';
});

retryBtn.addEventListener('click', () => {
    gameover = false;
    isGameOverScreenShown = false;
    isPaused = false;
    score = 0;
    k = 50;
    now = Math.floor(Math.random() * 5) + 1;
    next = Math.floor(Math.random() * 5) + 1;
    canDrop = true;
    lastDropped = null;
    fruits.length = 0; 

    player.x = layout.canvasWidth / 2;
    player.targetX = layout.canvasWidth / 2;
    player.y = layout.spawnY;

    gameOverScreen.style.display = 'none';
    pauseScreen.style.display = 'none';
    pauseToggleBtn.style.display = 'flex';
});

homeBtn.addEventListener('click', () => {
    location.reload(); 
});

function Start(){
if(!isPlaying) {
    ctx.fillStyle = "#ff9100";
    ctx.fillRect(0, 0, layout.canvasWidth, layout.canvasHeight);
} else if(isPaused) {
} else if(!gameover){

ctx.fillStyle = "#ff9100"
ctx.fillRect(0, 0, layout.canvasWidth, layout.canvasHeight);
ctx.drawImage(img[12], layout.boxLeft, layout.boxTop, layout.boxRight - layout.boxLeft, layout.boxBottom - layout.boxTop)

player.update ();
player.draw   ();
fruits.forEach(f => f.update());
fruits.forEach(f => f.draw());

let isDanger = fruits.some(f => f.dangerTimer > 0);
ctx.beginPath();
ctx.setLineDash([10, 10]);
ctx.moveTo(layout.boxLeft, layout.spawnY);
ctx.lineTo(layout.boxRight, layout.spawnY);
ctx.strokeStyle = isDanger ? "red" : "rgba(255, 255, 255, 0.5)";
ctx.lineWidth = 4;
ctx.stroke();
ctx.setLineDash([]); 

for (let i = 0; i < fruits.length; i++) {
  for (let j = i+1; j < fruits.length; j++) {
    Hit(fruits[i],fruits[j],j)
  }
}

if (isPortrait) {
    // スマホ用 (1080x1920)
    ctx.drawImage(img[24] ,680 ,50 ,350 ,350)
    let nextR = (20 * layout.fruitScale) * (1.25 ** next);
    ctx.save();
    ctx.globalAlpha = canDrop ? 1.0 : 0.5;
    ctx.drawImage(img[next -1] ,855 -nextR*2 ,225 -nextR*2,nextR *4 ,nextR *4)
    ctx.restore();

    ctx.drawImage(img[23] ,50 ,50 ,350 ,350)
    let s = score.toString();
    for(let i = 0; i < s.length; i++){
      ctx.drawImage(img[13 + Number(s[i])], 225 -(s.length/2)*30 +(i*30), 220, 40, 40);
    }

    ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
    ctx.fillRect(40, 1600, 1000, 200);
    for(let i = 0; i < 11; i++){
      let size = 30;
      ctx.drawImage(img[i], 80 + i*85, 1660, size*2, size*2);
      if(i < 10) {
        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.fillText("→", 145 + i*85, 1685);
      }
    }
} else {
    // PC用 (1920x1080)
    ctx.drawImage(img[24] ,1410 ,100 ,380 ,380)
    let nextR = (20 * layout.fruitScale) * (1.25 ** next);
    ctx.save();
    ctx.globalAlpha = canDrop ? 1.0 : 0.5;
    ctx.drawImage(img[next -1] ,1600 -nextR*2 ,290 -nextR*2,nextR *4 ,nextR *4)
    ctx.restore();

    ctx.drawImage(img[23] ,1410 ,550 ,380 ,380)
    let s = score.toString();
    for(let i = 0; i < s.length; i++){
      ctx.drawImage(img[13 + Number(s[i])], 1600 -(s.length/2)*30 +(i*30), 740, 40, 40);
    }

    ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
    ctx.fillRect(1390, 950, 480, 110);
    for(let i = 0; i < 11; i++){
      let size = 18;
      ctx.drawImage(img[i], 1410 + i*40, 985, size*2, size*2);
      if(i < 10) {
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText("→", 1445 + i*40, 1010);
      }
    }
}

k++
}else {
    pauseToggleBtn.style.display = 'none';
    if (!isGameOverScreenShown) {
        isGameOverScreenShown = true;
        gameOverScreen.style.display = 'flex';
        scoreText.innerText = 'スコア：' + score;
    }
}

requestAnimationFrame(Start);
}
Start();