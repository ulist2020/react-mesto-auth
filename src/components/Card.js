import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = props.card.owner._id === currentUser._id;
    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
      `photo__delete-icon ${isOwn ? '' : 'photo__delete-icon_hidden'}`
    ); 

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (
      `photo__card-like ${isLiked ? 'photo__card-like_active' : 'photo__card-like'}`
    ); ; 

     function handleClick() {
        props.onCardClick(props.name, props.link);
      } 
      function handleLikeClick() {
        props.onCardLike(props.card);
      } 
      function handleDeleteClick() {
        props.onCardDelete(props.card);
      } 

      
  return (
    <li   className="photo__card">
    <div onClick={handleClick} className="photo__card-place" style={{ backgroundImage: `url(${props.link})` }}/>
    <button className={cardDeleteButtonClassName} onClick={handleDeleteClick} type="reset" aria-label="Удалить фото" />
    <div className="photo__flex">
      <h2 className="photo__card-discprition">{props.name}</h2>
      <div className="photo__like-container">
        <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button" aria-label="Поставить лайк" />
        <p className="photo__like-counter" >{props.likes}</p>
      </div>
    </div>
  </li>
);
}

export default Card;