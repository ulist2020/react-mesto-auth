import React from 'react';

function ImagePopup(props) {
  return (
    <div className={props.isOpen ? 'popup popup_opened' : 'popup'} id="popup-image">
      <div className="popup__block">
        <button onClick={props.onClose} className="popup__close-button" type="reset" aria-label="Закрыть фотографию" />
        <img className="popup__image" src={props.card.link} alt={props.card.name} />
        <p className="popup__description">{props.card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;