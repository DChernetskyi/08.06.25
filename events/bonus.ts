import { test, expect } from '@playwright/test';
import { getAuthData } from '../utils';

export async function getBonusIvent(request){

const randomName = Math.floor(Math.random() * 100) + 1;

const currentTime = new Date();
const currentDate: Date = new Date(currentTime.getTime() - 179 * 60000);

const year: number = currentDate.getFullYear();
const month: string = (currentDate.getMonth() + 1).toString().padStart(2, '0');
const day: string = currentDate.getDate().toString().padStart(2, '0');
const hours: string = currentDate.getHours().toString().padStart(2, '0');
const minutes: string = currentDate.getMinutes().toString().padStart(2, '0');

const startDate: string = `${year}-${month}-${day} ${hours}:${minutes}:00`;

const currentDateEnd: Date = new Date(currentTime.getTime() + 60 * 60000);

const hoursEnd: string = currentDateEnd.getHours().toString().padStart(2, '0');
const endDate: string = `${year}-${month}-${day} ${hoursEnd}:${minutes}:00`;


    const createBonusCampaign = await request.post('https://prewager-de1.betinvest.xyz/internal/campaigns/create',{
        headers: {
            'x-staff-id': '1234',
            'x-staff-partner-id': '58'
        },
        data: {
            "name": randomName.toString(),
            "startedAt": startDate,
            "endedAt": endDate,
            "status": "draft",
            "contentTemplate": "test-x",
            "comment": "comfor",
            "bonusType": "prewager",
            "offerCount": 0,
            "isSportbook": true,
            "isCasino": true,
            "cantWagerAfterCampaignEnd": 0,
            "timeToActivate": 1,
            "timeToWager": 1,
            "sportsbookMinOdd": 1.2,
            "countOfWagering": 2,
            "isSingle": 1,
            "isMultiple": 1,
            "isSystem": 1,
            "staffId": 186,
            "triggerType": "manual",
            "bonusAmountType": "percent",
            "percentOfDeposit": 2,
            "maxBonusProfit": 10,
            "currency": [],
            "optimoveCampaignId": 1,
            "fole":"string",
            "countryFilterType": "include",
            "countries": [
                "Ukrain"
            ]
            
          }
    })


    const respBonus = await createBonusCampaign.json()
    const bonusId = respBonus.data.id


    const updateBonusCampaign = await request.post(`https://prewager-de1.betinvest.xyz/internal/campaigns/${bonusId}/update`,{
        headers: {
            'x-staff-id': '1234',
            'x-staff-partner-id': '58'
        },
        data: {
            "name": randomName.toString(),
            "startedAt": startDate,
            "endedAt": endDate,
            "status": "ready_for_launch",
            "betType": "on",
            "contentTemplate": "Content template example",
            "comment": "comfor",
            "bonusType": "prewager",
            "offerCount": 1,
            "isSportbook": true,
            "isCasino": true,
            "cantWagerAfterCampaignEnd": 0,
            "timeToActivate": 1,
            "timeToWager": 1,
            "sportsbookMinOdd": 1.2,
            "countOfWagering": 2,
            "isSingle": 1,
            "isMultiple": 1,
            "isSystem": 1,
            "staffId": 14,
            "triggerType": "manual",
            "bonusAmountType": "percent",
            "percentOfDeposit": 2,
            "maxBonusProfit": 2,
            "currency": [
              {
                "currency": "UAH",
                "bonusAmount": 160.8,
                "casinoMinBetAmount": 3,
                "casinoMaxBetAmount": 130,
                "sportsbookMinBetAmount": 5,
                "sportsbookMaxBetAmount": 125,
                "depositMinAmount": 10,
                "depositMaxAmount": 100,
                "isActive": true
              },
              {
                "currency": "EUR",
                "bonusAmount": 160.8,
                "casinoMinBetAmount": 1,
                "casinoMaxBetAmount": 130,
                "sportsbookMinBetAmount": 1,
                "sportsbookMaxBetAmount": 125,
                "depositMinAmount": 10,
                "depositMaxAmount": 100,
                "isActive": true
              }
            ],
            "optimoveCampaignId": 1,
            "fole":"string",
            "countryFilterType": "include",
            "countries": [
                "Ukrain"
            ]
            
          }
    })



    const authDataBonus = getAuthData();
    const userIdInt = Number(authDataBonus.userId)
    const addUserToCampaign = await request.post(`https://prewager-de1.betinvest.xyz/internal/user-sources/user/create`,{
        headers: {
            'x-staff-id': '1234',
            'x-staff-partner-id': '58'
        },
        data: {
            "userId": userIdInt,
            "campaignId": bonusId,
            "currency": "UAH",
            "bonusAmount": 100,
            "staffId": 432
          }
    })

    await new Promise(resolve => setTimeout(resolve, 75000));
    const startBonus = await request.post(`https://prewager-de1.betinvest.xyz/public/campaigns/${bonusId}/activate`,{
        headers: {
            'X-USER-ID': authDataBonus.userId
        },
        data: {}
    })


    const cancelBonus = await request.post(`https://prewager-de1.betinvest.xyz/internal/users/${userIdInt}/campaigns/active/cancel`,{
        data: {}
    })


    const addUserToCampaign2 = await request.post(`https://prewager-de1.betinvest.xyz/internal/user-sources/user/create`,{
        headers: {
            'x-staff-id': '1234',
            'x-staff-partner-id': '58'
        },
        data: {
            "userId": userIdInt,
            "campaignId": bonusId,
            "currency": "UAH",
            "bonusAmount": 100,
            "staffId": 432
          }
    })



    const cancelBonusManager = await request.post(`https://prewager-de1.betinvest.xyz/internal/campaigns/${bonusId}/bulk-cancel`,{
        headers: {
            'x-staff-id': '1234',
            'x-staff-partner-id': '58'
        },
        data: {
            "user_ids": [userIdInt],
            "comment": "comment test",
            "status":[
              "proposed",
              "wagering"
              ],
            "staffId": 1234
          }
          
    })



}