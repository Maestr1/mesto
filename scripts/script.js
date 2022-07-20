//////////////Работа с попапом//////////////

let popup = document.querySelector('.popup');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let formName = document.querySelector('.popup__input_type_name');
let formJob = document.querySelector('.popup__input_type_job');
let editBtn = document.querySelector('.profile__edit-btn');
let closeBtn = document.querySelector('.popup__close-btn');

// Функция управляет открытием попапа
function popupOpen() {
  popup.classList.add('popup_opened'); //добавляем класс открытия
  formName.value = profileName.textContent; //присваиваем значения полям в попапе, каждый раз при открытии
  formJob.value = profileJob.textContent;
}

// Функция управляет закрытием попапа
function popupClose() {
  popup.classList.remove('popup_opened'); //убираем класс открытия
}

//Вешаем слушатель кликов на кнопки
editBtn.addEventListener('click', popupOpen);
closeBtn.addEventListener('click', popupClose);

let formElement = document.querySelector('.popup__form');

// Функция управляет сохранением данных в строках профиля
function formSubmitHandler(evt) {
  evt.preventDefault(); //отменяем действие по умолчанию (перезагрузка страницы при отправке)

  let nameValue = formName.value; //берем значение полей формы
  let jobValue = formJob.value;

  profileName.textContent = nameValue; //присваеваем элементам в профиле
  profileJob.textContent = jobValue;

  popupClose(); //закрываем попап
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
const cardTemplate = document.querySelector('.card-template').content;//сохраняем в переменную содержание тега

function cardLoad(array) {
  for (let i = 0; i < array.length; i++) {
    let cardElement = cardTemplate.querySelector('.gallery__card').cloneNode(true);//клонируем узел с содержимым
    cardElement.querySelector('.gallery__pic').src = array[i].link;//задаем атрибуты из объекта в массиве
    cardElement.querySelector('.gallery__pic').alt = array[i].alt;
    cardElement.querySelector('.gallery__title').textContent = array[i].name;
    gallery.append(cardElement);//вставляем заполненный шаблон в DOM
  }
}

cardLoad(cardArr)

//////////////  //////////////