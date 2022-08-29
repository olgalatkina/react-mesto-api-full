import React from "react";
import useClose from "../utils/useClose";

const ImagePopup = (props) => {
  useClose(props.isOpen, props.onClose);

  return (
    <section
      className={`popup ${props.isOpen ? 'popup_opened' : ''}`}
      id="popup-show-photo"
      onClick={props.onOverlayClick}
    >
      <figure className="popup__figure">
        <button type="button" className="popup__button-close" onClick={props.onClose} />
        <img className="popup__image" src={props.card.link} alt={props.card.name} />
        <figcaption className="popup__caption">{props.card.name}</figcaption>
      </figure>
    </section>
  )
}

export default ImagePopup;
