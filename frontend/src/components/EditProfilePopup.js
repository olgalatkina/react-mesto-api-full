import React, {useState, useEffect, useContext} from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

const EditProfilePopup = (props) => {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      onClose={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
      onOverlayClick={props.onOverlayClick}
      isLoading={props.isLoading}
      name="edit-profile"
      title="Редактировать профиль"
    >
      <label htmlFor="name" className="popup__label">
        <input
          type="text"
          name="name"
          id="name"
          className="popup__input"
          placeholder="Введите имя"
          minLength="2"
          maxLength="40"
          required
          value={name || ''}
          onChange={handleNameChange}
        />
        <p className="popup__error" id="name-error"/>
      </label>
      <label htmlFor="position" className="popup__label">
        <input
          type="text"
          name="position"
          id="position"
          className="popup__input"
          placeholder="Укажите профессию"
          minLength="2"
          maxLength="200"
          required
          value={description || ''}
          onChange={handleDescriptionChange}
        />
        <p className="popup__error" id="position-error"/>
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
