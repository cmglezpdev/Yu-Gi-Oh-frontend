// services.js
const decks= 
    [
    {
      title:'deck1',
      arquetype:'arquetipo1',
      image:'src/assets/deck.jpeg',      
      sideDeck:{
        cardCount:12
      },
      extraDeck:{
        cardCount:12
      },
      cardCount:32,
    },
    {
      title:'deck1',
      arquetype:'arquetipo1',
      sideDeck:{
        cardCount:12
      },
      extraDeck:{
        cardCount:12
      },
      cardCount:32,
    },
    {
      title:'deck1',
      arquetype:'arquetipo1',
      sideDeck:{
        cardCount:12
      },
      extraDeck:{
        cardCount:12
      },
      cardCount:32,
    },
    {
      title:'deck1',
      arquetype:'arquetipo1',
      sideDeck:{
        cardCount:12
      },
      extraDeck:{
        cardCount:12
      },
      cardCount:32,
    },
    {
      title:'deck1',
      arquetype:'arquetipo1',
      sideDeck:{
        cardCount:12
      },
      extraDeck:{
        cardCount:12
      },
      cardCount:32,
    },
    {
      title:'deck1',
      arquetype:'arquetipo1',
      sideDeck:{
        cardCount:12
      },
      extraDeck:{
        cardCount:12
      },
      cardCount:32,
    },
  ]

const fetchUserDecks = (userId:string)=>{
  return new Promise((resolve)=>{
    setTimeout(()=>{
        resolve(
        decks
      )
    },3000)
  })
}


function addUserDeck(deck:any){
  return new Promise((resolve)=>{
    setTimeout(()=>{
        resolve(
        decks.push(deck)
      )
    },3000)
  })
}

export { fetchUserDecks,addUserDeck};
