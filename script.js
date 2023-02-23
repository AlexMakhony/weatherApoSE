"use strict"
const form = document.getElementById(`search-form`);
const findBtn = document.getElementById(`findBtn`);
const weatherForm = document.getElementById(`weather`);
const input = document.getElementById(`input`);

const APP_ID = 'f5984abfd7be02d0f0f71396692dd7ba';
let cityName = 'kyiv';

form.addEventListener("submit", onClick);

function onClick(e) {
  e.preventDefault();
  cityName = e.currentTarget.elements.input.value;
  loadWeather(cityName)
}

async function loadWeather (name) {
  // Вставляем гифку пока ожидаем ответ от АПИ
  weatherForm.innerHTML = `
  <div class="weather__loading">
    <img src="loading.gif" alt="Loading...">
  </div>
  `
  const serverApi = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=${APP_ID}`;
  const response = await fetch (serverApi, {
    method: `GET`,
  });
  const responseResult = await response.json();
  if (response.ok) {
    getWeather(responseResult);
  } else {
    weatherForm.innerHTML = responseResult.message;
  }
}


function getWeather (data) {
//  Обрабатывем и выводим данные
console.log(data);
  const location = data.name;
  const temp = Math.round(data.main.temp);
  const feelsLike = Math.round(data.main.feels_like);
  const weatherStatus = data.weather[0].main;
  const weatherIcon = data.weather[0].icon;
  // Разметка HTML
  const template = `
  <div class="weather__header">
    <div class="weather__main">
      <div class="weather__city">${location}</div>
      <div class="weather__status">${weatherStatus}</div>
    </div>
  <div class="weather__icon">
    <img class="weather__picture" src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="Clouds">
  </div>
</div>
<div class="weather__temp">${temp}</div>
<div class="weather__feels-like">Feel like: ${feelsLike}</div>`;
weather.innerHTML = template;
}


// Проверочка

if (weatherForm) {
  loadWeather();
}