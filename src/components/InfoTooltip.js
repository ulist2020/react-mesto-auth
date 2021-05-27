import React from "react";

function InfoTooltip(props) {
  return (
    <section 
    className={props.isOpen ? 'popup popup_opened' : 'popup'} 
    id="InfoTooltip">
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          onClick={props.onClose}
        />
        {props.isSuccess ? (
          <>
            <div className="popup__img" />
            <h2 className="popup__header popup__header_info">Вы успешно зарегистрировались!</h2>
          </>
        ) : (
          <>
            <div className="popup__img popup__img_fail" />
            <h2 className="popup__header popup__header_info">Что-то пошло не так. Попробуйте ещё раз!</h2>
          </>
        )}
      </div>
    </section>
  );
}

export default InfoTooltip;