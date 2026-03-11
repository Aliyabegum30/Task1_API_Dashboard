async function getWeather(){

 const city = document.getElementById("city").value;

 if(city === ""){
  document.getElementById("weather").innerHTML =
  "Please enter a city name";
  return;
 }

 const apiKey = "5f11a2a8bb4b0b11c3e5cc47f93aecf6";

 const url =
 `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

 document.getElementById("weather").innerHTML = "Loading weather...";

 try{

  const response = await fetch(url);
  const data = await response.json();

  if(data.cod !== 200){
   document.getElementById("weather").innerHTML =
   "City not found";
   return;
  }

  document.getElementById("weather").innerHTML = `
  <h2>${data.name}</h2>
  <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
  <p>Temperature: ${data.main.temp} °C</p>
  <p>Humidity: ${data.main.humidity}%</p>
  <p>Weather: ${data.weather[0].description}</p>
  `;

 }catch(error){
  document.getElementById("weather").innerHTML =
  "Error fetching weather data";
 }

}