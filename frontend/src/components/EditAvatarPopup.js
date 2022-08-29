import React, {useRef} from "react";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = (props) => {
  const avatarRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
    avatarRef.current.value = "";
  }

  return (
    <PopupWithForm
      onClose={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
      onOverlayClick={props.onOverlayClick}
      isLoading={props.isLoading}
      name="edit-avatar"
      title="Обновить аватар"
    >
      <label htmlFor="avatar" className="popup__label">
        <input
          type="url"
          name="avatar"
          id="avatar"
          className="popup__input"
          placeholder="Ссылка на картинку"
          required
          ref={avatarRef}
        />
        <p className="popup__error" id="avatar-error"/>
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
