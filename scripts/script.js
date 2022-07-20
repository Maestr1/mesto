//////////////Работа с попапом//////////////

const editPopup = document.querySelector('.popup_type_edit-profile');
const addPopup = document.querySelector('.popup_type_add-place');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const formName = document.querySelector('.popup__input_type_name');
const formJob = document.querySelector('.popup__input_type_job');
const editBtn = document.querySelector('.profile__edit-btn');
const profileCloseBtn = editPopup.querySelector('.popup__close-btn');
const placeCloseBtn = addPopup.querySelector('.popup__close-btn');
const addBtn = document.querySelector('.profile__add-btn');

// Функция управляет открытием попапа
function openPopup(popup) {
  popup.classList.add('popup_opened'); //добавляем класс открытия
  if (popup === editPopup) {
    //если открывается попап редактирования подставляем значения при открытии
    formName.value = profileName.textContent;
    formJob.value = profileJob.textContent;
  }
}

// Функция управляет закрытием попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened'); //убираем класс открытия
}

//Вешаем слушатель кликов на кнопки
editBtn.addEventListener('click', function () {
  openPopup(editPopup);
});
profileCloseBtn.addEventListener('click', function () {
  closePopup(editPopup);
});
addBtn.addEventListener('click', function () {
  openPopup(addPopup);
});
placeCloseBtn.addEventListener('click', function () {
  closePopup(addPopup);
});


let formElement = document.querySelector('.popup__form');
// Функция управляет сохранением данных в строках профиля
function formSubmitHandler(evt) {
  evt.preventDefault(); //отменяем действие по умолчанию (перезагрузка страницы при отправке)

  let nameValue = formName.value; //берем значение полей формы
  let jobValue = formJob.value;

  profileName.textContent = nameValue; //присваеваем элементам в профиле
  profileJob.textContent = jobValue;

  closePopup(editPopup); //закрываем попап
}

formElement.addEventListener('submit', formSubmitHandler); //функция срабатывает по событию "submit"

//////////////Загрузка карточек//////////////

const cardArr = [
  {
    name: 'Анталия',
    link: './images/antalia.jpg',
    alt: 'Море внизу скал',
  },
  {
    name: 'Будапешт',
    link: './images/budapest.jpg',
    alt: 'Трамвай в Будапеште',
  },
  {
    name: 'Карачаево-Черкесия',
    link: './images/Karachaevsk.jpg',
    alt: 'ТЦерковь в Карачаево-Черкесии',
  },
  {
    name: 'Красная поляна',
    link: './images/sochi.jpg',
    alt: 'Роза Пик',
  },
  {
    name: 'Гора Эльбрус',
    link: './images/Elbrus.jpg',
    alt: 'Гора Эльбрус из далека',
  },
  {
    name: 'Домбай',
    link: './images/Dombai.jpg',
    alt: 'Гора Домбай',
  },
];

const gallery = document.querySelector('.gallery');
const cardTemplate = document.querySelector('.card-template').content; //сохраняем в переменную содержание тега

function loadCard(array) {
  for (let i = 0; i < array.length; i++) {
    let cardElement = cardTemplate
      .querySelector('.gallery__card')
      .cloneNode(true); //клонируем узел с содержимым
    cardElement.querySelector('.gallery__pic').src = array[i].link; //задаем атрибуты из объекта в массиве
    cardElement.querySelector('.gallery__pic').alt = array[i].alt;
    cardElement.querySelector('.gallery__title').textContent = array[i].name;
    gallery.append(cardElement); //вставляем заполненный шаблон в DOM
  }
}

loadCard(cardArr);

//////////////  //////////////
