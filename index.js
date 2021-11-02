
// Store all elements using id's in variables
var start=document.getElementById('start');
var stop=document.getElementById('stop');
var restart=document.getElementById('restart');
var hr=document.getElementById('hr');
var min=document.getElementById('min');
var sec=document.getElementById('sec');
var mili=document.getElementById('mili');
var lap=document.getElementById('lap');
var analog=document.getElementById('analog');


var ms_Inter;
var sInter;
var minInter;
var hrInter;

var miliSecHand;
var secHand;
var minHand;

createClock();

//disable buttons as not needed initially.
disableButton(restart);
disableButton(stop);
lap.disabled = true;

// time increament and conversion to 0 after 60
function Sixty(time){
    time=parseInt(time)+1;
    if(time==60){
        time='00';
    }
    else if(time<10){
        time="0"+time;
    }
    return time;
}

// disable button function
function disableButton(btn){
    btn.disabled = true;
    btn.style.background = "rgb(187 186 186)";
}

// function to enable buttons
function enableButton(btn){
    btn.disabled = false;
    btn.style.background = "linear-gradient(0deg, rgba(0,172,238,1) 0%, rgba(2, 214, 251, 0.548) 100%)";
}

// function to disble lap button
function lapButtonEnable(){
    lap.disabled=false;
}


// click listener for start button
start.addEventListener('click',function(){

    // interval for miliSecHand
    ms_Inter=setInterval(() => {
        mili.textContent=Sixty(mili.textContent);
    }, 1000/60);

    // interval for sec hand
    sInter=setInterval(() => {
        sec.textContent=Sixty(sec.textContent);
    }, 1000);

    // minhand interval
    minInter=setInterval(() => {
        min.textContent=Sixty(min.textContent);
    }, 1000*60);

    // hr hand interval
    hrInter=setInterval(() => {
        hr.textContent=Sixty(hr.textContent);
    }, 1000*60*60);

    // disabling start button and enabling stop restart and lap button
    disableButton(start);
    enableButton(stop);
    enableButton(restart);
    lapButtonEnable();
    

    // callinng rotate animations for all 3 hand
    secHand.style.animation="spin 60s linear infinite";
    miliSecHand.style.animation="spin 1s linear infinite";
    minHand.style.animation="spin 3600s linear infinite";
});



// function to clear intervals 
function clearIntervals(){
    clearInterval(ms_Inter);
    clearInterval(sInter);
    clearInterval(minInter);
    clearInterval(hrInter);
    enableButton(start);
}

// click event listner for stop button
stop.addEventListener('click',function(){
    clearIntervals();
    disableButton(stop);
    // pausing animations
    miliSecHand.style.animationPlayState = 'paused';
    secHand.style.animationPlayState = 'paused';
    minHand.style.animationPlayState = 'paused';
    
});

// click event listener for restart button 
restart.addEventListener("click",function(){

    // reseting value to 00
    hr.textContent='00';
    min.textContent='00';
    sec.textContent='00';
    mili.textContent='00';

    // clearing intervals and disabling button
    clearIntervals();
    disableButton(restart);
    disableButton(stop);

    // removing all the laps
    while (flex.firstChild) {
        flex.firstChild.remove()
    }
    count=1;
    lap.disabled = true;
    
    // reseting clock to initial position
    removeClock();
    createClock();
});

// click event listener for lap button
var count=1;
lap.addEventListener('click',function(){

    let parent = document.createElement("div"); // create one div 
    parent.classList.add("lap-item"); // adding class to created dive

    var lapTime=hr.textContent+" : "+min.textContent+" : "+sec.textContent+" : "+mili.textContent
    parent.innerHTML =`<span>`+count+`.</span><span class="times">`+lapTime+`</span>`;

    count+=1;
    flex.appendChild(parent);    //append lap div to flex div
    
});

// function creating clock 
function createClock(){
    miliSecHand = document.createElement("div"); // create one div for mili second hand
    miliSecHand.id="msclock";
    miliSecHand.classList.add("msclock"); // adding class to created dive
    analog.append(miliSecHand);
    
    secHand = document.createElement("div"); // create one div for second hand
    secHand.id="secclock";
    secHand.classList.add("secclock"); // adding class to created dive
    analog.append(secHand);
    
    minHand = document.createElement("div"); // create one div  for minute hand
    minHand.id="minclock";
    minHand.classList.add("minclock"); // adding class to created dive
    analog.append(minHand);
}

// function to remove clock 
function removeClock(){
    while (analog.firstChild) {
        analog.firstChild.remove()
    }
}