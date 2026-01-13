const button = document.querySelector("button");

button.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    button.innerText = "Your browser not support geolocation";
  }
});

function onSuccess(position) {
    let { latitude, longitude } = position.coords;
  console.log(latitude, longitude);
  fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}%2C${longitude}&key=3fa887bb1e70463391cbfe90db3f862b`)
  .then(response => response.json()).then(result => {
    let allDetails = result.results[0].components;
    let {state_district, state, country, postcode} = allDetails;
    button.innerText = `${state_district}, ${state}, ${country}, ${postcode}`;
  });

}
function onError(error) {
  if (error.code == 1) {
    button.innerText = "You denied the request";
  } else if (error.code == 2) {
    button.innerText = "Location unavailable";
  } else {
    button.innerText = "Something went wrong";
  }
  button.setAttribute("disabled", "true");
}

