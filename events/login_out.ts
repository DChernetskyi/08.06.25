import { getAuthData } from '../utils';

export async function getLoginIvent(page){
    const authDataLogin = getAuthData();

    await page.goto('https://de1.betinvest.xyz/en/login/?from=header-desktop');
    await page.getByPlaceholder('User name (e-mail)').fill(authDataLogin.email);
    await page.getByPlaceholder('Password').fill(authDataLogin.password);
    await page.waitForSelector('[data-role="login-page-submit-btn"]');
    await page.click('[data-role="login-page-submit-btn"]');
    await page.click('.Box_box--BuJ.User_data--LyT.Box_align_center--NXG');
    await page.click('[data-role="user-menu-logout"]');
    await page.close();
   
}