//Класс для создания карточки
export class Card {
  constructor(name, link, templateSelector, handleCardClick) {
    this._link = link;
    this._name = name;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick
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
    this._removeBtn.closest('.gallery__card').remove();
  }

//Функция ставит лайк
  _likeCard() {
    this._likeBtn.classList.toggle('gallery__like-btn_active');
  }

  //Заполнение карточки данными и установка обработчиков
  cloneCard() {
    const clonedCard = this._getTemplate()
    const cardPic = clonedCard.querySelector('.gallery__pic');
    const cardTitle = clonedCard.querySelector('.gallery__title');
    this._removeBtn = clonedCard.querySelector('.gallery__remove-btn');
    this._likeBtn = clonedCard.querySelector('.gallery__like-btn');
    //запоняем атрибуты данными с входа фукции
    cardTitle.textContent = this._name;
    cardPic.src = this._link;
    cardPic.alt = `На изображении ${this._name}`;
    //вешаем обработчики по клику на кнопки карточки
    this._removeBtn.addEventListener('click', this._removeCard.bind(this), {once: true});
    this._likeBtn.addEventListener('click', this._likeCard.bind(this));
    cardPic.addEventListener('click', this._handleCardClick);
    return clonedCard; //возвращаем заполненную карточку
  }
}