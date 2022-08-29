import React, {useState} from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({isOpen, onClose, onUpdatePlace, onOverlayClick, isLoading}) => {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  }

  const handleLinkChange = (e) => {
    setLink(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdatePlace({
      title,
      link,
    });
    setTitle('');
    setLink('');
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onOverlayClick={onOverlayClick}
      isLoading={isLoading}
      name="add-photo"
      title="Новое место"
    >
      <label htmlFor="title" className="popup__label">
        <input
          type="text"
          name="title"
          id="title"
          className="popup__input"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
          value={title || ''}
          onChange={handleTitleChange}
        />
        <p className="popup__error" id="title-error"/>
      </label>
      <label htmlFor="link" className="popup__label">
        <input
          type="url"
          name="link"
          id="link"
          className="popup__input"
          placeholder="Ссылка на картинку"
          required
          value={link || ''}
          onChange={handleLinkChange}
        />
        <p className="popup__error" id="link-error"/>
      </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
