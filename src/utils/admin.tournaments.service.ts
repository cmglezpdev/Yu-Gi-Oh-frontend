import type { Tournament } from "./Tournament";
import { httpClient } from "./axios";
import { getUserData } from "./user.service";

const userdata = getUserData();

const getParticipants = async(tournamentId: string) => {
  const response = await httpClient.get(`Tournament/participants/${tournamentId}`);
  return (response.data.result == 5)? 5 : 0;
}
const getTournaments = async() => {
  const tournaments: any = [];

  const response = await httpClient.get(`User/tournaments/${ userdata.id }`);
  response.data.result.forEach(async(element: any) => {
    let tournament = {
      name: element.name,
      date: new Date(element.startDate),
      place: element.municipality.name,
      playerCount: await getParticipants(element.id),
    }
    console.log(tournament)
    tournaments.push(tournament)
  });
  return tournaments;
}

export async function fetchAdminCreatedTournaments(): Promise<any[]> {
  return new Promise(
    (resolve)=>{
      resolve(
        getTournaments()
      )
    }
  )
}
