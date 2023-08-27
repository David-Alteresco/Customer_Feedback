module.exports = (on, config) => {
    return {
      browsers: config.browsers.filter((browser) => browser.family === 'chrome'),
    }
  }