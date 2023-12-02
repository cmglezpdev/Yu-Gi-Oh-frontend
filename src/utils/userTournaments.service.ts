import { getUserData } from '@/utils/user.service';
import type { PastTournament, Tournament } from '@/utils/Tournament';
import { httpClient } from './axios';

const userdata = getUserData();

const getTournaments = async(status: number) => {
  const tournaments: Tournament[] = [];

  const response = await httpClient.get(`/Inscription?Status=${ status }&userId=${ userdata.id }`);
  response.data.result.forEach((element: any) => {
    let tournament: Tournament = {
      name: element.tournament.name,
      date: new Date(element.tournament.startDate),
      place: element.tournament.municipality.name,
      deckName: element.deck.name,
      deckId: element.deck.id,
    }
    tournaments.push(tournament)
  });
  return tournaments;
}

const getPastTournaments = async() => {
  const pastTournaments: PastTournament[] = [];
  const response = await httpClient.get(`/Inscription?userId=${ userdata.id }`);

  response.data.result.forEach(async (element: any) => {
    if(new Date(element.tournament.endDate) < new Date(Date.now())) {
      let pastTournament: PastTournament = {
        name: element.tournament.name,
        date: new Date(element.tournament.startDate),
        place: element.tournament.municipality.name,
        deckName: element.deck.name,
        deckId: element.deck.id,
        winned: await getWinner(element.tournament.id)
      }
      pastTournaments.push(pastTournament)
    }
  });
  return pastTournaments
}

const getWinner = async(tournamentId: string) => {
  const winner = await httpClient.get(`/Inscription/${ tournamentId }/winner`);
  return (winner.data.result.id === userdata.id)? true : false;
}

function fetchUserAprovedTournaments(): Promise<Tournament[]> {
  return new Promise((resolve) => {
    resolve(
      getTournaments(1)
    );
  })
}


function fetchUserPastTournaments(userId = userdata.id): Promise<Tournament[]> {
  return new Promise((resolve) => {
    resolve(
      getPastTournaments()
    )
  })
}


function fetchUserPendingTournaments(userId = userdata.id): Promise<Tournament[]> {
  return new Promise((resolve) => {
    resolve(
      getTournaments(0)
    )
  })
}

function fetchUserRejectedTournaments(userId = userdata.id): Promise<Tournament[]> {
  return new Promise((resolve) => {
    resolve(
      getTournaments(2)
    )
  })
}

export { userdata , fetchUserAprovedTournaments,fetchUserPastTournaments , fetchUserPendingTournaments , fetchUserRejectedTournaments };
