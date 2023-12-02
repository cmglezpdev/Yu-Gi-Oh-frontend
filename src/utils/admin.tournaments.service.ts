import type { Tournament } from "./Tournament";
import { httpClient } from "./axios";
import { getUserData } from "./user.service";

const userdata = getUserData();

const getTournaments = async() => {
  const tournaments: any = [];

  const response = await httpClient.get(`User/tournaments/${ userdata.id }`);
  response.data.result.forEach((element: any) => {
    let tournament = {
      name: element.name,
      date: new Date(element.startDate),
      place: element.municipality.name,
      playerCount: 10,
    }
    tournaments.push(tournament)
  });
  return tournaments;
}

export async function fetchAdminCreatedTournaments()
{
  return new Promise(
    (resolve,reject)=>{
      resolve(
        getTournaments()
      )
    }
  )
}
