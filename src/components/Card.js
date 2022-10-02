//Класс для создания карточки
export class Card {
  constructor(item, userId, templateSelector, handleCardClick, handleRemoveBtn, handlePutLike, handleRemoveLike) {
    this._link = item.link;
    this._name = item.name;
    this._likes = item.likes;
    this._itemId = item._id;
    this._ownerId = item.owner._id;
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleRemoveBtn = handleRemoveBtn;
    this._handlePutLike = handlePutLike;
    this._handleRemoveLike = handleRemoveLike;
  }

//Поиск и клонирование шаблона карточки
  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.gallery__card')
      .cloneNode(true);
  }

//Удаление карточки по клику
  removeCard() {
    this._clonedCard.remove();
    this._clonedCard = null;
  }

//Функция ставит лайк
  _likeCard() {
    if (!this._likeBtn.classList.contains('gallery__like-btn_active')) {
      this._handlePutLike(this);
    } else {
      this._handleRemoveLike(this);
    }
    this._likeBtn.classList.toggle('gallery__like-btn_active');
  }

  getId() {
    return this._itemId
  }

  //Заполнение карточки данными и установка обработчиков
  cloneCard() {
    //console.log(this._likes);
    this._clonedCard = this._getTemplate();
    const cardPic = this._clonedCard.querySelector('.gallery__pic');
    const cardTitle = this._clonedCard.querySelector('.gallery__title');
    this._removeBtn = this._clonedCard.querySelector('.gallery__remove-btn');
    this._likeBtn = this._clonedCard.querySelector('.gallery__like-btn');
    this._likeCounter = this._clonedCard.querySelector('.gallery__like-counter');
    //запоняем атрибуты данными с входа фукции
    cardTitle.textContent = this._name;
    cardPic.src = this._link;
    cardPic.alt = `На изображении ${this._name}`;
    this._likeCounter.textContent = this._likes.length;
    if (this._ownerId === this._userId) {
      this._removeBtn.classList.add('gallery__remove-btn_active');
    }
    //вешаем обработчики по клику на кнопки карточки
    this._removeBtn.addEventListener('click', ()=> {this._handleRemoveBtn(this)});
    this._likeBtn.addEventListener('click', this._likeCard.bind(this));
    cardPic.addEventListener('click', this._handleCardClick);
    return this._clonedCard; //возвращаем заполненную карточку
  }
}