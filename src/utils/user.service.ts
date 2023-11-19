import { reactive } from 'vue';
import { LocalStorageKey, LocalStorageService } from './localStorage.service';

export const getUserData = () => {
  return JSON.parse(LocalStorageService.loadData(LocalStorageKey.USER)!);
}

export const getUserFullInfo = async (userID: string) => {
  return new Promise(
    (resolve, reject) => {
      setTimeout(() => {
        resolve({
          name: 'usuario',
          email: 'usuario@mail.com',
          province: { id: '1', name: 'Prinar del Rio' },
          municipality: { id: '1', name: 'Rio las Casas' },
          winned_matches: 12,
          losed_matches: 24
        })
      }, 2000);
    })
}

export const editUserInfo = async (userID: string) => {
  return new Promise(
    (resolve, reject) => {
      setTimeout(() => {
        resolve({
          name: 'usuario',
          email: 'usuario@mail.com',
          province: { id: '1', name: 'Prinar del Rio' },
          municipality: { id: '1', name: 'Rio las Casas' },
          winned_matches: 12,
          losed_matches: 24
        })
      }, 2000);
    })
}


export const getUserDecks = async (userId: string) => {

  return new Promise(
    (resolve, reject) => {
      setTimeout(() => {
        const userDecks = [];
        for (let i = 0; i < 100; i++) {
          userDecks.push(
          {
            id: 'klkl',
              title: 'deck'+i,
                arquetype: 'arquetipo1',
                  sideDeck: {
              cardCount: 12*i
            },
            extraDeck: {
              cardCount: 12+i
            },
            cardCount: (32+i)%i,
    },
)
    }
           resolve(userDecks)
      },2000);
  }) 
}
