import React, { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    // Подписка на контекст
    const currentUser = React.useContext(CurrentUserContext);
    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleChangeName(e) {
        setName(e.target.value);
    }
    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }
    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
          name,
          about: description,
        });
    }
    
    return (
      <PopupWithForm 
        name="popup-author" 
        title="Редактировать профиль"
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
        buttonText='Сохранить'
        className="popup__container"
        >
            <input value={name||''} 
            onChange={handleChangeName} 
            id="popup__name-author" 
            className="popup__input" 
            type="text" 
            placeholder="Имя" 
            name="author" 
            minLength={2} 
            maxLength={40} 
            required 
            />
            <span className="popup__name-author-error popup__error" />
            <input 
            value={description||''} 
            onChange={handleChangeDescription} 
            id="popup__link-author" 
            className="popup__input" 
            type="text" 
            placeholder="О себе" 
            name="description" 
            minLength={2} 
            maxLength={200} 
            required 
            />
            <span className="popup__link-author-error popup__error" />
      </PopupWithForm>

    );
  }
  
  export default EditProfilePopup;

