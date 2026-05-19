class BasePage {
    async waitForElement(element, timeout = 15000) {
        await element.waitForDisplayed({ timeout });
    }

    async click(element) {
        await this.waitForElement(element);
        await element.click();
    }

    async getText(element) {
        await this.waitForElement(element);
        return await element.getText();
    }

    async isDisplayed(element) {
        try {
            return await element.isDisplayed();
        } catch {
            return false;
        }
    }

    async scrollDown() {
        await driver.execute('mobile: scrollGesture', {
            left: 100, top: 800, width: 200, height: 600,
            direction: 'down', percent: 0.75
        });
    }
}

module.exports = BasePage;