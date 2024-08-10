const cityName = document.querySelector("#cityName");
const submitBtn = document.querySelector("#searchBtn");
const cityNameOutput = document.querySelector("#city_name");
const temp = document.querySelector("#temp_real_value");
const tempStatus = document.querySelector("#tempStatus");
const middleLayer = document.querySelector(".middle_layer");
const day = document.querySelector("#day");
const todayDate = document.querySelector("#todayDate");

const getInfo = async (event) => {
  event.preventDefault();
  let cityValue = cityName.value;
  if (cityValue === "") {
    cityNameOutput.innerText = "Please! enter a city name before search...";
    middleLayer.classList.add("data_hide");
  } else {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=d5562cb3c1bcde00470f408414487f00`;
      const respApi = await fetch(url);
      const apiData = await respApi.json();
      const apiDataArray = [apiData];

      temp.innerText = (apiDataArray[0].main.temp - 273.15).toFixed(2);
      cityNameOutput.innerText = `${apiDataArray[0].name}, (${apiDataArray[0].sys.country})`;

      const tempMood = apiDataArray[0].weather[0].main;
      //* condition to check weather is sunny or cloudy
      if (tempMood == "Clear") {
        tempStatus.innerHTML =
          '<i class="fas fa-sun" style="color: #eccc68;"></i>';
      } else if (tempMood == "Clouds") {
        tempStatus.innerHTML =
          '<i class="fas fa-cloud" style="color:#f1f2f6"></i>';
      } else if (tempMood == "Rain") {
        tempStatus.innerHTML =
          '<i class="fas fa-cloud-Rain" style="color:#a4b0be"></i>';
      } else {
        tempStatus.innerHTML =
          '<i class="fas fa-sun" style="color:#eccc68"></i>';
      }
      middleLayer.classList.remove("data_hide");
    } catch (error) {
      cityNameOutput.innerText = error;
      middleLayer.classList.add("data_hide");
    }
  }
};

submitBtn.addEventListener("click", getInfo);
//* day and date portion start
(() => {
  let weekDay = new Array(7);
  weekDay[0] = "Sunday";
  weekDay[1] = "Monday";
  weekDay[2] = "Tuesday";
  weekDay[3] = "Wednesday";
  weekDay[4] = "Thursday";
  weekDay[5] = "Friday";
  weekDay[6] = "Saturday";
  let currentTime = new Date();
  let days = weekDay[currentTime.getDay()];

  day.innerText = days;
})();
