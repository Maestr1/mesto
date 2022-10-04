(()=>{"use strict";var e,t,n,r,o={240:(e,t,n)=>{function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}n.d(t,{V:()=>o});var o=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._options=t}var t,n;return t=e,(n=[{key:"_onResponse",value:function(e){return e.ok?e.json():Promise.reject("Ошибка запроса. Код ошибки: ".concat(e.status))}},{key:"requestUserInfo",value:function(){var e=this;return fetch("".concat(this._options.baseUrl,"/users/me"),{headers:this._options.headers}).then((function(t){return e._onResponse(t)}))}},{key:"patchUserInfo",value:function(e){var t=this;return fetch("".concat(this._options.baseUrl,"/users/me"),{method:"PATCH",headers:this._options.headers,body:JSON.stringify({name:e.name,about:e.about})}).then((function(e){return t._onResponse(e)}))}},{key:"patchUserAvatar",value:function(e){var t=this;return fetch("".concat(this._options.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:this._options.headers,body:JSON.stringify({avatar:e.link})}).then((function(e){return t._onResponse(e)}))}},{key:"requestCardList",value:function(){var e=this;return fetch("".concat(this._options.baseUrl,"/cards"),{headers:this._options.headers}).then((function(t){return e._onResponse(t)}))}},{key:"postCard",value:function(e){var t=this;return fetch("".concat(this._options.baseUrl,"/cards"),{method:"POST",headers:this._options.headers,body:JSON.stringify({name:e.placeName,link:e.placeLink})}).then((function(e){return t._onResponse(e)}))}},{key:"removeCard",value:function(e){var t=this;return fetch("".concat(this._options.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:this._options.headers}).then((function(e){return t._onResponse(e)}))}},{key:"putLike",value:function(e){var t=this;return fetch("".concat(this._options.baseUrl,"/cards/").concat(e,"/likes"),{method:"PUT",headers:this._options.headers}).then((function(e){return t._onResponse(e)}))}},{key:"removeLike",value:function(e){var t=this;return fetch("".concat(this._options.baseUrl,"/cards/").concat(e,"/likes"),{method:"DELETE",headers:this._options.headers}).then((function(e){return t._onResponse(e)}))}}])&&r(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}()},578:(e,t,n)=>{function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}n.d(t,{Z:()=>o});var o=function(){function e(t,n,r,o,i,a,c){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._item=t,this._link=t.link,this._name=t.name,this._likesArr=t.likes,this._itemId=t._id,this._ownerId=t.owner._id,this._userId=n,this._templateSelector=r,this._handleCardClick=o,this._handleRemoveBtn=i,this._handlePutLike=a,this._handleRemoveLike=c}var t,n;return t=e,(n=[{key:"_getTemplate",value:function(){return document.querySelector(this._templateSelector).content.querySelector(".gallery__card").cloneNode(!0)}},{key:"removeCard",value:function(){this._clonedCard.remove(),this._clonedCard=null}},{key:"isLiked",value:function(){var e=this;return this._likesArr.some((function(t){return t._id===e._userId}))}},{key:"setLike",value:function(e){this._likesArr=e.likes,this.likeCounter.textContent=this._likesArr.length,this._likeBtn.classList.toggle("gallery__like-btn_liked",this.isLiked())}},{key:"getId",value:function(){return this._itemId}},{key:"cloneCard",value:function(){var e=this;this._clonedCard=this._getTemplate();var t=this._clonedCard.querySelector(".gallery__pic"),n=this._clonedCard.querySelector(".gallery__title");return this._removeBtn=this._clonedCard.querySelector(".gallery__remove-btn"),this._likeBtn=this._clonedCard.querySelector(".gallery__like-btn"),this.likeCounter=this._clonedCard.querySelector(".gallery__like-counter"),n.textContent=this._name,t.src=this._link,t.alt="На изображении ".concat(this._name),this.setLike(this._item),this._ownerId===this._userId&&this._removeBtn.classList.add("gallery__remove-btn_active"),this._removeBtn.addEventListener("click",(function(){e._handleRemoveBtn(e)})),this._likeBtn.addEventListener("click",(function(){e.isLiked()?e._handleRemoveLike(e):e._handlePutLike(e)})),t.addEventListener("click",this._handleCardClick),this._clonedCard}}])&&r(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}()},383:(e,t,n)=>{function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}n.d(t,{T:()=>o});var o=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._settings=t,this._formElement=n,this._inputList=Array.from(this._formElement.querySelectorAll(this._settings.inputSelector)),this._buttonElement=this._formElement.querySelector(this._settings.submitButtonSelector)}var t,n;return t=e,(n=[{key:"_showInputError",value:function(e,t){var n=this._formElement.querySelector("#".concat(e.id,"-error"));e.classList.add(this._settings.inputErrorClass),n.textContent=t,n.classList.add(this._settings.errorClass)}},{key:"_hideInputError",value:function(e){var t=this._formElement.querySelector("#".concat(e.id,"-error"));e.classList.remove(this._settings.inputErrorClass),t.classList.remove(this._settings.errorClass),t.textContent=""}},{key:"_checkInputValidity",value:function(e){e.validity.valid?this._hideInputError(e):this._showInputError(e,e.validationMessage)}},{key:"_hasInvalidInput",value:function(){return this._inputList.some((function(e){return!e.validity.valid}))}},{key:"_disableButton",value:function(){this._buttonElement.classList.add(this._settings.inactiveButtonClass),this._buttonElement.setAttribute("disabled","disabled")}},{key:"_toggleButtonState",value:function(){this._hasInvalidInput()?this._disableButton():(this._buttonElement.classList.remove(this._settings.inactiveButtonClass),this._buttonElement.removeAttribute("disabled"))}},{key:"resetValidation",value:function(){var e=this;this._disableButton(),this._inputList.forEach((function(t){e._hideInputError(t)}))}},{key:"_setEventListeners",value:function(){var e=this;this._toggleButtonState(),this._inputList.forEach((function(t){t.addEventListener("input",(function(){e._checkInputValidity(t),e._toggleButtonState()}))}))}},{key:"enableValidation",value:function(){this._setEventListeners()}}])&&r(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}()},4:(e,t,n)=>{function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}n.d(t,{G:()=>o});var o=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popupElement=document.querySelector(t),this._escHandler=this._handleEscClose.bind(this),this._overlayHandler=this._closePopupFromOverlay.bind(this),this._closeBtnHandler=this.close.bind(this),this._closeBtn=this._popupElement.querySelector(".popup__close-btn")}var t,n;return t=e,(n=[{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"_closePopupFromOverlay",value:function(e){e.target.classList.contains("popup")&&this.close()}},{key:"changeSaveStatus",value:function(e){this._popupElement.querySelector(".popup__submit-btn").textContent=e}},{key:"setEventListeners",value:function(){this._closeBtn.addEventListener("click",this._closeBtnHandler),this._popupElement.addEventListener("mousedown",this._overlayHandler)}},{key:"open",value:function(){document.addEventListener("keydown",this._escHandler),this._popupElement.classList.add("popup_opened")}},{key:"close",value:function(){document.removeEventListener("keydown",this._escHandler),this._popupElement.classList.remove("popup_opened")}}])&&r(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}()},542:(e,t,n)=>{function r(e){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(e)}function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function i(){return i="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=a(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},i.apply(this,arguments)}function a(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=s(e)););return e}function c(e,t){return c=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},c(e,t)}function u(e,t){if(t&&("object"===r(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function s(e){return s=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},s(e)}n.d(t,{z:()=>l});var l=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&c(e,t)}(f,e);var t,n,r,a,l=(r=f,a=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=s(r);if(a){var n=s(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return u(this,e)});function f(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,f),l.call(this,e)}return t=f,(n=[{key:"updateFunctionToConfirm",value:function(e){this._func=e}},{key:"setEventListeners",value:function(){var e=this;this._popupElement.addEventListener("submit",(function(t){t.preventDefault(),e._func()})),i(s(f.prototype),"setEventListeners",this).call(this)}}])&&o(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),f}(n(4).G)},1:(e,t,n)=>{function r(e){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(e)}function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function i(){return i="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=a(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},i.apply(this,arguments)}function a(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=s(e)););return e}function c(e,t){return c=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},c(e,t)}function u(e,t){if(t&&("object"===r(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function s(e){return s=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},s(e)}n.d(t,{U:()=>l});var l=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&c(e,t)}(f,e);var t,n,r,a,l=(r=f,a=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=s(r);if(a){var n=s(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return u(this,e)});function f(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,f),(n=l.call(this,e))._handlerFormSubmit=t,n._form=n._popupElement.querySelector(".popup__form"),n._inputList=n._form.querySelectorAll("input"),n}return t=f,(n=[{key:"_getInputValues",value:function(){var e=this;return this._formValues={},this._inputList.forEach((function(t){e._formValues[t.name]=t.value})),this._formValues}},{key:"setEventListeners",value:function(){var e=this;this._popupElement.addEventListener("submit",(function(t){t.preventDefault(),e._handlerFormSubmit(e._getInputValues())})),i(s(f.prototype),"setEventListeners",this).call(this)}},{key:"close",value:function(){this._form.reset(),i(s(f.prototype),"close",this).call(this)}}])&&o(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),f}(n(4).G)},584:(e,t,n)=>{function r(e){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(e)}function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function i(){return i="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=a(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},i.apply(this,arguments)}function a(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=s(e)););return e}function c(e,t){return c=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},c(e,t)}function u(e,t){if(t&&("object"===r(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function s(e){return s=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},s(e)}n.d(t,{l:()=>l});var l=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&c(e,t)}(f,e);var t,n,r,a,l=(r=f,a=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=s(r);if(a){var n=s(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return u(this,e)});function f(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,f),(t=l.call(this,e))._zoomPic=t._popupElement.querySelector(".popup__zoom-pic"),t._zoomDesc=t._popupElement.querySelector(".popup__desc"),t}return t=f,(n=[{key:"open",value:function(e,t){this._zoomPic.src=t,this._zoomPic.alt="На изображении ".concat(e),this._zoomDesc.textContent=e,i(s(f.prototype),"open",this).call(this)}}])&&o(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),f}(n(4).G)},411:(e,t,n)=>{function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}n.d(t,{$:()=>o});var o=function(){function e(t,n){t.items;var r=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._renderer=r,this._container=document.querySelector(n)}var t,n;return t=e,(n=[{key:"renderItems",value:function(e){var t=this;e.forEach((function(e){t._renderer(e)}))}},{key:"addItemFromServer",value:function(e){this._container.append(e)}},{key:"addItemFromForm",value:function(e){this._container.prepend(e)}}])&&r(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}()},840:(e,t,n)=>{function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}n.d(t,{a:()=>o});var o=function(){function e(t){var n=t.nameSelector,r=t.jobSelector,o=t.avatarSelector;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._profileName=document.querySelector(n),this._profileJob=document.querySelector(r),this._profileAvatar=document.querySelector(o)}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return this.userInfo={name:this._profileName.textContent,about:this._profileJob.textContent},this.userInfo}},{key:"setUserInfo",value:function(e){this._profileName.textContent=e.name,this._profileJob.textContent=e.about}},{key:"updateUserAvatar",value:function(e){this._profileAvatar.src=e.avatar}}])&&r(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}()},627:(e,t,n)=>{n.a(e,(async(e,t)=>{try{var r=n(788),o=n(411),i=n(578),a=n(383),c=n(1),u=n(584),s=n(542),l=n(840),f=n(240),p=n(674);function O(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function j(e,t){if(e){if("string"==typeof e)return C(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?C(e,t):void 0}}function C(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function L(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i=[],a=!0,c=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);a=!0);}catch(e){c=!0,o=e}finally{try{a||null==n.return||n.return()}finally{if(c)throw o}}return i}}function P(e){if(Array.isArray(e))return e}var h=new f.V(r.d),d=new s.z("#popup-confirm");d.setEventListeners();var y=new u.l("#popup-zoom");y.setEventListeners();var _=new c.U("#popup-edit",B);_.setEventListeners();var v=new c.U("#popup-add",q);v.setEventListeners();var b=new c.U("#popup-avatar",R);b.setEventListeners();var m=new l.a({nameSelector:".profile__name",jobSelector:".profile__job",avatarSelector:".profile__avatar"}),k=null;function I(e){return new i.Z(e,k,".card-template",(function(){return y.open(e.name,e.link)}),(function(e){d.open(),d.updateFunctionToConfirm((function(){h.removeCard(e.getId()).then((function(t){return e.removeCard(),d.close(),t})).catch((function(e){return console.log("Ошибка, карточка не удалена. Текст ошибки: ".concat(e))}))}))}),(function(e){return h.putLike(e.getId()).then((function(t){return e.setLike(t)})).catch((function(e){return console.log("Ошибка, лайк не поставлен. Текст ошибки: ".concat(e))}))}),(function(e){return h.removeLike(e.getId()).then((function(t){return e.setLike(t)})).catch((function(e){return console.log("Ошибка, лайк не удален. Текст ошибки: ".concat(e))}))})).cloneCard()}var g=new o.$({items:await h.requestCardList().catch((function(e){return console.log("Ошибка, не получен список карточек. Текст ошибки: ".concat(e))})),renderer:function(e){var t=I(e);g.addItemFromServer(t)}},".gallery");function q(e){v.changeSaveStatus("Сохранение..."),h.postCard(e).then((function(e){var t=I(e);g.addItemFromForm(t),v.close()})).catch((function(e){return console.log("Ошибка, карточка не добавлена. Текст ошибки: ".concat(e))})).finally((function(){return v.changeSaveStatus("Создать")}))}function R(e){b.changeSaveStatus("Сохранение..."),h.patchUserAvatar(e).then((function(e){m.updateUserAvatar(e),b.close()})).catch((function(e){return console.log("Ошибка, данные не отправлены. Текст ошибки: ".concat(e))})).finally((function(){return b.changeSaveStatus("Сохранить")}))}function B(e){_.changeSaveStatus("Сохранение..."),h.patchUserInfo(e).then((function(){m.setUserInfo(e),_.close()})).catch((function(e){return console.log("Ошибка, данные не отправлены. Текст ошибки: ".concat(e))})).finally((function(){return _.changeSaveStatus("Сохранить")}))}function T(e,t){return new a.T(e,t.querySelector(".popup__form"))}var w=T(r.X,p.sw);w.enableValidation();var S=T(r.X,p.tD);S.enableValidation();var E=T(r.X,p.bM);E.enableValidation(),Promise.all([h.requestUserInfo(),h.requestCardList()]).then((function(e){var t,n=(2,P(t=e)||L(t,2)||j(t,2)||O()),r=n[0],o=n[1];k=r._id,m.setUserInfo(r),m.updateUserAvatar(r),g.renderItems(o)})).catch((function(e){return console.log("Ошибка, запрос информации не выполнен. Текст ошибки: ".concat(e))})),p.xm.addEventListener("click",(function(){var e=m.getUserInfo();p.j0.value=e.name,p.e0.value=e.about,S.resetValidation(),_.open()})),p.sC.addEventListener("click",(function(){w.resetValidation(),v.open()})),p.nf.addEventListener("click",(function(){E.resetValidation(),b.open()})),t()}catch(U){t(U)}}),1)},674:(e,t,n)=>{n.d(t,{bM:()=>i,e0:()=>l,j0:()=>s,nf:()=>u,sC:()=>c,sw:()=>o,tD:()=>r,xm:()=>a});var r=document.querySelector("#popup-edit"),o=document.querySelector("#popup-add"),i=document.querySelector("#popup-avatar"),a=document.querySelector(".profile__edit-btn"),c=document.querySelector(".profile__add-btn"),u=document.querySelector(".profile__avatar-edit-btn"),s=document.querySelector("input[name=name]"),l=document.querySelector("input[name=about]");document.querySelector(".profile__avatar"),document.querySelector(".profile__name"),document.querySelector(".profile__job")},788:(e,t,n)=>{n.d(t,{X:()=>r,d:()=>o});var r={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__submit-btn",inactiveButtonClass:"popup__submit-btn_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_visible"},o={baseUrl:"https://nomoreparties.co/v1/cohort-51",headers:{authorization:"fa7292f4-824e-46b8-941f-2d01ddc8db72","Content-Type":"application/json"}}}},i={};function a(e){var t=i[e];if(void 0!==t)return t.exports;var n=i[e]={exports:{}};return o[e](n,n.exports,a),n.exports}e="function"==typeof Symbol?Symbol("webpack queues"):"__webpack_queues__",t="function"==typeof Symbol?Symbol("webpack exports"):"__webpack_exports__",n="function"==typeof Symbol?Symbol("webpack error"):"__webpack_error__",r=e=>{e&&!e.d&&(e.d=1,e.forEach((e=>e.r--)),e.forEach((e=>e.r--?e.r++:e())))},a.a=(o,i,a)=>{var c;a&&((c=[]).d=1);var u,s,l,f=new Set,p=o.exports,h=new Promise(((e,t)=>{l=t,s=e}));h[t]=p,h[e]=e=>(c&&e(c),f.forEach(e),h.catch((e=>{}))),o.exports=h,i((o=>{var i;u=(o=>o.map((o=>{if(null!==o&&"object"==typeof o){if(o[e])return o;if(o.then){var i=[];i.d=0,o.then((e=>{a[t]=e,r(i)}),(e=>{a[n]=e,r(i)}));var a={};return a[e]=e=>e(i),a}}var c={};return c[e]=e=>{},c[t]=o,c})))(o);var a=()=>u.map((e=>{if(e[n])throw e[n];return e[t]})),s=new Promise((t=>{(i=()=>t(a)).r=0;var n=e=>e!==c&&!f.has(e)&&(f.add(e),e&&!e.d&&(i.r++,e.push(i)));u.map((t=>t[e](n)))}));return i.r?s:a()}),(e=>(e?l(h[n]=e):s(p),r(c)))),c&&(c.d=0)},a.d=(e,t)=>{for(var n in t)a.o(t,n)&&!a.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),a(627)})();