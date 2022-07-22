//////////////Работа с попапом//////////////

const popupEdit = document.querySelector('#popupEdit');
const popupAdd = document.querySelector('#popupAdd');
const popupZoom = document.querySelector('#popupZoom');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const popupEditName = document.querySelector('#popupEditName');
const popupAddName = document.querySelector('#popupAddName');
const formJob = document.querySelector('#popupEditJob');
const formLink = document.querySelector('#popupAddLink');
const editBtn = document.querySelector('.profile__edit-btn');
const popupEditCloseBtn = popupEdit.querySelector('.popup__close-btn');
const popupAddCloseBtn = popupAdd.querySelector('.popup__close-btn');
const popupZoomCloseBtn = popupZoom.querySelector('.popup__close-btn');
const addBtn = document.querySelector('.profile__add-btn');

// Функция управляет открытием попапа
function openPopup(popup) {
  popup.classList.add('popup_opened'); //добавляем класс открытия
}

// Функция управляет закрытием попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened'); //убираем класс открытия
}

//Вешаем слушатель кликов на кнопки
editBtn.addEventListener('click', () => {
  //подставляем значения при открытии
  popupEditName.value = profileName.textContent;
  formJob.value = profileJob.textContent;
  openPopup(popupEdit);
});
popupEditCloseBtn.addEventListener('click', () => {
  closePopup(popupEdit);
});
addBtn.addEventListener('click', () => {
  //очищаем значения, которые могли остаться от предыдущего добавения
  popupAddName.value = '';
  formLink.value = '';
  openPopup(popupAdd);
});
popupAddCloseBtn.addEventListener('click', () => {
  closePopup(popupAdd);
});

const editFormElement = popupEdit.querySelector('.popup__form');
const addFormElement = popupAdd.querySelector('.popup__form');
// Функция управляет сохранением данных в строках профиля
function formSubmitHandler(evt) {
  evt.preventDefault(); //отменяем действие по умолчанию (перезагрузка страницы при отправке)

  const nameValue = popupEditName.value; //берем значение полей формы
  const jobValue = formJob.value;

  profileName.textContent = nameValue; //присваеваем элементам в профиле
  profileJob.textContent = jobValue;

  closePopup(popupEdit); //закрываем попап
}

editFormElement.addEventListener('submit', formSubmitHandler); //функция срабатывает по событию "submit"

//////////////Загрузка карточек//////////////

// Объявляем массив из объектов карточек
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
    alt: 'Церковь в Карачаево-Черкесии',
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
const cardTemplate = document.querySelector('.card-template').content; //сохраняем в переменную содержимое тега
let cardElement; //пустая переменная для хранения шаблона

//Функция клонирует узел с содержимым, добавляет слушатели на кнопки
function cloneCard() {
  cardElement = cardTemplate.querySelector('.gallery__card').cloneNode(true);
  const removeBtn = cardElement.querySelector('.gallery__remove-btn');
  const likeBtn = cardElement.querySelector('.gallery__like-btn');
  const imageBtn = cardElement.querySelector('.gallery__pic');
  removeBtn.addEventListener('click', removeCard, { once: true });
  likeBtn.addEventListener('click', likeCard);
  imageBtn.addEventListener('click', zoomImage);
  return cardElement;
}

// Функция клонирует карточку и заполняет карточку данными из объекта
function prepareCard(array, i) {
  cloneCard();
  //задаем элементам шаблона атрибуты из объекта в массиве
  cardElement.querySelector('.gallery__pic').src = array[i].link;
  cardElement.querySelector('.gallery__pic').alt = array[i].alt;
  cardElement.querySelector('.gallery__title').textContent = array[i].name;
}

// Функция помещает подготовленную карточку на страницу
function loadCard(arr) {
  for (let x = 0; x < arr.length; x++) {
    prepareCard(arr, x); //заполняем клонированый шаблон
    gallery.append(cardElement); //вставляем заполненный шаблон в DOM
  }
}

loadCard(cardArr);

//////////////Добавление карточек из формы//////////////

function addCardHandler(evt) {
  evt.preventDefault();
  cloneCard();
  //задаем элементам шаблона атрибуты из формы
  cardElement.querySelector('.gallery__pic').src = formLink.value;
  cardElement.querySelector('.gallery__pic').alt = `На изображении ${popupAddName.value}`;
  cardElement.querySelector('.gallery__title').textContent = popupAddName.value;

  gallery.prepend(cardElement);

  closePopup(popupAdd); //закрываем попап
}

addFormElement.addEventListener('submit', addCardHandler);

//////////////Взаимодействия с карточками//////////////

// Функция удаляет карточку по клику
function removeCard(el) {
  el.target.closest('.gallery__card').remove();
}

//Функция ставит лайк

function likeCard(el) {
  el.target.classList.toggle('gallery__like-btn_active');
}

//Функция открывает попап с увеличенным изображением
const zoomPic = document.querySelector('.popup__zoom-pic');
const zoomDesc = document.querySelector('.popup__desc')
function zoomImage(el) {
  zoomPic.src = el.target.src;
  zoomPic.alt = el.target.alt;
  zoomDesc.textContent = el.target.closest('.gallery__card').querySelector('.gallery__title').textContent

  openPopup(popupZoom);
}
popupZoomCloseBtn.addEventListener('click', () => {
  closePopup(popupZoom);
});
