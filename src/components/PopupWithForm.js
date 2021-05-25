import React from 'react';

function PopupWithForm(props) {
  return (
    <div className={props.isOpen ? 'popup popup_opened' : 'popup'} id={props.name}> 
      <form className={props.classNameForm} method="POST" name={props.name} onSubmit={props.onSubmit} noValidate>
        <button onClick={props.onClose} className={props.classNameCloseButton} type="reset" aria-label="Закрыть окно редактирования" />
        <h3 className={props.classNameHeader}>{props.title}</h3>
        {props.children}
        <button className={props.classNameButton} type="submit" aria-label={props.buttonText} >{props.buttonText}</button>
        {props.textUnderButton}
      </form>
    </div>
  );
}

export default PopupWithForm;