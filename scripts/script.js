//////////////Работа с попапом//////////////

const popupProfileEdit = document.querySelector('#popup-edit');
const popupPlaceAdd = document.querySelector('#popup-add');
const popupZoom = document.querySelector('#popup-zoom');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const popupProfileEditNameInput = document.querySelector('#popup-edit-input-name'); //Поле ввода имени
const popupProfileEditJobInput = document.querySelector('#popup-edit-input-job'); //Поле ввода профессии
const popupPlaceAddNameInput = document.querySelector('#popup-add-input-name'); //Поле ввода имени
const popupPlaceAddLinkInput = document.querySelector('#popup-add-input-link'); //Поле ввода ссылки на изображение
const profileEditBtn = document.querySelector('.profile__edit-btn'); //Кнопка редактирования профиля
const popupProfileEditCloseBtn = popupProfileEdit.querySelector('.popup__close-btn'); //Кнопка закрытия попапа
const popupPlaceAddCloseBtn = popupPlaceAdd.querySelector('.popup__close-btn'); //Кнопка закрытия попапа
const popupZoomCloseBtn = popupZoom.querySelector('.popup__close-btn'); //Кнопка закрытия попапа
const placeAddBtn = document.querySelector('.profile__add-btn'); //Кнопка добавления места

// Функция управляет открытием попапа
function openPopup(popup) {
  popup.classList.add('popup_opened'); //добавляем класс открытия
}

// Функция управляет закрытием попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened'); //убираем класс открытия
}

//Вешаем слушатель кликов на кнопки
profileEditBtn.addEventListener('click', () => {
  //подставляем значения при открытии
  popupProfileEditNameInput.value = profileName.textContent;
  popupProfileEditJobInput.value = profileJob.textContent;
  openPopup(popupProfileEdit);
});
popupProfileEditCloseBtn.addEventListener('click', () => {
  closePopup(popupProfileEdit);
});
placeAddBtn.addEventListener('click', () => {
  //очищаем значения, которые могли остаться от предыдущего добавения
  popupPlaceAddNameInput.closest('.popup__form').reset();
  openPopup(popupPlaceAdd);
});
popupPlaceAddCloseBtn.addEventListener('click', () => {
  closePopup(popupPlaceAdd);
});

const profileEditForm = popupProfileEdit.querySelector('.popup__form');
const placeAddForm = popupPlaceAdd.querySelector('.popup__form');
// Функция управляет сохранением данных в строках профиля
function editProfileInfo(evt) {
  evt.preventDefault(); //отменяем действие по умолчанию (перезагрузка страницы при отправке)

  const nameValue = popupProfileEditNameInput.value; //берем значение полей формы
  const jobValue = popupProfileEditJobInput.value;

  profileName.textContent = nameValue; //присваеваем элементам в профиле
  profileJob.textContent = jobValue;

  closePopup(popupProfileEdit); //закрываем попап
}

profileEditForm.addEventListener('submit', editProfileInfo); //функция срабатывает по событию "submit"

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

//Функция клонирует узел с содержимым, заполняет атрибуты и добавляет слушатели на кнопки
const gallery = document.querySelector('.gallery');
const cardTemplate = document.querySelector('.card-template').content; //сохраняем в переменную содержимое тега
const galleryCard = cardTemplate.querySelector('.gallery__card'); //сохраняем в переменную карточку

function cloneCard(name, link, alt) {
  const clonedCard = galleryCard.cloneNode(true);
  const removeBtn = clonedCard.querySelector('.gallery__remove-btn');
  const likeBtn = clonedCard.querySelector('.gallery__like-btn');
  const cardPic = clonedCard.querySelector('.gallery__pic');
  const cardTitle = clonedCard.querySelector('.gallery__title')
  //запоняем атрибуты данными с входа фукции
  cardTitle.textContent = name;
  cardPic.src = link;
  cardPic.alt = alt;
  //вешаем обработчики по клику на кнопки карточки
  removeBtn.addEventListener('click', removeCard, { once: true });
  likeBtn.addEventListener('click', likeCard);
  cardPic.addEventListener('click', zoomImage);
  return clonedCard; //возвращаем заполненную карточку
}

//Фукция загружает карточки из массива
function loadCard(arr) {
  arr.forEach((item) => {
    gallery.append(cloneCard(item.name, item.link, item.alt))
  });
}
loadCard(cardArr)


//////////////Добавление карточек из формы//////////////

function addCard(evt) {
  evt.preventDefault();
  const name = popupPlaceAddNameInput.value;
  const link = popupPlaceAddLinkInput.value;
  const alt = `На изображении ${popupPlaceAddNameInput.value}`;
  gallery.prepend(cloneCard(name, link, alt))
  closePopup(popupPlaceAdd);
}

placeAddForm.addEventListener('submit', addCard);


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
const zoomDesc = document.querySelector('.popup__desc');

function zoomImage(el) {
  zoomPic.src = el.target.src;
  zoomPic.alt = el.target.alt;
  zoomDesc.textContent = el.target
    .closest('.gallery__card')
    .querySelector('.gallery__title').textContent;

  openPopup(popupZoom);
}
popupZoomCloseBtn.addEventListener('click', () => {
  closePopup(popupZoom);
});
