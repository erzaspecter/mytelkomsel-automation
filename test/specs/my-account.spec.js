// test/specs/my-account.spec.js
const HomePage = require('../pages/home.page');
const AccountPage = require('../pages/account.page');

describe('Question 2 - My Account', () => {
    
    // TC-003: Active Number and Subscription Details
    describe('TC-003 - Active Number and Subscription Details', () => {
        before(async () => {
            await HomePage.navigateToAccount();
            await driver.pause(3000);
        });
        
        it('Should display active phone number', async () => {
            const phoneNumber = await AccountPage.getPhoneNumberText();
            console.log(`📱 Phone number: ${phoneNumber}`);
            expect(phoneNumber).toBeTruthy();
        });
        
        it('Should display active period or expiry date', async () => {
            const periodText = await AccountPage.getActivePeriodText();
            console.log(`📅 Active period: ${periodText}`);
            expect(periodText).toBeTruthy();
        });
    });

   
    
     // TC-005: Logout and Session Invalidation
    describe('TC-005 - Logout and Session Invalidation', () => {
        
        before(async () => {
            // Navigate to Account page first
            await HomePage.navigateToAccount();
            await driver.pause(3000);
        });
        
        it('Should logout successfully via Pengaturan Aplikasi', async () => {
            await AccountPage.logoutViaSettings();
            
            const isLoggedOut = await AccountPage.isLoggedOut();
            expect(isLoggedOut).toBe(true);
            console.log('✅ Successfully logged out');
        });
        
        it('Should not show personal account data after logout', async () => {
            const isPersonalDataVisible = await AccountPage.isPersonalDataVisible();
            expect(isPersonalDataVisible).toBe(false);
            console.log('✅ No personal data visible');
        });
        
        it('Should not restore session when pressing back button', async () => {
            await AccountPage.pressBackButton();
            
            // Still should be on login screen
            const isLoggedOut = await AccountPage.isLoggedOut();
            expect(isLoggedOut).toBe(true);
            console.log('✅ Back button did not restore session');
        });
        
        it('Should display login/register option', async () => {
            const loginOption = await $('//android.widget.Button[contains(@text, "Login")]');
            await expect(loginOption).toBeDisplayed();
            console.log('✅ Login option available');
        });
    });
});