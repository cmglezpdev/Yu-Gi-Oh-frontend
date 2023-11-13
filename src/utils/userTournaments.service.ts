import { userdata } from '@/utils/user.service';
import type { PastTournament, Tournament } from '@/utils/Tournament';

function fetchUserAprovedTournaments(userId = userdata.id): Promise<Tournament[]> {
  return new Promise((resolve) => {

    const tournaments: Tournament[] = [];

    for (let i = 1; i < 100; i++) {
      tournaments.push({
        name: `torneo aprobado ${i}`,
        date: new Date(),
        place: 'labana',
        deckName: 'undeck',
        deckId: '1234'
      })
    }

    setTimeout(()=>{
       resolve(tournaments);
    },1000)

  })
}


function fetchUserPastTournaments(userId = userdata.id): Promise<Tournament[]> {
  return new Promise((resolve) => {

    const tournaments: PastTournament[] = [];

    for (let i = 1; i < 100; i++) {
      tournaments.push({
        name: `torneo terminado ${i}`,
        date: new Date(),
        place: 'labana',
        deckName: 'undeck',
        deckId: '1234',
        winned:(i%2)==0 
      })
    }

    setTimeout(()=>{
       resolve(tournaments);
    },1000)

  })
}


function fetchUserPendingTournaments(userId = userdata.id): Promise<Tournament[]> {
  return new Promise((resolve) => {

    const tournaments: Tournament[] = [];

    for (let i = 1; i < 100; i++) {
      tournaments.push({
        name: `torneo pendiente ${i}`,
        date: new Date(),
        place: 'labana',
        deckName: 'undeck',
        deckId: '1234',
      })
    }

    setTimeout(()=>{
       resolve(tournaments);
    },1000)

  })
}

function fetchUserRejectedTournaments(userId = userdata.id): Promise<Tournament[]> {
  return new Promise((resolve) => {

    const tournaments: Tournament[] = [];

    for (let i = 1; i < 100; i++) {
      tournaments.push({
        name: `torneo rechazado ${i}`,
        date: new Date(),
        place: 'labana',
        deckName: 'undeck',
        deckId: '1234',
      })
    }

    setTimeout(()=>{
       resolve(tournaments);
    },1000)

  })
}

export { userdata , fetchUserAprovedTournaments,fetchUserPastTournaments , fetchUserPendingTournaments , fetchUserRejectedTournaments };
