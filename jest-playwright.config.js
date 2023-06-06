/// <reference types="jest-playwright-preset" />
/// <reference types="expect-playwright" />
module.exports = {
    'jest-playwright': {
        browsers: [
          'chromium',
          'firefox',
          'webkit',
        ]
      },
    exitOnPageError: false,
    launchOptions: {
        headless: true
    },
    contextOptions: {
        recordVideo: {
            dir: "<rootDir>/videos/"
        }
    }

}