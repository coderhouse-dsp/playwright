/** @type {import('@jest/types').Config.InitialOptions} */
module.exports ={
   
        verbose: true,
    preset: 'jest-playwright-preset',
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    "testTimeout":120000,
    // 'jest-playwright': {
    //     browsers: [
    //       'chromium',
    //       'firefox',
    //       'webkit',
    //     ]
    //   },
    testRunner:'jest-jasmine2',
    exitOnPageError: false,
    launchOptions: {
        headless: true
    },
    contextOptions: {
        recordVideo: {
            dir: "<rootDir>/videos/"
        }
    },
    setupFilesAfterEnv:["jest-allure/dist/setup"],
    testMatch:["<rootDir>/test/pageObjectTest/**.ts"]
    
    
}