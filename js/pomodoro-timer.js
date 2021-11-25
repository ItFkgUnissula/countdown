var gHours = 0;
var gMinutes = 0;
var gSeconds = 0;

var remainingTime;

var countdownHandle;

var audioStop = new Audio('./sounds/beep.mp3');
var audio1= new Audio('./sounds/silahkan membaca soal.mpeg');
var audio2= new Audio('./sounds/silahkan mengerjakan soal.mpeg');
var audio3= new Audio('./sounds/waktu kurang 3 menit.mpeg');
//var audio1= new Audio('./sounds/ah.mpeg');
var audio4= new Audio('./sounds/waktu telah habis.mpeg');
var audio5= new Audio('./sounds/ujian segera dimulai.mpeg');
var delayInMilliseconds = 2000; //1 second
/*$(document).ready(function() {
  onPomodoroTimer();
});

function onPomodoroTimer( ){

  stopTimer();

  gHours = 0;
  //gMinutes = 50;
  gMinutes = 1;
  gSeconds = 0;

  resetTimer();

  $('#shortButton').removeClass('btn-success');
  $('#longButton').removeClass('btn-success');
  $('#pomodoroButton').addClass('btn-success');
}*/

/*function onShortTimer(){

  stopTimer();

  gHours = 0;
  gMinutes = 5;
  gSeconds = 0;

  resetTimer();

  $('#pomodoroButton').removeClass('btn-success');
  $('#longButton').removeClass('btn-success');
  $('#shortButton').addClass('btn-success');
}*/

/*function onLongTimer(){

  stopTimer();

  gHours = 0;
  gMinutes = 15;
  gSeconds = 0;

  resetTimer();

  $('#pomodoroButton').removeClass('btn-success');
  $('#shortButton').removeClass('btn-success');
  $('#longButton').addClass('btn-success');
}*/





function  onStopSuara(){
  audioStop.play();
}

function  onStartSuara(){
  audio5.play();
}


function startAlarmMembacaSoal(){
   audio1.play();
   document.getElementById("startButton").disabled = true;
  document.getElementById("restartButton").disabled = true;
  document.getElementById("resumeButton").disabled = true;
}

function startAlarmMengerjakamSoal(){
  audio2.play();
  document.getElementById("resumeButton").disabled = true;
}

function onStartTimer(){
  //stopTimer();
  startAlarmMembacaSoal();
  setTimeout(function() {
    startTimer();
  }, delayInMilliseconds);

};

function onResumTimer(){
  //stopTimer();
  //startAlarmMengerjakamSoal();
  onStopSuara();
  document.getElementById("resumeButton").disabled = true;
  document.getElementById("startButton").disabled = true;
  document.getElementById("restartButton").disabled = true;
  startTimer();



};


function onStopTimer(){
  stopTimer();
  document.getElementById("resumeButton").disabled = false;
  //document.getElementById("startButton").disabled = false;
  document.getElementById("restartButton").disabled = false;
  //onStopSuara();

};

function onStopTimerSuara(){
  stopTimer();
  onStopSuara()
  document.getElementById("resumeButton").disabled = false;
  //document.getElementById("startButton").disabled = false;
  document.getElementById("restartButton").disabled = false;

};


function onResetTimer(){
  //stopTimer();
  resetTimer();
  document.getElementById("resumeButton").disabled = true;

}

/*function startAlarm(){
  //var tersisa = 60*1000;
  //if(remainingTime<1000)
  if(remainingTime<1000)
  {
    //audio.play();
    audio1.play();
  }
}*/

function stopAlarm(){
  //var tersisa = 60*1000;
  //if(remainingTime<1000)
  if(remainingTime<1000)
  {
    audio4.play();
  }
}


function startTimer() {
  countdownHandle=setInterval(function() {
    decrementTimer();
  },1000);

}

function stopTimer() {
  clearInterval(countdownHandle);
  //startAlarm();
  stopAlarm();


}

function stopTimerSuara() {
  clearInterval(countdownHandle);
  //startAlarm();
  stopAlarmSuara();


}

function resetTimer(){

  remainingTime = (gHours*60*60*1000)+
  (gMinutes*60*1000)+
  (gSeconds*1000);
  renderTimer();
  document.getElementById("startButton").disabled = false;
  document.getElementById("resumeButton").disabled = false;

}

function renderTimer(){


  var deltaTime=remainingTime;

  var hoursValue=Math.floor(deltaTime/(1000*60*60));
  deltaTime=deltaTime%(1000*60*60);

  var minutesValue=Math.floor(deltaTime/(1000*60));
  deltaTime=deltaTime%(1000*60);

  var secondsValue=Math.floor(deltaTime/(1000));

  animateTime(hoursValue, minutesValue, secondsValue);

  console.log(minutesValue)


  if (minutesValue ==9 && secondsValue == 0 ){
    onMinSatuMinut();
  }

  if (minutesValue ==3 && secondsValue == 0 ){
    onMinTigaMinut();
  }

};
function onMinSatuMinut(){
  audio2.play();
}

function onMinTigaMinut(){
  audio3.play();
}

function animateTime(remainingHours, remainingMinutes, remainingSeconds) {

  // position
  $('#hoursValue').css('top', '0em');
  $('#minutesValue').css('top', '0em');
  $('#secondsValue').css('top', '0em');

  $('#hoursNext').css('top', '0em');
  $('#minutesNext').css('top', '0em');
  $('#secondsNext').css('top', '0em');

  var oldHoursString = $('#hoursNext').text();
  var oldMinutesString = $('#minutesNext').text();
  var oldSecondsString = $('#secondsNext').text();

  var hoursString = formatTime(remainingHours);
  var minutesString = formatTime(remainingMinutes);
  var secondsString = formatTime(remainingSeconds);

  $('#hoursValue').text(oldHoursString);
  $('#minutesValue').text(oldMinutesString);
  $('#secondsValue').text(oldSecondsString);

  $('#hoursNext').text(hoursString);
  $('#minutesNext').text(minutesString);
  $('#secondsNext').text(secondsString);

  // set and animate
  if(oldHoursString !== hoursString) {
    $('#hoursValue').animate({top: '-=1em'});
    $('#hoursNext').animate({top: '-=1em'});
  }

  if(oldMinutesString !== minutesString) {
    $('#minutesValue').animate({top: '-=1em'});
    $('#minutesNext').animate({top: '-=1em'});
  }

  if(oldSecondsString !== secondsString) {
    $('#secondsValue').animate({top: '-=1em'});
    $('#secondsNext').animate({top: '-=1em'});
  }
}


function formatTime(intergerValue){

  return intergerValue > 9 ? intergerValue.toString():'0'+intergerValue.toString();

}

function decrementTimer(){

  remainingTime-=(1*1000);

  if(remainingTime<1000){
    onStopTimer();
    document.getElementById("startButton").disabled = true;
    document.getElementById("resumeButton").disabled = true;
    document.getElementById("restartButton").disabled = false;
  }
  renderTimer();

}



