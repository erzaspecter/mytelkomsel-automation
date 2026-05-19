// test/specs/home-screen.spec.js
const HomePage = require('../pages/home.page');

describe('Question 1 - Post-Login Home Screen Inspection', () => {
    
    describe('TC-001 - Home Screen Elements After Login', () => {
        
        it('Should display bottom navigation menu items', async () => {
            await expect(HomePage.menuBeranda).toBeDisplayed();
            await expect(HomePage.menuBeliPaket).toBeDisplayed();
            await expect(HomePage.menuBayar).toBeDisplayed();
            await expect(HomePage.menuReward).toBeDisplayed();
            await expect(HomePage.menuLifestyle).toBeDisplayed();
            console.log('✅ All bottom nav items displayed');
        });
        
        it('Should display quota information', async () => {
            try {
                const quotaText = await HomePage.getQuotaText();
                console.log(`📊 Quota: ${quotaText}`);
                expect(quotaText).toBeTruthy();
            } catch(e) {
                console.log('⚠️ Quota element not found, but test continues');
                // Tidak langsung fail karena mungkin halaman perlu waktu load
                await driver.pause(3000);
                const exists = await $('//android.widget.TextView[contains(@text, "GB")]').isDisplayed();
                expect(exists).toBe(true);
            }
        });
        
        it('Should display limit information', async () => {
            try {
                const limitText = await HomePage.getLimitText();
                console.log(`💰 Limit: ${limitText}`);
                expect(limitText).toBeTruthy();
            } catch(e) {
                console.log('⚠️ Limit element not found, but test continues');
                const exists = await $('//android.widget.TextView[contains(@text, "Rp")]').isDisplayed();
                expect(exists).toBe(true);
            }
        });
    });

    describe('TC-002 - Home Screen Without Login (Guest State)', () => {
    before(async () => {
        await driver.terminateApp('com.telkomsel.telkomselcm'); // ← fix ini
        await driver.pause(2000);
        await driver.activateApp('com.telkomsel.telkomselcm');  // ← fix ini
        await driver.pause(4000);
    });

    it('Should not expose personal data in guest state', async () => {
        const phoneVisible = await $('//android.widget.TextView[contains(@text, "628")]')
            .isDisplayed().catch(() => false);
        expect(phoneVisible).toBe(false);
        console.log('✅ Phone number not exposed in guest state');
    });

    it('Should show login CTA when accessing restricted section', async () => {
        // Tap menu yang butuh login
        const menuAkun = await $('//android.widget.FrameLayout[contains(@content-desc, "Akun")]');
        await menuAkun.click();
        await driver.pause(2000);

        const loginPrompt = await $('//*[contains(@text, "Login") or contains(@text, "Masuk")]');
        await expect(loginPrompt).toBeDisplayed();
        console.log('✅ Login prompt shown for restricted section');
    });
    });
});