import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const dateTimePicker = document.querySelector('#datetime-picker');
const button = document.querySelector('.btn');
const daysAmount = document.querySelector('[data-days]');
const hoursAmount = document.querySelector('[data-hours]');
const minutesAmount = document.querySelector('[data-minutes]');
const secondsAmount = document.querySelector('[data-seconds]');

// let timerId = null;
// let selectedDate = null;

// button.addEventListener('click', createTimer);

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     if(selectedDates[0] < new Date()) {
//       return iziToast.error({
//         title: 'Error',
//         message: 'Please choose a date in the future',
//         position: 'topRight',
//         color: 'red',
//         timeout: 5000,
//       })
//     }
//     selectedDate = selectedDates[0];
//     button.removeAttribute('disabled');
//   },
// };

// flatpickr(dateTimePicker, options);

// function createTimer() {
//   timerId = setInterval(updateTimer, 1000);
//   button.setAttribute('disabled', true);
//   dateTimePicker.setAttribute('disabled', true)
// }

// function updateTimer() {
//   const time = selectedDate - new Date();
//   const{days, hours, minutes, seconds} = convertMs(time);
//   daysAmount.textContent = addLeadingZero(days);
//   hoursAmount.textContent = addLeadingZero(hours);
//   minutesAmount.textContent = addLeadingZero(minutes);
//   secondsAmount.textContent = addLeadingZero(seconds);

//   if(time<1000) {
//     clearInterval(timerId)
//     dateTimePicker.removeAttribute('disabled');
//   }
// }

// function addLeadingZero(value) {
//   return String(value).padStart(2, 0);
// }


// function convertMs(ms) {
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;
//   const days = Math.floor(ms / day);
//   const hours = Math.floor((ms % day) / hour);
//   const minutes = Math.floor(((ms % day) % hour) / minute);
//   const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//   return { days, hours, minutes, seconds };
// }


let userSelectedDate = null;
let countdownInterval = null;

button.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

      if(userSelectedDate < new Date()) {
        iziToast.error({
            title: 'Error',
            message: 'Please choose a date in the future',
            position: 'topRight',
            color: 'red',
            timeout: 5000,
        });
        button.disabled = true;
      } else {
        button.disabled = false;
      }
    },
  };

flatpickr("#datetime-picker", options);

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  };

  function updatedTime(days, hours, minutes, seconds) {
    daysAmount.textContent = addLeadingZero(days);
    hoursAmount.textContent = addLeadingZero(hours);
    minutesAmount.textContent = addLeadingZero(minutes);
    secondsAmount.textContent = addLeadingZero(seconds);
  };

  function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  };
  
  console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
  console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
  console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}


button.addEventListener('click', () => {
    if(!userSelectedDate) return;

    button.disabled = true;
    dateTimePicker.disabled = true;

    countdownInterval = setInterval(() => {
        const timeLeft = userSelectedDate - new Date();
        if(timeLeft <= 0) {
            clearInterval(countdownInterval);
            updatedTime(0, 0, 0, 0);

            iziToast.success({
                title: 'Completed',
                message: "The countdown has ended!",
                position: 'topRight',
            });

            dateTimePicker.disabled = false;
            return;
        }
        
        const {days, hours, minutes, seconds} = convertMs(timeLeft);
        updatedTime(days, hours, minutes, seconds);
    }, 1000);
});


