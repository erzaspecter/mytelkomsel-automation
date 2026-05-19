// test/pages/account.page.js
const BasePage = require('./base.page');

class AccountPage extends BasePage {
    // Elemen di halaman Akun - menggunakan selector yang lebih umum
    get phoneNumber() { return $('//android.widget.TextView[contains(@text, "628") or contains(@text, "08")]'); }
    get activePeriod() { return $('//android.widget.TextView[contains(@text, "Berlaku") or contains(@text, "Masa Aktif")]'); }
    get menuSettings() { return $('//android.widget.ImageView[@content-desc="Settings"]'); }
    get logoutButton() { return $('//android.widget.TextView[contains(@text, "Keluar") or contains(@text, "Logout")]'); }
    get confirmLogout() { return $('//android.widget.Button[contains(@text, "Ya") or contains(@text, "OK")]'); }
    get loginButton() { return $('//android.widget.Button[contains(@text, "Login")]'); }
    
    async getPhoneNumberText() {
        try {
            return await this.getText(this.phoneNumber);
        } catch {
            return "Not found";
        }
    }
    
    async getActivePeriodText() {
        try {
            return await this.getText(this.activePeriod);
        } catch {
            return "Not found";
        }
    }
    
    async logout() {
        // Scroll ke bawah untuk mencari tombol logout
        await driver.execute('mobile: scrollGesture', {
            left: 100, top: 800, width: 200, height: 600,
            direction: 'down', percent: 0.8
        }).catch(() => {});
        await driver.pause(1000);
        
        try {
            await this.click(this.logoutButton);
            await driver.pause(1000);
            await this.click(this.confirmLogout);
        } catch(e) {
            console.log("Logout button not found, trying alternative");
        }
        await driver.pause(3000);
    }
    
    async isLoggedOut() {
        try {
            await this.loginButton.waitForDisplayed({ timeout: 5000 });
            return true;
        } catch {
            return false;
        }
    }
}

module.exports = new AccountPage();