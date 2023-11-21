// services.js

interface deck {
  id: string,
  title: string,
  arquetype: string,
  image: string,
  sideDeck:{
    cardCount: number
  },
  extraDeck:{
    cardCount: number
  }
  cardCount: number
}

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

const getUserDecks = async(userId: string) => {

  userId = "42de3392-3e02-49e9-a87f-9aa85a1fa1ff"
  const decks : deck[] = [];

  const response = await fetch(`http://localhost:5202/api/Decks/${userId}`).then( r => r.json() )

  response.result.forEach(element => {
    let deck: deck = {
      id: element.id,
      title: element.name,
      arquetype: element.archetypeId,
      image: 'src/assets/deck.jpeg',
      sideDeck:{
        cardCount: element.sideDeck
      },
      extraDeck:{
        cardCount: element.extraDeck
      },
      cardCount: element.mainDeck
    }
    decks.push(deck)
  });

  return decks;
}

const getDeckById = async(deckId: string) => {
  deckId = "3c489a77-73c4-419f-bcc8-33324182853d"

  const response = await fetch(`http://localhost:5202/api/Decks/deckById/${deckId}`
  ).then( r => r.json())

  let deck: deck = {
    id: response.result.id,
    title: response.result.name,
    arquetype: response.result.archetypeId,
    image: 'src/assets/deck.jpeg',
    sideDeck:{
      cardCount: response.result.sideDeck
    },
    extraDeck:{
      cardCount: response.result.extraDeck
    },
    cardCount: response.result.mainDeck
  }
  
  return deck
}

const createDeck = async(deck: any) => {

  const bodyDeck = {
    "name": deck.title,
    "archetypeId": "09f8419d-75fc-461b-bf1c-7bd4848da935",
    "mainDeck": deck.cardCount,
    "sideDeck": deck.sideDeck.cardCount,
    "extraDeck": deck.extraDeck.cardCount,
    "userId": "42de3392-3e02-49e9-a87f-9aa85a1fa1ff"
  }
  
  const request = await fetch('http://localhost:5202/api/Decks', {
                                method: "POST",
                                headers: {
                                  'Content-Type': 'application/json',
                                  },
                                body: JSON.stringify(bodyDeck),
                              }).then( r => r.json())
}

const updateDeck = async(deckId: string, deck: any) => {

  deckId = "3c489a77-73c4-419f-bcc8-33324182853d"
  const bodyUpdateDeck = {
    "name": deck.title,
    "archetypeId": "09f8419d-75fc-461b-bf1c-7bd4848da935",
    "mainDeck": deck.cardCount,
    "sideDeck": deck.sideDeck.cardCount,
    "extraDeck": deck.extraDeck.cardCount,
    "userId": "42de3392-3e02-49e9-a87f-9aa85a1fa1ff"
  }

  const resquest = await fetch(`http://localhost:5202/api/Decks/${deckId}`, {
                              method: "PUT",
                              headers: {
                                'Content-Type': 'application/json',
                                },
                              body: JSON.stringify(bodyUpdateDeck),
                            }).then( r => r.json())
}

const deleteDeck = async(deckId: string) => {

  const request = await fetch(`http://localhost:5202/api/Decks/${deckId}`, {
                                  method: "DELETE",
                              }).then( r => r.json())
}

const fetchUserDecks = (userId:string)=>{
  return new Promise((resolve)=>{
        resolve(
        getUserDecks(userId)
      )
  })
}

function addUserDeck(deck:any){
  return new Promise((resolve)=>{
      resolve(
      createDeck(deck)
    )
  })
}

export async function editUserDeck(deckId:string,deck:any){
  return new Promise((resolve)=>{
      resolve(
        updateDeck(deckId, deck)
      )
  })
}


export async function getDeckInfo(deckId:string){
     
  return new Promise((resolve)=>{
      resolve(
      getDeckById(deckId)
    )
  })
}
export async function removeUserDeck(deckId:string){
     
  return new Promise((resolve)=>{
        resolve(
        deleteDeck(deckId)
      )
  })
}

export { fetchUserDecks,addUserDeck};
