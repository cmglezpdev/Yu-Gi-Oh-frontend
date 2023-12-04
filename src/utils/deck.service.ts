// services.js

import { getUserData } from "./user.service"

const decks= 
    [
    {
      id:'klkl',
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
      id:'klkl',
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
      id:'klkl',
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
      id:'klkl',
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
      id:'klkl',
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
      id:'klkl',
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

export async function editUserDeck(deckId:string,deck:any){
  return new Promise((resolve)=>{
    setTimeout(()=>{
        resolve(
        decks.push(deck)
      )
    },3000)
  })
}


export async function getDeckInfo(deckId:string){
     
  return new Promise((resolve)=>{
    setTimeout(()=>{
        resolve(
        decks[0]
      )
    },3000)
  })
}
export async function removeUserDeck(deckId:string){
     
  return new Promise((resolve)=>{
    setTimeout(()=>{
        resolve(
        decks.splice(0,1)
      )
    },3000)
  })
}

export { fetchUserDecks,addUserDeck};
