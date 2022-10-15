import './index.css';

//////////////Работа с попапом//////////////
import {apiConfig, settings} from '../utils/data';
import {Section} from '../components/Section';
import {Card} from '../components/Card';
import {FormValidator} from '../components/FormValidator';
import {PopupWithForm} from '../components/PopupWithForm';
import {PopupWithImage} from '../components/PopupWithImage';
import {PopupWithConfirm} from '../components/PopupWithConfirm';
import {UserInfo} from '../components/UserInfo';
import {Api} from '../components/Api';

import {
  avatarEditBtn,
  inputProfileJob,
  inputProfileName,
  placeAddBtn, popupAvatarEdit,
  popupPlaceAdd,
  popupProfileEdit,
  profileEditBtn
} from '../utils/constants';

//Создаем экземпляры классов
const api = new Api(apiConfig);
const popupWithConfirmClass = new PopupWithConfirm('#popup-confirm');
popupWithConfirmClass.setEventListeners();
const popupWithImageInstance = new PopupWithImage('#popup-zoom');
popupWithImageInstance.setEventListeners();
const popupProfileEditClass = new PopupWithForm('#popup-edit', editProfileInfo);
popupProfileEditClass.setEventListeners();
const popupPlaceAddClass = new PopupWithForm('#popup-add', addCard);
popupPlaceAddClass.setEventListeners();
const popupAvatarEditClass = new PopupWithForm('#popup-avatar', patchAvatar);
popupAvatarEditClass.setEventListeners();
const userInfoHandler = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__job',
  avatarSelector: '.profile__avatar'
});
let userId = null;

//////////////Загрузка карточек//////////////
//создает новый инстанс Card
function createNewCard(item) {
  return new Card(item, userId, '.card-template',
    () => popupWithImageInstance.open(item.name, item.link),
    (instance) => {
      popupWithConfirmClass.open();
      popupWithConfirmClass.updateFunctionToConfirm(() => {
        api.removeCard(instance.getId())
          .then(() => {
            instance.removeCard();
            popupWithConfirmClass.close();
          })
          .catch(err => console.log(`Ошибка, карточка не удалена. Текст ошибки: ${err}`));
      });
    },
    (instance) => {
      return api.putLike(instance.getId())
        .then(res => instance.setLike(res))
        .catch(err => console.log(`Ошибка, лайк не поставлен. Текст ошибки: ${err}`));
    },
    (instance) =>
      api.removeLike(instance.getId())
        .then(res => instance.setLike(res))
        .catch(err => console.log(`Ошибка, лайк не удален. Текст ошибки: ${err}`))).cloneCard();
}

const cardLoader = new Section({
  items: await api.requestCardList()
    .catch(err => console.log(`Ошибка, не получен список карточек. Текст ошибки: ${err}`)),
  renderer: (item) => {
    const card = createNewCard(item);
    cardLoader.addItemFromServer(card);
  }
}, '.gallery');


//Загрузка карточки из формы
function addCard(formValues) {
  popupPlaceAddClass.changeSaveStatus('Сохранение...');
  api.postCard(formValues)
    .then(res => {
      const newCard = createNewCard(res);
      cardLoader.addItemFromForm(newCard);
      popupPlaceAddClass.close();
    })
    .catch(err => console.log(`Ошибка, карточка не добавлена. Текст ошибки: ${err}`))
    .finally(() => popupPlaceAddClass.changeSaveStatus('Создать'));
}

function patchAvatar(formValues) {
  popupAvatarEditClass.changeSaveStatus('Сохранение...');
  api.patchUserAvatar(formValues)
    .then(res => {
      userInfoHandler.updateUserAvatar(res);
      popupAvatarEditClass.close();
    })
    .catch(err => console.log(`Ошибка, данные не отправлены. Текст ошибки: ${err}`))
    .finally(() => popupAvatarEditClass.changeSaveStatus('Сохранить'));
}

//Сохранение данных из формы в строках профиля
function editProfileInfo(formValues) {
  popupProfileEditClass.changeSaveStatus('Сохранение...');
  api.patchUserInfo(formValues)
    .then(() => {
      userInfoHandler.setUserInfo(formValues);
      popupProfileEditClass.close();
    })
    .catch(err => console.log(`Ошибка, данные не отправлены. Текст ошибки: ${err}`))
    .finally(() => popupProfileEditClass.changeSaveStatus('Сохранить'));
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
const avatarEditFormValidator = createNewFormValidator(settings, popupAvatarEdit);
avatarEditFormValidator.enableValidation();

Promise.all([api.requestUserInfo(), api.requestCardList()])
  .then(([userInfo, cardList])=>{
    userId = userInfo._id;
    userInfoHandler.setUserInfo(userInfo);
    userInfoHandler.updateUserAvatar(userInfo);
    cardLoader.renderItems(cardList)
})
  .catch((res) => console.log(`Ошибка, запрос информации не выполнен. Текст ошибки: ${res}`))


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

avatarEditBtn.addEventListener('click', () => {
  avatarEditFormValidator.resetValidation();
  popupAvatarEditClass.open();
});