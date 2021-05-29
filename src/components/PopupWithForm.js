import React from 'react';

function PopupWithForm(props) {
  return (
    <div className={props.isOpen ? 'popup popup_opened' : 'popup'} id={props.name}> 
      <form className={props.className}  name={props.name} onSubmit={props.onSubmit} noValidate>
        <button onClick={props.onClose} className="popup__close-button" type="reset" aria-label="Закрыть окно редактирования" />
        <h3 className="popup__header">{props.title}</h3>
        {props.children}
        <button className="popup__button" type="submit" aria-label={props.buttonText} >{props.buttonText}</button>
      </form>
    </div>
  );
}

export default PopupWithForm;