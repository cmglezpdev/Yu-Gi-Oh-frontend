import { useRouter } from "vue-router";
import { LocalStorageKey, LocalStorageService } from "./localStorage.service";


export async function login(email: string, password: string) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      LocalStorageService.saveData(LocalStorageKey.TOKEN, 'jkjkhjkhkhkhjk')
      LocalStorageService.saveData(LocalStorageKey.USER, {
        id: '1234',
        name: 'Usuario',
        email
      })
      resolve({ token: 'bkkgkhgkkgjkgkgjjkhjkhg' })
    }, 1000);
  })
}


export async function register(name: string, email: string, password: string, passwordConfirm: string,province:string,municipality:string) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      LocalStorageService.saveData(LocalStorageKey.TOKEN, 'jkjkhjkhkhkhjk')
      LocalStorageService.saveData(LocalStorageKey.USER, {
        id: '1234',
        name ,
        email
      })
      resolve({ token: 'bkkgkhgkkgjkgkgjjkhjkhg' })
    }, 1000);
  })
}


export const logout=()=>{  
  localStorage.clear();
}
