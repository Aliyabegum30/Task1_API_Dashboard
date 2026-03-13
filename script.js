async function getWeather(){

 const city=document.getElementById("city").value;

 if(city===""){
  alert("Enter city name");
  return;
 }

 const apiKey="5f11a2a8bb4b0b11c3e5cc47f93aecf6";

 const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

 const response=await fetch(url);
 const data=await response.json();

 if(data.cod!==200){
  alert("City not found");
  return;
 }

 const globe=document.getElementById("globe");

 globe.style.opacity="0";
 globe.style.transform="scale(0.6)";

 setTimeout(()=>{
 globe.style.display="none";
 },600);

 const now=new Date().toLocaleString();

 document.getElementById("weather").style.display="block";

 document.getElementById("weather").innerHTML=`

 <h2>${data.name}</h2>

 <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png">

 <h3>${data.main.temp}°C</h3>

 <p>${data.weather[0].description}</p>

 <p>💧 Humidity: ${data.main.humidity}%</p>
 <p>🌬 Wind: ${data.wind.speed} m/s</p>
 <p>🌡 Feels Like: ${data.main.feels_like} °C</p>
 <p>📊 Pressure: ${data.main.pressure} hPa</p>

 <p><small>${now}</small></p>
 `;

 getForecast(city);
 getHourly(city);
 changeBackground(data.weather[0].main)
}

async function getForecast(city){

 const apiKey="5f11a2a8bb4b0b11c3e5cc47f93aecf6";

 const url=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

 const response=await fetch(url);
 const data=await response.json();

 let forecastHTML="";

 for(let i=0;i<40;i+=8){

 const day=data.list[i];
 const date=new Date(day.dt_txt);
 const dayName=date.toLocaleDateString("en-US",{weekday:"long"});

 forecastHTML+=`

 <div class="forecast-card">
 <p>${dayName}</p>
 <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png">
 <p>${day.main.temp}°C</p>
 </div>

 `;
 }

 document.getElementById("forecastCards").innerHTML=forecastHTML;
 document.getElementById("forecast-container").style.display="block";
}

async function getHourly(city){

 const apiKey="5f11a2a8bb4b0b11c3e5cc47f93aecf6";

 const url=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

 const response=await fetch(url);
 const data=await response.json();

 let hourlyHTML="";

 for(let i=0;i<8;i++){

 const hour=data.list[i];
 const time=new Date(hour.dt_txt).getHours()+":00";

 hourlyHTML+=`

 <div class="hour-card">
 <p>${time}</p>
 <img src="https://openweathermap.org/img/wn/${hour.weather[0].icon}@4x.png">
 <p>${hour.main.temp}°C</p>
 </div>

 `;
 }

 document.getElementById("hourlySlider").innerHTML=hourlyHTML;
 document.getElementById("hourly-container").style.display="block";
}

/* CITY SUGGESTIONS */


const cities = [
"New York",
"London",
"Tokyo",
"Paris",
"Dubai",
"Hyderabad",
"Delhi",
"Mumbai",
"Chennai",
"Bangalore",
"Kolkata",
"Singapore",
"Sydney",
"Toronto",
"Los Angeles",
"San Francisco"
];



document.getElementById("city").addEventListener("input",function(){

 const input=this.value.toLowerCase();
 const suggestions=document.getElementById("suggestions");

 suggestions.innerHTML="";

 if(input.length===0) return;

 const filtered=cities.filter(city =>
 city.toLowerCase().startsWith(input));

 filtered.forEach(city=>{

 const div=document.createElement("div");

 div.classList.add("suggestion-item");
 div.textContent=city;

 div.onclick=function(){
 document.getElementById("city").value=city;
 suggestions.innerHTML="";
 getWeather();
 };

 suggestions.appendChild(div);

 });

});
function quickCity(city){

 document.getElementById("city").value = city;
 getWeather();

}
function startRain(){

const rain = document.getElementById("rain-container")

rain.innerHTML=""

for(let i=0;i<80;i++){

const drop = document.createElement("div")

drop.classList.add("raindrop")

drop.style.left=Math.random()*100+"vw"
drop.style.animationDuration=(0.5+Math.random())+"s"

rain.appendChild(drop)

}

}
function changeBackground(weather){

weather = weather.toLowerCase()

if(weather.includes("clear")){
document.body.style.background =
"linear-gradient(135deg,#f6d365,#fda085)"
}

else if(weather.includes("cloud")){
document.body.style.background =
"linear-gradient(135deg,#bdc3c7,#2c3e50)"
}

else if(weather.includes("rain")){
document.body.style.background =
"linear-gradient(135deg,#4facfe,#00f2fe)"
startRain()
}

else if(weather.includes("snow")){
document.body.style.background =
"linear-gradient(135deg,#e6dada,#274046)"
startSnow()
}

else{
document.body.style.background =
"linear-gradient(135deg,#4facfe,#00f2fe)"
}

}