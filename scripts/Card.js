//Класс для создания карточки
export class Card {
  constructor(name, link, templateSelector, zoomImage) {
    this._link = link;
    this._name = name;
    this._templateSelector = templateSelector;
    this._zoomImage = zoomImage;
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
  _removeCard(evt) {
    evt.target.closest('.gallery__card').remove();
  }

//Функция ставит лайк
  _likeCard(evt) {
    evt.target.classList.toggle('gallery__like-btn_active');
  }

  //Заполнение карточки данными и установка обработчиков
  cloneCard() {
    const clonedCard = this._getTemplate()
    const removeBtn = clonedCard.querySelector('.gallery__remove-btn');
    const likeBtn = clonedCard.querySelector('.gallery__like-btn');
    const cardPic = clonedCard.querySelector('.gallery__pic');
    const cardTitle = clonedCard.querySelector('.gallery__title');
    //запоняем атрибуты данными с входа фукции
    cardTitle.textContent = this._name;
    cardPic.src = this._link;
    cardPic.alt = `На изображении ${this._name}`;
    //вешаем обработчики по клику на кнопки карточки
    removeBtn.addEventListener('click', this._removeCard, {once: true});
    likeBtn.addEventListener('click', this._likeCard);
    cardPic.addEventListener('click', () => this._zoomImage(this._name, this._link));
    return clonedCard; //возвращаем заполненную карточку
  }

}