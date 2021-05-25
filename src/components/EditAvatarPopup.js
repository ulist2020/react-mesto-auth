import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {
    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
          avatar: avatarRef.current.value,
        });
    }

    
    return (
        <PopupWithForm 
        name="popup-update-avatar" 
        title="Обновить аватар" 
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
        buttonText='Сохранить'
      >
          <input 
          ref={avatarRef} 
          id="popup__link-avatar" 
          className="popup__input" 
          type="url" 
          placeholder="Ссылка" 
          name="avatar" required 
          />
          <span className="popup__link-avatar-error popup__error" />
      </PopupWithForm>

    );
  }
  
  export default EditProfilePopup;
