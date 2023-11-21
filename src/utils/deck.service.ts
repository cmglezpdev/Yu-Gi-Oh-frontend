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


const decks : deck[] = [];

// const decks= 
//     [
//     {
//       id:'klkl',
//       title:'deck1',
//       arquetype:'arquetipo1',
//       image:'src/assets/deck.jpeg',      
//       sideDeck:{
//         cardCount:12
//       },
//       extraDeck:{
//         cardCount:12
//       },
//       cardCount:32,
//     },
//     {
//       id:'klkl',
//       title:'deck1',
//       arquetype:'arquetipo1',
//       sideDeck:{
//         cardCount:12
//       },
//       extraDeck:{
//         cardCount:12
//       },
//       cardCount:32,
//     },
//     {
//       id:'klkl',
//       title:'deck1',
//       arquetype:'arquetipo1',
//       sideDeck:{
//         cardCount:12
//       },
//       extraDeck:{
//         cardCount:12
//       },
//       cardCount:32,
//     },
//     {
//       id:'klkl',
//       title:'deck1',
//       arquetype:'arquetipo1',
//       sideDeck:{
//         cardCount:12
//       },
//       extraDeck:{
//         cardCount:12
//       },
//       cardCount:32,
//     },
//     {
//       id:'klkl',
//       title:'deck1',
//       arquetype:'arquetipo1',
//       sideDeck:{
//         cardCount:12
//       },
//       extraDeck:{
//         cardCount:12
//       },
//       cardCount:32,
//     },
//     {
//       id:'klkl',
//       title:'deck1',
//       arquetype:'arquetipo1',
//       sideDeck:{
//         cardCount:12
//       },
//       extraDeck:{
//         cardCount:12
//       },
//       cardCount:32,
//     },
//   ]

const getUserDecks = async() => {

  const response = await fetch('http://localhost:5202/api/Decks').then( r => r.json() )

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


const fetchUserDecks = (userId:string)=>{
  return new Promise((resolve)=>{
        resolve(
        getUserDecks()
      )
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
