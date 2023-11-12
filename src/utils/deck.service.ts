// services.js
import { ref,reactive } from 'vue';

const sharedData = ref('Datos compartidos');

const decks= reactive({
  deckList:[]
})

const fetchUserDecks = (userId:string)=>{
  return new Promise((resolve)=>{
    setTimeout(()=>{
        resolve(
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
      )
    },3000)
  })
}

export { fetchUserDecks};
