import { test, expect } from '@playwright/test';
import { getAuthData } from '../utils';

export async function getTournamentIvent(request){

const randomName = Math.floor(Math.random() * 100) + 1;

const currentTime = new Date();
const currentDate: Date = new Date(currentTime.getTime() + 5 * 60000);

const year: number = currentDate.getFullYear();
const month: string = (currentDate.getMonth() + 1).toString().padStart(2, '0');
const day: string = currentDate.getDate().toString().padStart(2, '0');
const hours: string = currentDate.getHours().toString().padStart(2, '0');
const minutes: string = currentDate.getMinutes().toString().padStart(2, '0');

const startDate: string = `${year}-${month}-${day} ${hours}:${minutes}:00`;

const currentDateEnd: Date = new Date(currentTime.getTime() + 60 * 60000);

const hoursEnd: string = currentDateEnd.getHours().toString().padStart(2, '0');
const endDate: string = `${year}-${month}-${day} ${hoursEnd}:${minutes}:00`;


    const createTournament = await request.post('https://tournaments-de1.betinvest.xyz/internal/tournaments/create',{
        data: {
            
                "name": randomName.toString(),
                "comment": "comment",
                "qualification": false,
                "participantsType": "All",
                "qualificationNumberOfBets": null,
                "startDate": startDate,
                "endDate": endDate,
                "currency":"UAH",
                "creator": "Test2"
      }
    })

    const respTourn = await createTournament.json()
    const tournamentId = respTourn.data.id

    const createSettings = await request.post(`https://tournaments-de1.betinvest.xyz/internal/tournaments/${tournamentId}/settings/sport`,{
        data: {
            "calculateType": "PointsPerBet",
            "sportConfigs": [
                {
                    "sportId": 1,
                    "coef": 1,
                    "includeAll": true,
                    "categories": [
                    ]
                }
            ],
            "type": "Mixed",
            "minCoefSingle": 1.1,
            "minCoefExpress": 1.1,
            "minCoefInExpress": 1.1,
            "minCardsInExpress": 2,
            "includeReturn": false,
            "includeCashout": false,
            "includeRiskfree": false,
            "includeUndefined": true,
            "includeLose": false,
            "pointsPerBet": {
                "defaultCurrency": {
                    "currency": "UAH",
                    "amount": 1
                },
                "additionalCurrency": [
                    {
                        "currency": "USD",
                        "amount": 1
                    },
                    {
                        "currency": "EUR",
                        "amount": 1
                    }
                ]
            },
            "minBetAmount": {
                "defaultCurrency": {
                    "currency": "UAH",
                    "amount": 1
                },
                "additionalCurrency": [
                    {
                        "currency": "USD",
                        "amount": 1
                    },
                    {
                        "currency": "EUR",
                        "amount": 1
                    }
                ]
            }
        }
    })



    const goReadyForLaunch = await request.post(`https://tournaments-de1.betinvest.xyz/internal/tournaments/${tournamentId}/readyForLaunch`,{
        data: {}
    })

    const authDataTournament = getAuthData();
    const createJoin = await request.post(`https://tournaments-de1.betinvest.xyz/public/tournaments/${tournamentId}/join`,{
        data: {},
        headers: {
            'x-user-id': authDataTournament.userId
        }
    })






    console.log(tournamentId)
}