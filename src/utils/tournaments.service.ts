import { httpClient } from "./axios";
import { getUserData } from "./user.service";

export class Filter{

  constructor(public name:string , public date:Date , public place:string){}
}

const getTournaments = async() => {
  const tournaments: any[] = [];

  const response = await httpClient.get(`/Tournament`);
  response.data.result.forEach((element: any) => {
    if(new Date(element.startDate) > new Date(Date.now())) {
      let tournament = {
        id: element.id,
        name: element.name,
        date: new Date(element.startDate),
        place: element.municipality.name,
        admin: element.user.name,
      }
      tournaments.push(tournament)
    }
  });
  return tournaments;
}

const postSubscription =async (userId: string, tournamentId: string, deckId: string) => {
    try {
      const request = await httpClient.post(`/Inscription`, { userId, deckId, tournamentId });
      return { status: true, message:'' }
    }
    catch {
      return { status: false, message: 'Error en la inscripción' }
    }
}
export async function filterTournaments(filter:Filter)
{
  return new Promise(
    (resolve)=>{
      resolve(getTournaments())
    }
  )
}


export async function makeTournamentSubscription(userId:string,tournamentId:string,deckId:string){
  return new Promise(
    (resolve)=>{
      resolve(
        postSubscription(userId, tournamentId, deckId)
      )
    }
  )
}



export async function fetchTournamentMatches(tournamentId:string,matchStep:number)
{
  return new Promise(
    (resolve,reject)=>{
      setTimeout(
        ()=>{
          const match=[
            [{user1:'juan',user2:'pedro',deck1:'deck1',deck2:'deck de dragones'},{user1:'alfredo',user2:'luis',deck1:'deck de prueba',deck2:'deck'},{user1:'alberto',user2:'roger',deck1:'dragones',deck2:'dragoncitos'}],
            [{user1:'juan',user2:'pedro',deck1:'deck1',deck2:'deck de dragones'},{user1:'alfredo',user2:'luis',deck1:'deck de prueba',deck2:'deck'}],
            [{user1:'juan',user2:'pedro',deck1:'deck1',deck2:'deck de dragones'},{user1:'alfredo',user2:'luis',deck1:'deck de prueba',deck2:'deck'}],
            [{user1:'juan',user2:'pedro',deck1:'deck1',deck2:'deck de dragones'},{user1:'alfredo',user2:'luis',deck1:'deck de prueba',deck2:'deck'},{user1:'alberto',user2:'roger',deck1:'dragones',deck2:'dragoncitos'},{user1:'alberto',user2:'roger',deck1:'dragones',deck2:'dragoncitos'}],
          ]
          resolve(match[matchStep-1]);
        },
        3000
      )
    }
  )
}

export async function createTournament(
 name: string,
   description :  string ,
   municipalityId :  string ,
   startDate :  Date ,
   endDate :  Date 
)
{
 return httpClient.post(`Tournament`,{
 name,
   description,
   userId:getUserData().id,
   municipalityId,
   startDate,
   endDate
  })
}

export async function fetchTournamentInfo(id:string)
{
  return new Promise(
    (resolve,reject)=>{
      setTimeout(
        ()=>{
          resolve({
            name:'torneo de prueba',
            players:100,
            stages:3
          });
        },
        3000
      )
    }
  )
}

