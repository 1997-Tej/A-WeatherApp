const api={
    key:"02b15f304bef48d2967044b7b4829d40",
    base:"https://api.openweathermap.org/data/2.5/"
}

const Searchbox=document.querySelector('.Search-box');
Searchbox.addEventListener('keypress', setQuery);

function setQuery(evt){
    if(evt.keyCode==13){
        getResults(Searchbox.value);
        console.log(Searchbox.value)
    }
}

function getResults(query){
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather=>{
        return weather.json();
    }).then(displayResult)
}

function displayResult(weather){
    console.log(weather)

    let city = document.querySelector('.location .city');
    city.innerText=`${weather.name},${weather.sys.country}`

    let now= new Date();
    let date=document.querySelector('.location .date');
    date.innerText=dateBuilder(now);


    let icon_new=document.querySelector('.location .icon')
    let icon_1 = weather.weather[0].icon
    icon_new.innerHTML=`<img src="http://openweathermap.org/img/wn/${icon_1}@2x.png"/>`


    // let time_now = document.querySelector('.time');
    // let zone=weather.sys[timezone]
    // time_now.innerText=(zone.toUTCString());
    


    let temp= document.querySelector('.current .temp');
    temp.innerHTML=`${Math.round(weather.main.temp)}<span>°C</span>`;


    let weather_el= document.querySelector('.current .weather');
    weather_el.innerText= weather.weather[0].description;

    // let icon_new=document.querySelector('.location .icon')
    // let icon_1 = weather.weather[0].icon
    // icon_new.innerHTML=`<img src="http://openweathermap.org/img/wn/${icon_1}@2x.png"/>`
    let wind= document.querySelector('.wind');
    wind.innerText= `${weather.wind.speed} Knots`;

    let hilow=document.querySelector('.hi-low');
    hilow.innerText=`${(weather.main.temp_min)}°C / ${(weather.main.temp_max)}°C`;

    let sun_rise = document.querySelector('.sunrise');
    let myDate = new Date(weather.sys.sunrise *1000);
    sun_rise.innerText=`${(myDate.toTimeString())}`



    let sun_set = document.querySelector('.sunset');
    let myDate2 = new Date(weather.sys.sunset *1000);
    sun_set.innerText=`${((myDate2).toTimeString())}`




}



function dateBuilder(d){
    let months=["January","February","March","April","May","June","July",
    "August","September","October","November","December"];
    let days=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day=days[d.getDay()]
    let date=d.getDate()
    let month=months[d.getMonth()]
    let year=d.getFullYear();
    
    return `${day} ${date} ${month} ${year}`
}

