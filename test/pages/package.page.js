// test/pages/package.page.js
const BasePage = require('./base.page');

class PackagePage extends BasePage {
    get packageList() { return $$('//androidx.recyclerview.widget.RecyclerView//android.widget.LinearLayout'); }
    get filterSocialMedia() { return $('//android.widget.TextView[@text="Sosmed"]'); }
    get filterNight() { return $('//android.widget.TextView[@text="Malam"]'); }
    get buyButton() { return $('//android.widget.Button[contains(@text, "Beli")]'); }
    
    async selectPackage(minGB = 5) {
        const packages = await this.packageList;
        for (let i = 0; i < packages.length; i++) {
            const text = await packages[i].getText();
            if (text.includes(`${minGB}GB`)) {
                await packages[i].click();
                return true;
            }
        }
        return false;
    }
}

module.exports = new PackagePage();