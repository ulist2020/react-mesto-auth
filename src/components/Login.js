import React, { useState } from 'react';

function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!email || !password) {
      return;
    }
    props.onLogin(email, password);
  }

    return (
        <form onSubmit={handleSubmit} className="popup__container popup__container_auth" noValidate>
            <h3 className="popup__header popup__header_auth">Вход</h3>
                <input
                    value={email}
                    onChange={handleChangeEmail} 
                    id="email" 
                    className="popup__input popup__input_auth" 
                    type="email" 
                    placeholder="Email" 
                    name="email"
                    required 
                />
                <input 
                    value={password} 
                    onChange={handleChangePassword} 
                    id="password" 
                    className="popup__input popup__input_auth" 
                    type="password"
                    placeholder="Пароль" 
                    name="password" 
                    minLength={6} 
                    maxLength={40} 
                    required 
                />
                <button className="popup__button popup__button_auth" type="submit" >Войти</button>
        </form>
    );
  }
  
  export default Login;