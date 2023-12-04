export class Filter{

  constructor(public name:string , public date:Date , public place:string){}
}


export async function filterTournaments(filter:Filter)
{
  return new Promise(
    (resolve,reject)=>{
      setTimeout(
        ()=>{
          const latestTournaments=[];
          for(let i=0 ; i<100;i++)
          {
            latestTournaments.push({
              id:i.toString(),
              name:`tournament ${i}`,
              date:new Date(),
              place:`lugar ${i}`,
              admin:`administrador ${i}`
            })
          }
          resolve(latestTournaments)
        },
        3000
      )
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

export async function createTournament(name:string,playerCount:number)
{
  return new Promise(
    (resolve,reject)=>{
      setTimeout(
        ()=>{
          resolve({});
        },
        3000
      )
    }
  )
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
