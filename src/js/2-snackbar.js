//========Lib=======
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


//=========Getting Elements=========
const form = document.querySelector (".form");
const delayInputField = document.querySelector("[name = 'delay']");


//==========Form submition===========
form.addEventListener("submit", (event) => {
event.preventDefault();
const selectedState = document.querySelector("[name='state']:checked").value;
console.log(selectedState);
const delay = +delayInputField.value;


const promise = new Promise ((onresolve, onreject)=>{

    setTimeout(()=> {
        if(selectedState === "fulfilled") {
            onresolve(delay);
        } else {
            onreject(delay);
        }
    }, delay);
    
});

promise.then((delay) => {
    iziToast.info({
        title: 'Hello',
        message: `Fulfilled promise ${delay}ms later`,
    });
    
   
})
.catch((delay) => {

    iziToast.error({
        title: 'Error',
        message: `Rejected promise ${delay}ms later`,
    });
    
});


event.target.reset();


});


