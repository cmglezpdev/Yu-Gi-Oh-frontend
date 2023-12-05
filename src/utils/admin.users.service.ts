import { httpClient } from "./axios";

export const getUsersFromPanel = async () => {
  const users: any = [];
  const response = await httpClient.get(`user`);
  for (const element of response.data.result) {
    const user = {
      id:element.id,
      name: element.name,
      email: element.email,
      place: `${element.municipality.name}, ${element.municipality.province.name}`,
      rolesString: element.roles.map(role => role.name).join(', '),
      roles:element.roles
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
