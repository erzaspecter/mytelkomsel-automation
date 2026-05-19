// wdio.conf.js
exports.config = {
    runner: 'local',
    hostname: '127.0.0.1',
    port: 4723,
    path: '/',
    
    specs: [
            './test/specs/home-screen.spec.js',   // TC-001, TC-002
            './test/specs/my-account.spec.js',    // TC-003, TC-004, TC-005
            './test/specs/buy-package.spec.js',   // TC-006, TC-007, TC-008
    ],
    
    maxInstances: 1,
    workers: 1,  
    
    capabilities: [{
        platformName: 'Android',
        'appium:platformVersion': '13',
        'appium:deviceName': 'Redmi 10c',
        'appium:udid': 'be861fb4',
        'appium:automationName': 'UiAutomator2',
        'appium:appPackage': 'com.telkomsel.telkomselcm',
        'appium:appActivity': 'com.telkomsel.mytelkomsel.view.main.InitMainActivity',
        'appium:autoGrantPermissions': true,
        'appium:noReset': true,
        'appium:newCommandTimeout': 240
    }],
    
    logLevel: 'info',
    outputDir: './logs',
    waitforTimeout: 15000,  // Naikkan timeout
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'mocha',
    reporters: ['spec'],
    
    mochaOpts: {
        ui: 'bdd',
        timeout: 90000  // Naikkan timeout untuk mocha
    }
}