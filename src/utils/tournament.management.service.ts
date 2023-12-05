import { httpClient } from "./axios"
export class TournamentManagement{

  async getRoundDuels(tournamentId:string,round:number)
  {
    const info = await httpClient.get(`Duels/?TournamentID=${tournamentId}`)
    return info;
  }

  async generateMixing(tournamentId:string)
  {
    try 
    {const info = await httpClient.post(`Duels/set-initial-duels`,{
        tournamentId
    })
    return info;}
    catch{
      return {}
    }
  }

  async realizaDuel(duelId:string,winner:'A' | 'B')
  {
    console.log(duelId, winner)
    const info = await httpClient.post(`Duels/realize-duel`,{
      duelId,
      winner
    })
    return info;
  }

  async roundAfterMixing(tournamentId:string,amountOfPlayers:number)
  {
    const info = await httpClient.post(`Duels/make-round-after-mixin`,{
      tournamentId,
      amountOfPlayers
    })
    return info;
  }

  async nextRound(tournamentId:string)
  {
    const info = await httpClient.post(`Duels/make-next-round`,{
      tournamentId,
    })
    return info;
  }

}
