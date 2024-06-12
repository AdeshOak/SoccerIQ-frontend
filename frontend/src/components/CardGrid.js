import React from 'react';
import PlayerCard from './Card';
const data = [
  { title: 'Card 1', content: 'This is the content for card 1.' },
  { title: 'Card 2', content: 'This is the content for card 2.' },
  { title: 'Card 3', content: 'This is the content for card 3.' },
  { title: 'Card 4', content: 'This is the content for card 4.' },
  { title: 'Card 5', content: 'This is the content for card 5.' },
  { title: 'Card 6', content: 'This is the content for card 6.' },
  { title: 'Card 7', content: 'This is the content for card 7.' },
  { title: 'Card 8', content: 'This is the content for card 8.' },
  { title: 'Card 9', content: 'This is the content for card 9.' },
  { title: 'Card 10', content: 'This is the content for card 9.' },
  { title: 'Card 11', content: 'This is the content for card 9.' },
];

const Card = ({ title, content }) => (
    <div style={{ 
        width:'200px',
        height:'200px',
        border: '1px solid black',
        padding: '10px',
        margin: '15px',
        display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color:'black'
    }}>
        <div style={{ 
            fontWeight: 'bold'
        }}>{title}</div>
        <div>{content}</div>
    </div>
);

const cardsPerRow = [1,4,4,2];

/*const CardGrid = () => {
    const rows = [];

    for (let i = 0; i < data.length; i += cardsPerRow.reduce((a, b) => a + b, 0)) {
      const rowCards = data.slice(i, i + cardsPerRow.reduce((a, b) => a + b, 0));
      let index = 0;
      const row = cardsPerRow.map((numCards) => {
        const cards = rowCards.slice(index, index + numCards);
        index += numCards;
        return (
          <div key={index} style={{ display: 'flex',justifyContent:'center', padding:'20px'}}>
            {cards.map((item, index) => (
              <Card key={index} title={item.title} content={item.content}/>
            ))}
          </div>
        );
      });
      rows.push(row);
    }
  
    return <div style = {{marginTop:'-150px'}}>{rows}</div>;
  };*/




  const CardGrid = ({ tactic,data }) => {
    const cardsPerRow = tactic; // Number of cards per row
  
    const rows = [];
  
    for (let i = 0; i < data.length; i += cardsPerRow.reduce((a, b) => a + b, 0)) {
      const rowCards = data.slice(i, i + cardsPerRow.reduce((a, b) => a + b, 0));
      let index = 0;
      const row = cardsPerRow.map((numCards) => {
        const cards = rowCards.slice(index, index + numCards);
        index += numCards;
        return (
          <div key={index} style={{ display: 'flex', justifyContent: 'center', width: '1100px', maxWidth: '100%'}}>
            {cards.map((player, index) => (
              <PlayerCard key={index} player={player} />
            ))}
          </div>
        );
      });
      rows.push(row);
    }
  
    return <div style={{ marginTop: '-100px' ,padding:'10px'}}>{rows}</div>;
  };
  
  
  
  

export default CardGrid;
