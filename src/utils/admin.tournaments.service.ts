import { httpClient } from "./axios";
import { getUserData } from "./user.service";

const userdata = getUserData();

const getParticipants = async(tournamentId: string) => {
  const response = await httpClient.get(`tournament/participants/${tournamentId}`);
  return (response.data.result == 5)? 5 : 0;
}
const getTournaments = async() => {
  const tournaments: any = [];

  const response = await httpClient.get(`user/tournaments/${ userdata.id }`);
  for (const element of response.data.result) {
    const tournament = {
      id:element.id,
      name: element.name,
      date: new Date(element.startDate),
      place: element.municipality.name,
      numberOfPlayers: element.numberOfPlayers,
      numberOfInscriptions: element.numberOfInscriptions,
    }
    tournaments.push(tournament)
  }
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
