import wd from 'wd';
import chai from 'chai';
import {
  androidCaps, browserStackCaps, serverConfig, androidTestApp
} from '../helpers/config';

const {assert} = chai;

let today = new Date();
let time = today.getDate()+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
console.log("Build:-"+time);

let bsUser = 'prakashkhandelwa6';
let bsKey = 'h8NFqzPAWxcJFsqzinsH';
let bsAppPath = 'bs://29476068361124444dd00659f76c74a38a2b8a17';

// For Local execution
/*let bsUser = 'rahulkhokawat1';
let bsKey = 'F9GKcttxNsQznKRxQo2m';
let bsAppPath = 'bs://fa95a0237144f591bd64dad24e40cbadf4ebfc33';*/

let mobileNummber = Math.floor(Math.random() * 9000000000) + 1000000000;
let mobileNummber2 = Math.floor(Math.random() * 9000000000) + 1000000000;
let mobileNummber3 = Math.floor(Math.random() * 9000000000) + 1000000000;
let mobileNummber4 = Math.floor(Math.random() * 9000000000) + 1000000000;
let mobileNummber5 = Math.floor(Math.random() * 9000000000) + 1000000000;
let mobileNummber6 = Math.floor(Math.random() * 9000000000) + 1000000000;
let firstnamevar = 'testFName';
let lastnamevar = 'testLName';
let emailvar = 'test@yop.com';
let expectedMobileErrormsg ='Not a valid phone number.';
let expectedPasswordErrormsg = 'Should be 6 characters or more';
let expectedotpErrormsg = 'Should be 6 characters or more';
let expectedotpErrormsg1= 'GraphQL error: Verification Code does not match.';
let expectedFirstNameErrorMsg = 'Should be 2 characters or more';
let expectedFNLNErrorMsg = 'Require only alphabetic characters';
let expectedLastNameErrorMsg2 = 'Should be 2 characters or more';
let expectedBuildingName;
let expectedCityName;
let expectedCountryName;
let expectedPostalCodeValue ='SW100ab';

//Test-Scenario Name
let testName1 = 'TC_Auto_Reg_01 and TC_Auto_Reg_02 : Launch Karma APP & Make a successful Registration';
let testName2 = 'TC_Auto_Reg_03 : To verify "Register" page and "Verification Code" screen validations scenarios.';
let testName3 = 'TC_Auto_Reg_04 : To verify "Personal Details" screen validation.';
let testName4 = 'TC_Auto_Reg_05 : To verify "Address Details" screen validations.';
let testName5 = 'TC_Auto_Reg_06 : To verify Back Icon and Skip functionality for News-Update, Notifications and Identity screens.'


function bsSetting(testName) {
	const  browserStackCaps = {
		'browserstack.user': bsUser,
		'browserstack.key': bsKey,
		'build': '[Android] Karma Register-' + time,
		'name': testName,
		'device': 'Google Nexus 6',
		'platformVersion': '6.0',
		'app': bsAppPath,
		'autoGrantPermissions': true,
		'browserstack.debug': true,
		'unicodeKeyboard': true
	};
	return browserStackCaps;
}

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


