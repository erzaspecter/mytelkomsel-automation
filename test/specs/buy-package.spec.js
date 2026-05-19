// test/specs/buy-package.spec.js
const HomePage = require('../pages/home.page');
const PackagePage = require('../pages/package.page');


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
    it('Should load category list and display packages for first category', async () => {
        // Klik kategori pertama (apapun itu)
        const clicked = await PackagePage.clickCategoryByIndex(0);
        expect(clicked).toBe(true);

        const packages = await PackagePage.packageItems;
        expect(packages.length).toBeGreaterThan(0);
        console.log(`📦 Category 1 packages: ${packages.length}`);
    });

    it('Should switch to second category without crash', async () => {
        // Kembali ke Beli Paket dulu
        await HomePage.navigateToBeliPaket();
        await driver.pause(2000);

        // Klik kategori kedua
        const clicked = await PackagePage.clickCategoryByIndex(1);
        expect(clicked).toBe(true);

        const packages = await PackagePage.packageItems;
        expect(packages.length).toBeGreaterThan(0);
        console.log(`📦 Category 2 packages: ${packages.length}`);
    });

    it('Should display all available categories', async () => {
        await HomePage.navigateToBeliPaket();
        await driver.pause(2000);

        const names = await PackagePage.getCategoryNames();
        expect(names.length).toBeGreaterThan(0);
        console.log(`📋 Available categories: ${names.join(', ')}`);
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