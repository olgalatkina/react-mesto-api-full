import React from "react";
import useClose from "../utils/useClose";

const PopupWithForm = (props) => {
  const {isOpen, name, onClose, onSubmit, title, children, onOverlayClick} = props;
  useClose(isOpen, onClose);
  const buttonText = props.isLoading ? 'Сохранение...' : 'Сохранить';

  return (
    <section
      className={`popup ${isOpen ? 'popup_opened' : ''}`}
      id={`popup-${name}`}
      onClick={onOverlayClick}
    >
      <div className="popup__container">
        <button type="button" className="popup__button-close" onClick={onClose} />
        <form
          className="popup__form"
          action="#"
          method="post"
          name={`form-${name}`}
          noValidate
          onSubmit={onSubmit}
        >
          <p className="popup__title">{title}</p>
          {children}
          <button type="submit" className="popup__button-save">{buttonText}</button>
        </form>
      </div>
    </section>
  )
}

export default PopupWithForm;
