
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