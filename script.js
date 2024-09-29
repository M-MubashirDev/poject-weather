"use strict";
const searchBtn = document.querySelector(".searchBtn");
const searchBar = document.querySelector(".searchBar");
const imgMain = document.querySelector(".img-main");
const bigContaner = document.querySelector(".big-contaner");
const flexIn = document.querySelector(".flex-in");
const apiKey = "VilOB3RTDH7SzDbchSPKQw==7aEsd8j8G1dO3UcP";
const api2 = "f27a46b4189abf199149f31b5908f658";
const temperatreCL = document.querySelector(".temperatreCL");
let condition;
let one;
let i = 0;
let fix;
const smallChange = function (val) {
  one = val.description;
  console.log(one);
};
const ImgCond = function (condition) {
  switch (condition) {
    case "Partly cloudy":
      fix = `clouds.png`;
      break;
    case "Clear":
      fix = `clear.png`;
      break;
    case "Light rain":
      fix = `rain.png`;
      break;
    case "Patchy rain nearby":
      fix = `rain.png`;
      break;
    case "Sunny":
      fix = `clear.png`;
      break;
    case "Clouds":
      fix = `clouds.png`;
      break;
    case "Rainy":
      fix = `rain.png`;
      break;
    default:
      fix = `clouds.png`;
      break;
  }
  return fix;
};
const renderCard = function (obj) {
  ImgCond(obj.weather[0].main);

  const html = `<div class="card   hidden">
  <p class='centerimg' ><img class="img-main" src="${fix}" alt="weather"></p>
  <p class="temperatreCL">${obj.main.temp}<span style="font-size: 2.3rem">°C</span></p>

  <p class="countryName">${obj.weather[0].main}</p>
  <div class="humiWind">
    <div class='windFlex'>
    <div><img class="img-wind" src="humidity.png" alt="weather"></div>
    <div>
      <p class="humanValue">${obj.main.humidity}</p>
      <p class="humidity">humiditiy</p>
    </div>
    </div>
    <div class='windFlex'>
    <div>
    <img class="img-wind" src="wind.png" alt="weather">
    
    </div>
    <div>
      <p class="windValue">${obj.wind.speed}</p>
      <p class="wind">wind</p></div>
    </div>
  </div>
    <div class='windFlex pressure'>
    <div>
    <img class="img-wind" src="pressure.png" alt="weather">
    </div>
    <div>
      <p >${obj.main.pressure} <span style="font-size: 0.8rem">hPa</span></p>
      <p class="wind">pressure</p></div>
    </div>
  </div>
 
</div>`;
  flexIn.style.display = "flex";
  flexIn.insertAdjacentHTML("afterbegin", html);
};
//......................................................
const mainApiFun = function (city) {
  // fetch(`https://api.api-ninjas.com/v1/weather?city=${city}`, {
  //   headers: {
  //     "X-Api-Key": apiKey,
  //   },
  // })
  //   .then((resolve) => {
  //     return resolve.json();
  //   })
  //   .then((data) => {});
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api2}&units=metric`
  )
    .then((resolve) => {
      if (!resolve.ok) {
        throw new Error(`cant fetch data for this input:${resolve.status}`);
      }
      return resolve.json();
    })
    .then((data) => {
      // if()
      renderCard(data);
      return data;
    })
    .catch((err) => {
      if (err.message.includes("Failed to fetch")) {
        console.log("check your internet connection");
      } else console.log(`${err}`);
      // console.log(`${err}`);
    });
};
searchBtn.addEventListener("click", function (e) {
  if (!(i > 2)) {
    e.preventDefault();
    i++;

    const val = searchBar.value.trim();
    mainApiFun(val);
    searchBar.value = "";
    console.log(val);
  }
});
