const messageForm = document.forms.message; //получаем форму

///////////////////Включение кнопки чекбоксом///////////////////////////////
const messageCheckbox = messageForm.elements.checkbox;
const sendButton = document.querySelector(".send-message-button_js");

///////////////////////////////////включаем кнопку////////////
messageCheckbox.addEventListener("change", () => {
  if (messageCheckbox.checked) {
    sendButton.removeAttribute("disabled", "disabled");
  } else {
    sendButton.setAttribute("disabled", "disabled");
  }
});
//////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////Главная функция////////////////////////////////////////////////////
(function () {
  //получаем элементы формы
  const email = messageForm.elements.email;
  const name = messageForm.elements.name;
  const subject = messageForm.elements.subject;
  const mobilePhone = messageForm.elements.mobilePhone;
  const message = messageForm.elements.message;

  // console.log(age);
  //объект ошибок
  let errors = {};

  //Нажатие на submit
  messageForm.addEventListener("submit", (e) => {
    errors = {}; //обнуляем объект
    e.preventDefault(); //отменяем стандартное поведение при submit

    //очищаем предварительно код от ошибки после первого нажатия на submit
    const errorMessages = messageForm.querySelectorAll(".invalid-feedback");
    if (errorMessages) {
      for (let errorMessage of errorMessages) {
        errorMessage.remove();
      }
    }
    console.log(email.value);
    //условия валидации
    if (!isEmailValid(email.value)) {
      errors.email =
        'Please enter a valid email address (your entry is not in the format "somebody@example.com")';
    }
    if (!name.value) {
      errors.name =
        "Please enter a valid name (2 letters minimum, and no numbers and other symbols)";
    }
    if (!subject.value) {
      errors.subject = "Please enter a subject of your message";
    }
    if (!isMobilePhoneValid(mobilePhone.value)) {
      errors.mobilePhone =
        "Please enter a valid phone number (example: +7 945 385 4534)";
    }
    if (!message.value) {
      errors.message = "Please enter a message";
    }

    /////////////////сообщение об ошибке/////////////
    if (Object.keys(errors).length) {
      //перебираем массив с ошибками
      Object.keys(errors).forEach((key) => {
        const messageError = errors[key];
        const input = messageForm.elements[key];
        setErrorText(input, messageError);
        // console.log(input);
        // console.log(messageError);
      });
    }
    //данные для отправки на сервер
    const data = {
      email: email.value,
      name: name.value,
      subject: subject.value,
      mobilePhone: mobilePhone.value,
      message: message.value,
    };

    console.log(data);
  });
})();

// //создание кода с ошибкой
// function errorCreator(message) {
//   let messageError = document.createElement("div");
//   messageError.classList.add("invalid-feedback");
//   messageError.innerText = message;
//   // console.log(messageError);
//   return messageError;
// }

// //добавление ошибки инпуту
// function setErrorText(input, errorMessage) {
//   const error = errorCreator(errorMessage);
//   input.classList.add("is-invalid");
//   input.insertAdjacentElement("afterend", error);
//   input.addEventListener(
//     "input",
//     function () {
//       error.remove();
//       input.classList.remove("is-invalid");
//     },
//     { once: true }
//   );
// }

//валидация телефона (используется выше)

function isMobilePhoneValid(mobilePhone) {
  return mobilePhone.match(
    /(\+7|8)[\s(]?(\d{3})[\s)]?(\d{3})[\s-]?(\d{2})[\s-]?(\d{2})/g
  );
}