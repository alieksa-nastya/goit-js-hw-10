import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');
const delayInput = form.querySelector('input[name="delay"]');
const radioButtons = form.querySelectorAll('input[name="state"]');
const button = form.querySelector('button');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const delay = parseInt(delayInput.value);
    const state = Array.from(radioButtons).find(radio => radio.checked)?.value;

    if(!state) return;

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if(state === 'fulfilled') {
                resolve(delay);
            } else if (state === 'rejected') {
                reject(delay);
            }
        }, delay);
    });

    promise 
.then(delay => {
    iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        color: 'green',
    });
})
.catch(delay => {
    iziToast.error({
        title:'Error',
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
        color: 'red',
    });
});

delayInput.value ="";
radioButtons.forEach(radio => radio.checked = false);
});

// const form = document.querySelector('.form');
// form.addEventListener('submit', onFormSubmit);

// function onFormSubmit(e) {
//     e.preventDefault();
//     const{delay, state} = e.currentTarget.elements;
//     createPromise(delay.value, state.value).then(data => iziToast.success({position: "topRight", color: 'green', title: 'Success', message: `✅ Fulfilled promise in ${delay}ms`}).catch(data => iziToast.error({title:'Error', message: `❌ Rejected promise in ${delay}ms`, position: 'topRight',color: 'red'})))
// }

// function createPromise(delay, state) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//         if(state === 'fulfilled') {
//         resolve(delay);
//         } else if (state === 'rejected') {
//         reject(delay);
//         }
//         }, delay);
//     }) 
// }
