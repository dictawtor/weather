const button = document.getElementById("btn");
const input = document.getElementById("input");
const card = document.getElementById("search");
const ApiKEY = "c52cd845c672f1dfcccfd2d2462105c9";
const day1 = document.getElementById("day");

const defaultCity = () => {
  const URLd = `https://api.openweathermap.org/data/2.5/forecast?q=Tabriz&units=metric&appid=${ApiKEY}`;
  const fetchData = async () => {
    try {
      const data = await fetch(URLd);

      const fres = await data.json();
      const temp = Math.floor(fres.list[0].main.temp);
      const icon = fres.list[0].weather[0].icon;
      const jsxd = `
        <div id="card">
         <p>Tabriz</p>
        <div class="weatherimg">
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="day">
           
        </div>
         <div class="info">     <h1> temp: ${temp} °C   </h1>
                <h1> Humidity:${fres.list[0].main.humidity}%</h1>  </div>
             
                
            </div>
    </div>
       `;
      return (search.innerHTML = jsxd);
    } catch (error) {
      search.innerHTML += `<p id="card" style="color: red;
    font-size: 15px">Error: Unable to fetch weather data. Please check the city name and try again.</p>`;
      console.log(error);
    }
  };
  fetchData();
};

const inputEl = () => {
  let task = input.value;
  const URL = `https://api.openweathermap.org/data/2.5/forecast?q=${task}&units=metric&exclude=hourly&appid=${ApiKEY}`;
  const fetchData = async () => {
    try {
      const data = await fetch(URL);

      const fres = await data.json();
      const temp = Math.floor(fres.list[0].main.temp);
      const icon = fres.list[0].weather[0].icon;

      console.log(fres);
      const dayJsxArray = fres.list.filter((obj)=> obj.dt_txt.endsWith("12:00:00"))
      console.log(dayJsxArray);

      dayJsxArray.forEach((i) => {
        const dayJsx = `
        <div id="days">
         <p>${task}</p>
        <div class="weatherimg">
            <img src="https://openweathermap.org/img/wn/${i.weather[0].icon}@2x.png" alt="day">
            
           
        </div>
         <div class="info1">  <p>${new Date(i.dt *1000).getDay()}</p>   <h1> temp: ${Math.floor(i.main.temp)} °C   </h1>
                <h1> Humidity:${i.main.humidity}%</h1>  </div>
             
                
            </div>
    </div>
       `;
        day1.innerHTML += dayJsx;
      });

      console.log(fres);

      const jsx = `
        <div id="card">
         <p>${task}</p>
        <div class="weatherimg">
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="day">
           
        </div>
         <div class="info">     <h1> temp: ${temp} °C   </h1>
                <h1> Humidity:${fres.list[0].main.humidity}%</h1>  </div>
             
                
            </div>
    </div>
       `;
      return (search.innerHTML += jsx);
    } catch (error) {
      search.innerHTML = `<p id="card" >Error: Unable to fetch weather data. Please  try again.</p>`;
      console.log(error);
    }
  };
  fetchData();
};

window.addEventListener("loadeddata", defaultCity);

button.addEventListener("click", inputEl);
win