describe(testName1, function () {
	let driver;
	let allPassed = true;

	afterEach(function () {
		// keep track of whether all the tests have passed, since mocha does not do this
		allPassed = allPassed && (this.currentTest.state === 'passed');
	});
  
	it('TC_Reg_01 : To Verify launch karma application successfully.', async function () {
		try {
			
			
		/*	driver = await wd.promiseChainRemote(serverConfig);
			await driver.init({
				...androidCaps,        
				app: androidTestApp,
			});*/
		/*	const browserStackCaps = {
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
			};*/
			
			driver = wd.promiseRemote('http://hub-cloud.browserstack.com/wd/hub');
			await driver.init(bsSetting(testName1));
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
		const checkBox = await driver.elementByAccessibilityId("aggrementCheckbox-testId");
		const login = await driver.elementByXPath("//android.widget.TextView[@text='Login']");
		assert.equal(await mobileNo.isDisplayed()&& await pswd.isDisplayed() && await checkBox.isDisplayed() && await login.isDisplayed() &&  await register.isDisplayed(), true,"Successfully Redirected to Register page.");
	});

	it('TC_Reg_03 : To Verify "LOGIN" button functionality on registration page.', async function () {
		await driver.setImplicitWaitTimeout(1000);
		const loginButtonOnRegistrationPage = await driver.elementByXPath("//android.widget.TextView[@text='Login']");
		assert.equal(await loginButtonOnRegistrationPage.isDisplayed(), true,"LOGIN button displayed Successfully.");

	});

	/*it('TC_Reg_04 : Verify default country flag/country code from phone number text field.', async function () {
		
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

		await driver.setImplicitWaitTimeout(1000);
		const password = await driver.elementByAccessibilityId('password-testId');
		await password.sendKeys('pk91india');
		console.log("Entered Password.");	

		await driver.setImplicitWaitTimeout(1000);
		const checkBox = await driver.elementByAccessibilityId("aggrementCheckbox-testId");
		await checkBox.click();
		console.log("Checked licence-agreement checkbox.");

		await driver.setImplicitWaitTimeout(1000);
		const registerBtn = await driver.elementByAccessibilityId("registerBtn-testId");
		await registerBtn.click();
		console.log("Clicked on register Button.");

		await driver.setImplicitWaitTimeout(5000);

		const otp = await driver.elementByAccessibilityId("otp-testId");
		assert.equal(await otp.isDisplayed(),true,'Verification Code page displayed Successfully.');
	
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

		await driver.setImplicitWaitTimeout(1000);

		const tickMark = await driver.elementByXPath("//android.view.ViewGroup[@content-desc='otpContainer-testId']/android.widget.TextView");
		assert.equal(await tickMark.isDisplayed(),true,"Tick Mark displayed Successfully.");

		await driver.setImplicitWaitTimeout(2000);
		const nextBtn = await driver.elementByAccessibilityId("nextBtn-testId");

		assert.equal(await nextBtn.isDisplayed(),true,"Next Button displayed Successfully.");

        await driver.setImplicitWaitTimeout(1000);
		await nextBtn.click();
		console.log("Clicked on next button.");
		
		await driver.setImplicitWaitTimeout(5000);
		
		const personalDetails = await driver.elementByAccessibilityId("firstName-testId");
		assert.equal(await personalDetails.isDisplayed(),true,"Successfully Personal Detail screen displayed.");

	});
	
	it('TC_Reg_33, TC_Reg_54 : To Verify details on personal details screen.', async function () {
	
	const firstNameField =  await driver.elementByAccessibilityId("firstName-testId");
	await firstNameField.sendKeys(firstnamevar);
	console.log("Entered firstName : "+firstnamevar);
	
	await driver.setImplicitWaitTimeout(1000);
	const lastNameField= await driver.elementByAccessibilityId("lastName-testId");
	await lastNameField.sendKeys(lastnamevar);
	console.log("Entered lastName :"+lastnamevar);

	await driver.setImplicitWaitTimeout(1000);
	const dobField =  await driver.elementByAccessibilityId("birthDateContainer-testId");
	await dobField.click();
	console.log("Clicked on DOB text field.");

	await driver.setImplicitWaitTimeout(1000);
	const dobFieldOK = await driver.elementById("android:id/button1");
	await dobFieldOK.click();
	console.log("Clicked on DOB ok button.");	
	
	await driver.setImplicitWaitTimeout(1000);
	const emailField = await driver.elementByAccessibilityId("emailId-testId");
	await emailField.sendKeys(emailvar);
	console.log("Entered EmailID : "+emailvar);
	
	await driver.setImplicitWaitTimeout(1000);
	const backButton = await driver.elementByAccessibilityId("leftIconBtn-testId");	
	assert.equal(await backButton.isDisplayed(), true,"Successfully back button displayed.");

	const nextButton = await driver.elementByAccessibilityId("nextBtn-testId");
	await nextButton.click();
	console.log("Clicked on Next button.");
	await driver.setImplicitWaitTimeout(3000);

	const postalCode = await driver.elementByAccessibilityId("postalCode-testId");
	const addressDetailsText = await driver.elementByXPath("//android.widget.TextView[@text='Step 2 of 4: The address details']");
	const postalCodeNextButton = await driver.elementByAccessibilityId("nextBtn-testId");

	assert.equal(await postalCode.isDisplayed() && await  addressDetailsText.isDisplayed() && await postalCodeNextButton.isDisplayed(),true,"Postal Code and Address details text is displayed successfully." );
	});

    it('TC_Reg_61, TC_Reg_62 : To Verify search icon functionality for valid postal code.', async function () {
  	await driver.setImplicitWaitTimeout(2000);
	const postalCode = await driver.elementByAccessibilityId("postalCode-testId");
	await postalCode.sendKeys('SW10 0AB');
	console.log("Entered Postal Code : SW10 0AB");
	
	await driver.setImplicitWaitTimeout(1000);

	const searchIcon = await driver.elementByAccessibilityId("searchIcon-testId");
	await searchIcon.click();
	console.log("Clicked on Search icon.");
	
	await driver.setImplicitWaitTimeout(10000);

	const selectAddress = await driver.elementByXPath("//android.widget.TextView[@text='Chelsea Academy, London, England']");
	await selectAddress.click();
	console.log("Address Selected.");
	
	await driver.setImplicitWaitTimeout(2000);
	const nextButton = await driver.elementByAccessibilityId("nextBtn-testId");
	await nextButton.click();
	console.log("Clicked on Next button.");
	
	 });
	
	it('TC_Reg_69 : To Verify "SIGN ME UP" button functionality from news and updates screen.', async function () {
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

	await driver.setImplicitWaitTimeout(5000);
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

	await driver.setImplicitWaitTimeout(10000);
	const done = await driver.elementByAccessibilityId("doneBtn-testId");
	assert.equal(await done.isDisplayed(),true,"Done Button displayed successfully." );

  });
  
    it('TC_Reg_78 : To Verify DONE button functionality from finished screen.', async function () {
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

describe(testName2, function () {
	let driver;
	let allPassed = true;

	afterEach(function () {
		// keep track of whether all the tests have passed, since mocha does not do this
		allPassed = allPassed && (this.currentTest.state === 'passed');
	});

	it('TC_Reg_01 : To Verify launch karma application successfully.', async function () {
		try {


		//	driver = await wd.promiseChainRemote(serverConfig)
             /*   await driver.init({
                    ...androidCaps,
                    app: androidTestApp,
                });*/

			/*const browserStackCaps = {
				'browserstack.user': bsUser,
				'browserstack.key': bsKey,
				'build': '[Android] Karma Register-' + time,
				'name': 'TC_Auto_Reg_03 : To verify "Register" page and "Verification Code" screen validations scenarios.',
				'app': bsAppPath,
				'autoGrantPermissions': true,
				'browserstack.debug': true,
				'unicodeKeyboard': true,
				'testobject_cache_device': true,
				'deviceName': 'Google Nexus 6',
				'os_version': '6.0',
				'noReset': true
			};*/

			driver = wd.promiseRemote('http://hub-cloud.browserstack.com/wd/hub');
			await driver.init(bsSetting(testName2));
			await driver.setImplicitWaitTimeout(8000);


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
		await driver.setImplicitWaitTimeout(3000);

		const register = await driver.elementByAccessibilityId("registerBtn-testId");
		await register.click();
		console.log("Clicked on 'Register' button.");

		const mobileNo = await driver.elementByAccessibilityId("phone-testId");
		const pswd = await driver.elementByAccessibilityId("password-testId");
		const checkBox = await driver.elementByAccessibilityId("aggrementCheckbox-testId");

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

		assert.equal(actualPasswordErrormsg,expectedPasswordErrormsg,"validation message displayed successfully");
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

		await driver.setImplicitWaitTimeout(1000);
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

		await driver.setImplicitWaitTimeout(1000);
		const password1 = await driver.elementByAccessibilityId('password-testId');
		await password1.sendKeys('abcd123456');
		console.log("Entered Password : abcd123456 ");

		await driver.setImplicitWaitTimeout(1000);

		const registerBtn = await driver.elementByAccessibilityId("registerBtn-testId");
		await registerBtn.click();
		console.log("Clicked on register Button.");

		await driver.setImplicitWaitTimeout(3000);

		const otp = await driver.elementByAccessibilityId("otp-testId");
		await otp.sendKeys("3981");
		console.log("Entered less than 6 digit OTP number: 3981");

		const otpErrorMsg = await driver.elementByXPath("//android.widget.TextView[@text='Should be 6 characters or more']");
		let actualotpErrorMsg = await otpErrorMsg.text();

		console.log("Actual error message : "+actualotpErrorMsg);
        assert.equal(actualotpErrorMsg,expectedotpErrormsg,"Error Message displayed Successfully");

	});

	it('TC_Reg_31 : To verify validation message for invalid 6 digit code.', async function () {

		await driver.setImplicitWaitTimeout(3000);
		const otp = await driver.elementByAccessibilityId("otp-testId");
		await otp.clear();
		await otp.sendKeys("398143");
		console.log("Entered invalid 6 digit OTP number: 398143");

		await driver.setImplicitWaitTimeout(1000);
		const nextButton = await driver.elementByAccessibilityId("nextBtn-testId");
		await nextButton.click();

		await driver.setImplicitWaitTimeout(3000);

		const otpErrorMsg = await driver.elementById("android:id/message");
		let actualotpErrorMsg = await otpErrorMsg.text();
		console.log("Actual error message : "+actualotpErrorMsg);
		assert.equal(actualotpErrorMsg,expectedotpErrormsg1,"Error Message displayed Successfully");

		const otpErrorMsgOk = await driver.elementById("android:id/button1");
        await otpErrorMsgOk.click();

	});

	it('TC_Reg_25 : To verify back arrow button functionality on "Verification Code" screen.', async function () {

		await driver.setImplicitWaitTimeout(2000);
		const backButton = await driver.elementByAccessibilityId("leftIconBtn-testId");
		await backButton.click();

		await driver.setImplicitWaitTimeout(2000);

		const mobileNo = await driver.elementByAccessibilityId('phone-testId');
		const password1 = await driver.elementByAccessibilityId('password-testId');

		assert.equal(await mobileNo.isDisplayed() && await password1.isDisplayed(),true,"user is redirected to login page.")
});

	it('TC_Reg_30 : To verify "Resend Sms" button functionality.', async function () {

		await driver.setImplicitWaitTimeout(1000);
		const mobileNo = await driver.elementByAccessibilityId('phone-testId');
		await mobileNo.sendKeys(mobileNummber3);
		console.log("Entered Mobile number : "+mobileNummber3);

		const password1 = await driver.elementByAccessibilityId('password-testId');
		await password1.sendKeys('abcd987');
		console.log("Entered Password : abcd987 ");

		await driver.setImplicitWaitTimeout(1000);

		const registerBtn = await driver.elementByAccessibilityId("registerBtn-testId");
		await registerBtn.click();
		console.log("Clicked on register Button.");


		await driver.setImplicitWaitTimeout(20000);
		const resendSMS = await driver.elementByAccessibilityId("resendCodeLink-testId");
		//await resendSMS.waitForDisplayed(15000);
		await resendSMS.click();

		await driver.setImplicitWaitTimeout(2000);
		await driver.quit();
	});

});

