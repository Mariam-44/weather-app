const Next = document.querySelectorAll(".NextDay");
const curr = document.querySelector(".current");
const input = document.querySelector(".input");

// Function to get user's geolocation (current position)
function myLocation() {
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition((position) => {
    getData(`${position.coords.latitude},${position.coords.longitude}`);
    },)
  } 
  else {
    alert("Geolocation is not supported by your browser")
  }
}
myLocation(); 


// Function to fetch weather data from WeatherAPI based on a location 
async function getData(location) {
  var response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=be9428670011421993c155239240810&q=${location}&days=3`
  );
  var data = await response.json();
  console.log(data);
  
  displayNextDays(data.forecast.forecastday);
  displayCurrent(data);
}
// Add an event listener to the input field to trigger weather data fetching on user input 
input.addEventListener("input" , function(e){
  getData(e.target.value);
  
})
// Array of day names to be used when formatting dates
const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
// Array of month names to be used when formatting dates
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Function to display the forecast for the next days
function displayNextDays(arr) {
  for (let i = 1; i < arr.length; i++) {
    const d = new Date(arr[i].date);
    const Name = dayNames[d.getDay()];
    let NextDay = `
       
            <div class="card-header" style="background: rgba(0, 0, 0, 0.1)">
              <small>
                <h6 class="text-center">${Name}</h6>
              </small>
            </div>
           
            <div class="card-body text-center pt-5">
              <div class="icon pb-3">
                <img
                  src="${arr[i].day.condition.icon}"
                  alt=""
                  width="48"
                />
              </div>
              <div class="number fw-bolder text-white h4">
                ${arr[i].day.maxtemp_c}<sup>o</sup>C
              </div>
              <small>${arr[i].day.mintemp_c}<sup>o</sup></small>
              <div class="status pt-4" style="color: #009ad8">${arr[i].day.condition.text}</div>
            </div>
          `;
    Next[i-1].innerHTML = NextDay;
  }
}

// Function to display the current weather data
function displayCurrent(arr) {
    const d = new Date(arr.current.last_updated);
    const day = d.getDate();
    const Name = dayNames[d.getDay()];
    const month = monthNames[d.getMonth()];

    let current =`
    <div class="card-header" style="background: rgba(0, 0, 0, 0.1)">
              <small class="d-flex justify-content-between">
                <h6>${Name}</h6>
                <h6>${day} ${month}</h6>
              </small>
            </div>
            <div class="card-body">
              <div class="location"> ${arr.location.name}</div>
              <div class="degree">
                <div class="row ">
                  <div class="number fw-bolder text-white col-md-6 col-lg-12">
                   ${arr.current.temp_c}<sup>o</sup>C
                  </div>

                  <div class="icon col-md-2 ">
                    <img
                      src="${arr.current.condition.icon}"
                      alt=""
                      width="90"
                    />
                  </div>
                </div>
              </div>
              <div class="status" style="color: #009ad8">${arr.current.condition.text}</div>
              <div class="info d-flex pt-3">
                <div class="pe-3">
                  <img src="./img/icon-umberella.png" alt="" /><span
                    class="ps-2"
                    >${arr.current.humidity}%</span
                  >
                </div>
                <div class="pe-3">
                  <img src="./img/icon-wind.png" alt="" /><span class="ps-2"
                    >${arr.current.wind_kph}km/h</span
                  >
                </div>
                <div class="pe-3">
                  <img src="./img/icon-compass.png" alt="" /><span class="ps-2"
                    >${arr.current.wind_dir}</span
                  >
                </div>
              </div>
     </div>`
    curr.innerHTML = current;
}

