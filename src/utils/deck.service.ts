// services.js
import { httpClient } from "./axios"
import { getUserData } from "./user.service";

const userdata = getUserData();

interface Deck {
  id: string,
  title: string,
  arquetype: string,
  image: string,
  sideDeck: {
    cardCount: number
  },
  extraDeck: {
    cardCount: number
  }
  cardCount: number
}

const getUserDecks = async (userId: string) => {
  const decks: Deck[] = [];

  const response = await httpClient.get(`/User/decks/${userId}`)
  response.data.result.forEach((element: any) => {
    const deck: Deck = {
      id: element.id,
      title: element.name,
      arquetype: element.archetypeId,
      image: 'src/assets/deck.jpeg',
      sideDeck: {
        cardCount: element.sideDeck
      },
      extraDeck: {
        cardCount: element.extraDeck
      },
      cardCount: element.mainDeck
    }
    decks.push(deck)
  });

  return decks;
}

const getDeckById = async (deckId: string) => {
  const response = await httpClient.get(`Decks/${deckId}`)

  const deck: Deck = {
    id: response.data.result.id,
    title: response.data.result.name,
    arquetype: response.data.result.archetype?.name,
    image: 'src/assets/deck.jpeg',
    sideDeck: {
      cardCount: response.data.result.sideDeck
    },
    extraDeck: {
      cardCount: response.data.result.extraDeck
    },
    cardCount: response.data.result.mainDeck
  }

  return deck
}

const createDeck = async (deck: any) => {
  const name = deck.title;
  const archetypeId = deck.archetype;
  const mainDeck = deck.cardCount;
  const sideDeck = deck.sideDeck.cardCount;
  const extraDeck = deck.extraDeck.cardCount;
  const userId = userdata.id;

  const request = await httpClient.post('/Decks', {
    name, archetypeId, mainDeck, sideDeck, extraDeck, userId
  });
}

const updateDeck = async (deck: any) => {
  const name = deck.title;
  const archetypeId = deck.archetype;
  const mainDeck = deck.cardCount;
  const sideDeck = deck.sideDeck.cardCount;
  const extraDeck = deck.extraDeck.cardCount;
  const userId = userdata.id;

  const request = await httpClient.put(`/Decks/${deck.deckId.value}`, {
    name, archetypeId, mainDeck, sideDeck, extraDeck, userId
  });
}

const deleteDeck = async (deckId: string) => {
  //TODO: Dame el deckId
  const request = await httpClient.delete(`/Decks/${deckId}`)
}

const fetchUserDecks = (userId: string) => {
  return new Promise((resolve) => {
    resolve(
      getUserDecks(userId)
    )
  })
}

function addUserDeck(deck: any) {
  return new Promise((resolve) => {
    resolve(
      createDeck(deck)
    )
  })
}

export async function editUserDeck(deck: any) {
  return new Promise((resolve) => {
    resolve(
      updateDeck(deck)
    )
  })
}


export async function getDeckInfo(deckId: string) {
  return new Promise((resolve) => {
    resolve(
      getDeckById(deckId)
    )
  })
}
export async function removeUserDeck(deckId: string) {
  return new Promise((resolve) => {
    resolve(
      deleteDeck(deckId)
    )
  })
}

export { fetchUserDecks, addUserDeck };
