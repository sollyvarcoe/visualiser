
var canvas = document.getElementById('canvas1');
var canvasSecond = document.getElementById('canvas2');
//Sets canvas to size of window
canvas.width = 600;
canvas.height = 600;
canvasSecond.width = 600;
canvasSecond.height = 600;

var c = canvas.getContext("2d");
var c2 = canvasSecond.getContext("2d");
var ctx = new AudioContext();
var audio = document.getElementById('myAudio');
var audioSrc = ctx.createMediaElementSource(audio);
var analyser = ctx.createAnalyser();
audioSrc.connect(analyser);
audioSrc.connect(ctx.destination);
var frequencyData = new Uint8Array(analyser.frequencyBinCount);
var timeData = new Uint8Array(analyser.frequencyBinCount);
var size = frequencyData.length
var lenght = window.innerWidth/size;

function drawFreq() {
  for (i = 0; i < size/8; i++) {
    let ampilitude = frequencyData[i*8]*2;
    c.beginPath();
    c.strokeStyle="white";
    c.lineWidth = 4;
    c.moveTo(i*8 + 8,canvas.height);
    c.lineTo(i*8 + 8,canvas.height-ampilitude);
    c.stroke();

  }
}
function drawTime() {
  for (i = 0; i < size/2; i++) {
    let ampilitude = timeData[i*2];
    c2.beginPath();
    if (audio.paused) c2.strokeStyle="black";
    else c2.strokeStyle="white";
    c2.lineWidth = 4;
    c2.moveTo(i*2 + 8,canvasSecond.height/2);
    c2.lineTo(i*2 + 8,canvasSecond.height/2-ampilitude/2);
    c2.stroke();
    c2.moveTo(i*2 + 8,canvasSecond.height/2);
    c2.lineTo(i*2 + 8,canvasSecond.height/2+ampilitude/2);
    c2.stroke();

  }
}

function renderFrame() {
   requestAnimationFrame(renderFrame);
   // update data in frequencyData
   c.clearRect(0,0,canvas.width,canvas.height);
   c2.clearRect(0,0,canvas.width,canvas.height);
   analyser.getByteFrequencyData(frequencyData);
   analyser.getByteTimeDomainData(timeData);
   console.log(frequencyData);
   drawFreq();
   drawTime();
   // render frame based on values in frequencyData
   // console.log(frequencyData
}

window.addEventListener("click", function() {
  if (audio.paused) audio.play();
  else audio.pause();

} )


console.log(frequencyData);
console.log(size);
console.log(canvas);
renderFrame();
