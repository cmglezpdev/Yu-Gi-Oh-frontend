import { httpClient } from "./axios";

export const getusersFromPanel = async () => {
  const users: any = [];

  const response = await httpClient.get(`user`);
  console.log(response.data.result.roles)

  response.data.result.forEach(async (element: any) => {
    const user = {
      name: element.name,
      place: element.municipality.name,
      roles: element.roles.map(role => role.name).join(', '),
    }
    users.push(user)
  });
  return users;
}

export async function fetchUser(): Promise<any[]> {
  return new Promise(
    (resolve) => {
      resolve(
        getusersFromPanel()
      )
    }
  )
}
