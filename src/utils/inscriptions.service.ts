import { httpClient } from "./axios"

export async function acceptInscription(inscriptionId: string) {
  return await httpClient.patch(`Inscription/approve`, {
    inscriptionId
  });

}
export async function rejectInscription(inscriptionId: string) {
  return await httpClient.patch(`Inscription/reject`, {
    inscriptionId
  });

}
