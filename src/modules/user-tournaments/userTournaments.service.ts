import { userdata } from '@/utils/user.service';
import { Tournament } from '@/utils/Tournament';

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


export { userdata , fetchUserAprovedTournaments };
