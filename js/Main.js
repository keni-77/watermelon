
// Main.js // 

let isPlaying = false;
let isGameOverScreenShown = false; // 重複表示防止用
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

document.addEventListener('keydown', (e) => {
    // ゲームプレイ中かつゲームオーバーでない場合、Escキーでポーズ切り替え
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

resumeBtn.addEventListener('click', () => {
    isPaused = false;
    pauseScreen.style.display = 'none';
});

pauseHomeBtn.addEventListener('click', () => {
    location.reload(); // タイトルに戻る（リロード）
});

startBtn.addEventListener('click', () => {
    isPlaying = true;
    homeScreen.style.display = 'none';
    pauseToggleBtn.style.display = 'block';
});

pauseToggleBtn.addEventListener('click', () => {
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
    // リセット処理
    gameover = false;
    isGameOverScreenShown = false;
    isPaused = false;
    score = 0;
    k = 50;
    now = Math.floor(Math.random() * 5) + 1;
    next = Math.floor(Math.random() * 5) + 1;
    canDrop = true;
    lastDropped = null;
    fruits.length = 0; // 配列クリア

    // プレイヤーの位置も初期化
    player.x = 960;
    player.y = 100;

    // UIを隠す（ゲーム画面へ戻る）
    gameOverScreen.style.display = 'none';
    pauseScreen.style.display = 'none';
    pauseToggleBtn.style.display = 'block';
});

homeBtn.addEventListener('click', () => {
    location.reload(); // リロードでリセットしつつ、初期状態（ホーム）になる
});

function Start(){
if(!isPlaying) {
    // ホーム画面の背景
    ctx.fillStyle = "#ff9100";
    ctx.fillRect(0, 0, 1920, 1920);
} else if(isPaused) {
    // ポーズ中はゲームの更新と描画更新を行わない
} else if(!gameover){

ctx.fillStyle = "#ff9100"
ctx.fillRect(0, 0, 1920, 1920);
ctx.drawImage(img[12], 600, 100, 720, 960)
player.update ();
player.draw   ();
fruits.forEach(f => f.update());
fruits.forEach(f => f.draw());
for (let i = 0; i < fruits.length; i++) {
  for (let j = i+1; j < fruits.length; j++) {
    Hit(fruits[i],fruits[j],j)
  }
}

ctx.drawImage(img[24] ,1390 ,130 ,420 ,420)
let nextR = 20 *(1.25 ** next);
ctx.drawImage(img[next -1] ,1600 -nextR*2 ,340 -nextR*2,nextR *4 ,nextR *4)

ctx.drawImage(img[23] ,1390 ,630 ,420 ,420)
let s = score.toString();
for(let i = 0; i < s.length; i++){
  ctx.drawImage(img[13 + Number(s[i])], 1600 -(s.length/2)*30 +(i*30), 830, 30, 30);
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