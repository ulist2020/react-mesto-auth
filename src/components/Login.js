import React from 'react';
import PopupWithForm from './PopupWithForm';

function Login(props) {
    return (
      <PopupWithForm 
        name="popup-enter" 
        title="Вход"
        classNameForm="popup__container_auth"
        classNameCloseButton="popup__close-button_auth"
        classNameButton="popup__button_auth"
        //isOpen={props.isOpen}
        //onSubmit={handleSubmit}
        buttonText='Войти'
        >
        <input
          //value={email}
          //onChange={handleChangeLink} 
          //id="popup__link" 
          className="popup__input_auth" 
          //type="url" 
          placeholder="Email" 
         // name="link" 
          required 
        />

        <input 
            //value={password} 
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
  
  export default Login;