import { httpClient } from './axios';
import { LocalStorageKey, LocalStorageService } from "./localStorage.service";


export async function login(email: string, password: string) {
  try {
    const authResponse = await httpClient.post('/auth/signin', { email, password });
    const userData = authResponse.data.result;
    LocalStorageService.saveData(LocalStorageKey.TOKEN, userData.token);
    LocalStorageService.saveData(LocalStorageKey.USER, userData);
    return { success: true }
  } catch (error) {
    return {
      success: false,
      message: (error as any).response.data.errorMessage
    }
  }
}


export async function register(
  name: string, email: string,
  password: string, municipality: string
) {

  try {
    const authResponse = await httpClient.post('/auth/signup', {
      email, password, name,
      municipalityId: municipality,
      username: name    })

    const userData = authResponse.data.result;
    LocalStorageService.saveData(LocalStorageKey.TOKEN, userData.token);
    LocalStorageService.saveData(LocalStorageKey.USER, userData);

    return {
      success: true
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: (error as any).response.data.errorMessage
    }
  }
}


export const logout = () => {
  localStorage.clear();
}
