export interface Tournament{
  name:string,
  date:Date,
  place:string,
  deckName:string,
  deckId:string
}

export interface PastTournament extends Tournament{
  winned:boolean;
}
