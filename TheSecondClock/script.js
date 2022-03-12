let hourArray = [];
let minuteArray = [];
let secondsArray = [];

let hourElementArray = [];
let minuteElementArray = [];
let secondsElementArray = [];

let hourInterval = null;
let minuteInterval = null;
let secondsInterval = null;

const hour = document.querySelector(".hour");
const minute = document.querySelector(".minute");
const seconds = document.querySelector(".seconds");

for(let i = 0; i < 60; i++){
    secondsArray.push(i>30?-(60-i):i);
    const div = document.createElement("div");
    div.innerText = i.toString().padStart(2, "0");
    div.classList.add("seconds-spoke");
    secondsElementArray.push(div);
    seconds.appendChild(div);

    minuteArray.push(i>30?-(60-i):i);
    const div2 = document.createElement("div");
    div2.innerText = i.toString().padStart(2, "0");
    div2.classList.add("minute-spoke");
    minuteElementArray.push(div2);
    minute.appendChild(div2);

}

for (let i = 0 ; i < 24; i++)
{
    hourArray.push(i>12?-(24-i):i);
    const div = document.createElement("div");
    div.innerText = i.toString().padStart(2, "0");
    div.classList.add("hour-spoke");
    hourElementArray.push(div);
    hour.appendChild(div);
}

function render()
{
    secondsElementArray.forEach(((value, index) => {
        value.style.transform = `rotate(${6*secondsArray[index]-1}deg) translateX(-50%)`
        if(secondsArray[index] === 0)
        {
            value.style.transform = `rotate(0deg) translateX(-50%)`
            value.style.fontSize = "3rem";
            value.style.opacity = "1";
        }
        else
        {
            value.style.fontSize = "1rem";
            value.style.opacity = `${1/Math.abs(secondsArray[index])}`
        }
    }));

    minuteElementArray.forEach(((value, index) => {
        value.style.transform = `rotate(${6*minuteArray[index]-1}deg) translateX(-50%)`
        if(minuteArray[index] === 0)
        {
            value.style.transform = `rotate(0deg) translateX(-50%)`
            value.style.fontSize = "3rem";
            value.style.opacity = "1";
        }
        else
        {
            value.style.fontSize = "1rem";
            value.style.opacity = `${1/Math.abs(minuteArray[index])}`
        }
    }));

    hourElementArray.forEach(((value, index) => {
        value.style.transform = `rotate(${6*hourArray[index]-1}deg) translateX(-50%)`
        if(hourArray[index] === 0)
        {
            value.style.transform = `rotate(0deg) translateX(-50%)`
            value.style.fontSize = "3rem";
            value.style.opacity = "1";
        }
        else
        {
            value.style.fontSize = "1rem";
            value.style.opacity = `${1/Math.abs(hourArray[index])}`
        }
    }));
}

function setTime()
{
    const date = new Date();
    const s = date.getSeconds();
    const m = date.getMinutes();
    const h = date.getHours();

    for(let i = 0 ; i < s; i++)
    {
        const temp = secondsArray.pop();
        secondsArray = [temp, ...secondsArray];
    }

    for(let i = 0; i < m; i++)
    {
        const temp = minuteArray.pop();
        minuteArray = [temp, ...minuteArray];
    }

    for(let i = 0 ; i < h; i++)
    {
        const temp = hourArray.pop();
        hourArray = [temp, ...hourArray];
    }

    render();

    secondsInterval = setInterval(() => {
        const temp = secondsArray.pop();
        secondsArray = [temp, ...secondsArray];

        if(secondsArray[0] === 0)
        {
            const temp = minuteArray.pop();
            minuteArray = [temp, ...minuteArray];
        }

        if(secondsArray[0] === 0 && minuteArray[0] === 0)
        {
            const temp = hourArray.pop();
            hourArray = [temp, ...hourArray];
        }

        render();
    }, 1000);
}

setTime();
