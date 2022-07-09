let popup = document.querySelector('.popup');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let formName = document.querySelector('.popup__name');
let formJob = document.querySelector('.popup__job');
let editBtn = document.querySelector('.profile__edit-btn');
let closeBtn = document.querySelector('.popup__close-btn');

// Функция управляет открытием и закрытием попапа
function popupSwitch() {

  editBtn.addEventListener('click', function (event) {
    popup.classList.add('popup_opened'); //добавляем класс открытия
    formName.value = profileName.textContent;//присваиваем значения полям в попапе
    formJob.value = profileJob.textContent;//каждый раз при открытии
  });

  closeBtn.addEventListener('click', function (event) {
    popup.classList.remove('popup_opened');//убираем класс открытия
  });
}
popupSwitch();

let formElement = document.querySelector('.popup__form')

// Функция управляет сохранением данных в строках профиля
function formSubmitHandler (evt) {
	evt.preventDefault();//отменяем действие по умолчанию (перезагрузка страницы при отправке)
  
	let nameValue = formName.value//берем значение полей формы
	let jobValue = formJob.value

  profileName.textContent = nameValue//присваеваем элементам в профиле
  profileJob.textContent = jobValue

  popup.classList.remove('popup_opened');//закрываем попап
}

formElement.addEventListener('submit', formSubmitHandler);//функция срабатывает по событию "submit"