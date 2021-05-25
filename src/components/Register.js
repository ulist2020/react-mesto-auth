import React from 'react';
import PopupWithForm from './PopupWithForm';
import { Link } from "react-router-dom";

function Register(props) {
    return (
      <PopupWithForm 
        name="popup-register" 
        title="Регистрация"
        classNameForm="popup__container_auth"
        classNameCloseButton="popup__close-button_auth"
        classNameButton="popup__button_auth"
        isOpen={props.isOpen}
        //onSubmit={handleSubmit}
        buttonText='Зарегистрироваться'
        textUnderButton={
            <Link to="/sign-in" className="popup__register-auth">
                Уже зарегистрированны? Войти
            </Link>}
        >
        <input
          //value={link}
          //onChange={handleChangeLink} 
          //id="popup__link" 
          className="popup__input_auth" 
          //type="url" 
          placeholder="Email" 
         // name="link" 
          required 
        />

        <input 
            //value={name||''} 
            //onChange={handleChangeName} 
            //id="popup__name-author" 
            className="popup__input_auth" 
            type="text" 
            placeholder="Пароль" 
            //name="author" 
            minLength={2} 
            maxLength={40} 
            required 
        />
      </PopupWithForm>
      
    );
  }
  
  export default Register;
