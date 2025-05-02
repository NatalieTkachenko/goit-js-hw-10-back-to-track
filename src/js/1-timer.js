console.log('Запуск таймера');
// Імпорт бібліотек
//-------Календар для вибору дати
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

//-------Нотифікації
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const inputTimeField = document.querySelector("#datetime-picker");
const startButton = document.querySelector("[data-start]");
console.log(startButton);
const daysField = document.querySelector("[data-days]");
console.log(daysField);
const hoursField = document.querySelector("[data-hours]");
console.log(hoursField);
const minutesField = document.querySelector("[data-minutes]");
console.log(minutesField);
const secondsField = document.querySelector("[data-seconds]");
console.log(secondsField);

let userSelectedDate = null;



flatpickr(inputTimeField, {
    enableTime: true,
    enableSeconds: false,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      if (selectedDates[0] < Date.now()) {
        startButton.disabled = true;
        startButton.textContent = "не чує баба";
        iziToast.error({
            title: 'Error',
            titleSize: "25px",
            message: 'Please choose a date in the future',
            messageSize: "20px",
            position: 'topRight',
            color: "red",
        })
      
    } else {
      startButton.disabled = false;
      startButton.textContent = "Start";
      userSelectedDate = selectedDates[0];
      console.log(userSelectedDate);      
    }   
    
  },
});



function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  
//   console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
//   console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
//   console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
  

startButton.addEventListener("click", ()=>{
    const intervalID = setInterval(() => {
        let timeNow = Date.now();
        let timeDifference = userSelectedDate - timeNow;
        if (timeDifference > 0) {
        inputTimeField.disabled = true;            
        const newtimeObj = convertMs(timeDifference); 
        daysField.textContent = String(newtimeObj.days).padStart(3, "0");
        
        hoursField.textContent = String(newtimeObj.hours).padStart(2, "0");
        minutesField.textContent = String(newtimeObj.minutes).padStart(2, "0");
        secondsField.textContent = String(newtimeObj.seconds).padStart(2, "0");
        } else {
            clearInterval(intervalID);
            daysField.textContent = "00";
            hoursField.textContent = "00";
            minutesField.textContent = "00";
            secondsField.textContent = "00";
            inputTimeField.disabled = false;
        }
        
    }, 1000);


});





function updateInterface (time) {
    
}