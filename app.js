const button = document.getElementById("btn");
const input = document.getElementById("input");
const card = document.querySelector(".container");
const ApiKEY = "c52cd845c672f1dfcccfd2d2462105c9";
const day1 = document.getElementById("day");
const loader = document.querySelector(".loader");


const start = () => {
  
  loader.style.display = "flex";
  defaultCity();
  
};
const defaultCity = async () => {

  const URLd = `https://api.openweathermap.org/data/2.5/forecast?q=Tabriz&units=metric&appid=${ApiKEY}`;

  try {
    const data = await fetch(URLd);

    const fres = await data.json();
    const temp = Math.floor(fres.list[0].main.temp);
    const icon = fres.list[0].weather[0].icon;
    const jsxd = `
        <div class="card">
         <p>${fres.city.name} , ${fres.city.country}</p>
        <div class="weatherimg">
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="day">  
        </div>
        
        <h1> ${fres.list[0].weather[0].main}</h1>
         <div class="info">     <h1> ${temp} °C   </h1>
                <h1> Humidity:${fres.list[0].main.humidity}%</h1>
                  <h1> wind speed:${Math.round(fres.list[0].wind.speed)}m/s</h1> 
                  </div>
             
                
            </div>
    </div>
       `;
         loader.style.display = "none";
    const dayJsxArray = fres.list.filter((obj) =>
      obj.dt_txt.endsWith("12:00:00"),
    );

    const days = [
      "یکشنبه",
      "دوشنبه",
      "سه شنبه",
      "چهارشنبه",
      "پنج شنبه",
      "جمعه",
      "شنبه",
    ];

    dayJsxArray.forEach((i) => {
      const dayJsx = `
      <div class="days">
       
        <div class="weatherimg">
            <img src="https://openweathermap.org/img/wn/${i.weather[0].icon}@2x.png" alt="day">  
        </div>
         <div class="info1">  
            <p>${days[new Date(i.dt * 1000).getDay()]}</p>  
            <h1> ${Math.floor(i.main.temp)} °C   </h1>
            <h2> ${i.weather[0].main}</h2> 
         </div>
         
    </div>
       `;
      day1.innerHTML += dayJsx;
    });
    return (day1.innerHTML += jsxd);
  } catch (error) {
    day1.innerHTML += `<p class="cardErr">Error: Unable to fetch weather data. Please  try again.</p>`;
     loader.style.display = "none";
  }
};

const inputEl = async () => {
  const days = [
    "یکشنبه",
    "دوشنبه",
    "سه شنبه",
    "چهارشنبه",
    "پنج شنبه",
    "جمعه",
    "شنبه",
  ];

  day1.innerHTML = "";
  let task = input.value.trim();
  if (!task) return;
  const URL = `https://api.openweathermap.org/data/2.5/forecast?q=${task}&units=metric&exclude=hourly&appid=${ApiKEY}`;

  try {
    const data = await fetch(URL);

    const fres = await data.json();
    const temp = Math.floor(fres.list[0].main.temp);
    const icon = fres.list[0].weather[0].icon;

    const dayJsxArray = fres.list.filter((obj) =>
      obj.dt_txt.endsWith("12:00:00"),
    );

    dayJsxArray.forEach((i) => {
      const dayJsx = `
      <div class="days">
       
        <div class="weatherimg">
            <img src="https://openweathermap.org/img/wn/${i.weather[0].icon}@2x.png" alt="day">  
        </div>
         <div class="info1">  
            <p>${days[new Date(i.dt * 1000).getDay()]}</p>  
            <h1> ${Math.floor(i.main.temp)} °C   </h1>
            <h2> ${i.weather[0].main}</h2> 
         </div>
         
    </div>
       `;
      day1.innerHTML += dayJsx;
    });

    const jsx = `
        <div class="card">
          <p>${fres.city.name} , ${fres.city.country}</p>
        <div class="weatherimg">
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="day"> 
        </div>
        <h1> ${fres.list[0].weather[0].main}</h1>
         <div class="info">     <h1>  ${temp} °C   </h1>
                <h1> Humidity:${fres.list[0].main.humidity}%</h1>  
                <h1> wind speed:${Math.round(fres.list[0].wind.speed)}m/s</h1> </div>
             
                
            </div>
    </div>
       `;
    return (day1.innerHTML += jsx);
  } catch (error) {
    day1.innerHTML = `<p id="card" >Error: Unable to fetch weather data. Please  try again.</p>`;
     loader.style.display = "none";
  }
};

button.addEventListener("click", inputEl);
window.addEventListener("DOMContentLoaded", start);
