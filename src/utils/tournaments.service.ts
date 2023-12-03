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
          for(let i=0 ; i<50;i++)
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
