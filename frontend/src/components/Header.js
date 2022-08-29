import React, {useState} from 'react';
import {Routes, Route, Link} from "react-router-dom";
import logo from "../images/logo-white.svg";

const Header = ({email, onSignOut}) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleBurgerClick = () => setIsVisible(!isVisible);

  return (
    <header className={`header ${isVisible ? 'header_visible' : ''}`}>
      <img src={logo} alt="Логотип сервиса Место" className="header__logo logo"/>
      <Routes>
        <Route
          path="/sign-in"
          element={
            <Link className="header__link" to="/sign-up">
              Регистрация
            </Link>
          }
        />
        <Route
          path="sign-up"
          element={
            <Link className="header__link" to="/sign-in">
              Войти
            </Link>
          }
        />
        <Route
          path="/"
          element={
            <>
              <div className={`header__wrapper ${isVisible ? 'header__wrapper_visible' : ''}`}>
                <p className="header__email">{email}</p>
                <button
                  className="header__button-exit"
                  onClick={onSignOut}
                  type="button"
                >
                  Выйти
                </button>
              </div>
              <button
                type="button"
                className={`burger ${isVisible ? 'burger_close' : ''}`}
                onClick={handleBurgerClick}
              >
                <span className="burger__line" />
              </button>
            </>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;
