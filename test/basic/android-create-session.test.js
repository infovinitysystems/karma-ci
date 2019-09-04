import wd from 'wd';
import chai from 'chai';
import {
  androidCaps, browserStackCaps, serverConfig, androidTestApp
} from '../helpers/config';

const {assert} = chai;


let today = new Date();
let time = today.getDate()+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
console.log("Build:-"+time);

function isAlertPresent(driver){ 
	try 
	{ 
		driver.switchTo().alert(); 
		return true; 
	}   // try 
	catch (Ex) 
	{ 
		return false; 
	}   // catch 
}

describe('TC_Reg_01 : Launch Karma APP & Make a successful Registration', function () {
	let driver;
	let allPassed = true;

	afterEach(function () {
		// keep track of whether all the tests have passed, since mocha does not do this
		allPassed = allPassed && (this.currentTest.state === 'passed');
	});
  
	it('should launch karma application successfully.', async function () {
		try {
			
			
			driver = await wd.promiseChainRemote(serverConfig)
		/*
			await driver.init({
				...androidCaps,        
				app: androidTestApp,
			});
			*/
			
			const browserStackCaps = {
			  'browserstack.user' : 'karmademo1',
			  'browserstack.key' : 'yavqKhpyfJ3KmeCHpswq',
			  'build' : 'Karma [Android]'+time,
			  'name': 'Launch Karma APP & Make a successful Registration',
			  'device' : 'Google Nexus 6',
			  'platformVersion' : '6.0',
			  'app' : 'bs://9a4fab1ad5dc487503a5de3d799782ac3d3996a9',
			  'autoGrantPermissions' : true,
			  'browserstack.debug' : true,
			  'unicodeKeyboard': true
			};
			
			driver = wd.promiseRemote('http://hub-cloud.browserstack.com/wd/hub');
			await driver.init(browserStackCaps);			
			await driver.setImplicitWaitTimeout(10000);
			
	  
			// Check that we're running the Karma app by checking package and activity
			//const activity = await driver.getCurrentActivity();
			//const pkg = await driver.getCurrentPackage();
			//console.log(activity);
			
			const registerBtn = await driver.elementByAccessibilityId("registerBtn-testId");
			const btnLogin = await driver.elementByAccessibilityId("loginBtn-testId");
			
			assert.equal(await registerBtn.isDisplayed() && await btnLogin.isDisplayed(), true,"Application launch successfully.");
		} finally {
			// Quit the session, no matter what happens
			// await driver.quit();
		}
	});
   
	it('TC_Reg_02 : Verify "REGISTER" button functionality', async function () {	
		await driver.setImplicitWaitTimeout(5000);
	
		const register = await driver.elementByAccessibilityId("registerBtn-testId");
		await register.click();
		console.log("Clicked on 'Register' button.");

		const mobileNo = await driver.elementByAccessibilityId("phone-testId");
		const pswd = await driver.elementByAccessibilityId("password-testId");
		const checkBox = await driver.elementByAccessibilityId("aggrementCheckbox-testId")
		
		assert.equal(await mobileNo.isDisplayed()&& await pswd.isDisplayed() && await checkBox.isDisplayed(), true,"Successfully Redirected to Register page.");
	});

	it('TC_Reg_03 :  verify "LOGIN" button functionality on registration page.', async function () {	
		await driver.setImplicitWaitTimeout(5000);
	
		const loginButtonOnRegistrationPage = await driver.elementByXPath("//android.widget.TextView[@text='Login']");		
		assert.equal(await loginButtonOnRegistrationPage.isDisplayed(), true,"LOGIN button displayed Successfully.");
	});



	it('TC_Reg_04 : Verify default country flag/country code from phone number text field.', async function () {
		
		const code = await driver.elementByXPath('//android.view.ViewGroup[@content-desc=\'phoneContainer-testId\']/android.view.ViewGroup/android.widget.TextView');
		
		const countryFlag = await driver.elementByAccessibilityId('phoneContainer-testId');

		assert.equal(await code.isDisplayed() && await countryFlag.isDisplayed() , true,'Successfully country flag/country code from phone number text field displayed.');
		
	});

	it('TC_Reg_05 : Verify country flag/country code from phone number text field.', async function () {
		
		const countryFlag = await driver.elementByXPath('//android.view.ViewGroup[@content-desc=\"phoneContainer-testId\"]/android.view.ViewGroup/android.widget.ImageView');
		

		assert.equal(await countryFlag.isDisplayed(), true,'Successfully displayed.');
		
	});

		it('TC_Reg_06, TC_Reg_07, TC_Reg_08 : Verify search country functionality.', async function () {
		
		const countryFlag = await driver.elementByXPath('//android.view.ViewGroup[@content-desc=\"phoneContainer-testId\"]/android.view.ViewGroup/android.widget.ImageView');
		await countryFlag.click();
		console.log("Clicked on Country Flag.");
		
		const crossButton=  await driver.elementByXPath('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.widget.ImageView');
		
		assert.equal(await crossButton.isDisplayed(), true,'Successfully Cross Button displayed.');
		
		const searchYourCountry = await driver.elementByXPath('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.widget.EditText');	
		await searchYourCountry.sendKeys("United Kingdom");
		console.log("Entered United Kingdom in serach field.");
		
		const countryUK = await driver.elementByXPath('//android.widget.TextView[@text=\'United Kingdom (+44)\']');
		await countryUK.click();
        console.log("Clicked on United Kingdom Country Option.");

		
	});

	
	
	it('TC_Reg_23 :verify "Register" button functionality with valid details.', async function () {		
	
		let mobileNummber = Math.floor(Math.random() * 9000000000) + 1000000000;
	
		const mobileNo = await driver.elementByAccessibilityId('phone-testId');
		await mobileNo.sendKeys(mobileNummber);
		console.log("Entered Mobile number : "+mobileNummber);
		
		const password1 = await driver.elementByAccessibilityId('password-testId');
		await password1.sendKeys('pk91india');
		console.log("Entered Password.");	
		
		const checkBox = await driver.elementByAccessibilityId("aggrementCheckbox-testId");
		await checkBox.click();
		console.log("Checked licence-agreement checkbox.");
		
		const registerBtn = await driver.elementByAccessibilityId("registerBtn-testId");
		await registerBtn.click();
		console.log("Cliked on register Button.");
	
	});
	
	it('TC_Reg_24 : verify details shown on "Verification code" screen.', async function () {
			
			await driver.setImplicitWaitTimeout(3000);
			
			const otp = await driver.elementByAccessibilityId("otp-testId");
			const nextButton = await driver.elementByAccessibilityId("nextBtn-testId");
			const countDownText = await driver.elementByXPath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.widget.TextView[3]");
			
			assert.equal(await otp.isDisplayed() && await nextButton.isDisplayed() && await countDownText.isDisplayed(), true,'Successfully OTP page displayed.');	
		
	});
	
	it('TC_Reg_28,TC_Reg_29, TC_Reg_32 : verify by adding 6 digit code.', async function () {		
		
		const otpField = await driver.elementByAccessibilityId("otp-testId");
		await otpField.sendKeys('998877');
		console.log("Entered OTP number.");
		
		await driver.setImplicitWaitTimeout(2000);
		const nextBtn = await driver.elementByAccessibilityId("nextBtn-testId");
		await nextBtn.click();
		console.log("Clicked on next button.");
		
		await driver.setImplicitWaitTimeout(1000);
		
		const personalDetails = await driver.elementByAccessibilityId("firstName-testId");
		assert.equal(await personalDetails.isDisplayed(),true,"Successfully Personal Detail screen displayed.");
	
		
		
	});
	
	it('TC_Reg_33,TC_Reg_54 :  verify details on personal details screen.', async function () {	
	
	const firstNameField =  await driver.elementByAccessibilityId("firstName-testId");
	await firstNameField.sendKeys('testFName');
	console.log("Entered firstName.");
	
	await driver.setImplicitWaitTimeout(1000);
	const lastNameField= await driver.elementByAccessibilityId("lastName-testId");
	await lastNameField.sendKeys('testLName');
	console.log("Entered lastName.");
	
	const dobField =  await driver.elementByAccessibilityId("birthDateContainer-testId");
	await dobField.click();
	console.log("Clicked on DOB text field.");
	
	const dobFieldOK = await driver.elementById("android:id/button1");
	await dobFieldOK.click();
	console.log("Clicked on DOB ok button.");	
	
	await driver.setImplicitWaitTimeout(1000);
	const emailField = await driver.elementByAccessibilityId("emailId-testId");
	await emailField.sendKeys('test@yop.com');
	console.log("Entered EmailID.");
	
	await driver.setImplicitWaitTimeout(1000);
	const backButton = await driver.elementByAccessibilityId("leftIconBtn-testId");	
	assert.equal(await backButton.isDisplayed(), true,"Successfully back button displayed.");
	
	const nextButton = await driver.elementByAccessibilityId("nextBtn-testId");
	await nextButton.click();
	console.log("Clicked on Next button.");
	await driver.setImplicitWaitTimeout(1000);
	
	
	});
  
  
  it('TC_Reg_61,TC_Reg_62 should search icon functionality for valid postal code.', async function () {
	const postalCode = await driver.elementByAccessibilityId("postalCode-testId");
	await postalCode.sendKeys('SW10 0AA');
	console.log("Entered Postal Code.");
	
	await driver.setImplicitWaitTimeout(1000);
	const searchIcon = await driver.elementByAccessibilityId("searchIcon-testId");
	await searchIcon.click();
	console.log("Clicked on Search icon.");
	
	await driver.setImplicitWaitTimeout(1000);
	const selectAddress = await driver.elementByXPath("//android.widget.TextView[@text='Apartment 1.1, London, England']");
	await selectAddress.click();
	console.log("Address Selected.");
	
	await driver.setImplicitWaitTimeout(1000);
	const nextButton = await driver.elementByAccessibilityId("nextBtn-testId");
	await nextButton.click();
	console.log("Clicked on Next button.");
	
	 });
	
	it('TC_Reg_69 : verify "SIGN ME UP" button functionality from news and updates screen.', async function () {
	await driver.setImplicitWaitTimeout(1000);
	const signMeUp = await driver.elementByAccessibilityId("signMeUpBtn-testId");
	await signMeUp.click();
	console.log("Clicked on Sign Me Up button.");
  
	await driver.setImplicitWaitTimeout(1000);
	const allowButton = await driver.elementByAccessibilityId("allowBtn-testId");
	const skipButton = await driver.elementByXPath("//android.widget.TextView[@text='skip']");
	assert.equal(await allowButton.isDisplayed() && await skipButton.isDisplayed(),true,"Successfully allow and skip button displayed.")
	
  });
  
  it('TC_Reg_72 : should "ALLOW" functionality from Your notifications screen.', async function () {
    const allowButton = await driver.elementByAccessibilityId("allowBtn-testId");
	await allowButton.click();
	console.log("Taped on allow button.");
	await driver.setImplicitWaitTimeout(1000);
    
	const step3and4Text = await driver.elementByXPath("//android.widget.TextView[@text='Step 3 of 4: Quick ID check']");
	const takeaSelfie = await driver.elementByAccessibilityId("startPictureBtn-testId");
	assert.equal(await step3and4Text.isDisplayed() && await takeaSelfie.isDisplayed(),true,"Successfully step3and4 Text and takeaSelfie button displayed.")
	
  });
  
  
  it('TC_Reg_74, TC_Reg_77 : Verify  TAKE A SELFIE button functionality from verify your identity screen.', async function () {
    const takeaSelfie = await driver.elementByAccessibilityId("startPictureBtn-testId")
	await takeaSelfie.click();	
	console.log("Taped on take selfie button.");
	await driver.setImplicitWaitTimeout(1000);
	
	const capture = await driver.elementByAccessibilityId("captureSelfie-testId");
	await capture.click();	
	console.log("Taped on Capture button.");
	await driver.setImplicitWaitTimeout(1000);
  
  });
  
   it('TC_Reg_78 : verify  DONE button functionality from finished screen.', async function () {
	await driver.setImplicitWaitTimeout(2000);
	const done = await driver.elementByAccessibilityId("doneBtn-testId");
	await done.click();	
	console.log("Taped on Done button.");
	
	await driver.setImplicitWaitTimeout(1000);
		
	await driver.quit();
			 
		
   });
  
});
