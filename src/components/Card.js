//Класс для создания карточки
export class Card {
  constructor(name, link, templateSelector, handleCardClick) {
    this._link = link;
    this._name = name;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

//Поиск и клонирование шаблона корточки
  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.gallery__card')
      .cloneNode(true);
  }

//Удаление карточку по клику
  _removeCard() {
    this._clonedCard.remove();
    this._clonedCard = null;
  }

//Функция ставит лайк
  _likeCard() {
    this._likeBtn.classList.toggle('gallery__like-btn_active');
  }

  //Заполнение карточки данными и установка обработчиков
  cloneCard() {
    this._clonedCard = this._getTemplate();
    const cardPic = this._clonedCard.querySelector('.gallery__pic');
    const cardTitle = this._clonedCard.querySelector('.gallery__title');
    this._removeBtn = this._clonedCard.querySelector('.gallery__remove-btn');
    this._likeBtn = this._clonedCard.querySelector('.gallery__like-btn');
    //запоняем атрибуты данными с входа фукции
    cardTitle.textContent = this._name;
    cardPic.src = this._link;
    cardPic.alt = `На изображении ${this._name}`;
    //вешаем обработчики по клику на кнопки карточки
    this._removeBtn.addEventListener('click', this._removeCard.bind(this));
    this._likeBtn.addEventListener('click', this._likeCard.bind(this));
    cardPic.addEventListener('click', this._handleCardClick);
    return this._clonedCard; //возвращаем заполненную карточку
  }
}