import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from "react-router-dom";
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth";


function App() {
  
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setisInfoTooltipOpen] = useState(false);
  const [loggedIn, setloggedIn] = useState(false);
  const [dataUser, setDataUser] = useState({});
  //const [massage, setMassage] = useState("");
  //const [isEnterPopupOpen, setisEnterPopupOpen] = useState(false);
  const history = useHistory();
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const [selectedCard, setSelectedCard] = useState({link:'',name:'',isOpen: false});

  const [cards, setCards] = useState([]);

  const [currentUser, setCurrentUser] = useState({});

  function handleEditAvatarClick() {
    setisEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setisAddPlacePopupOpen(true);
  }
  function handleInfoTooltip() {
    setisInfoTooltipOpen(true);
  }
  //function handleEnterClick() {
    //setisEnterPopupOpen(true);
  //}

   function handleCardClick(name,link) {
    setSelectedCard({
      name: name,
      link: link,
      isOpen: true
    });
   }

  function closeAllPopups() {
    setisEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setisAddPlacePopupOpen(false);
    setisInfoTooltipOpen(false);
    setSelectedCard({link:'',name:'',isOpen: false})
  }

  useEffect(() => {
    api.getUser()
    .then((results) => {
      setCurrentUser(
        {
          _id: results._id,
          name: results.name,
          about: results.about,
          avatar: results.avatar
      })
    })
    .catch((err) => console.log(`Ошибка: ${err}`));
  },[])

  useEffect(() => {
    api.getInitialCards()
    .then((results) => {
      setCards(results)
    })
    .catch((err) => console.log(`Ошибка: ${err}`));
  },[])
      
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => console.log(`Ошибка: ${err}`));  
  }

  function handleCardDelete (card){
    api.deleteCard(card._id)
        .then(() => {
          const newCards = cards.filter((c) => c._id !== card._id);
          setCards(newCards);
        })
        .catch((err) => console.log(`Ошибка: ${err}`));
  }

  function handleUpdateUser(currentUser) {
    api.editUser(currentUser)
      .then((results) =>{
        setCurrentUser(results);
        closeAllPopups()
      })
      .catch((err) => console.log(`Ошибка: ${err}`));

  }

  function handleUpdateAvatar(currentUser) {
    api.editAvatar(currentUser)
      .then((results) =>{
        setCurrentUser(results);
        closeAllPopups()
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }

  function handleUpdateCards(currentUser) {
    api.addCard(currentUser)
      .then((results) =>{
        setCards([results, ...cards]);;
        closeAllPopups()
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }

  function handleRegisterSuccess(item) {
    setRegisterSuccess(item);
  }

  function handleRegister(email, password) {
    auth.register(email, password)
       .then((result) => {
        if (result) {
          setloggedIn(true);
          handleRegisterSuccess(true);
          handleInfoTooltip();
          setDataUser({
            email: email,
            })
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        handleRegisterSuccess(false);
        handleInfoTooltip();
      });
  };

  function handleLogin(email, password) {
    auth.authorize(email, password)
       .then((result) => {
        if (result.token) {
          localStorage.setItem("jwt", result.token);
          setDataUser({
            email: email,
            password: password,
          });
          setloggedIn(true);
          history.push("/");
        }
        /*if (result) {
          setloggedIn(true);
          handleRegisterSuccess(true);
          handleInfoTooltip();
          setDataUser({
            email: email,
            })
          history.push("/");
        }*/
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        handleRegisterSuccess(false);
        handleInfoTooltip();
      });
  };

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth.getContent(jwt)
        .then((result) => {
           setDataUser({
               email: result.data.email
           })
            setloggedIn(true);
            history.push("/");
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }, []);

    return (
      <CurrentUserContext.Provider value={currentUser}>
          <div className="page">
            <div className="page__container">

              <Header
                email={dataUser.email}
               //onRegistration={handlRegistrationClick}
               //onEnter={handleEnterClick}
              />

              <Switch>
                <ProtectedRoute
                  exact
                  path="/"
                  loggedIn={loggedIn}
                  component={Main}
                  onEditAvatar={handleEditAvatarClick} 
                  onEditProfile={handleEditProfileClick} 
                  onAddPlace={handleAddPlaceClick}
                  cards={cards}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
                <Route path="/sign-in">
                  <Login
                    onLogin={handleLogin} 
                   // massage={massage}
                    //isOpen={isEnterPopupOpen} 
                    //onClose={closeAllPopups}
                    //onSignOut={handleUpdateUser}
                  />
                </Route>
                <Route path="/sign-up">
                  <Register
                    onRegister={handleRegister}
                    //massage={massage} 
                    //isOpen={isRegisterPopupOpen} 
                    //onClose={closeAllPopups}
                    //onSignOut={handleUpdateUser}
                  />
                </Route>
              </Switch>

              <Footer />

              <EditProfilePopup 
                isOpen={isEditProfilePopupOpen} 
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
              />

              <EditAvatarPopup 
                isOpen={isEditAvatarPopupOpen} 
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
              />

              <AddPlacePopup 
                isOpen={isAddPlacePopupOpen} 
                onClose={closeAllPopups}
                onUpdateCards={handleUpdateCards}
              />

              <PopupWithForm 
                name="popup-confirm" 
                title="Вы уверены?"
              >
              </PopupWithForm>

              <ImagePopup
                card={selectedCard}
                isOpen={selectedCard.isOpen}
                onClose={()=> closeAllPopups()} 
              />
              <InfoTooltip
                isOpen={isInfoTooltipOpen}
                onClose={closeAllPopups}
                isSuccess={registerSuccess}
              />


            </div>
          </div>
      </CurrentUserContext.Provider>
    );
}

export default App;
//export default withRouter(App);

