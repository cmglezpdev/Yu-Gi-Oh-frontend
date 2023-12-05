import { httpClient } from "./axios"
export async function fetchRoles(){
 const resp = await httpClient.get(`Role`);
  return resp.data.result;
}

export async function setUserRole(userId:string,rolId:string,toAdd:boolean){
  const resp=  await httpClient.patch(`User/${userId}/update-role`,{
    roleId:rolId,
    toAdd
  })
  return resp;
}
