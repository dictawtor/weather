const button = document.getElementById("btn");
const input = document.getElementById("input");
const card = document.getElementById("card");
const ApiKEY = "c52cd845c672f1dfcccfd2d2462105c9";

const inputEl = () => {
  const task = input.value;
  const URL = `https://api.openweathermap.org/data/2.5/forecast?q=${task}&units=metric&appid=${ApiKEY}`;
  const fetchData = async () => {
      try {
      const data = await fetch(URL);

      const fres = await data.json();
      const temp = Math.floor(fres.list[0].main.temp);

      const jsx = `

       Temperature:${temp} °C  |
        humidity:${fres.list[0].main.humidity}%
       weather:${fres.list[0].weather[0].main}
       `;
      card.innerHTML = jsx;
      input.value = "";
      console.log(fres);
    
  } catch (error) {
    card.innerHTML = `<p style="color: red;">Error: Unable to fetch weather data. Please check the city name and try again.</p>`;
    console.log(error);
  }

  //   card.innerText = task;
  //   console.log(task);
  //   console.log(URL);
};
fetchData()
}

button.addEventListener("click", inputEl);
