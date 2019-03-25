let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds){
  //clear any existing timers
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds*1000;
  displayTimeLeft(seconds);
  endTimeDisplay(then);

  countdown = setInterval(()=>{
    const secondsLeft = Math.round((then - Date.now())/1000);
    if (secondsLeft < 0){
      clearInterval(countdown);
      return;
    }

    displayTimeLeft(secondsLeft);
  },1000);

  //console.log(now,then);

}

function displayTimeLeft(seconds){
  let secondsLeft = seconds;
  //const hours = Math.floor(secondsLeft / 3600);
  //secondsLeft = secondsLeft % 3600;
  const mins = Math.floor(secondsLeft / 60);
  secondsLeft = secondsLeft % 60;
  const display = `${mins}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;
  document.title = display;
  timerDisplay.textContent = display;
  console.log(mins,secondsLeft);
}

function endTimeDisplay(timestamp){
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const minutes = end.getMinutes();
  endTime.textContent = `Be back at ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;

}

function startTimer(){
  // console.log(this);
  const seconds = parseInt(this.dataset.time);
  //console.log(seconds);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click',startTimer));

document.customForm.addEventListener('submit',function(e){
  e.preventDefault();
  const mins = this.minutes.value;
  console.log(mins);
  this.reset();
  timer(mins*60);
});
