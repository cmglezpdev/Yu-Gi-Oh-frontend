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