describe(testName3, function () {
	let driver;
	let allPassed = true;

	afterEach(function () {
		// keep track of whether all the tests have passed, since mocha does not do this
		allPassed = allPassed && (this.currentTest.state === 'passed');
	});
	it('TC_Reg_01 : To Verify launch karma application successfully.', async function () {
		try {
			//driver = await wd.promiseChainRemote(serverConfig)
		/*	await driver.init({
				...androidCaps,
				app: androidTestApp,
			});
*/
			/*const browserStackCaps = {
			  'browserstack.user' : bsUser,
			  'browserstack.key' : bsKey,
			  'build' : '[Android] Karma Register-'+time,
			  'name': 'TC_Auto_Reg_04 : To verify "Personal Details" screen validation.',
			  'app' : bsAppPath,
			  'autoGrantPermissions' : true,
			  'browserstack.debug' : true,
			  'unicodeKeyboard': true,
			  'testobject_cache_device': true,
				'deviceName': 'Google Nexus 6',
				'os_version': '6.0',
				'noReset': true
			};
*/
			driver = wd.promiseRemote('http://hub-cloud.browserstack.com/wd/hub');
			await driver.init(bsSetting(testName3));
			await driver.setImplicitWaitTimeout(8000);


			// Check that we're running the Karma app by checking package and activity
			//const activity = await driver.getCurrentActivity();
			//const pkg = await driver.getCurrentPackage();
			//console.log(activity);

			const registerBtn = await driver.elementByAccessibilityId("registerBtn-testId");
			const btnLogin = await driver.elementByAccessibilityId("loginBtn-testId");

           // const register = appSelectors.registerBtn;
			// const login = appSelectors.btnLogin;
			assert.equal(await registerBtn.isDisplayed() && await btnLogin.isDisplayed(), true,"Application launch successfully.");
		} finally {
			// Quit the session, no matter what happens
			// await driver.quit();
		}
	});

	it('TC_Reg_02 : To Verify "REGISTER" button functionality', async function () {
		await driver.setImplicitWaitTimeout(1000);

		const register = await driver.elementByAccessibilityId("registerBtn-testId");
		await register.click();
		console.log("Clicked on 'Register' button.");
		await driver.setImplicitWaitTimeout(2000);

		const mobileNo = await driver.elementByAccessibilityId("phone-testId");
		const pswd = await driver.elementByAccessibilityId("password-testId");
		const checkBox = await driver.elementByAccessibilityId("aggrementCheckbox-testId");

		assert.equal(await mobileNo.isDisplayed()&& await pswd.isDisplayed() && await checkBox.isDisplayed(), true,"Successfully Redirected to Register page.");
	});

	it('TC_Reg_23 : To Verify "Register" button functionality with valid details.', async function () {

		await driver.setImplicitWaitTimeout(1000);
		const mobileNo = await driver.elementByAccessibilityId('phone-testId');
		await mobileNo.sendKeys(mobileNummber4);
		console.log("Entered Mobile number : "+mobileNummber4);

		await driver.setImplicitWaitTimeout(1000);
		const password1 = await driver.elementByAccessibilityId('password-testId');
		await password1.sendKeys('test1234');
		console.log("Entered Password.");

		await driver.setImplicitWaitTimeout(1000);
		const checkBox = await driver.elementByAccessibilityId("aggrementCheckbox-testId");
		await checkBox.click();
		console.log("Checked licence-agreement checkbox.");

		await driver.setImplicitWaitTimeout(1000);

		const registerBtn = await driver.elementByAccessibilityId("registerBtn-testId");
		await registerBtn.click();
		console.log("Clicked on register Button.");

		await driver.setImplicitWaitTimeout(4000);
	});

	it('TC_Reg_28, TC_Reg_29, TC_Reg_32 : To Verify by adding 6 digit code.', async function () {

	    await driver.setImplicitWaitTimeout(2000);
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

/*	it('TC_Reg_34 : To verify back button functionality from personal details screen.', async function () {

		const backButton =  await driver.elementByAccessibilityId("leftIconBtn-testId");
		await backButton.click();
		console.log("Clicked on Back button.");
		await driver.setImplicitWaitTimeout(1000);

	});*/

	it('TC_Reg_36 : To verify validation message by entering only one alphabet in first name field.', async function () {

			await driver.setImplicitWaitTimeout(1000);
			const firstNameField =  await driver.elementByAccessibilityId("firstName-testId");
			await firstNameField.sendKeys("k");
			console.log("Entered firstName : k");
		    await driver.setImplicitWaitTimeout(1000);

		  	const firstNameError =  await driver.elementByXPath("//android.widget.TextView[@text='Should be 2 characters or more']");
		  	let actualFirstNameErrorMsg = await firstNameError.text();
		  	console.log("Actual First Name Error Msg : "+actualFirstNameErrorMsg);

			assert.equal(actualFirstNameErrorMsg,expectedFirstNameErrorMsg,"FirstName Error Msg Displayed Successfully.");

	});

	it('TC_Reg_35 : To verify validation message by entering number and special character in first name field.', async function () {

			await driver.setImplicitWaitTimeout(1000);

			const firstNameField =  await driver.elementByAccessibilityId("firstName-testId");
			await firstNameField.clear();
			await firstNameField.sendKeys("4@#");
			console.log("Entered firstName : 4@#");
		    await driver.setImplicitWaitTimeout(1000);

			const firstNameError =  await driver.elementByXPath("//android.widget.TextView[@text='Require only alphabetic characters']");
		  	let actualFirstNameErrorMsg = await firstNameError.text();
		  	console.log("Actual First Name Error Msg : "+actualFirstNameErrorMsg);

		  	assert.equal(actualFirstNameErrorMsg,expectedFNLNErrorMsg,"Error Msg for special characters in first name field Displayed Successfully.");
		});

	it('TC_Reg_38 : To verify by removing the added text from First Name text field.', async function () {

			await driver.setImplicitWaitTimeout(1000);
			const firstNameField =  await driver.elementByAccessibilityId("firstName-testId");
			await firstNameField.clear();
			let actualFirstName= await firstNameField.text();
			console.log("Actual First Name : "+actualFirstName);

			let expectedEmptyFirstName = 'First name';

			assert.equal(actualFirstName,expectedEmptyFirstName,"Text removed from First Name field.");
			console.log("Text removed from the First Name field.");

		});

	it('TC_Reg_40 : To verify validation message by entering number and special character in Last name field.', async function () {

			await driver.setImplicitWaitTimeout(1000);
			const lastNameField =  await driver.elementByAccessibilityId("lastName-testId");
			await lastNameField.sendKeys("5@&");
			console.log("Entered lastName : 5@&");
		    await driver.setImplicitWaitTimeout(1000);

			const lastNameError =  await driver.elementByXPath("//android.widget.TextView[@text='Require only alphabetic characters']");
		  	let actuallastNameErrorMsg = await lastNameError.text();
		  	console.log("Actual First Name Error Msg : "+actuallastNameErrorMsg);
			assert.equal(actuallastNameErrorMsg,expectedFNLNErrorMsg,"Error Msg for special characters in last name field Displayed Successfully.");

		});

	it('TC_Reg_41 : To verify validation message by entering only one alphabet in Last Name field.', async function () {

	        await driver.setImplicitWaitTimeout(1000);
			const lastNameField =  await driver.elementByAccessibilityId("lastName-testId");
			await lastNameField.sendKeys("N");
			console.log("Entered lastName : N");
		    await driver.setImplicitWaitTimeout(1000);

		  	const lastNameError =  await driver.elementByXPath("//android.widget.TextView[@text='Should be 2 characters or more']");
		  	let actualLastNameErrorMsg = await lastNameError.text();
		  	console.log("Actual Last Name Error Msg : "+actualLastNameErrorMsg);

			assert.equal(actualLastNameErrorMsg,expectedLastNameErrorMsg2,"LastName Error Msg Displayed Successfully.");

    });

	it('TC_Reg_43 : To verify by removing the added text from Last Name text field.', async function () {
			await driver.setImplicitWaitTimeout(2000);
			const lastNameField =  await driver.elementByAccessibilityId("lastName-testId");
			await lastNameField.clear();

			let actualLastName= await lastNameField.text();
			console.log("Actual Last Name : "+actualLastName);

			let expectedEmptyLastName ='Last name';

			assert.equal(actualLastName,expectedEmptyLastName,"Text removed from Last Name field.");
			console.log("Text removed from the Last Name field and verified.");
		});

	it('TC_Reg_51 : To verify validation message for invalid format Email Ids.', async function () {
        let inValidEmailadd1 = "tarpan";
	    let inValidEmailadd2 = "tarpan@gmail";
	    let inValidEmailadd3 = "@gmail.com";
	    let expectedEmailErrorMsg = 'Invalid email address';

	        //  Invalid email address error message validation for - inValidEmailadd1
	        await driver.setImplicitWaitTimeout(2000);
			const emailField = await driver.elementByAccessibilityId("emailId-testId");
			await emailField.sendKeys(inValidEmailadd1);
            console.log("Entered Email ID : "+inValidEmailadd1);
            await driver.setImplicitWaitTimeout(1000);

			const emailError1 = await driver.elementByXPath("//android.widget.TextView[@text='Invalid email address']");
			let actualEmailErrorMsg1 = await emailError1.text();
			console.log("Actual invalid Email Error Msg : "+actualEmailErrorMsg1);

			assert.equal(actualEmailErrorMsg1,expectedEmailErrorMsg,"For invalid Email ID format error msg Displayed Successfully.");
            console.log("Verified Error message for entering Invalid Email address.");

			await emailField.clear();

			//  Invalid email address error message validation for - inValidEmailadd2
            await driver.setImplicitWaitTimeout(1000);
			await emailField.sendKeys(inValidEmailadd2);
            console.log("Entered Email ID : "+inValidEmailadd2);
            await driver.setImplicitWaitTimeout(1000);

            const emailError2 = await driver.elementByXPath("//android.widget.TextView[@text='Invalid email address']");
			let actualEmailErrorMsg2 = await emailError2.text();
			console.log("Actual invalid Email Error Msg : "+actualEmailErrorMsg2);

			assert.equal(actualEmailErrorMsg2,expectedEmailErrorMsg,"For invalid Email ID format error msg Displayed Successfully.");
            console.log("Verified Error message for entering Invalid Email address.");

			await emailField.clear();

            //  Invalid email address error message validation for - inValidEmailadd3

            await driver.setImplicitWaitTimeout(1000);
            await emailField.sendKeys(inValidEmailadd3);
            console.log("Entered Email ID : "+inValidEmailadd3);
            await driver.setImplicitWaitTimeout(1000);
            const emailError3 = await driver.elementByXPath("//android.widget.TextView[@text='Invalid email address']");
            let actualEmailErrorMsg3 = await emailError3.text();
            console.log("Actual invalid Email Error Msg : "+actualEmailErrorMsg3);

            assert.equal(actualEmailErrorMsg3,expectedEmailErrorMsg,"For invalid Email ID format error msg Displayed Successfully.");
            console.log("Verified Error message for entering Invalid Email address.");

            await emailField.clear();

		});

	it('TC_Reg_52 : To verify by entering valid format Email Id and other valid details.', async function () {

	    await driver.setImplicitWaitTimeout(1000);
	    console.log("Entering valid Personal details.....");

	    const firstNameField =  await driver.elementByAccessibilityId("firstName-testId");
	    await firstNameField.sendKeys(firstnamevar);
	    console.log("Entered firstName : "+firstnamevar);

	    await driver.setImplicitWaitTimeout(1000);
	    const lastNameField= await driver.elementByAccessibilityId("lastName-testId");
	    await lastNameField.sendKeys(lastnamevar);
	    console.log("Entered lastName : "+lastnamevar);

	    await driver.setImplicitWaitTimeout(1000);
	    const dobField =  await driver.elementByAccessibilityId("birthDateContainer-testId");
	    await dobField.click();
	    console.log("Clicked on DOB text field.");

	    await driver.setImplicitWaitTimeout(1000);
	    const dobFieldOK = await driver.elementById("android:id/button1");
	    await dobFieldOK.click();
	    console.log("Clicked on DOB ok button.");

	    await driver.setImplicitWaitTimeout(1000);
	    const emailField = await driver.elementByAccessibilityId("emailId-testId");
	    await emailField.sendKeys(emailvar);
	    console.log("Entered EmailID : "+emailvar );

	    await driver.setImplicitWaitTimeout(2000);
	    const nextButton = await driver.elementByAccessibilityId("nextBtn-testId");

	    assert.equal(await nextButton.isDisplayed(),true,"Next Enabled Displayed Successfully.");

	    await nextButton.click();
	    console.log("Clicked on 'Next' button after filled valid Personal Details.");

	    await driver.setImplicitWaitTimeout(5000);
	    const postalCode = await driver.elementByAccessibilityId("postalCode-testId");
	    const addressDetailsText = await driver.elementByXPath("//android.widget.TextView[@text='Step 2 of 4: The address details']");
	    const postalCodeNextButton = await driver.elementByAccessibilityId("nextBtn-testId");

	    assert.equal(await postalCode.isDisplayed() && await  addressDetailsText.isDisplayed() && await postalCodeNextButton.isDisplayed(),true,"Postal Code and Address details text is displayed successfully." );
        console.log("Verified Postal Code-Address screen successfully.");

         await driver.quit();

		});

});

describe(testName4, function () {
    let driver;
    let allPassed = true;

    afterEach(function () {
        // keep track of whether all the tests have passed, since mocha does not do this
        allPassed = allPassed && (this.currentTest.state === 'passed');
    });

    it('TC_Reg_01 : To Verify launch karma application successfully.', async function () {
		try {
			//driver = await wd.promiseChainRemote(serverConfig)
		/*	await driver.init({
				...androidCaps,
				app: androidTestApp,
			});
*/
			/*const browserStackCaps = {
			  'browserstack.user' : bsUser,
			  'browserstack.key' : bsKey,
			  'build' : '[Android] Karma Register-'+time,
			  'name': 'TC_Auto_Reg_05 : To verify 'Address Details' screen validations.',
			  'app' : bsAppPath,
			  'autoGrantPermissions' : true,
			  'browserstack.debug' : true,
			  'unicodeKeyboard': true,
			  'testobject_cache_device': true,
				'deviceName': 'Google Nexus 6',
				'os_version': '6.0',
				'noReset': true
			};
*/
			driver = wd.promiseRemote('http://hub-cloud.browserstack.com/wd/hub');
			await driver.init(bsSetting(testName4));
			await driver.setImplicitWaitTimeout(8000);


			// Check that we're running the Karma app by checking package and activity
			//const activity = await driver.getCurrentActivity();
			//const pkg = await driver.getCurrentPackage();
			//console.log(activity);

			const registerBtn = await driver.elementByAccessibilityId("registerBtn-testId");
			const btnLogin = await driver.elementByAccessibilityId("loginBtn-testId");

			assert.equal(await registerBtn.isDisplayed() && await btnLogin.isDisplayed(), true,"Application launch successfully.");
		} finally {
			// Quit the session, no matter what happens

		}
	});

    it('TC_Reg_02 : To Verify "REGISTER" button functionality', async function () {
		await driver.setImplicitWaitTimeout(1000);

		const register = await driver.elementByAccessibilityId("registerBtn-testId");
		await register.click();
		console.log("Clicked on 'Register' button.");
		await driver.setImplicitWaitTimeout(2000);

		const mobileNo = await driver.elementByAccessibilityId("phone-testId");
		const pswd = await driver.elementByAccessibilityId("password-testId");
		const checkBox = await driver.elementByAccessibilityId("aggrementCheckbox-testId");

		assert.equal(await mobileNo.isDisplayed()&& await pswd.isDisplayed() && await checkBox.isDisplayed(), true,"Successfully Redirected to Register page.");
	});

	it('TC_Reg_23 : To Verify "Register" button functionality with valid details.', async function () {

		await driver.setImplicitWaitTimeout(1000);
		const mobileNo = await driver.elementByAccessibilityId('phone-testId');
		await mobileNo.sendKeys(mobileNummber5);
		console.log("Entered Mobile number : "+mobileNummber5);

		await driver.setImplicitWaitTimeout(1000);
		const password1 = await driver.elementByAccessibilityId('password-testId');
		await password1.sendKeys('test5678');
		console.log("Entered Password.");

		await driver.setImplicitWaitTimeout(1000);
		const checkBox = await driver.elementByAccessibilityId("aggrementCheckbox-testId");
		await checkBox.click();
		console.log("Checked licence-agreement checkbox.");

		await driver.setImplicitWaitTimeout(1000);

		const registerBtn = await driver.elementByAccessibilityId("registerBtn-testId");
		await registerBtn.click();
		console.log("Clicked on register Button.");

		await driver.setImplicitWaitTimeout(4000);
	});

	it('TC_Reg_28, TC_Reg_29, TC_Reg_32 : To Verify by adding 6 digit code.', async function () {

	    await driver.setImplicitWaitTimeout(2000);
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

    it('TC_Reg_52 : To verify by entering valid format Email Id and other valid details.', async function () {

	    await driver.setImplicitWaitTimeout(1000);
	    console.log("Entering valid Personal details.....");

	    const firstNameField =  await driver.elementByAccessibilityId("firstName-testId");
	    await firstNameField.sendKeys(firstnamevar);
	    console.log("Entered firstName : "+firstnamevar);

	    await driver.setImplicitWaitTimeout(1000);
	    const lastNameField= await driver.elementByAccessibilityId("lastName-testId");
	    await lastNameField.sendKeys(lastnamevar);
	    console.log("Entered lastName : "+lastnamevar);

	    await driver.setImplicitWaitTimeout(1000);
	    const dobField =  await driver.elementByAccessibilityId("birthDateContainer-testId");
	    await dobField.click();
	    console.log("Clicked on DOB text field.");

	    await driver.setImplicitWaitTimeout(1000);
	    const dobFieldOK = await driver.elementById("android:id/button1");
	    await dobFieldOK.click();
	    console.log("Clicked on DOB ok button.");

	 /*   await driver.setImplicitWaitTimeout(1000);
	    Dob = dobField.text();
	    console.log("Entered DOB."+Dob);*/

	    await driver.setImplicitWaitTimeout(1000);
	    const emailField = await driver.elementByAccessibilityId("emailId-testId");
	    await emailField.sendKeys(emailvar);
	    console.log("Entered EmailID : "+emailvar );

	    await driver.setImplicitWaitTimeout(2000);
	    const nextButton = await driver.elementByAccessibilityId("nextBtn-testId");

	    assert.equal(await nextButton.isDisplayed(),true,"Next Enabled Displayed Successfully.");

	    await nextButton.click();
	    console.log("Clicked on 'Next' button after filled valid Personal Details.");

	    await driver.setImplicitWaitTimeout(5000);
	    const postalCode = await driver.elementByAccessibilityId("postalCode-testId");
	    const addressDetailsText = await driver.elementByXPath("//android.widget.TextView[@text='Step 2 of 4: The address details']");
	    const postalCodeNextButton = await driver.elementByAccessibilityId("nextBtn-testId");

	    assert.equal(await postalCode.isDisplayed() && await  addressDetailsText.isDisplayed() && await postalCodeNextButton.isDisplayed(),true,"Postal Code and Address details text is displayed successfully." );
        console.log("Verified Postal Code-Address screen successfully.");

		});

    it('TC_Reg_55 : To verify Back button functionality from address details screen.', async function () {

        await driver.setImplicitWaitTimeout(2000);
        const backButton =  await driver.elementByAccessibilityId("leftIconBtn-testId");
        await backButton.click();
        console.log("Clicked on Back Button.");

			await driver.setImplicitWaitTimeout(2000);
			const nextButtonOnPersonalDetailsScreen = await driver.elementByAccessibilityId("nextBtn-testId");

			await driver.setImplicitWaitTimeout(2000);
			const firstNameField =  await driver.elementByAccessibilityId("firstName-testId");
			let actualFirstNameValue = await firstNameField.text();
			console.log("Actual First Name : " +actualFirstNameValue);

			assert.equal(actualFirstNameValue,firstnamevar,"FistName value is same as expected value ");

			await driver.setImplicitWaitTimeout(2000);
			const lastNameField= await driver.elementByAccessibilityId("lastName-testId");
			let actualLastNameValue = await lastNameField.text();
			console.log("Actual Last Name : " +actualLastNameValue);

			assert.equal(actualLastNameValue,lastnamevar,"LastName value is same as expected value ");

            /*let date = today.getDate();
            let month = today.getMonth()+1;
            let year = today.getFullYear();
            let completeDateDMY = date+"/"+month+"/"+year;

			await driver.setImplicitWaitTimeout(2000);
			const dobField =  await driver.elementByAccessibilityId("birthDateContainer-testId");
			let actualdobValue = await dobField.text();
			console.log("Actual DOB : " +actualdobValue);

			assert.equal(actualdobValue,completeDateDMY,"Dob value is same as expected value ");*/

			await driver.setImplicitWaitTimeout(2000);
			const emailField = await driver.elementByAccessibilityId("emailId-testId");
            let actualeEmailValue = await emailField.text();
			console.log("Actual Email Id : " +actualeEmailValue);

			assert.equal(actualeEmailValue,emailvar,"Email value is same as expected value ");

			assert.equal(await nextButtonOnPersonalDetailsScreen.isDisplayed(),true,"User is redirected to personal details screen Successfully.");
		});

	it('TC_Reg_56 : To verify validation message by entering upto 4 character in Postal Code.', async function () {

			await driver.setImplicitWaitTimeout(2000);
			const nextButton = await driver.elementByAccessibilityId("nextBtn-testId");
			await nextButton.click();
			console.log("Clicked on Next Button.");

			await driver.setImplicitWaitTimeout(4000);
			const postalCode = await driver.elementByAccessibilityId("postalCode-testId");
			await postalCode.sendKeys('SW10');
			console.log("Entered Postal Code : SW10");

			await driver.setImplicitWaitTimeout(2000);
			let expectedpostalErrorMsg = 'Should be 5 characters or more';
			const postalError = await driver.elementByXPath("//android.widget.TextView[@text='Should be 5 characters or more']");
			let actualpostalErrorMsg = await postalError.text();

			console.log("Actual Postal Code Error Msg : "+actualpostalErrorMsg);
			assert.equal(actualpostalErrorMsg,expectedpostalErrorMsg,"Postal Code Error Msg Displayed Successfully by entering upto 4 character in Postal Code.");

			await postalCode.clear();
		});

	it('TC_Reg_57 : To verify by entering 5 or more  character in postal code.', async function () {

			await driver.setImplicitWaitTimeout(2000);
			const postalCode = await driver.elementByAccessibilityId("postalCode-testId");
			await postalCode.sendKeys('SW100AA');
			console.log("Entered Postal Code : SW100AA");

            let expectedPostalCodeMsg = 'Select the search icon to find the address';
			const postalCodeMsg = await driver.elementByXPath("//android.widget.TextView[@text='Select the search icon to find the address']");
            let actualPostalCodeMsg = await postalCodeMsg.text();
            console.log("Actual Postal Code Message : " +actualPostalCodeMsg);
            assert.equal(actualPostalCodeMsg,expectedPostalCodeMsg,"Postal Code Msg Displayed Successfully by entering 5 or more character in Postal Code.");

			const searchIcon = await driver.elementByAccessibilityId("searchIcon-testId");
			assert.equal(await searchIcon.isDisplayed(),true,"Search icon Displayed Successfully.");

			await postalCode.clear();
		});

	it('TC_Reg_58 : To verify "Search" icon functionality with invalid postal code.', async function () {

	        await driver.setImplicitWaitTimeout(2000);
			const postalCode = await driver.elementByAccessibilityId("postalCode-testId");
			await postalCode.sendKeys('SW1022');
			console.log("Entered Postal Code : SW1022");

			await driver.setImplicitWaitTimeout(2000);
			const searchIcon = await driver.elementByAccessibilityId("searchIcon-testId");
			await searchIcon.click();
            console.log("Clicked on Search Icon.");
			await driver.setImplicitWaitTimeout(8000);

			//let expectedAddressListMsg ='NO ADDRESSES FOUND';
			const actualAddressList = await driver.elementByXPath("//android.widget.TextView[@text='NO ADDRESSES FOUND']");
			/*let actualAddressListMsg = actualAddressList.text();
			console.log("Actual Address list Message : "+actualAddressListMsg);*/

			assert.equal(await actualAddressList.isDisplayed(),true,"Address list message Displayed Successfully for invalid postal code.");
		});

	it('TC_Reg_59 : To verify back button functionality from "ADDRESS LIST" screen.', async function () {

			await driver.setImplicitWaitTimeout(2000);
			const backButton =  await driver.elementByAccessibilityId("leftIconBtn-testId");
			await backButton.click();
			console.log("Clicked on Back Button.");

			await driver.setImplicitWaitTimeout(2000);
			const postalCode = await driver.elementByAccessibilityId("postalCode-testId");
			assert.equal(await postalCode.isDisplayed(), true,"User is redirected to AddressDetails Screen." )
		});

	it('TC_Reg_63 : To verify by editing the selected address.', async function () {

            await driver.setImplicitWaitTimeout(2000);
			const postalCode = await driver.elementByAccessibilityId("postalCode-testId");
			await postalCode.sendKeys(expectedPostalCodeValue);
			console.log("Entered Postal Code : "+expectedPostalCodeValue);

			await driver.setImplicitWaitTimeout(2000);
			const searchIcon = await driver.elementByAccessibilityId("searchIcon-testId");
			await searchIcon.click();
			console.log("Clicked on Search icon.");

            await driver.setImplicitWaitTimeout(10000);

            const selectAddress = await driver.elementByXPath("//android.widget.TextView[@text='Chelsea Academy, London, England']");
            let selectedAddressText = await selectAddress.text();
            console.log("Selected Address." +selectedAddressText);

            var str1 = selectedAddressText.split(',');
             expectedBuildingName = str1[0].trim();
             expectedCityName = str1[1].trim();
             expectedCountryName = str1[2].trim();

            console.log("Expected Building Name, City Name, Country Name......");
            console.log("Expected Building Name : "+expectedBuildingName);
            console.log("Expected City Name : "+expectedCityName);
            console.log("Expected Country Name : " +expectedCountryName);

            await selectAddress.click();
            console.log("Address Selected Successfully.");

            await driver.setImplicitWaitTimeout(3000);
            console.log("Actual Building Name, City Name, Country Name......");
            const buildingField = await driver.elementByAccessibilityId("buildingLane-testId");
            let actualBuildingName= await buildingField.text();

            console.log("Actual Building Name : "+actualBuildingName);
            assert.equal(actualBuildingName,expectedBuildingName," Building Name is verified." );

            await driver.setImplicitWaitTimeout(2000);
            const cityField = await driver.elementByAccessibilityId("cityName-testId");
            let actualCityName= await cityField.text();
            console.log("Actual City Name : "+actualCityName);
            assert.equal(actualCityName,expectedCityName ," City Name is verified." );

            await driver.setImplicitWaitTimeout(2000);
            const countryField = await driver.elementByAccessibilityId("countryName-testId");
            let actualCountryName= await countryField.text();
            console.log("Actual Country Name : "+actualCountryName);
            assert.equal(actualCountryName,expectedCountryName ," Country Name is verified." );

            console.log("Updating Address Details Like Building Name, City Name and Country Name ");
            await driver.setImplicitWaitTimeout(2000);
            await buildingField.sendKeys("TestBuilding");
            console.log("Entered Building Name : TestBuilding");
            await driver.setImplicitWaitTimeout(2000);

            await cityField.sendKeys("TestCity");
            console.log("Entered City  Name : TestCity");
            await driver.setImplicitWaitTimeout(2000);

            await countryField.sendKeys("TestCountry");
            console.log("Entered Country Name : TestCountry");
            await driver.setImplicitWaitTimeout(2000);
		});

	it('TC_Reg_66 : To verify "NEXT" button functionality after editing the address with valid details..', async function (){

            console.log("Entering Valid Address Details Like Building Name, City Name and Country Name ");
            await driver.setImplicitWaitTimeout(2000);
            const buildingField = await driver.elementByAccessibilityId("buildingLane-testId");
            await buildingField.sendKeys(expectedBuildingName);
            console.log("Entered Building Name : "+expectedBuildingName);
            await driver.setImplicitWaitTimeout(2000);

            const cityField = await driver.elementByAccessibilityId("cityName-testId");
            await cityField.sendKeys(expectedCityName);
            console.log("Entered City  Name : "+expectedCityName);
            await driver.setImplicitWaitTimeout(2000);

            const countryField = await driver.elementByAccessibilityId("countryName-testId");
            await countryField.sendKeys(expectedCountryName);
            console.log("Entered Country Name : "+expectedCountryName);
            await driver.setImplicitWaitTimeout(2000);

            const nextButton = await driver.elementByAccessibilityId("nextBtn-testId");
            await nextButton.click();
	        console.log("Clicked on Next button.");
	        await driver.setImplicitWaitTimeout(4000);

            const signMeUp = await driver.elementByAccessibilityId("signMeUpBtn-testId");
	        const skipButton = await driver.elementByXPath("//android.widget.TextView[@text='skip']");

            let expectedHeaderTextOfNewsandUpdateScreen = "NEWS AND UPDATES";
            const headerOfNewsandUpdateScreen = await driver.elementByAccessibilityId("headerTitle-testId");
            let actualHeaderTextOfNewsandUpdateScreen = await headerOfNewsandUpdateScreen.text();
            console.log("Actual Header text of News and Updates Screen :"+actualHeaderTextOfNewsandUpdateScreen);
            assert.equal(actualHeaderTextOfNewsandUpdateScreen,expectedHeaderTextOfNewsandUpdateScreen,"Header Text is same as expected : News and Updates");

	        assert.equal(await signMeUp.isDisplayed() && await skipButton.isDisplayed(),true,"User is redirected to News and Updates page successfully." );
	        await driver.quit();
    });

});

describe(testName5, function () {
    let driver;
    let allPassed = true;

     afterEach(function () {
        // keep track of whether all the tests have passed, since mocha does not do this
        allPassed = allPassed && (this.currentTest.state === 'passed');
    });


	it('TC_Reg_01 : To Verify launch karma application successfully.', async function () {
		try {


		/*	driver = await wd.promiseChainRemote(serverConfig);
			await driver.init({
				...androidCaps,
				app: androidTestApp,
			});*/
		/*	const browserStackCaps = {
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
			};*/

			driver = wd.promiseRemote('http://hub-cloud.browserstack.com/wd/hub');
			await driver.init(bsSetting(testName5));
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

	it('TC_Reg_02 : To Verify "Register" button functionality', async function () {
		await driver.setImplicitWaitTimeout(3000);

		const register = await driver.elementByAccessibilityId("registerBtn-testId");
		await register.click();
		console.log("Clicked on 'Register' button.");

		const mobileNo = await driver.elementByAccessibilityId("phone-testId");
		const pswd = await driver.elementByAccessibilityId("password-testId");
		const checkBox = await driver.elementByAccessibilityId("aggrementCheckbox-testId");
		const login = await driver.elementByXPath("//android.widget.TextView[@text='Login']");
		assert.equal(await mobileNo.isDisplayed()&& await pswd.isDisplayed() && await checkBox.isDisplayed() && await login.isDisplayed() &&  await register.isDisplayed(), true,"Successfully Redirected to Register page.");
	});

	it('TC_Reg_23 : To Verify "Register" button functionality with valid details.', async function () {

		await driver.setImplicitWaitTimeout(3000);
		const mobileNo = await driver.elementByAccessibilityId('phone-testId');
		await mobileNo.sendKeys(mobileNummber6);
		console.log("Entered Mobile number : "+mobileNummber6);

		await driver.setImplicitWaitTimeout(1000);
		const password = await driver.elementByAccessibilityId('password-testId');
		await password.sendKeys('pk91india');
		console.log("Entered Password.");

		await driver.setImplicitWaitTimeout(1000);
		const checkBox = await driver.elementByAccessibilityId("aggrementCheckbox-testId");
		await checkBox.click();
		console.log("Checked licence-agreement checkbox.");

		await driver.setImplicitWaitTimeout(1000);
		const registerBtn = await driver.elementByAccessibilityId("registerBtn-testId");
		await registerBtn.click();
		console.log("Clicked on register Button.");

		await driver.setImplicitWaitTimeout(5000);

		const otp = await driver.elementByAccessibilityId("otp-testId");
		assert.equal(await otp.isDisplayed(),true,'Verification Code page displayed Successfully.');

	});

	it('TC_Reg_28, TC_Reg_29, TC_Reg_32 : To Verify by adding 6 digit code.', async function () {

	    await driver.setImplicitWaitTimeout(3000);
		const otpField = await driver.elementByAccessibilityId("otp-testId");
		await otpField.sendKeys('998877');
		console.log("Entered OTP number.");

		await driver.setImplicitWaitTimeout(1000);

		const tickMark = await driver.elementByXPath("//android.view.ViewGroup[@content-desc='otpContainer-testId']/android.widget.TextView");
		assert.equal(await tickMark.isDisplayed(),true,"Tick Mark displayed Successfully.");

		await driver.setImplicitWaitTimeout(2000);
		const nextBtn = await driver.elementByAccessibilityId("nextBtn-testId");

		assert.equal(await nextBtn.isDisplayed(),true,"Next Button displayed Successfully.");

        await driver.setImplicitWaitTimeout(1000);
		await nextBtn.click();
		console.log("Clicked on next button.");

		await driver.setImplicitWaitTimeout(5000);
		const personalDetails = await driver.elementByAccessibilityId("firstName-testId");
		assert.equal(await personalDetails.isDisplayed(),true,"Successfully Personal Detail screen displayed.");

	});

	it('TC_Reg_33, TC_Reg_54 : To Verify details on personal details screen.', async function () {

	    await driver.setImplicitWaitTimeout(1000);
	    const firstNameField =  await driver.elementByAccessibilityId("firstName-testId");
	    await firstNameField.sendKeys(firstnamevar);
	    console.log("Entered firstName : "+firstnamevar);

        await driver.setImplicitWaitTimeout(1000);
        const lastNameField= await driver.elementByAccessibilityId("lastName-testId");
        await lastNameField.sendKeys(lastnamevar);
        console.log("Entered lastName :"+lastnamevar);

        await driver.setImplicitWaitTimeout(1000);
        const dobField =  await driver.elementByAccessibilityId("birthDateContainer-testId");
        await dobField.click();
        console.log("Clicked on DOB text field.");

        await driver.setImplicitWaitTimeout(1000);
        const dobFieldOK = await driver.elementById("android:id/button1");
        await dobFieldOK.click();
        console.log("Clicked on DOB ok button.");

        await driver.setImplicitWaitTimeout(1000);
        const emailField = await driver.elementByAccessibilityId("emailId-testId");
        await emailField.sendKeys(emailvar);
        console.log("Entered EmailID : "+emailvar);

        await driver.setImplicitWaitTimeout(1000);
        const backButton = await driver.elementByAccessibilityId("leftIconBtn-testId");
        assert.equal(await backButton.isDisplayed(), true,"Successfully back button displayed.");

        const nextButton = await driver.elementByAccessibilityId("nextBtn-testId");
        await nextButton.click();
        console.log("Clicked on Next button.");
        await driver.setImplicitWaitTimeout(3000);

        const postalCode = await driver.elementByAccessibilityId("postalCode-testId");
        const addressDetailsText = await driver.elementByXPath("//android.widget.TextView[@text='Step 2 of 4: The address details']");
        const postalCodeNextButton = await driver.elementByAccessibilityId("nextBtn-testId");

        assert.equal(await postalCode.isDisplayed() && await  addressDetailsText.isDisplayed() && await postalCodeNextButton.isDisplayed(),true,"Postal Code and Address details text is displayed successfully." );
	});

    it('TC_Reg_61, TC_Reg_62 : To Verify search icon functionality for valid postal code.', async function () {

            await driver.setImplicitWaitTimeout(2000);
			const postalCode = await driver.elementByAccessibilityId("postalCode-testId");
			await postalCode.sendKeys(expectedPostalCodeValue);
			console.log("Entered Postal Code : "+expectedPostalCodeValue);

			await driver.setImplicitWaitTimeout(2000);
			const searchIcon = await driver.elementByAccessibilityId("searchIcon-testId");
			await searchIcon.click();
			console.log("Clicked on Search icon.");

            await driver.setImplicitWaitTimeout(10000);

            const selectAddress = await driver.elementByXPath("//android.widget.TextView[@text='Chelsea Academy, London, England']");
            let selectedAddressText = await selectAddress.text();
            console.log("Selected Address." +selectedAddressText);

            var str1 = selectedAddressText.split(',');
             expectedBuildingName = str1[0].trim();
             expectedCityName = str1[1].trim();
             expectedCountryName = str1[2].trim();

            console.log("Expected Building Name, City Name, Country Name......");
            console.log("Expected Building Name : "+expectedBuildingName);
            console.log("Expected City Name : "+expectedCityName);
            console.log("Expected Country Name : " +expectedCountryName);

            await selectAddress.click();
            console.log("Address Selected Successfully.");

            await driver.setImplicitWaitTimeout(3000);
            console.log("Actual Building Name, City Name, Country Name......");

            const buildingField = await driver.elementByAccessibilityId("buildingLane-testId");
            let actualBuildingName= await buildingField.text();
            console.log("Actual Building Name : "+actualBuildingName);
            assert.equal(actualBuildingName,expectedBuildingName," Building Name is verified." );

            await driver.setImplicitWaitTimeout(2000);
            const cityField = await driver.elementByAccessibilityId("cityName-testId");
            let actualCityName= await cityField.text();
            console.log("Actual City Name : "+actualCityName);
            assert.equal(actualCityName,expectedCityName ," City Name is verified." );

            await driver.setImplicitWaitTimeout(2000);
            const countryField = await driver.elementByAccessibilityId("countryName-testId");
            let actualCountryName= await countryField.text();
            console.log("Actual Country Name : "+actualCountryName);
            assert.equal(actualCountryName,expectedCountryName ," Country Name is verified." );

            await driver.setImplicitWaitTimeout(2000);
            const nextButtonAddressDetailsScreen = await driver.elementByAccessibilityId("nextBtn-testId");
            await nextButtonAddressDetailsScreen.click();
            console.log("Clicked on Next button of Address Details screen.");

	 });

	it('TC_Reg_67 : To verify back button functionality from "NEWS AND UPDATES" screen.', async function (){

	        await driver.setImplicitWaitTimeout(2000);
            const backButtonOfNewsandUpdatesScreen = await driver.elementByAccessibilityId("leftIconBtn-testId");
            await backButtonOfNewsandUpdatesScreen.click();
            console.log("Clicked on Back button.");

            console.log("Verify address Details Screen..... ");

            let expectedHeaderTextOfAddressDetailsScreen = "ADDRESS DETAILS";
            const headerOfAddressDetailsScreen = await driver.elementByAccessibilityId("headerTitle-testId");
            let actualHeaderTextOfAddressDetailsScreen = await headerOfAddressDetailsScreen.text();
            console.log("Actual Header of Address Details Screen :"+actualHeaderTextOfAddressDetailsScreen);
	        assert.equal(actualHeaderTextOfAddressDetailsScreen,expectedHeaderTextOfAddressDetailsScreen,"Header Text is same as expected : ADDRESS DETAILS");

            const postalCode = await driver.elementByAccessibilityId("postalCode-testId");
            let actualpostalCodeValue= await postalCode.text();
            console.log("Actual Postal Code Value : "+actualpostalCodeValue);
            assert.equal(actualpostalCodeValue,expectedPostalCodeValue," Postal code is verified." );

            await driver.setImplicitWaitTimeout(2000);
            const buildingField = await driver.elementByAccessibilityId("buildingLane-testId");
            let actualBuildingName= await buildingField.text();
            console.log("Actual Building Name : "+actualBuildingName);
            assert.equal(actualBuildingName,expectedBuildingName," Building Name is verified." );

            await driver.setImplicitWaitTimeout(2000);
            const cityField = await driver.elementByAccessibilityId("cityName-testId");
            let actualCityName= await cityField.text();
            console.log("Actual City Name : "+actualCityName);
            assert.equal(actualCityName,expectedCityName ," City Name is verified." );

            await driver.setImplicitWaitTimeout(2000);
            const countryField = await driver.elementByAccessibilityId("countryName-testId");
            let actualCountryName= await countryField.text();
            console.log("Actual Country Name : "+actualCountryName);
            assert.equal(actualCountryName,expectedCountryName ," Country Name is verified." );

            const nextButtOnAddressDetailsScreen = await driver.elementByAccessibilityId("nextBtn-testId");
            assert.equal(await  nextButtOnAddressDetailsScreen.isDisplayed(),true,"Next button is displayed Successfully");
    });

	it('TC_Reg_68 : To verify "skip" button functionality from News and Updates screen.', async function () {

	    await driver.setImplicitWaitTimeout(2000);
        const nextButtOnAddressDetailsScreen = await driver.elementByAccessibilityId("nextBtn-testId");
        await nextButtOnAddressDetailsScreen.click();
        console.log("Clicked on Next button of Address Details Screen.");

        await driver.setImplicitWaitTimeout(2000);
        const skipButtonOnNewsandUpdatesScreen = await driver.elementByXPath("//android.widget.TextView[@text='skip']");
        await skipButtonOnNewsandUpdatesScreen.click();
        console.log("Clicked on Skip button News and Updates Screen.");

        await driver.setImplicitWaitTimeout(2000);
        const allowButtonOnYourNotificationScreen = await driver.elementByAccessibilityId("allowBtn-testId");
        const skipButtonOnYourNotificationScreen = await driver.elementByXPath("//android.widget.TextView[@text='skip']");

        assert.equal(await  allowButtonOnYourNotificationScreen.isDisplayed && await skipButtonOnYourNotificationScreen.isDisplayed(),true,"User is redirected to Your Notification Page Successfully.")
    });

	it('TC_Reg_70 : To verify back button functionality from "YOUR NOTIFICATIONS" screen.', async function () {

	    await driver.setImplicitWaitTimeout(2000);
	    const backButtonOnYourNotificationScreen = await driver.elementByAccessibilityId("leftIconBtn-testId");
	    await backButtonOnYourNotificationScreen.click();
	    console.log("Clicked on Back button.");

	    await driver.setImplicitWaitTimeout(3000);
	    let expectedHeaderTextOfNewsandUpdateScreen = "NEWS AND UPDATES";
	    const headerOfNewsandUpdateScreen = await driver.elementByAccessibilityId("headerTitle-testId");
	    let actualHeaderTextOfNewsandUpdateScreen = await headerOfNewsandUpdateScreen.text();
	    console.log("Actual Header text of News and Updates Screen :"+actualHeaderTextOfNewsandUpdateScreen);
	    assert.equal(actualHeaderTextOfNewsandUpdateScreen,expectedHeaderTextOfNewsandUpdateScreen,"Header Text is same as expected : News and Updates");

	    const signMeUp = await driver.elementByAccessibilityId("signMeUpBtn-testId");
        const skipButton = await driver.elementByXPath("//android.widget.TextView[@text='skip']");

        assert.equal(await  signMeUp.isDisplayed && await skipButton.isDisplayed(),true,"User is redirected to Your Notification Page Successfully.");

    });

	it('TC_Reg_71 : To verify "skip" link functionality from Your notifications screen.', async function () {

	     await driver.setImplicitWaitTimeout(2000);
	     const skipButtonOnNewsandUpdates = await driver.elementByXPath("//android.widget.TextView[@text='skip']");
	     await skipButtonOnNewsandUpdates.click();
	     console.log("Clicked on skip button of News and Updates Screen.");

	     await driver.setImplicitWaitTimeout(3000);
	     const skipButtonOnNotificationScreen = await driver.elementByXPath("//android.widget.TextView[@text='skip']");
	     await skipButtonOnNotificationScreen.click();
	     console.log("Clicked on skip button of Your Notification Screen.");

	     await driver.setImplicitWaitTimeout(3000);
	     let expectedHeaderTextOfVerifyYourIdentityScreen ='VERIFY YOUR IDENTITY';
	     const headerText = await driver.elementByAccessibilityId("headerTitle-testId");
	     let actualHeaderTextOfVerifyYourIdentityScreen = await headerText.text();
	     console.log("Actual header text of verify your identity screen : "+actualHeaderTextOfVerifyYourIdentityScreen);
	     assert.equal(actualHeaderTextOfVerifyYourIdentityScreen,expectedHeaderTextOfVerifyYourIdentityScreen,"Header Text is same as expected : VERIFY YOUR IDENTITY'");

	     let expectedStep3and4Text ='Step 3 of 4: Quick ID check';
	     const step3and4Text = await driver.elementByXPath("//android.widget.TextView[@text='Step 3 of 4: Quick ID check']");
	     let actualStep3and4Text = await step3and4Text.text();
	     console.log("Step 3 and 4 Text : " +actualStep3and4Text);
	     assert.equal(actualStep3and4Text,expectedStep3and4Text,'Text is verified successfully.');

	     const takeaSelfie = await driver.elementByAccessibilityId("startPictureBtn-testId");

	     assert.equal(await takeaSelfie.isDisplayed(),true,"User is redirected to verify your identity screen");

    });

	it('TC_Reg_73 : To verify back button functionality from "VERIFY YOUR IDENTITY" screen.', async function () {

	    await driver.setImplicitWaitTimeout(2000);
		const backButtonOnVerifyYourIdentityScreen = await driver.elementByAccessibilityId("leftIconBtn-testId");
		await backButtonOnVerifyYourIdentityScreen.click();
		console.log("Clicked on Back Button of Verify Your Identity Screen.");

		await driver.setImplicitWaitTimeout(2000);
		let expectedHeaderTextOnYourNotificationScreen=  'YOUR NOTIFICATIONS';

		const headerOnYourNotificationScreen = await driver.elementByAccessibilityId("headerTitle-testId");
        let actualHeaderTextOnYourNotificationScreen = await headerOnYourNotificationScreen.text();
        assert.equal(actualHeaderTextOnYourNotificationScreen,expectedHeaderTextOnYourNotificationScreen,"Header Text is same as Expected : YOUR NOTIFICATIONS");

        await driver.setImplicitWaitTimeout(1000);
		const skipButtonOnNotificationScreen = await driver.elementByXPath("//android.widget.TextView[@text='skip']");
        const allowButtonOnNotificationScreen = await driver.elementByAccessibilityId("allowBtn-testId");

        assert.equal(await skipButtonOnNotificationScreen.isDisplayed () && await allowButtonOnNotificationScreen.isDisplayed(),true, 'User redirected to "YOUR NOTIFICATIONS" screen Successfully.');

    });

	it('TC_Reg_74, TC_Reg_77 : To Verify TAKE A SELFIE button functionality from verify your identity screen.', async function () {

	    await driver.setImplicitWaitTimeout(1000);
	    const skipButtonOnNotificationScreen = await driver.elementByXPath("//android.widget.TextView[@text='skip']");
	    await skipButtonOnNotificationScreen.click();
	    console.log("Clicked on Skip Button of Your Notifications Screen.");

	    await driver.setImplicitWaitTimeout(2000);
        const takeaSelfie = await driver.elementByAccessibilityId("startPictureBtn-testId");
        await takeaSelfie.click();
        console.log("Taped on take selfie button.");
        await driver.setImplicitWaitTimeout(1000);

        const capture = await driver.elementByAccessibilityId("captureSelfie-testId");
        await capture.click();
        console.log("Taped on Capture button.");

        await driver.setImplicitWaitTimeout(10000);

        const done = await driver.elementByAccessibilityId("doneBtn-testId");
        assert.equal(await done.isDisplayed(),true,"Done Button displayed successfully." );

  });

    it('TC_Reg_78 : To Verify DONE button functionality from finished screen.', async function () {

        await driver.setImplicitWaitTimeout(5000);
        const done = await driver.elementByAccessibilityId("doneBtn-testId");
        await done.click();
        console.log("Taped on Done button.");
        await driver.setImplicitWaitTimeout(2000);

   });

    it('TC_Reg_78 : To Verify apply screen.', async function () {

        await driver.setImplicitWaitTimeout(2000);
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

	    await driver.setImplicitWaitTimeout(2000);
	    const profile = await  driver.elementByAccessibilityId("Profile, tab, 4 of 5");
	    await profile.click();
		await driver.setImplicitWaitTimeout(2000);

		const firstname = await driver.elementByXPath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[3]/android.widget.EditText");
		const lastname = await driver.elementByXPath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[4]/android.widget.EditText");
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

		let mob = '+44'+mobileNummber6;

		assert.equal(fn,firstnamevar,"First Name Matched successfully");
		assert.equal(ln,lastnamevar,"Last Name Matched successfully");
		assert.equal(emailID,emailvar,"Email Id Matched successfully");
		assert.equal(mobilNo,mob,"Mobile Number Matched successfully");

		await driver.setImplicitWaitTimeout(2000);
		await driver.quit();
	});

});