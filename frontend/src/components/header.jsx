import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from 'react-modal';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    padding: '40px 20px',
  }
};

export const Header = () => {
  const navigation = useNavigate();
  const [user, setUser] = useState(null)

  useEffect(() => {
    const u = localStorage.getItem('user');
    setUser(u);
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    navigation('/login')
  }

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container-fluid">
          <div className="navbar-brand">😸 Exploding Kitten</div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link active" to="/">Home
                  <span className="visually-hidden">(current)</span>
                </Link>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#" onClick={openModal}>Rules</a>
              </li>

              {user ? (
                <li className="nav-item">
                  <div className="nav-link" onClick={handleLogout}>Logout</div>
                </li>
                
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">register</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">login</Link>
                  </li>
               
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className='modal-content'>
          <button onClick={closeModal}>close</button>
          <h2> Rules – </h2>
          <p>- If the card drawn from the deck is a cat card, then the card is removed from the deck.</p>
          <p>- If the card is exploding kitten (bomb) then the player loses the game.</p>
          <p>- If the card is a defusing card, then the card is removed from the deck. This card can be used to defuse one bomb that may come in subsequent cards drawn from the deck.</p>
          <p>- If the card is a shuffle card, then the game is restarted and the deck is filled with 5 cards again.</p>
        </div>
      </Modal>
    </>
  )
}





