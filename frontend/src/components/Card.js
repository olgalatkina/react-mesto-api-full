import React, {useContext} from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

const Card = (props) => {
  const currentUser = useContext(CurrentUserContext);
  const {id, link, name, card} = props;

  const isOwn = card.owner._id === currentUser._id;
  const cardTrashButtonClassName = (
    `card__button-trash ${isOwn ? '' : 'card__button-trash_hidden'}`
  );

  const isLiked = card.likes.some(like => like._id === currentUser._id);
  const cardLikeButtonClassName = (
    `card__button-like ${isLiked ? 'card__button-like_active' : ''}`
  );

  const handleClick = () => {
    props.onCardClick(props.card);
  }

  const handleLikeClick = () => {
    props.onCardLike(props.card);
  }

  const handleTrashClick = () => {
    props.onCardDelete(props.card)
  }

  return (
  <li className="gallery__item card" id={id}>
    <button type="button" className={cardTrashButtonClassName} onClick={handleTrashClick}/>
    <img src={link} alt={name} className="card__image" onClick={handleClick} />
    <div className="card__wrapper">
      <h3 className="card__title">{name}</h3>
      <div className="card__like-zone">
        <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick} />
        <span className="card__like-counter">{card.likes.length}</span>
      </div>
    </div>
  </li>
)};

export default Card;
