 
let cities =[
    {arabicname :"القاهرة",
      name:"	Al Qāhirah"

    },
    { arabicname :"المنيا",
      name:"Al Minyā"

    },
    {
       arabicname : "بني سويف",
       name:"Banī Suwayf"
    },
    {
       arabicname :"أسيوط",
       name:"Asyūţ"
    },
    {
       arabicname :"سوهاج",
       name:"Sūhāj"
    },
    {
       arabicname :"بورسعيد",
       name:"Būr Sa‘īd"
    },
    {
       arabicname :"الاقصر",
       name:"Al Uqşur"
    }
]
for (let city of cities){
    const content = `
    <option>${city.arabicname}</option>
    `
    document.getElementById("citites-select").innerHTML += content;
    
}
document.getElementById("citites-select").addEventListener("change",function(){
  document.getElementById("city-name").innerHTML = this.value
  let cityName ="";
  for(city of cities){
    if(city.arabicname == this.value){
      cityName = city.name
    }
  }
  getPrayersTimingsOfcity(cityName)
})

function getPrayersTimingsOfcity(cityName){
  
 let params = {
  country :"EG",
  city : cityName//"Al Minūfīyah",

}
axios.get('https://api.aladhan.com/v1/timingsByCity',{
  params:params
})

  .then(function (response) {
      const timings = response.data.data.timings
       filltimeForprayer("fajr-time",timings.Fajr)
       filltimeForprayer("dhurh-time",timings.Dhuhr)         
       filltimeForprayer("asr-time",timings.Asr)        
       filltimeForprayer("sunset-time",timings.Sunset)
       filltimeForprayer("asha-time",timings.Isha)

       const readableData = response.data.data.date.readable
       const WeekDay = response.data.data.date.hijri.weekday.ar
       
       const datt = WeekDay +" "+ readableData 
       document.getElementById("datE").innerHTML =datt
    console.log();
  })
  .catch(function (error) {
    console.log('في خطأ حصل:', error);
  });
}
getPrayersTimingsOfcity("Al Minūfīyah")
 
 
 function filltimeForprayer(id , time){
    document.getElementById(id).innerHTML = time
 }

 const selectElement = document.getElementById('citites-select');

    selectElement.addEventListener('mouseenter', () => {
        anime({
            targets: selectElement,
            scale: 1.1,  // تكبير قليلاً عند التمرير
           
            borderColor: '#f0c12d',  // تغيير لون الحد
            easing: 'easeOutQuad',
            duration: 400
        });
    });

    selectElement.addEventListener('mouseleave', () => {
        anime({
            targets: selectElement,
            scale: 1,  
            
            borderColor: '#fff',  // العودة للون الحد الأصلي
            easing: 'easeInQuad',
            duration: 400
        });
    });


    selectElement.addEventListener('focus', () => {
      anime({
          targets: selectElement,
          scale: 1.05,  // تكبير عند التركيز
          
          easing: 'easeOutExpo',
          duration: 500
      });
  });

  selectElement.addEventListener('blur', () => {
      anime({
          targets: selectElement,
          scale: 1,  // العودة لحجم العنصر الطبيعي
          borderColor: '#fff',  // إعادة لون الحدود الأصلي
          easing: 'easeInQuad',
          duration: 500
      });
  });

  selectElement.addEventListener('change', () => {
    anime({
        targets: selectElement,
        opacity: [0.6, 1],  // تأثير الشفافية عند التغيير
        scale: [0.95, 1],  // تكبير صغير عند التغيير
        easing: 'easeInOutQuad',
        duration: 400
    });
});



    // تحديد الكروت
    const cards = document.querySelectorAll('.card');

    // تأثير عند التمرير على الكروت (Hover Effect)
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            anime({
                targets: card,
                scale: 1.05, // تكبير الكرت قليلاً
                boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)', // إضافة ظل خفيف
                easing: 'easeOutQuad',
                duration: 200
            });
        });

        card.addEventListener('mouseleave', () => {
            anime({
                targets: card,
                scale: 1, // العودة للحجم الطبيعي
                boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)', // تقليل الظل عند الخروج
                easing: 'easeInQuad',
                duration: 200
            });
        });
    });

    // تأثير عند تحميل الصفحة (Fade-in Effect)
    window.addEventListener('load', () => {
        anime({
            targets: '.card',
            opacity: [0, 1], // تأثير الظهور تدريجيًا
            translateY: [50, 0], // الحركة من الأسفل للأعلى
            delay: anime.stagger(150), // تأخير الكروت بمقدار 150 ميللي ثانية بين كل كرت
            easing: 'easeOutQuad',
            duration: 600
        });
    });
