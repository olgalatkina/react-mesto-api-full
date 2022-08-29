import React, {useContext} from 'react';
import CurrentUserContext from "../contexts/CurrentUserContext";
import Card from './Card';

const Main = ({onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete}) => {
  const {name, about, avatar} = useContext(CurrentUserContext); // currentUser

  return (
    <main className="main">
      <h1 className="title">Cервис Место: можно добавлять фотографии, удалять их и ставить лайки</h1>
      <section className="profile">
        <div
          className="profile__avatar"
          aria-label="Открыть попап редактирования аватара"
          tabIndex="1"
          onClick={onEditAvatar}
          style={{backgroundImage: `url(${avatar})`}}
        />
        <div className="profile__content">
          <div className="profile__wrapper">
            <h2 className="profile__name">{name}</h2>
            <button type="button" className="profile__button-edit" onClick={onEditProfile} />
          </div>
          <p className="profile__position">{about}</p>
        </div>
        <button type="button" className="profile__button-add" onClick={onAddPlace} />
      </section>

      <section className="gallery">
        <ul className="gallery__list">
          {cards.map((card) => {
            const {_id, name, link} = card;
            return (
              <Card
                id={_id}
                name={name}
                link={link}
                key={_id}
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            )
          })}
        </ul>
      </section>
    </main>
  )
}

export default Main;
