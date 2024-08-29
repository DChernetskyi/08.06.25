import { expect, test} from '@playwright/test';
import { getLoginIvent } from '../events/login_out';
import { getTournamentIvent } from '../events/tournament';
import { request } from 'https';
import { getBonusIvent } from '../events/bonus';

test('event login', async ({page}) => {
    
    const log_in_out = await getLoginIvent(page);

})

test('event tournament', async ({request}) => {
    
    const tour = await getTournamentIvent(request)
    
})

test('event bonus', async ({request}) => {
    test.setTimeout(90000);
    const bonusIvent = await getBonusIvent(request)
    //proposed
    //Wagering
    //Cancel by Player
    //Cancel by Manager
})
