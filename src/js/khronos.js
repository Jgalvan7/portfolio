
function displayKhrono() {
    const disTitle = document.createElement("h4");
    disTitle.className = "khronos__title";
    disTitle.textContent = "Khronometro";
    const disKhronoCounter = document.createElement("p");
    disKhronoCounter.id = "khrono__counter";
    disKhronoCounter.className = "displayKhronos__counter";
    const spanPoint1 = document.createElement("span");
    spanPoint1.textContent = ":";
    const spanPoint2 = document.createElement("span");
    spanPoint2.textContent = ":";
    const spanHour = document.createElement("span");
    spanHour.id = "hours";
    spanHour.textContent = "00";
    const spanMinute = document.createElement("span");
    spanMinute.id = "minutes";
    spanMinute.textContent = "00";
    const spanSecond = document.createElement("span");
    spanSecond.id = "seconds";
    spanSecond.textContent = "00";
    disKhronoCounter.append(spanHour,spanPoint1,spanMinute,spanPoint2,spanSecond);
    disKhronos.append(disTitle,disKhronoCounter);
}


const btnStart = document.querySelector("#btnStart");
const btnStop = document.querySelector("#btnStop");
const btnReset = document.querySelector("#btnReset");

let currentButton;
let hoursValue = 0;
let minutesValue = 0;
let secondsValue = 0;

let countKhronos;
let hourUpdate;
let clock;
let checkAlarm;
//let alarmActive;

navKhronos.addEventListener("click", () => {
    title.innerText = event.target.innerText;
    let tipoFuncion = event.target.innerText;
    switch(tipoFuncion) {
        case "Chronometro":
            clearInterval(hourUpdate);
            resetKhronos();
            btnStart.setAttribute("onclick", "startKhronos()");
            btnStop.setAttribute("onclick", "stopKhronos()");
            btnReset.setAttribute("onclick", "resetKhronos()");
            btnStart.innerText = "Start";
            btnStop.innerText = "Stop";
            btnReset.innerText = "Reset";
            break;
        case "Temporizador":
            clearInterval(countKhronos);
            clearInterval(hourUpdate);
            const contentConfig = document.createElement("div");
            contentConfig.id = "configPomodoro";
            timeKhronos.remove(timeKhronos);
            btnStart.setAttribute("onclick", "startKhronos()");
            btnStop.setAttribute("onclick", "stopKhronos()");
            btnReset.setAttribute("onclick", "resetKhronos()");
            btnStart.innerText = "Start";
            btnStop.innerText = "Stop";
            btnReset.innerText = "Reset";
            break;
        case "Alarma":
            stopKhronos();
            const bellDisable = document.createElement("img");
            bellDisable.src = "../assets/icons/alarmDisable.png";
            bellDisable.className = "icon__Alarm";
            bellDisable.id = "bellDisable";
            title.append(bellDisable);
            setAlarm();
            btnStart.setAttribute("onclick", "availableAlarm()");
            btnStop.setAttribute("onclick", "disableAlarm()");
            btnReset.setAttribute("onclick", "setAlarm()");
            btnStart.innerText = "Activar";
            btnStop.innerText = "Desactivar";
            btnReset.innerText = "Reset";
            startClock();
            break;
    };
});
function shadow(){
    title.textContent += " - Sesiones";
            const inputSession = document.createElement("input");
            inputSession.type = "number";
            title.append();
            title.textContent += " - Minutos";
            const timeSession = document.createElement("input");
            timeSession.type = "number";
            title.append(timeSession,inputSession);
}

// Cronómetro
const khronoHours = document.querySelector("#hours");
const khronoMinutes = document.querySelector("#minutes");
const khronoSeconds = document.querySelector("#seconds");
function startKhronos() {
    currentButton = event.target;
    currentButton.disabled = true;
    countKhronos = setInterval(() => {
        secondsValue += 1;
        if(secondsValue === 60) {
            secondsValue = 0;
            minutesValue += 1;
            if(minutesValue === 60) {
                minutesValue = 0;
                hoursValue += 1;
                khronoHours.textContent = formatValue(hoursValue);
            }
            khronoMinutes.textContent = formatValue(minutesValue);
        }
        khronoSeconds.textContent = formatValue(secondsValue);
    }, 1000);
}
function stopKhronos() {
    currentButton ? currentButton.disabled = false : "";
    clearInterval(countKhronos);
}
function resetKhronos() {
    stopKhronos();
    secondsValue = 0;
    minutesValue = 0;
    hoursValue = 0;
    khronoSeconds.textContent = "00";
    khronoMinutes.textContent = "00";
    khronoHours.textContent = "00";
}


// Alarma
function startClock() {
    hourUpdate = setInterval(() => {
        let timeUpdate = new Date();
        clock = formatValue(timeUpdate.getHours()) + ":" + formatValue(timeUpdate.getMinutes());
        khronoHours.textContent = formatValue(timeUpdate.getHours());
        khronoMinutes.textContent = formatValue(timeUpdate.getMinutes());
        khronoSeconds.textContent = formatValue(timeUpdate.getSeconds());
    },10);
}
function availableAlarm() {
    const alarmTime = document.querySelector("#setAlarm");
    const bellAvailable = document.createElement("img");
    bellAvailable.src = "../assets/icons/alarm.png";
    bellAvailable.className = "icon__Alarm";
    bellAvailable.id = "bellAvailable";
    const bellAlpha = document.querySelector("#bellDisable");
    let alarmActive = document.createElement("span");
    alarmActive.id = "displayAlarm";
    alarmActive.textContent = alarmTime.value;
    title.removeChild(bellAlpha);
    title.removeChild(alarmTime);
    title.append(bellAvailable, alarmActive);
    const alarmSound = document.createElement("audio");
    alarmSound.id = "audioAlarm";
    alarmSound.className = "hidden";
    const sourceSound = document.createElement("source");
    sourceSound.type = "audio/mp3";
    sourceSound.src = "../assets/sounds/alarm_mix.mp3";
    alarmSound.append(sourceSound);
    title.append(alarmSound);
    let alarm = "on";
    checkAlarm = setInterval(() => {
        if(clock == alarmActive.textContent && alarm == "on") {
            alarm = "off";
            const activeSound = document.querySelector("#audioAlarm");
            console.log(activeSound);
            activeSound.play();
        }
    },1000);
}
function disableAlarm() {
    const bell = document.querySelector("#bellAvailable");
    const time = document.querySelector("#displayAlarm");
    const bellDisable = document.createElement("img");
    bellDisable.src = "../assets/icons/alarmDisable.png";
    bellDisable.className = "icon__Alarm";
    bellDisable.id = "bellDisable";
    title.removeChild(bell);
    title.removeChild(time);
    title.append(bellDisable);
    setAlarm();
}
function setAlarm() {
    let alarmInput = document.createElement("input");
    alarmInput.type = "time";
    alarmInput.id = "setAlarm";
    title.append(alarmInput);
}



function formatValue(value) {
    return ("0" + value).slice(-2);
}