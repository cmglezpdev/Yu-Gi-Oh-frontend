
export enum LocalStorageKey{
  USER ="User",
  TOKEN = "Token"
}

export class LocalStorageService{
  static saveData(key:LocalStorageKey,data:any)
  {
    localStorage.setItem(key,JSON.stringify(data));
  }

  static loadData(key:LocalStorageKey)
  {
    return localStorage.getItem(key);
  }
}
