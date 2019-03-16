/* Get Elements */
const video = document.querySelector('.player');
const player = document.querySelector('.viewer');
const controls = document.querySelector('.player__controls');
const playButton = document.querySelector('.player__button');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const ranges = document.querySelectorAll('.player__slider');
const skipButtons = document.querySelectorAll('[data-skip]');
const fullScreen = document.querySelector('.player__fullscreen');

//console.dir(player);
progressBar.style.flexBasis = '0%';
// console.dir(fullScreen);

/* Functions */
function playPause(){ //works
  const method = player.paused ? 'play' : 'pause';
  player[method]();
}

function updateButton(){
  icon = this.paused ? '►' :'❚❚';
  //console.log(icon);
  playButton.textContent=icon;
}

function skip(){
  //console.dir(this);
  //console.dir(player);
  player.currentTime += parseFloat(this.dataset.skip);
  //console.log(player.currentTime);
}

function handleRangeUpdate(){
  //console.log(this.value);
  //console.log(this.name);
  player[this.name] = this.value;
}

function handleProgress(){
  let percentage = (player.currentTime / player.duration) *100;
  //console.log(progressBar.style.flexBasis);
  progressBar.style.flexBasis = `${percentage}%`;
}

function scrub(e){
  //console.log(e);
  const scrubTime = (e.offsetX / progress.offsetWidth) * player.duration;
  player.currentTime = scrubTime;
}

function toggleFullScreen(){
  if (player.fullscreen){
     player.exitFullscreen();
  } else{
    player.requestFullscreen();
  }

}

/* Event Listeners */
//on click for the video or the button, togggle play/pause and update button
playButton.addEventListener('click',playPause);
player.addEventListener('click', playPause);
player.addEventListener('play', updateButton);
player.addEventListener('pause', updateButton);
player.addEventListener('timeupdate', handleProgress);

skipButtons.forEach(button=>button.addEventListener('click',skip));
ranges.forEach(button=>button.addEventListener('change',handleRangeUpdate));
ranges.forEach(button=>button.addEventListener('mousemove',handleRangeUpdate));

let mouseDown = false;
progress.addEventListener('click',scrub);
progress.addEventListener('mousemove',(e) => mouseDown && scrub(e));
progress.addEventListener('mousedown',()=>mouseDown=true);
progress.addEventListener('mouseup',()=>mouseDown=false);
progress.addEventListener('mouseoff',()=>mouseDown=false);

fullScreen.addEventListener('click',toggleFullScreen);
