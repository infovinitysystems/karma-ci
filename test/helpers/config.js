import path from 'path';

const DEFAULT_ANDROID_DEVICE_NAME = 'Galaxy J8';
const DEFAULT_ANDROID_PLATFORM_VERSION = '9';

const iosCaps = {
	platformName: 'iOS',
	automationName: 'XCUITest',
	deviceName: process.env.IOS_DEVICE_NAME || 'iPhone 6',
	platformVersion: process.env.IOS_PLATFORM_VERSION || '12.0',
	app: undefined, // Will be added in tests
	// appiumVersion: '1.12.1',
	showIOSLog: false,
};

const androidCaps = {
	platformName: 'Android',
	automationName: 'UiAutomator2',
    appPackage : 'com.karmareactnativeapp',
    appActivity : 'com.karmareactnativeapp.MainActivity',
    appWaitDuration : 30000,
    unicodeKeyboard : true,
    autoGrantPermissions : true,
	deviceName: 'Mi A2',
	platformVersion: '8.1.0',
	app: 'F:\\prakash\\test\\helpers\\apps\\karma-latest.apk'
};

const browserStackCaps = {
  'browserstack.user' : 'krushalbatki1',
  'browserstack.key' : 'V9CRKPhi2QYYbi9zkjv2',
  'build' : 'Karma [Android]',
  'name': 'Register_Tests',
  'device' : 'Google Nexus 6',
  'platformVersion' : '6.0',
  'app' : 'bs://8615fc4eefc59dbabd33ed1b40b49b5dae20263d',
  'autoGrantPermissions' : true,
  'browserstack.debug' : true,
  'unicodeKeyboard': true
};
  
const serverConfig = {
	host: process.env.APPIUM_HOST || '0.0.0.0',
	port: process.env.APPIUM_PORT || 4723
};

const LOCAL_ASSET_BASE = path.resolve(__dirname, 'apps');

let iosTestApp = path.resolve(LOCAL_ASSET_BASE, 'TestApp.app.zip');
let androidTestApp = path.resolve(LOCAL_ASSET_BASE, 'karma-latest.apk');

export {
  iosTestApp, androidTestApp, 
  iosCaps, androidCaps, browserStackCaps,
  serverConfig
};
