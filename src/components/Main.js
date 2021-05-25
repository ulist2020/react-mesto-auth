import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import Card from './Card';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
      
  return (
    <main className="content">
    <section className="profile">
      <div className="profile__flex">
        <div className="profile__container-avatar">
          <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }}  alt="Аватарка" />
          <button onClick={props.onEditAvatar} className="profile__avatar-update" type="button" aria-label="Редактировать аватар" />
        </div>
        <div className="profile__info">
          <div className="profile__edit">
            <h1 className="profile__edit-author">{currentUser.name}</h1>
            <button onClick={props.onEditProfile} className="profile__edit-button" type="button" aria-label="Редактирование профиля" />
          </div>
          <h2 className="profile__profession">{currentUser.about}</h2>
        </div>
      </div>    
      <button onClick={props.onAddPlace} className="profile__button" type="button" aria-label="Добавить фотографии" />
    </section>
    <section className="photo">
      <ul className="photo__grid">
        {props.cards.map((card)=>
          (<Card
              key={card._id}
              link={card.link} 
              name={card.name} 
              likes={card.likes.length}
              card={card}
              onCardClick={props.onCardClick} 
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
          />)
        )}
      </ul>
    </section>

  </main>
  );
}

export default Main;