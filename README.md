# MyTelkomsel Automation Test

Automation test untuk aplikasi MyTelkomsel Android menggunakan **WebdriverIO + Appium**.

## Prerequisites

| Software | Version | Download Link |
|----------|---------|---------------|
| Node.js | v16+ | https://nodejs.org |
| Java JDK | 11+ | https://adoptium.net |
| Android Studio | Latest | https://developer.android.com/studio |
| Appium | v2.x | `npm install -g appium` |
| Appium Driver | uiautomator2 | `appium driver install uiautomator2` |

## Environment Setup

### 1. Clone Repository
```bash
git clone https://github.com/erzaspecter/mytelkomsel-automation.git
cd mytelkomsel-automation
2. Install Dependencies
bash
npm install
3. Connect Android Device
bash
adb devices
# Pastikan device terdeteksi
4. Update UDID
Edit wdio.conf.js, ganti udid dengan device Anda:

javascript
'appium:udid': 'your_device_udid'
5. Start Appium Server
bash
appium --allow-cors
How to Run Tests
bash
npm run test
Test Cases Coverage
ID	Description	Status
TC-001	Home screen element visibility after login	✅
TC-002	Guest mode / without login	✅
TC-003	Active number and subscription details	✅
TC-004	Internet quota detail breakdown	✅
TC-005	Logout and session invalidation	✅
TC-006	Data package catalogue load	✅
TC-007	Package filtering by category	⚠️
TC-008	Package selection to order confirmation	✅
How to Generate Reports
bash
npm run report
Known Limitations
OTP Login: Automation assumes pre-logged in session due to OTP limitation

Selectors: Based on MyTelkomsel version 4.x, may need updates for newer versions

TC-007: Filtering test requires additional selector verification

Project Structure
text
├── test/
│   ├── specs/          # Test case files
│   ├── pages/          # Page Object Model
│   └── helpers/        # Utility functions
├── wdio.conf.js        # WDIO configuration
└── package.json        # Dependencies

Author
Erza

text

---

### 3. All 8 test cases are implemented with clear assertions

**Cek jumlah test cases:**

```bash
# Cek file specs
dir test\specs