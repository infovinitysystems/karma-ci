import wd from 'wd';
import chai from 'chai';
import {
  androidCaps, browserStackCaps, serverConfig, androidTestApp
} from '../helpers/config';

const {assert} = chai;


let today = new Date();
let time = today.getDate()+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
console.log("Build:-"+time);

let bsUser = 'prakashkhandelwa5';
let bsKey = 'tcs58Ga5ZnjKxVHq4NEp';
let bsAppPath = 'bs://5d2b448c0644c43232566ebe80c41f7a9a5060f5';

let mobileNummber = Math.floor(Math.random() * 9000000000) + 1000000000;
let mobileNummber2 = Math.floor(Math.random() * 9000000000) + 1000000000;
let firstnamevar = 'testFName';
let lastnamevar = 'testLName'
let emailvar = 'test@yop.com'
let expectedMobileErrormsg ='Not a valid phone number.'
let expectedPassewordErrormsg= 'Should be 6 characters or more'
let expectedotpErrormsg = 'Should be 6 characters or more'

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

describe('TC_Auto_Reg_02 : Launch Karma APP & Make a successful Registration', function () {
	let driver;
	let allPassed = true;

	afterEach(function () {
		// keep track of whether all the tests have passed, since mocha does not do this
		allPassed = allPassed && (this.currentTest.state === 'passed');
	});
  
	it('TC_Reg_01 : To Verify launch karma application successfully.', async function () {
		try {
			
			
			driver = await wd.promiseChainRemote(serverConfig)
		/*	await driver.init({
				...androidCaps,        
				app: androidTestApp,
			});
*/
			const browserStackCaps = {
			  'browserstack.user' : bsUser,
			  'browserstack.key' : bsKey,
			  'build' : '[Android] Karma Register-'+time,
			  'name': 'TC_Auto_Reg_02 : Launch Karma APP & Make a successful Registration',
			  'app' : bsAppPath,
			  'autoGrantPermissions' : true,
			  'browserstack.debug' : true,
			  'unicodeKeyboard': true,
			  'testobject_cache_device': true,
				'deviceName': 'Google Nexus 6',
				'os_version': '6.0',
				'noReset': true
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
   
	it('TC_Reg_02 : To Verify "REGISTER" button functionality', async function () {
		await driver.setImplicitWaitTimeout(3000);
	
		const register = await driver.elementByAccessibilityId("registerBtn-testId");
		await register.click();
		console.log("Clicked on 'Register' button.");

		const mobileNo = await driver.elementByAccessibilityId("phone-testId");
		const pswd = await driver.elementByAccessibilityId("password-testId");
		const checkBox = await driver.elementByAccessibilityId("aggrementCheckbox-testId")
		
		assert.equal(await mobileNo.isDisplayed()&& await pswd.isDisplayed() && await checkBox.isDisplayed(), true,"Successfully Redirected to Register page.");
	});

	it('TC_Reg_03 :  To Verify "LOGIN" button functionality on registration page.', async function () {
		await driver.setImplicitWaitTimeout(5000);
	
		const loginButtonOnRegistrationPage = await driver.elementByXPath("//android.widget.TextView[@text='Login']");		
		assert.equal(await loginButtonOnRegistrationPage.isDisplayed(), true,"LOGIN button displayed Successfully.");
	});

	/*
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

		
	});*/

	it('TC_Reg_23 : To Verify "Register" button functionality with valid details.', async function () {

		await driver.setImplicitWaitTimeout(1000);
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
	
	it('TC_Reg_24 : To Verify details shown on "Verification code" screen.', async function () {
			
			await driver.setImplicitWaitTimeout(3000);
			
			const otp = await driver.elementByAccessibilityId("otp-testId");
			const nextButton = await driver.elementByAccessibilityId("nextBtn-testId");
			const countDownText = await driver.elementByXPath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.widget.TextView[3]");
			
			assert.equal(await otp.isDisplayed() && await nextButton.isDisplayed() && await countDownText.isDisplayed(), true,'Successfully OTP page displayed.');	
		
	});
	
	it('TC_Reg_28, TC_Reg_29, TC_Reg_32 : To Verify by adding 6 digit code.', async function () {
		
		const otpField = await driver.elementByAccessibilityId("otp-testId");
		await otpField.sendKeys('998877');
		console.log("Entered OTP number.");
		
		await driver.setImplicitWaitTimeout(2000);
		const nextBtn = await driver.elementByAccessibilityId("nextBtn-testId");
		await nextBtn.click();
		console.log("Clicked on next button.");
		
		await driver.setImplicitWaitTimeout(5000);
		
		const personalDetails = await driver.elementByAccessibilityId("firstName-testId");
		assert.equal(await personalDetails.isDisplayed(),true,"Successfully Personal Detail screen displayed.");

	});
	
	it('TC_Reg_33, TC_Reg_54 : To Verify details on personal details screen.', async function () {
	
	const firstNameField =  await driver.elementByAccessibilityId("firstName-testId");
	await firstNameField.sendKeys(firstnamevar);
	console.log("Entered firstName.");
	
	await driver.setImplicitWaitTimeout(1000);
	const lastNameField= await driver.elementByAccessibilityId("lastName-testId");
	await lastNameField.sendKeys(lastnamevar);
	console.log("Entered lastName.");
	
	const dobField =  await driver.elementByAccessibilityId("birthDateContainer-testId");
	await dobField.click();
	console.log("Clicked on DOB text field.");
	
	const dobFieldOK = await driver.elementById("android:id/button1");
	await dobFieldOK.click();
	console.log("Clicked on DOB ok button.");	
	
	await driver.setImplicitWaitTimeout(1000);
	const emailField = await driver.elementByAccessibilityId("emailId-testId");
	await emailField.sendKeys(emailvar);
	console.log("Entered EmailID.");
	
	await driver.setImplicitWaitTimeout(1000);
	const backButton = await driver.elementByAccessibilityId("leftIconBtn-testId");	
	assert.equal(await backButton.isDisplayed(), true,"Successfully back button displayed.");
	
	const nextButton = await driver.elementByAccessibilityId("nextBtn-testId");
	await nextButton.click();
	console.log("Clicked on Next button.");
	await driver.setImplicitWaitTimeout(1000);
	
	
	});

    it('TC_Reg_61, TC_Reg_62 : To Verify search icon functionality for valid postal code.', async function () {
  	await driver.setImplicitWaitTimeout(2000);
	const postalCode = await driver.elementByAccessibilityId("postalCode-testId");
	await postalCode.sendKeys('SW10 0AA');
	console.log("Entered Postal Code.");
	
	await driver.setImplicitWaitTimeout(1000);

	const searchIcon = await driver.elementByAccessibilityId("searchIcon-testId");
	await searchIcon.click();
	console.log("Clicked on Search icon.");
	
	await driver.setImplicitWaitTimeout(10000);

	const selectAddress = await driver.elementByXPath("//android.widget.TextView[@text='Apartment 1.1, London, England']");
	await selectAddress.click();
	console.log("Address Selected.");
	
	await driver.setImplicitWaitTimeout(2000);
	const nextButton = await driver.elementByAccessibilityId("nextBtn-testId");
	await nextButton.click();
	console.log("Clicked on Next button.");
	
	 });
	
	it('TC_Reg_69 : To  Verify "SIGN ME UP" button functionality from news and updates screen.', async function () {
	await driver.setImplicitWaitTimeout(3000);
	const signMeUp = await driver.elementByAccessibilityId("signMeUpBtn-testId");
	await signMeUp.click();
	console.log("Clicked on Sign Me Up button.");
  
	await driver.setImplicitWaitTimeout(2000);
	const allowButton = await driver.elementByAccessibilityId("allowBtn-testId");
	const skipButton = await driver.elementByXPath("//android.widget.TextView[@text='skip']");
	assert.equal(await allowButton.isDisplayed() && await skipButton.isDisplayed(),true,"Successfully allow and skip button displayed.");
	
  });
  
    it('TC_Reg_72 : To Verify "ALLOW" functionality from Your notifications screen.', async function () {
  	await driver.setImplicitWaitTimeout(1000);
    const allowButton = await driver.elementByAccessibilityId("allowBtn-testId");
	await allowButton.click();
	console.log("Taped on allow button.");
	await driver.setImplicitWaitTimeout(1000);
    
	const step3and4Text = await driver.elementByXPath("//android.widget.TextView[@text='Step 3 of 4: Quick ID check']");
	const takeaSelfie = await driver.elementByAccessibilityId("startPictureBtn-testId");
	await driver.setImplicitWaitTimeout(1000);
	assert.equal(await step3and4Text.isDisplayed() && await takeaSelfie.isDisplayed(),true,"Successfully step3and4 Text and takeaSelfie button displayed.");
	
  });

    it('TC_Reg_74, TC_Reg_77 : To Verify TAKE A SELFIE button functionality from verify your identity screen.', async function () {
  	await driver.setImplicitWaitTimeout(2000);
    const takeaSelfie = await driver.elementByAccessibilityId("startPictureBtn-testId");
	await takeaSelfie.click();	
	console.log("Taped on take selfie button.");
	await driver.setImplicitWaitTimeout(1000);
	
	const capture = await driver.elementByAccessibilityId("captureSelfie-testId");
	await capture.click();	
	console.log("Taped on Capture button.");
	await driver.setImplicitWaitTimeout(4000);
  
  });
  
    it('TC_Reg_78 : To Verify  DONE button functionality from finished screen.', async function () {
	await driver.setImplicitWaitTimeout(5000);
	const done = await driver.elementByAccessibilityId("doneBtn-testId");
	await done.click();	
	console.log("Taped on Done button.");
	await driver.setImplicitWaitTimeout(2000);

   });

    it('TC_Reg_78 : To Verify apply screen.', async function () {

		const apply = await  driver.elementByAccessibilityId("Apply, tab, 1 of 5");
	    const dashboard = await  driver.elementByAccessibilityId("Dashboard, tab, 2 of 5");
	    const cards = await  driver.elementByAccessibilityId("Cards, tab, 3 of 5");
	    const profile = await  driver.elementByAccessibilityId("Profile, tab, 4 of 5");
	    const more = await  driver.elementByAccessibilityId("More, tab, 5 of 5");
		const sport = await driver.elementByXPath("//android.widget.TextView[@text='Sports']");
        assert.equal(await apply.isDisplayed() && await dashboard.isDisplayed() && await cards.isDisplayed() && await profile.isDisplayed() && await more.isDisplayed() && await sport.isDisplayed() ,true,"all elements displayed successfully on apply screen.");
        await driver.setImplicitWaitTimeout(2000);
   });

	it('TC_Reg_79 : To Verify user profile screen after successfully registration.', async function () {

		 const profile = await  driver.elementByAccessibilityId("Profile, tab, 4 of 5");
		 await profile.click();
		await driver.setImplicitWaitTimeout(2000);

		const firstname = await driver.elementByXPath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[3]/android.widget.EditText");
		const lastname = await driver.elementByXPath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[4]/android.widget.EditText");
		const dob = await driver.elementByXPath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[5]/android.widget.EditText");
		const email = await driver.elementByXPath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[6]/android.widget.EditText");
		const mobile = await driver.elementByXPath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[7]/android.widget.EditText");

		let fn = await firstname.text();
		console.log("Actual First Name : "+fn);
		let ln = await lastname.text();
		console.log("Actual Last Name : "+ln);
		let emailID = await email.text();
		console.log("Actual Email ID : "+emailID);
		let mobilNo = await mobile.text();
		console.log("Actual Mobile : "+mobilNo);
		let mob = '+44'+mobileNummber;

		/*fn.equal(firstnamevar);
 		ln.equal(lastnamevar);
 		emailID.equal(emailvar);*/

		//assert.equal(fn.equals(firstnamevar) &&  ln.equals(lastnamevar) &&  emailID.equals(emailvar) &&  mobilNo.equals('+44'+mobileNummber), true, "all elements displayed successfully on user profile screen.");
		assert.equal(fn,firstnamevar,"First Name Matched successfully");
		assert.equal(ln,lastnamevar,"Last Name Matched successfully");
		assert.equal(emailID,emailvar,"Email Id Matched successfully");
		assert.equal(mobilNo,mob,"Mobile Number Matched successfully");

		await driver.setImplicitWaitTimeout(1000);
		await driver.quit();
	});

});

describe('TC_Auto_Reg_03 : To verify "Register" page and "Verification Code" screen validations scenarios.', function () {
	let driver;
	let allPassed = true;

	afterEach(function () {
		// keep track of whether all the tests have passed, since mocha does not do this
		allPassed = allPassed && (this.currentTest.state === 'passed');
	});

	it('TC_Reg_01 : To Verify launch karma application successfully.', async function () {
		try {


			driver = await wd.promiseChainRemote(serverConfig)
             /*   await driver.init({
                    ...androidCaps,
                    app: androidTestApp,
                });*/

			const browserStackCaps = {
				'browserstack.user': bsUser,
				'browserstack.key': bsKey,
				'build': '[Android] Karma Register-' + time,
				'name': 'TC_Auto_Reg_03 : To verify Register page validations scenarios.',
				'app': bsAppPath,
				'autoGrantPermissions': true,
				'browserstack.debug': true,
				'unicodeKeyboard': true,
				'testobject_cache_device': true,
				'deviceName': 'Google Nexus 6',
				'os_version': '6.0',
				'noReset': true
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

			assert.equal(await registerBtn.isDisplayed() && await btnLogin.isDisplayed(), true, "Application launch successfully.");
		} finally {
			// Quit the session, no matter what happens
			// await driver.quit();
		}
	});

	it('TC_Reg_02 : To Verify "REGISTER" button functionality.', async function () {
		await driver.setImplicitWaitTimeout(5000);

		const register = await driver.elementByAccessibilityId("registerBtn-testId");
		await register.click();
		console.log("Clicked on 'Register' button.");

		const mobileNo = await driver.elementByAccessibilityId("phone-testId");
		const pswd = await driver.elementByAccessibilityId("password-testId");
		const checkBox = await driver.elementByAccessibilityId("aggrementCheckbox-testId")

		assert.equal(await mobileNo.isDisplayed() && await pswd.isDisplayed() && await checkBox.isDisplayed(), true, "Successfully Redirected to Register page.");
	});

	it('TC_Reg_11 : To verify validation message for less then 10 digit phone number.', async function () {

		await driver.setImplicitWaitTimeout(1000);
		const mobileNo = await driver.elementByAccessibilityId('phone-testId');
		await mobileNo.sendKeys('998865');
		console.log("Entered Mobile number ");

		const mobileNoError = await driver.elementByXPath("//android.widget.TextView[@text='Not a valid phone number.']");
		let actualMobileErrormsg = await mobileNoError.text();
		console.log(actualMobileErrormsg);

		assert.equal(actualMobileErrormsg,expectedMobileErrormsg,"validation message displayed successfully");
	});

	it('TC_Reg_13 : To verify validation message for less than 6 characters in password field.', async function () {

		await driver.setImplicitWaitTimeout(1000);
		const pswd = await driver.elementByAccessibilityId("password-testId");
		await pswd.sendKeys('9ew5');
		console.log("Entered  Password");

		const passwordError = await driver.elementByXPath("//android.widget.TextView[@text='Should be 6 characters or more']");
		let actualPasswordErrormsg = await passwordError.text();
		console.log(actualPasswordErrormsg);

		assert.equal(actualPasswordErrormsg,expectedPassewordErrormsg,"validation message displayed successfully");
	});

	it('TC_Reg_17 : To verify "I agree to the karma..." checkbox functionality with invalid phone number and password.', async function () {

		await driver.setImplicitWaitTimeout(1000);
		const mobileNo = await driver.elementByAccessibilityId('phone-testId');
		await mobileNo.sendKeys('998865');
		console.log("Entered invalid Mobile number: 998865");

		await driver.setImplicitWaitTimeout(1000);
		const pswd = await driver.elementByAccessibilityId("password-testId");
		await pswd.sendKeys('9ew5');
		console.log("Entered  Password: 9ew5");

		const checkBox = await driver.elementByAccessibilityId("aggrementCheckbox-testId");
		await checkBox.click();
		console.log("Clicked on check box.");

		const registerBtn = await driver.elementByAccessibilityId("registerBtn-testId");

		assert.equal(await registerBtn.isEnabled(),true,"Register button is disable");

	});

	it('TC_Reg_19 : To verify "Terms of service" link from "I agree to the Karma." checkbox.', async function () {

		const terms = await driver.elementByAccessibilityId("termsLink-testId");
		await terms.click();
		console.log("Tap on 'Terms of service' link.");
		await driver.setImplicitWaitTimeout(5000);

		const termsHeader = await driver.elementByAccessibilityId("headerTitle-testId");
		let termsPageHeader = await termsHeader.text();

		assert.equal(termsPageHeader,'TERMS OF SERVICE',"Pass. Verfied Terms of Service page");
	});

	it('TC_Reg_20 : To verify back button functionality from "Terms of service". ', async function () {

		const goBack = await driver.elementByAccessibilityId("leftIconBtn-testId");
		await goBack.click();
		const mobileNo = await driver.elementByAccessibilityId('phone-testId');
		const pswd = await driver.elementByAccessibilityId("password-testId");
		//const checkBox = await driver.elementByAccessibilityId("aggrementCheckbox-testId");
		console.log("Tap on Go Back icon.");
		await driver.setImplicitWaitTimeout(1000);

		assert.equal(await mobileNo.isDisplayed()&& await pswd.isDisplayed(), true,"Successfully Redirected to Register page.");

	});

	it('TC_Reg_21 : To verify "Privacy Policy" link from "I agree to the Karma..." checkbox.', async function () {

		const privacy = await driver.elementByAccessibilityId("privacyPolicyLink-testId");
		await privacy.click();
		console.log("Tap on 'Privacy policy' link.");
		await driver.setImplicitWaitTimeout(5000);

		const privacyHeader = await driver.elementByAccessibilityId("headerTitle-testId");
		let privacyPageHeader = await privacyHeader.text();

		assert.equal(privacyPageHeader,'PRIVACY POLICY',"Pass. Verfied Privacy Policy page");
	});

	it('TC_Reg_22 : To verify back button functionality from "Privacy Policy".', async function () {

		const goBack = await driver.elementByAccessibilityId("leftIconBtn-testId");
		await goBack.click();
		const mobileNo = await driver.elementByAccessibilityId('phone-testId');
		const pswd = await driver.elementByAccessibilityId("password-testId");
		const checkBox = await driver.elementByAccessibilityId("aggrementCheckbox-testId");
		console.log("Tap on Go Back icon.");
		await driver.setImplicitWaitTimeout(1000);

		assert.equal(await mobileNo.isDisplayed()&& await pswd.isDisplayed() && await checkBox.isDisplayed(), true,"Successfully Redirected to Register page.");

	});

	it('TC_Reg_27 : To verify validation message for less then 6 digit code.', async function () {

		await driver.setImplicitWaitTimeout(1000);
		const mobileNo = await driver.elementByAccessibilityId('phone-testId');
		await mobileNo.sendKeys(mobileNummber2);
		console.log("Entered Mobile number : "+mobileNummber2);

		const password1 = await driver.elementByAccessibilityId('password-testId');
		await password1.sendKeys('abcd123456');
		console.log("Entered Password : abcd123456 ");

		await driver.setImplicitWaitTimeout(1000);

		const registerBtn = await driver.elementByAccessibilityId("registerBtn-testId");
		await registerBtn.click();
		console.log("Cliked on register Button.");

		await driver.setImplicitWaitTimeout(3000);

		const otp = await driver.elementByAccessibilityId("otp-testId");
		await otp.sendKeys("3981");
		console.log("Entered less than 6 digit OTP number: 3981");

		const otpErrorMsg = await driver.elementByXPath("//android.widget.TextView[@text='Should be 6 characters or more']");
		let actualotpErrorMsg = await otpErrorMsg.text();

		console.log("Actual error message : "+actualotpErrorMsg);
        assert.equal(actualotpErrorMsg,expectedotpErrormsg,"Error Message displayed Successfully");

		await driver.quit();
	});

});

