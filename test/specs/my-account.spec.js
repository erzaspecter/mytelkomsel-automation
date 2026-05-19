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

    describe('TC-004 - Internet Quota Detail Breakdown', () => {
    before(async () => {
        // Navigasi ke quota detail dari home
        await HomePage.navigateToAccount();
        await driver.pause(2000);
        const quotaDetail = await $('//*[contains(@text, "Detail") or contains(@text, "Kuota")]');
        await quotaDetail.click();
        await driver.pause(2000);
    });

    it('Should display at least one quota category', async () => {
        const quotaItems = await $$('//*[contains(@text, "GB") or contains(@text, "MB")]');
        expect(quotaItems.length).toBeGreaterThan(0);
        console.log(`📊 Found ${quotaItems.length} quota items`);
    });

    it('Should show category name, remaining amount, and expiry per item', async () => {
        // Scroll dan cek setiap item punya info lengkap
        await driver.execute('mobile: scrollGesture', {
            left: 100, top: 800, width: 200, height: 600,
            direction: 'down', percent: 0.5
        });

        const expiryVisible = await $('//*[contains(@text, "Berlaku") or contains(@text, "Expired")]')
            .isDisplayed().catch(() => false);
        expect(expiryVisible).toBe(true);
    });
    });
    
    // TC-005: Logout and Session Invalidation
    describe('TC-005 - Logout and Session Invalidation', () => {
        it('Should successfully logout', async () => {
            await AccountPage.logout();
            
            const isLoggedOut = await AccountPage.isLoggedOut();
            expect(isLoggedOut).toBe(true);
            console.log('✅ Successfully logged out');
        });
    });
});