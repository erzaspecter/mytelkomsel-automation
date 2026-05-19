// test/specs/buy-package.spec.js
const HomePage = require('../pages/home.page');

describe('Question 3 - Buy Package', () => {

    // Navigasi ke Beli Paket SEKALI sebelum semua TC di file ini
    before(async () => {
        await HomePage.navigateToBeliPaket();
        await driver.pause(3000);
    });

    describe('TC-006 - Package Catalogue Load and Item Inspection', () => {
        it('Should open Buy Package page', async () => {
            const pageTitle = await $('//android.widget.TextView[@text="Beli Paket"]');
            await expect(pageTitle).toBeDisplayed();
        });

        it('Should display package list with at least one item', async () => {
            const packageList = await $$('//androidx.recyclerview.widget.RecyclerView//*[@clickable="true"]');
            expect(packageList.length).toBeGreaterThan(0);
            console.log(`📦 Found ${packageList.length} packages`);
        });
    });

    describe('TC-007 - Package Filtering by Category', () => {
        it('Should filter by Sosmed category', async () => {
            const filterSosmed = await $('//*[contains(@text, "Sosmed") or contains(@text, "Social")]');
            await filterSosmed.click();
            await driver.pause(2000);

            const packages = await $$('//androidx.recyclerview.widget.RecyclerView//*[@clickable="true"]');
            expect(packages.length).toBeGreaterThan(0);
            console.log(`📦 Sosmed packages: ${packages.length}`);
        });

        it('Should switch to different category without crash', async () => {
            const filterMalam = await $('//*[contains(@text, "Malam") or contains(@text, "Night")]');
            await filterMalam.click();
            await driver.pause(2000);

            const packages = await $$('//androidx.recyclerview.widget.RecyclerView//*[@clickable="true"]');
            expect(packages.length).toBeGreaterThan(0);
        });
    });

    describe('TC-008 - Package Selection to Order Confirmation', () => {
        before(async () => {
            // Kembali ke tab utama/internet sebelum TC-008
            const mainTab = await $('//*[contains(@text, "Internet") or contains(@text, "Data") or contains(@text, "Semua")]');
            await mainTab.click();
            await driver.pause(2000);
        });

        it('Should select package with minimum 5GB and show confirmation', async () => {
            const packages = await $$('//androidx.recyclerview.widget.RecyclerView//*[@clickable="true"]');
            let found = false;

            for (const pkg of packages) {
                const text = await pkg.getText().catch(() => '');
                if (text.match(/[5-9]\d*\s*GB|\d{2,}\s*GB/)) {
                    await pkg.click();
                    found = true;
                    break;
                }
            }

            expect(found).toBe(true);
            await driver.pause(2000);

            const confirmPage = await $('//*[contains(@text, "Konfirmasi") or contains(@text, "Order")]');
            await expect(confirmPage).toBeDisplayed();

            const priceVisible = await $('//*[contains(@text, "Rp")]').isDisplayed().catch(() => false);
            expect(priceVisible).toBe(true);

            const backButton = await $('//android.widget.ImageButton[@content-desc="Navigate up"]');
            await expect(backButton).toBeDisplayed();

            console.log('✅ Order confirmation page displayed correctly');
        });
    });
});