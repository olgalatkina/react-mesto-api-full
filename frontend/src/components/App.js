import React, {useState, useEffect} from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.js";
import api from "../utils/api";
import * as auth from "../utils/auth";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import ImagePopup from './ImagePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Auth from './Auth';
import InfoTooltip from "./InfoTooltip";
import ConfirmationPopup from "./ConfirmationPopup";

const App = () => {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [email, setEmail] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [deletingCard, setDeletingCard] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      api.setToken();
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([me, cards]) => {
          setCurrentUser(me);
          setCards(cards);
        })
        .catch((err) => console.log(err))
        .finally(() => {})
    }
  }, [loggedIn]);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          setLoggedIn(true);
          setEmail(res.email);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [navigate]);

  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  const handleInfoTooltip = () => setInfoTooltipPopupOpen(true);
  const handleConfirmation = (card) => {
    setIsConfirmationPopupOpen(true);
    setDeletingCard(card);
  };

  const handleUpdateUser = (data) => {
    setIsLoading(true);
    api.changeUserInfo(data)
      .then((newData) => {
        setCurrentUser(newData);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
        closeAllPopups();
      })
  };
  const handleUpdateAvatar = (data) => {
    setIsLoading(true);
    api.changeUserAvatar(data)
      .then((newData) => {
        setCurrentUser(newData)
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
        closeAllPopups();
      })
  }
  const handleAddPlaceSubmit = (data) => {
    setIsLoading(true);
    api.addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
        closeAllPopups();
      })
  }

  const handleCardClick = (card) => setSelectedCard(card);
  const handleCardLike = (card) => {
    const isLiked = card.likes.some(like => like === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => console.log(err));
  }
  const handleCardDelete = (card) => {
    setIsLoading(true);
    api.deleteCard(card._id)
      .then((data) => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
        closeAllPopups();
      });
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setInfoTooltipPopupOpen(false);
    setIsConfirmationPopupOpen(false);
  }

  const handleLogin = (email, password) => {
    auth
      .login(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        setEmail(email);
        navigate("/");
      })
      .catch((err) => {
        handleInfoTooltip();
        setIsSuccess(false);
      });
  }

  const handleRegister = (email, password) => {
    auth
      .register(email, password)
      .then(() => {
        handleInfoTooltip();
        setIsSuccess(true);
        navigate("/sign-in");
      })
      .catch((err) => {
        handleInfoTooltip();
        setIsSuccess(false);
      })
      .finally(() => {});
  }

  const signOut = () => {
    localStorage.removeItem("jwt");
    navigate("/sign-in");
    setLoggedIn(false);
    setEmail("");
  }

  const handleOverlayClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      closeAllPopups();
    }
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="container">
        <Header
          email={email}
          loggedIn={loggedIn}
          onSignOut={signOut}
        />
        <Routes>
          <Route
            path="/sign-in"
            element={<Auth
              onSubmit={handleLogin}
              name='login'
              title='Вход'
              btnText='Войти' />}
          />
          <Route
            path="/sign-up"
            element={<Auth
              onSubmit={handleRegister}
              name='register'
              title='Регистрация'
              btnText='Зарегистрироваться' />}
          />
          <Route
            exact path="/"
            element={
              <>
                <ProtectedRoute
                  component={Main}
                  loggedIn={loggedIn}
                  cards={cards}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleConfirmation}
                />
                <Footer />
              </>
            }
          />
          <Route
            path="*"
            element={
              loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />
            }
          />
        </Routes>

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          onOverlayClick={handleOverlayClick}
          isLoading={isLoading}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          onOverlayClick={handleOverlayClick}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onUpdatePlace={handleAddPlaceSubmit}
          onOverlayClick={handleOverlayClick}
          isLoading={isLoading}
        />

        <ConfirmationPopup
          isOpen={isConfirmationPopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          onOverlayClick={handleOverlayClick}
          card={deletingCard}
          isLoading={isLoading}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={Object.keys(selectedCard).length !== 0}
          onClose={closeAllPopups}
          onOverlayClick={handleOverlayClick}
        />

        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
          onOverlayClick={handleOverlayClick}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
