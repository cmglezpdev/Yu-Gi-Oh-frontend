<<<<<<< HEAD
export async function getusersFromPanel(){
  return new Promise(
    (resolve, reject) => {
      setTimeout(() => {
        resolve([
          {
            name:'usuario',
            email:'user@mail.com',
            role:'admin',
          },
          {
            name:'usuario',
            email:'user@mail.com',
            role:'admin',
          },
          {
            name:'usuario',
            email:'user@mail.com',
            role:'admin',
          },
          {
            name:'usuario',
            email:'user@mail.com',
            role:'admin',
          },
          {
            name:'usuario',
            email:'user@mail.com',
            role:'admin',
          },
          {
            name:'usuario',
            email:'user@mail.com',
            role:'admin',
          },
        ])
      }, 2000);
    })
}
export async function createUserFromPanel(){
  return new Promise(
    (resolve, reject) => {
      setTimeout(() => {
        resolve({})
      }, 2000);
    })
}
export async function editUserFromPanel(){
  return new Promise(
    (resolve, reject) => {
      setTimeout(() => {
        resolve({})
      }, 2000);
    })
}
export async function removeUserFromPanel(){
  return new Promise(
    (resolve, reject) => {
      setTimeout(() => {
        resolve({})
      }, 2000);
    })
}
=======
import { httpClient } from "./axios";
>>>>>>> 039b63d2c96b4dc7028bae2a30840e9c9477ddc6

const getAllUser = async () => {
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
        getAllUser()
      )
    }
  )
}