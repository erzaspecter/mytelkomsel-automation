// test/pages/package.page.js
const BasePage = require('./base.page');

class PackagePage extends BasePage {

    // Semua kategori di Beli Paket - tidak hardcode nama
    get categoryItems() {
        return $$('//androidx.recyclerview.widget.RecyclerView[@resource-id="com.telkomsel.telkomselcm:id/rvListShopCategory"]/android.view.ViewGroup[@resource-id="com.telkomsel.telkomselcm:id/container"]');
    }

    // Package list setelah masuk kategori
    get packageItems() {
        return $$('//androidx.recyclerview.widget.RecyclerView[@resource-id="com.telkomsel.telkomselcm:id/rvHaloMainPackage"]/android.widget.FrameLayout');
    }

    async getCategoryNames() {
        const categories = await this.categoryItems;
        const names = [];
        for (const cat of categories) {
            const text = await cat.$('//android.widget.TextView[@resource-id="com.telkomsel.telkomselcm:id/tv_title"]')
                .getText().catch(() => '');
            if (text) names.push(text);
        }
        return names;
    }

    async clickCategoryByIndex(index) {
        const categories = await this.categoryItems;
        if (categories[index]) {
            await categories[index].click();
            await driver.pause(2000);
            return true;
        }
        return false;
    }
}

module.exports = new PackagePage();