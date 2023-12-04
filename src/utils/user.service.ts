import { LocalStorageKey, LocalStorageService } from './localStorage.service';
import { httpClient } from './axios';


export const getUserData = () => {
  return JSON.parse(LocalStorageService.loadData(LocalStorageKey.USER)!);
}

const getUser = async(userId: string) => {


  const response = (await httpClient.get(`User/${userId}`)).data.result;
  const winned_matches = (await httpClient.get(`User/wins/${userId}`)).data.result;
  const losed_matches = (await httpClient.get(`User/loses/${userId}`)).data.result;



  return {
    name: response.name,
    email: response.email,
    province: { 
      id: response.municipality.province.id,
      name: response.municipality.province.name
    },
    municipality: {
      id: response.municipality.id,
      name: response.municipality.name,
    },
    winned_matches,
    losed_matches,
  }
}
export const getUserFullInfo = async (userID: string) => {
  return new Promise(
    (resolve) => {
      resolve(
        getUser(userID)
      )
    });
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
