import { httpClient } from "./axios";

export const getUsersFromPanel = async () => {
  const users: any = [];
  const response = await httpClient.get(`user`);
  for (const element of response.data.result) {
    const user = {
      name: element.name,
      email: element.email,
      place: `${element.municipality.name}, ${element.municipality.province.name}`,
      roles: element.roles.map(role => role.name).join(', '),
    }
    users.push(user)
  }
  return users;
}

export async function fetchUser(): Promise<any[]> {
  return new Promise(
    (resolve) => {
      resolve(
        getUsersFromPanel()
      )
    }
  )
}
