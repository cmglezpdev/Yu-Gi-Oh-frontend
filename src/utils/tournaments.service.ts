import type { Tournament } from "./Tournament";
import { httpClient } from "./axios";

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
    (resolve,reject)=>{
      setTimeout(
        ()=>{
          const resp ={status:true,message:''};
          const resp2 ={status:false,message:'por comepinga'};
          resolve((Math.random()<0.7)?resp:resp2);
        },
        3000
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
            [{user1:'12',user2:'21',deck1:'12',deck2:'32'},{user1:'12',user2:'21',deck1:'12',deck2:'32'},{user1:'12',user2:'21',deck1:'12',deck2:'32'}],
            [{user1:'12',user2:'21',deck1:'12',deck2:'32'},{user1:'12',user2:'21',deck1:'12',deck2:'32'},{user1:'12',user2:'21',deck1:'12',deck2:'32'}],
            [{user1:'12',user2:'21',deck1:'12',deck2:'32'},{user1:'12',user2:'21',deck1:'12',deck2:'32'},{user1:'12',user2:'21',deck1:'12',deck2:'32'}],
            [{user1:'12',user2:'21',deck1:'12',deck2:'32'}],
            [{user1:'12',user2:'21',deck1:'12',deck2:'32'}],
          ]
          resolve(match[matchStep]);
        },
        3000
      )
    }
  )
}
