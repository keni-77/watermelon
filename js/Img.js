
// Img.js //

const imgfile = [
"img/Fruits/Fruits_0.png"    ,          //0
"img/Fruits/Fruits_1.png"    ,          //1
"img/Fruits/Fruits_2.png"    ,          //2
"img/Fruits/Fruits_3.png"    ,          //3
"img/Fruits/Fruits_4.png"    ,          //4
"img/Fruits/Fruits_5.png"    ,          //5
"img/Fruits/Fruits_6.png"    ,          //6
"img/Fruits/Fruits_7.png"    ,          //7
"img/Fruits/Fruits_8.png"    ,          //8
"img/Fruits/Fruits_9.png"    ,          //9
"img/Fruits/Fruits_10.png"   ,          //10
"img/GameStart/Player.png"   ,          //11
"img/GameStart/Stage.png"    ,          //12
"img/GameStart/numbers/0.png",          //13
"img/GameStart/numbers/1.png",          //14
"img/GameStart/numbers/2.png",          //15
"img/GameStart/numbers/3.png",          //16
"img/GameStart/numbers/4.png",          //17
"img/GameStart/numbers/5.png",          //18
"img/GameStart/numbers/6.png",          //19
"img/GameStart/numbers/7.png",          //20
"img/GameStart/numbers/8.png",          //21
"img/GameStart/numbers/9.png",          //22
"img/GameStart/Score.png"    ,          //23
"img/GameStart/Next.png"               //24
];

/// img onload
const img =[];
for(let i = 0; i < imgfile.length; i++){
img.push(new Image());
img[i].src = imgfile[i];
};

const imgPromises = img.map(i => new Promise((resolve) => {
  i.onload = resolve;
}));

Promise.all(imgPromises).then(() => {
  Start();
});
///