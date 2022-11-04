import throttle from 'lodash.throttle';
const STORAGE_KEY = 'feedback-form-state'; /* Використовується для запобіганню магічних чисел, в нашому випадку (ключа до локальної пам`яті) */
let formData = {}; /* Повинна бути не строга змінна для збереження нових змін у формі*/
const refs = {
    form: document.querySelector(".feedback-form"),
    input: document.querySelector('[name = "email"]'),
    textarea: document.querySelector('[name = "message"]'),
}
onFormData();

console.log(refs.form);
console.log(refs.input);
console.log(refs.textarea);

refs.form.addEventListener('input', throttle(onFormInput, 500)); /*Для правильної роботи потрібно замінити в onTextareaInput currentTarget на target, щоб запобігти постійному спливанню подій*/
refs.form.addEventListener('submit', onFormSubmit);
// refs.input.addEventListener('input', onTextareaInput);


// refs.form.addEventListener('input', event => {
//     // console.log(event.target.name);
//     // console.log(event.target.value);
//     formData[event.target.name] = event.target.value;
//     console.log(formData);
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
// })
function onFormInput(event) {
    // console.log(event.target.name);
    // console.log(event.target.value);
    formData[event.target.name] = event.target.value;
    console.log(formData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};


// populateTextarea ();



/*
    * Зупиняємо поведінку за замовчуванням;
    * Прибираємо сповіщення із сховища;
    * Очищуєм форму.
*/onTextareaInput
function onFormSubmit (evt) {
    evt.preventDefault(); /*Зупиняємо поведінку за замовчуванням */
    console.log('formData:', formData);
    evt.currentTarget.reset(); /* Очищуєм форму */
    localStorage.removeItem(STORAGE_KEY); /*очищає форму в local storage */
    formData = {};
};

/*
    * Отримуємо значення поля;
    * Зберігаємо його в сховищі;
*/
function onTextareaInput (evt) {
    // const message = evt.currentTarget.value;
    const message = evt.target.value;
    console.log(message);
    localStorage.setItem(STORAGE_KEY, message);
};

function onFormData() {
    const initialData = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!initialData){
        return;
    }
    if (initialData.email) {
        refs.input.value = initialData.email;
    }
    if (initialData.message) {
        refs.textarea.value = initialData.message;
    }
    formData = initialData;
};


/*
    * Отримуємо значення із сховища;
*/
// function populateTextarea () {
//     const savedMesage = localStorage.getItem(STORAGE_KEY);
    

//     if(savedMesage) {
//         console.log(savedMesage);
//         refs.textarea.value = savedMesage; /* підв`язуємо до messsage */
//     }
// };
