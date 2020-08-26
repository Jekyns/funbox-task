import React from 'react';
import logo from './logo.svg';
import './App.css';
import FoodCard from './components/FoodCard';
import catImage from './images/cat.png';

function App() {

  const cardsInit = [
    {
      description: 'Сказочное заморское яство',
      title: 'Нямушка',
      taste: 'с фуа-гра',
      extras: [
        {
          amount: 10,
          text: 'порций'
        },
        {
          text: 'мышь в подарок'
        }
      ],
      weight: 0.5,
      selectedText: 'Печень утки разварная с артишоками.',
      image: catImage,
      disabled: false,
    },
    {
      description: 'Сказочное заморское яство',
      title: 'Нямушка',
      taste: 'с рыбой',
      extras: [
        {
          amount: 40,
          text: 'порций'
        },
        {
          amount: 2,
          text: 'мыши в подарок'
        }
      ],
      selectedText: 'Головы щучьи с чеснком да свежайшая сёмгушка.',
      weight: 2,
      image: catImage,
      disabled: false,
      selected: true,
    },
    {
      description: 'Сказочное заморское яство',
      title: 'Нямушка',
      taste: 'с курой',
      extras: [
        {
          amount: 100,
          text: 'порций'
        },
        {
          amount: 5,
          text: 'мышей в подарок'
        },
        {
          text: 'заказчик доволен'
        }
      ],
      selectedText: 'Филе из циплят с трюфелями в бульоне.',
      weight: 5,
      image: catImage,
      disabled: true,
    }];
    const [cards, setCards] = React.useState(cardsInit);
  

  const showCards = () => {
    const cardsHtml = [];
    cards.map((card,i) => {
      cardsHtml.push(<FoodCard {...card} toogleSelectCard={toogleSelectCard} cardIndex={i} key={card.taste}/>)
    })
    return cardsHtml;
  }

  const toogleSelectCard = (cardIndex) => {
    const newCards = [...cards];
    newCards[cardIndex].selected = !newCards[cardIndex].selected;
    setCards(newCards);
  }

  return (
    <div className="App">
      <div className="App__title">
        <h1 className="App__title-h1">Ты сегодня покормил кота?</h1>
      </div>
      <div className="App__cards">
        {showCards()}
      </div>
    </div>
  );
}

export default App;
