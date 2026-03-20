
// Globals.js //

let key   = {
  Enter :false,
  Back  :false,
  Right :false,
  Left  :false,
  Up    :false,
  isDragging: false
};
let keyup = {
  Enter :false,
  Back  :false,
  Right :false,
  Left  :false,
  Up    :false,
  Down  :false  
}
let keysettings = {
  Enter :"Enter",
  Back  :"q",
  Right :"d",
  Left  :"a",
  Up    :"w",
  Down  :"s"  
}

let k = 50;
let volume  = 0 ;
let se      = 0 ;
let score   = 0 ;
let now     = Math.floor(Math.random()*5) +1 ;
let next    = Math.floor(Math.random()*5) +1 ;
const gravity = 0.15;
gameover = false;
let canDrop = true;
let lastDropped = null; // 最後に落としたフルーツを追跡
let preventHoldEnter = false; // Enter押しっぱなし防止用
let pointerX = 960; 

// レスポンシブレイアウト管理用のオブジェクト
let isPortrait = false;
let layout = {
  canvasWidth: 1920,
  canvasHeight: 1080,
  boxLeft: 600,
  boxRight: 1320,
  boxTop: 100,
  boxBottom: 1060,
  spawnY: 100,
  fruitScale: 1.0 // デバイスごとのフルーツのスケーリング
};