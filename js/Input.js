
// Input.js //

document.addEventListener("keydown", function(event) {
 switch(event.key){
  case keysettings.Enter :
   if (!preventHoldEnter) {
      key.Enter = true;
      preventHoldEnter = true;
   }
   break;
  case keysettings.Right : key.Right = true; break;
  case keysettings.Left  : key.Left  = true; break;
  case keysettings.Up    : key.Up    = true; break;
 }
});

document.addEventListener("keyup", function(event) {
 switch(event.key){
  case keysettings.Enter :
  key.Enter        = false ;
  keyup.Enter      = true  ; 
  preventHoldEnter = false ; // キーを離したら再び押せるようにする
  break;
  case keysettings.Right : key.Right     = false; break;
  case keysettings.Left  : key.Left      = false; break;
  case keysettings.Back  : keyup.Back =  true; break;
  
  case keysettings.Up    :
   key.Up   = false ;
   keyup.Up = true  ;
  break;
    
  case keysettings.Down  :
   keyup.Down = true  ;
  break;

  case keysettings.Back  :
   keyup.Back = true  ;
  break;
  }
});

// ポインター操作（タッチ・マウス共通）
function updatePointerPos(event) {
    const scale = Math.min(window.innerWidth / layout.canvasWidth, window.innerHeight / layout.canvasHeight);
    pointerX = event.clientX / scale;
}

document.addEventListener("mousedown", function(event) {
    if (event.target.id === "pauseToggleBtn" || event.target.closest("#ui")) return;
    updatePointerPos(event);
    key.isDragging = true;
});

document.addEventListener("mousemove", function(event) {
    if (key.isDragging) {
        updatePointerPos(event);
    }
});

document.addEventListener("mouseup", function(event) {
    if (key.isDragging) {
        key.Enter = true;
        key.isDragging = false;
    }
});

document.addEventListener("touchstart", function(event) {
    if (event.target.id === "pauseToggleBtn" || event.target.closest("#ui")) return;
    updatePointerPos(event.touches[0]);
    key.isDragging = true;
}, { passive: false });

document.addEventListener("touchmove", function(event) {
    if (key.isDragging) {
        updatePointerPos(event.touches[0]);
        event.preventDefault();
    }
}, { passive: false });

document.addEventListener("touchend", function(event) {
    if (key.isDragging) {
        key.Enter = true;
        key.isDragging = false;
    }
});