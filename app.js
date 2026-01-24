const button = document.getElementById("btn");
const input = document.getElementById("input");
const card = document.getElementById("card");
const task = input.value;
const ApiKEY = "c52cd845c672f1dfcccfd2d2462105c9";




const inputEl = () => {
    
  const task = input.value;
    const URL =  `http://api.openweathermap.org/data/2.5/forecast?q=${task}&units=metric&appid=${ApiKEY}`

    const fetchData =  async ()=>{
        const data = fetch(URL)
        const res = await data
        const fres = await res.json()
        const temp =  Math.floor(fres.list[0].main.temp)
       card.innerText = `Temperature: ${temp}°C`;
       
        console.log(fres);
    }
fetchData()


//   card.innerText = task;
//   console.log(task);
//   console.log(URL);
};

console.log();

button.addEventListener("click", inputEl);
