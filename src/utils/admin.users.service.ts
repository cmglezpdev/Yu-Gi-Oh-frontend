import { httpClient } from "./axios";

const getAllUser = async() => {
    const users: any = [];
  
    const response = await httpClient.get(`User`);
    response.data.result.forEach(async(element: any) => {
      let user = {
        name: element.name,
        date: new Date(element.startDate),
        place: element.municipality.name,
        deckName: "hh",
      }
      users.push(user)
    });
    return users;
}

export async function fetchUser(): Promise<any[]> {
    return new Promise(
      (resolve)=>{
        resolve(
          getAllUser()
        )
      }
    )
  }