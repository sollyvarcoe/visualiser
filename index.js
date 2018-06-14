
var canvas = document.querySelector('canvas')
//Sets canvas to size of window
canvas.width = 1024;
canvas.height = 1024;
canvas
var c = canvas.getContext("2d");
var ctx = new AudioContext();
var audio = document.getElementById('myAudio');
var audioSrc = ctx.createMediaElementSource(audio);
var analyser = ctx.createAnalyser();
// we have to connect the MediaElementSource with the analyser
audioSrc.connect(analyser);
audioSrc.connect(ctx.destination);
// we could configure the analyser: e.g. analyser.fftSize (for further infos read the spec)

// frequencyBinCount tells you how many values you'll receive from the analyser
var frequencyData = new Uint8Array(analyser.frequencyBinCount);
var size = frequencyData.length
var lenght = window.innerWidth/size;

function draw() {
  for (i = 0; i < size; i++) {
    let ampilitude = frequencyData[i]*2;
    c.beginPath();
    c.strokeStyle="white";
    c.moveTo(i,canvas.height);
    c.lineTo(i,canvas.height-ampilitude);
    c.stroke();

  }
}

function renderFrame() {
   requestAnimationFrame(renderFrame);
   // update data in frequencyData
   c.clearRect(0,0,canvas.width,canvas.height);
   analyser.getByteFrequencyData(frequencyData);
   console.log(frequencyData);
   draw();
   // render frame based on values in frequencyData
   // console.log(frequencyData)
}

window.addEventListener("click", function() {
  if (audio.paused) audio.play();
  else audio.pause();
} )

console.log(frequencyData);
console.log(size);
console.log(canvas);
renderFrame();
