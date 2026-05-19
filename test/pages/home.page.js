// home.page.js
const BasePage = require('./base.page');

class HomePage extends BasePage {
    // Bottom Navigation - pakai resource-id, lebih stabil
    get menuBeranda()   { return $('//android.widget.FrameLayout[@resource-id="com.telkomsel.telkomselcm:id/navigation_home"]'); }
    get menuBeliPaket() { return $('//android.widget.FrameLayout[@resource-id="com.telkomsel.telkomselcm:id/navigation_shop"]'); }
    get menuBayar()     { return $('//android.widget.FrameLayout[@resource-id="com.telkomsel.telkomselcm:id/navigation_quick_menu"]'); }
    get menuReward()    { return $('//android.widget.FrameLayout[@resource-id="com.telkomsel.telkomselcm:id/navigation_reward"]'); }
    get menuLifestyle() { return $('//android.widget.FrameLayout[@resource-id="com.telkomsel.telkomselcm:id/navigation_explore"]'); }

    // Profile button - ini yang clickable=true
    get profileButton() { return $('//android.widget.ImageView[@resource-id="com.telkomsel.telkomselcm:id/ivDboardHeadPP"]'); }

    async navigateToAccount() {
        await this.click(this.profileButton);
        await driver.pause(2000);
    }

    async navigateToBeliPaket() {
        await this.click(this.menuBeliPaket);
        await driver.pause(2000);
    }

    // Quota & Limit - dari XML terlihat resource-id spesifik
    async getQuotaText() {
        const el = await $('//android.widget.TextView[@resource-id="com.telkomsel.telkomselcm:id/tvForYouItemQuota"]');
        return await el.getText();
    }

    async getLimitText() {
        const el = await $('//android.widget.TextView[@resource-id="com.telkomsel.telkomselcm:id/tvForYouItemCurrentPrice"]');
        return await el.getText();
    }
}

module.exports = new HomePage();