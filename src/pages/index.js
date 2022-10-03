import './index.css';

//////////////Работа с попапом//////////////
import {apiConfig, settings} from '../utils/data';
import {Section} from '../components/Section';
import {Card} from '../components/Card';
import {FormValidator} from '../components/FormValidator';
import {PopupWithForm} from '../components/PopupWithForm';
import {PopupWithImage} from '../components/PopupWithImage';
import {UserInfo} from '../components/UserInfo';
import {Api} from '../components/Api';

import {
  inputProfileJob,
  inputProfileName,
  placeAddBtn,
  popupPlaceAdd,
  popupProfileEdit,
  profileEditBtn
} from '../utils/constants';

//Создаем экземпляры классов
const popupWithImageInstance = new PopupWithImage('#popup-zoom');
popupWithImageInstance.setEventListeners();
const popupProfileEditClass = new PopupWithForm('#popup-edit', editProfileInfo);
popupProfileEditClass.setEventListeners();
const popupPlaceAddClass = new PopupWithForm('#popup-add', addCard);
popupPlaceAddClass.setEventListeners();
const userInfoHandler = new UserInfo({nameSelector: '.profile__name', jobSelector: '.profile__job'});
const api = new Api(apiConfig);
let userId = null
//////////////Загрузка карточек//////////////

//создает новый инстанс Card
function createNewCard(item) {
  return new Card(item, userId, '.card-template',
    () => popupWithImageInstance.open(item.name, item.link),
    (instance) =>
      api.removeCard(instance.getId())
        .then(instance.removeCard())
        .catch(err => console.log(`Ошибка, карточка не удалена. Текст ошибки: ${err}`)),
    (instance) =>
      api.putLike(instance.getId())
        .catch(err => console.log(`Ошибка, лайк не поставлен. Текст ошибки: ${err}`)),
    (instance) =>
      api.removeLike(instance.getId())
        .catch(err => console.log(`Ошибка, лайк не удален. Текст ошибки: ${err}`))).cloneCard();
}

const cardLoader = new Section({
  items: await api.requestCardList(), renderer: (item) => {
    const card = createNewCard(item);
    cardLoader.addItemFromServer(card);
  }
}, '.gallery');

//Загрузка карточек из массива

//Загрузка карточки из формы
function addCard(formValues) {
  api.postCard(formValues)
    .then(res => {
      const newCard = createNewCard(res);
      cardLoader.addItemFromForm(newCard);
      popupPlaceAddClass.close();
    })
    .catch(err => console.log(`Ошибка, карточка не добавлена. Текст ошибки: ${err}`));

}


api.requestUserInfo()
  .then(res => {
    userInfoHandler.setUserInfo(res);
    userId = res._id;
    cardLoader.renderItems();
    return res
  })
  .catch((res) => console.log(`Ошибка, информация о пользователе на получена. Текст ошибки: ${res}`));

//Сохранение данных из формы в строках профиля
function editProfileInfo(formValues) {
  api.patchUserInfo(formValues)
    .then(() => {
      userInfoHandler.setUserInfo(formValues);
      popupProfileEditClass.close();
    })
    .catch(err => console.log(`Ошибка, данные не отправлены. Текст ошибки: ${err}`));
  userInfoHandler.setUserInfo(formValues);
  popupProfileEditClass.close(); //закрываем попап
}

//Валидация форм
function createNewFormValidator(settings, formElement) {
  return new FormValidator(settings, formElement.querySelector('.popup__form'));
}

//Включаем валидацию форм
const placeAddFormValidator = createNewFormValidator(settings, popupPlaceAdd);
placeAddFormValidator.enableValidation();
const profileEditFormValidator = createNewFormValidator(settings, popupProfileEdit);
profileEditFormValidator.enableValidation();


api.requestUserInfo()
  .then(res => {
    userInfoHandler.setUserInfo(res);
    return res;
  })
  .then((res) => cardLoader.renderItems(res._id))
  .catch((res) => console.log(`Ошибка, информация о пользователе на получена. Текст ошибки: ${res}`));

//Вешаем слушатель кликов на кнопки
profileEditBtn.addEventListener('click', () => {
  //подставляем значения при открытии
  const userInfo = userInfoHandler.getUserInfo();
  inputProfileName.value = userInfo.name;
  inputProfileJob.value = userInfo.about;
  profileEditFormValidator.resetValidation();
  popupProfileEditClass.open();
});

placeAddBtn.addEventListener('click', () => {
  //очищаем значения, которые могли остаться от предыдущего добавения
  placeAddFormValidator.resetValidation();
  popupPlaceAddClass.open();
});