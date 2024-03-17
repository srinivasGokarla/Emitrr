import React, { useState, useEffect } from 'react';
import { Header } from "./header";
import LeaderBoard from './LeaderBoard';
import {  getToken } from "../services/api"
import { useNavigate } from "react-router-dom"
import { ToastContainer,toast } from "react-toastify";
import { useSelector,useDispatch } from "react-redux";
import { updateScore, fetchLeaderboard } from '../redux/slices/userSlice';


export const Home=()=>{
    const [deck, setDeck] = useState([]);
    const [defuseCardCount, setDefuseCardCount] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const [currentCard, setCurrentCard] = useState(null);
    const [cardIsShowing, setCardIsShowing] = useState(false);
    const [leaderboard, setLeaderboard] = useState([]);
    const userName = useSelector((state) => state.gameState?.userName);
 
  const dispatch = useDispatch();

const navigation = useNavigate()

useEffect(()=>{
    const user = localStorage.getItem('user')
  if(user){
    navigation('/')
  } else {
    navigation('/login')
  }
  },[])

    const saveLeaderboard = () => {
        localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    };

    const initializeDeck = () => {
        const cards = [
            { cardName: 'Cat card', cardTitle: '😼' },
            { cardName: 'Defuse card', cardTitle: '🙅‍♂️' },
            { cardName: 'Shuffle card', cardTitle: '🔀' },
            { cardName: 'Exploding kitten card', cardTitle: '💣' },
        ];
        const tempDeck = [];

        for (let i = 0; i < 5; i++) {
            tempDeck.push(cards[Math.floor(Math.random() * cards.length)]);
        }
        return tempDeck;
    }

    const restartGame = () => {
        const tempDeck = initializeDeck();
        setDeck(tempDeck);
        setCurrentCard(null);
        setDefuseCardCount(0);
        dispatch(fetchLeaderboard());
        setGameOver(false);
        setGameWon(false);
        setCardIsShowing(false);
    }

    const handleExplodingKitten = () => {
        const tempDeck = [...deck];
        tempDeck.pop();
        setDeck(tempDeck);
        if (deck.length === 1) {
            dispatch(updateScore());
            setGameWon(true);
            setLeaderboard(prev => [...prev, { user: userName, gamesWon: +1 }]);
            saveLeaderboard();
        } else {
            setDefuseCardCount(prev => prev - 1);
        }
    }

    const handleCardShow = () => {
        const tempDeck = [...deck];
        const currCard = tempDeck.pop();
        setCurrentCard(currCard);
        setCardIsShowing(true);
        setTimeout(() => {
            if (tempDeck.length === 0) {
                setGameWon(true);
               dispatch(updateScore());
                setLeaderboard(prev => [...prev, { user: userName, gamesWon: +1 }]);
                saveLeaderboard();
              
            } else {
                if (currCard.cardName === 'Cat card') {
                   // tempDeck.pop();
                   setDeck(tempDeck);
                } else if (currCard.cardName === 'Defuse card') {
                    setDefuseCardCount(prev => prev + 1);
                    tempDeck.pop(); 
                } else if (currCard.cardName === 'Shuffle card') {
                    
                    const newDeck = initializeDeck();
                    setDeck(newDeck);
                    setCurrentCard(null);
                    setDefuseCardCount(0);
                    setGameWon(false);
                    setGameOver(false);
                    setCardIsShowing(false);
                    dispatch(fetchLeaderboard());
                    alert('Game restarted'); 
                    return;
                } else if (currCard.cardName === 'Exploding kitten card') {
                    if (defuseCardCount > 0) {
                        setDefuseCardCount(prev => prev - 1);
                    } else {
                        setGameOver(true);
                        alert('Game over - Exploding kitten!');
                        return;
                    }
                }
                setDeck(tempDeck);
            }
            setCurrentCard(null);
            setCardIsShowing(false);
        }, 2000);
    }
    

    
    useEffect(() => {
        const tempDeck = initializeDeck();
        setDeck(tempDeck);
    }, []);

    return <>
    <Header />
    {/* <LeaderBoard/>
    <ToastContainer /> */}
    <div className='home'>

    <h1>Home Page!</h1>

    
    {gameWon ? (
                <div>
                    <h1>You Won</h1>
                    <button  className="btn" onClick={restartGame}>Restart</button>
                </div>
            ) : gameOver ? (
                <div>
                    <h1>Game Over</h1>
                    <button  className="btn" onClick={restartGame}>Restart</button>
                </div>
            ) : (
                <div className='board'>
                    <div className="container">
                        <div className='card-cont'>
                            {deck.map((card, ind) => (
                                <div key={ind} className={`onecard card-${ind + 1}`}>{card.cardTitle}</div>
                            ))}
                        </div>
                        {currentCard && (
                            <div className='onecard active-card'>{currentCard.cardTitle}</div>
                        )}
                        {!cardIsShowing && <button className='show-btn' onClick={handleCardShow}>Show Card</button>}
                        <h2>Defuse Cards Available - {defuseCardCount}</h2>
                    </div>
                    
                </div>
                
            )}
    </div>

    
</>

}