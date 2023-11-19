export async function fetchAdminCreatedTournaments(userId:string)
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
              playerCount:`${(i+1)*100}`
            })
          }
          resolve(latestTournaments)
        },
        3000
      )
    }
  )
}
