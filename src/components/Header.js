import React from 'react';
import { Route, Link, Switch } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="header__logo" />
        <div className="header__menu">
          <Switch>
            <Route path="/sign-up">
              <Link to="./sign-in" className="header__auth">
                Войти
              </Link>
            </Route>
            <Route path="/sign-in">
              <Link to="./sign-up" className="header__auth">
                Регистрация
              </Link>
            </Route>
            <Route path="/">
              <p className="header__email"></p>
              <p className="header__auth" >
                Выйти
              </p>
            </Route>
          </Switch>
        </div>
    </header>
  );
}

export default Header;
