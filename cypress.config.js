const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env:{
    language: 'en'
  },
  e2e: {
    'baseUrl': "https://juice-shop.herokuapp.com/#/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.family === 'chrome') {
          launchOptions.args.push('--remote-debugging-port=9222')
          return launchOptions
        }
      });
    },
  }
});
