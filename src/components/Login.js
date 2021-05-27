import React from 'react';

function Login() {
    return (
        <form className="popup__container popup__container_auth" method="POST"  noValidate>
            <h3 className="popup__header popup__header_auth">Вход</h3>
                <input
                    //value={link}
                    //onChange={handleChangeLink} 
                    //id="popup__link" 
                    className="popup__input popup__input_auth" 
                    //type="url" 
                    placeholder="Email" 
                    // name="link" 
                    required 
                />

                <input 
                    //value={name||''} 
                    //onChange={handleChangeName} 
                    //id="popup__name-author" 
                    className="popup__input popup__input_auth" 
                    type="text" 
                    placeholder="Пароль" 
                    //name="author" 
                    minLength={2} 
                    maxLength={40} 
                    required 
                />
                <button className="popup__button popup__button_auth" type="submit" >Войти</button>
        </form>
    );
  }
  
  export default Login;