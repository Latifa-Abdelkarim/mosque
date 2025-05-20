




let cities = [
  { arabicname: "القاهرة", name: "Al Qāhirah" },
  { arabicname: "المنيا", name: "Al Minyā" },
  { arabicname: "بني سويف", name: "Banī Suwayf" },
  { arabicname: "أسيوط", name: "Asyūţ" },
  { arabicname: "سوهاج", name: "Sūhāj" },
  { arabicname: "بورسعيد", name: "Būr Sa‘īd" },
  { arabicname: "الاقصر", name: "Al Uqşur" }
];

const selectElement = document.getElementById("citites-select");


cities.forEach(city => {
  selectElement.innerHTML += `<option>${city.arabicname}</option>`;
});


selectElement.addEventListener("change", function () {
  document.getElementById("city-name").innerHTML = this.value;
  let cityName = cities.find(city => city.arabicname === this.value)?.name;
  getPrayersTimingsOfcity(cityName);


  anime({
    targets: selectElement,
    scale: [1, 1.05, 1],
    opacity: [0.8, 1],
    duration: 100,
    easing: 'easeInOutSine'
  });
});


selectElement.addEventListener("mouseenter", () => {
  anime({
    targets: selectElement,
    scale: 1.08,
    duration: 300,
    easing: 'easeOutBack'
  });
});

selectElement.addEventListener("mouseleave", () => {
  anime({
    targets: selectElement,
    scale: 1,
    duration: 300,
    easing: 'easeInOutQuad'
  });
});


selectElement.addEventListener("focus", () => {
  anime({
    targets: selectElement,
    scale: 1.1,
    boxShadow: [ '0 0 10px #f0c12d'],
    duration: 400,
    easing: 'easeOutExpo'
  });
});


selectElement.addEventListener("blur", () => {
  anime({
    targets: selectElement,
    scale: 1,
    boxShadow: '0 0 0px #000',
    duration: 400,
    easing: 'easeInOutQuad'
  });
});



function getPrayersTimingsOfcity(cityName) {
  let params = { country: "EG", city: cityName };
  axios.get("https://api.aladhan.com/v1/timingsByCity", { params })
    .then(function (response) {
      const timings = response.data.data.timings;
      filltimeForprayer("fajr-time", timings.Fajr);
      filltimeForprayer("dhurh-time", timings.Dhuhr);
      filltimeForprayer("asr-time", timings.Asr);
      filltimeForprayer("sunset-time", timings.Sunset);
      filltimeForprayer("asha-time", timings.Isha);
      const readableData = response.data.data.date.readable;
      const weekDay = response.data.data.date.hijri.weekday.ar;
      document.getElementById("datE").innerHTML = `${weekDay} ${readableData}`;
    })
    .catch(function (error) {
      console.log("في خطأ حصل:", error);
    });
}

function filltimeForprayer(id, time) {
  document.getElementById(id).innerHTML = time;
}

getPrayersTimingsOfcity("Al Qāhirah");


