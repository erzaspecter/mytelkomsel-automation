// home.page.js
const BasePage = require('./base.page');

class HomePage extends BasePage {
    // Quota - pakai resource-id spesifik
get quotaValue() {
    return $('//android.widget.TextView[@resource-id="com.telkomsel.telkomselcm:id/tvTelcoContentQuotaValue"]');
}

get quotaInfo() {
    return $('//android.widget.TextView[@resource-id="com.telkomsel.telkomselcm:id/tvTelcoContentQuotaInfo"]');
}

get quotaTitle() {
    return $('//android.widget.TextView[@resource-id="com.telkomsel.telkomselcm:id/tvTelcoContentQuotaTitle"]');
}

// Balance/Tagihan
get balanceValue() {
    return $('//android.widget.TextView[@resource-id="com.telkomsel.telkomselcm:id/tvTelcoContentBalanceValue"]');
}

async getQuotaText() {
    return await this.quotaValue.getText();
}

async getLimitText() {
    return await this.balanceValue.getText();
}

// Banner
get mainBanner() {
    return $('//android.widget.ImageView[@resource-id="com.telkomsel.telkomselcm:id/ivDBoardHeadBanner"]');
}

// Phone number
get phoneNumber() {
    return $('//android.widget.TextView[@resource-id="com.telkomsel.telkomselcm:id/tvTelcoContentIdentifier"]');
}

async getPhoneNumberText() {
    return await this.phoneNumber.getText();
}

get profileButton() {
    return $('//android.widget.ImageView[@resource-id="com.telkomsel.telkomselcm:id/ivDboardHeadPP"]');
}

async navigateToAccount() {
    await this.click(this.profileButton);
    await driver.pause(2000);
}
}

module.exports = new HomePage();