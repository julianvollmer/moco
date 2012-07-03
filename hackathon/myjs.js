function doFirst(){
  init();
	updateProgress();
  canvasAction();
  initVideo();
}	

function init(){
    if(typeof(Storage)!=="undefined"){
        if(localStorage.content){
            document.body.innerHTML = localStorage.content;    
        }
        else{
           hideAllSections();
        }
      }
    else{
        alert("www.browsehappy.com");
      }
    var myElement = document.getElementById("canvasElement");
    position = getPosition(myElement);    
}

function getUserPosition() {
    navigator.geolocation.getCurrentPosition(success, error);
}
function allowDrop(ev){
  ev.preventDefault();
}

function drag(ev){
  ev.dataTransfer.setData("Text",ev.target.id);
}

function drop(ev){
  ev.preventDefault();
  var data=ev.dataTransfer.getData("Text");
  ev.target.appendChild(document.getElementById(data));
}

function online() {
    var test = navigator.onLine ? 'online' : 'offline';
    document.getElementById('status').innerHTML = test;
    return navigator.onLine ? 'online' : 'offline';
}

function success(position) {
    document.getElementById("showPosition").innerHTML="latitude:";
    document.getElementById("showPosition").innerHTML+=position.coords.latitude;
    document.getElementById("showPosition").innerHTML+="<br>longitude:";
    document.getElementById("showPosition").innerHTML+=position.coords.longitude;
}

function error(msg) {
  console.log(typeof msg == 'string' ? msg : "error");
}

/*
var watchId = navigator.geolocation.watchPosition(function(position) {  
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
});

  navigator.geolocation.clearWatch(watchId);
*/

function startProgress() {
    updateProgress();
}

function showContent (content) {
    hideAllSections();
    document.getElementById(content).style.display = "block";
    changeSubtitle(content);
    var myElement = document.getElementById("canvasElement");
    position = getPosition(myElement);
    localStorage.content = document.body.innerHTML;
}


function changeSubtitle (argument) {
    document.getElementById('subtitle').innerHTML = argument;
}

function hideHeader () {
    hideElement("myHeader");
}
    
function hideElement (theElement) {
    theElement.style.display = "none";
}

function hideAllSections () {
    var node_list = document.getElementsByTagName('section');
    var textboxes = [];
    for (var i = 0; i < node_list.length; i++) {
        hideElement(node_list[i]) ;
 
    }
}
function updateProgress(){
 
    var bar = document.getElementById("bar");
    loaded = 0;
 
    var load = function test() {
        loaded += 1;
        document.getElementById('theOutput').innerHTML = loaded;
        bar.value = loaded;
 
        if(loaded >= 100) {
            clearInterval(dummyLoad);
        }
    };

    var dummyLoad = setInterval(load,100);
}


function getPosition(element) {
var xPosition = 0;
var yPosition = 0;
 
while(element) {
    xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
    yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
    element = element.offsetParent;
}
return { x: xPosition, y: yPosition };
}


function canvasAction () {
    var x = document.getElementById('canvasElement');
    canvas = x.getContext('2d');
    window.addEventListener('mousemove',movemouse,false);
}

function clearLocalStorage() {
    localStorage.clear();
}

function movemouse(e){
  canvas.clearRect(0,0,400,200); //löscht das Canvas bei jeder Bewegung
  var xPos = e.clientX;
  var yPos = e.clientY;
  canvas.fillRect(xPos-position.x-50, yPos-position.y-50,100, 100);
}

function initVideo(){
  barSize=600;
  myMovie=document.getElementById('myMovie');
  playButton=document.getElementById('playButton');
  bar=document.getElementById('defaultBar');
  progressBar=document.getElementById('progressBar');
 
  playButton.addEventListener("click", playOrPause, true);
  bar.addEventListener("click", clickedBar, false);

}
function playOrPause(){
  if(!myMovie.paused && !myMovie.ended){
    myMovie.pause();
    playButton.innerHTML='Play';
    window.clearInterval(updateBar);  
  } else {
    myMovie.play();
    playButton.innerHTML='Pause';
    updateBar=setInterval(update,500);
  }
}

function update(){
  if(!myMovie.ended){
    var size=parseInt(myMovie.currentTime*barSize/myMovie.duration)
    progressBar.style.width=size+'px';
   } else {
    progressBar.style.width='0px';
    playButton.innerHTML='Play';
    window.clearInterval(updateBar);
  }
} 

function clickedBar(e){
  if(!myMovie.paused && !myMovie.ended){
    var mouseX = e.pageX-bar.offsetLeft;
    var newtime = mouseX*myMovie.duration/barSize;
    myMovie.currentTime = newtime;
    progressBar.style.width = mouseX+'px';
  } 
}

window.addEventListener("load",doFirst,false);