# Customer_Feedback



The purpose of this project is to test E2E with Cypress

usage: 
1. npm install
2. Run headless false
   npm run test-debug-chrome
4. Run headless true
   npm run cy:run
6. Open cypress test runner
   npm run cypress:open

Examples of scenarios:

1. Confirm the Happy path - change all the input fields, click on the submit button, and monitor the request-response data. 

2. Check the comment section for special characters and resend it including the request-response data tracking

   By the way, Cypress has a problem with '{dskodjaskdask}' data.

3. Check the sending of feedback when the author is enabled by HTML, change the value, and add special characters, and track after the request-response data has been collected. 

4. Verify input not allowed to add more than 160, add long text and click on submit, again track after the request-response data.

5. Verify UI behavior, by starting with mock data, adding and removing text from input to verify all fields and that the submit button is still disabled.

    A. Only one section (inputs & ratings) each time - add and delete.

    B. Add numbers and chars to the captcha when all fields are full.
